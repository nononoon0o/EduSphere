import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, PanResponder, Dimensions, ScrollView } from 'react-native';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import * as THREE from 'three';
import { Asset } from 'expo-asset';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Draggable from 'react-draggable';

// 시약 목록과 앙금 매핑
const REAGENTS = [
  { id: 'AgNO3', label: 'AgNO₃' },
  { id: 'NaCl',  label: 'NaCl' },
];
const PRECIPITATES = {
  'AgNO3+NaCl': { color: 0xffffff },
};

export default function GLBViewer() {
  const router = useRouter();
  const modelRef = useRef();
  const sceneRef = useRef();
  const glContext = useRef();
  const rendererRef = useRef();
  const cameraRef = useRef();
  const liquidRef = useRef();
  const rotation = useRef({ y: 0 });
  const velocityY = useRef(0);
  const lastDx = useRef(0);

  const [reagents, setReagents] = useState([]);
  const [droppedReagents, setDroppedReagents] = useState([]);
  const [beakerLayout, setBeakerLayout] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // 앙금용 지오메트리/머티리얼 미리 생성
  const precipGeom = useRef(new THREE.CircleGeometry(1.5, 32));
  const precipMat  = useRef(new THREE.MeshBasicMaterial({ color: PRECIPITATES['AgNO3+NaCl'].color }));

  // 비커 영역 계산
  const { width, height } = Dimensions.get('window');
  useEffect(() => {
    setBeakerLayout({
      x: width  / 2 - 100,
      y: height / 2 - 150,
      width: 200,
      height: 300,
    });
  }, [width, height]);

  // 초기화 함수
  const reset = () => {
    if (sceneRef.current) {
      const precMesh = sceneRef.current.getObjectByName('precip');
      if (precMesh) sceneRef.current.remove(precMesh);
    }
    setDroppedReagents([]);
    setReagents([]);
    setShowExplanation(false);
  };

  // 앙금 생성 여부 판단
  const hasPrecip = Boolean(
    PRECIPITATES[[...droppedReagents].sort().join('+')]
  );

  // 모델 회전 PanResponder
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, g) => {
        const d = g.dx - lastDx.current;
        velocityY.current = d * 0.002;
        rotation.current.y += velocityY.current;
        lastDx.current = g.dx;
      },
      onPanResponderGrant: () => {
        lastDx.current = 0;
        velocityY.current = 0;
      },
      onPanResponderRelease: () => {
        lastDx.current = 0;
      },
    })
  ).current;

  // Three.js 애니메이션 루프
  useEffect(() => {
    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      rotation.current.y += velocityY.current;
      velocityY.current *= 0.95;
      if (modelRef.current) modelRef.current.rotation.y = rotation.current.y;
      if (sceneRef.current && rendererRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
        glContext.current.endFrameEXP();
      }
    };
    animate();
    return () => cancelAnimationFrame(raf);
  }, []);

  // 드롭 핸들러
  const handleDrop = (id, idx, e) => {
    if (!beakerLayout) return;
    const cx = e.clientX;
    const cy = e.clientY;
    const { x, y, width: bw, height: bh } = beakerLayout;
    if (cx >= x && cx <= x + bw && cy >= y && cy <= y + bh) {
      setDroppedReagents(prev =>
        prev.includes(id) ? prev : [...prev, id]
      );
      setReagents(prev => {
        const copy = [...prev];
        copy.splice(idx, 1);
        return copy;
      });
    }
  };

  // 앙금 생성 useEffect
  useEffect(() => {
    const key = [...droppedReagents].sort().join('+');
    const prec = PRECIPITATES[key];
    if (prec && sceneRef.current) {
      if (!sceneRef.current.getObjectByName('precip')) {
        const mesh = new THREE.Mesh(precipGeom.current, precipMat.current);
        mesh.name = 'precip';
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.set(0, -0.4, 0);
        sceneRef.current.add(mesh);
      }
    }
  }, [droppedReagents]);

  return (
    <View style={{ flex: 1 }} {...panResponder.panHandlers}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={20} color="#2c3e50" />
        <Text style={styles.backText}>뒤로가기</Text>
      </TouchableOpacity>

      <GLView
        style={{ flex: 1 }}
        onContextCreate={async gl => {
          glContext.current = gl;
          const scene = new THREE.Scene();
          scene.background = new THREE.Color(0xffffff);
          sceneRef.current = scene;

          const camera = new THREE.PerspectiveCamera(
            75,
            gl.drawingBufferWidth / gl.drawingBufferHeight,
            0.1,
            1000
          );
          camera.position.set(0, 1, 7);
          cameraRef.current = camera;

          const renderer = new Renderer({ gl });
          renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
          rendererRef.current = renderer;

          scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.2));
          const dlight = new THREE.DirectionalLight(0xffffff, 1);
          dlight.position.set(3, 10, 10);
          scene.add(dlight);

          const asset = Asset.fromModule(
            require('../../../../../assets/beaker/graduated-beaker.glb')
          );
          await asset.downloadAsync();
          new GLTFLoader().load(asset.localUri, gltf => {
            const m = gltf.scene;
            m.scale.set(0.5, 0.5, 0.5);
            m.position.set(0, -0.5, 0);
            scene.add(m);
            modelRef.current = m;
          });

          const liquid = new THREE.Mesh(
            new THREE.CylinderGeometry(1.5, 1.3, 2.4, 64),
            new THREE.MeshStandardMaterial({
              color: 0x0089ff,
              transparent: true,
              opacity: 0.3
            })
          );
          liquid.position.set(0, 0.8, 0);
          scene.add(liquid);
          liquidRef.current = liquid;
        }}
      />

      {/* '다시 해보기' 및 '앙금 생성 풀이' 버튼 */}
      {hasPrecip && beakerLayout && (
        <>
          <TouchableOpacity
            style={[
              styles.resetButton,
              {
                left: beakerLayout.x + beakerLayout.width + 150,
                top: beakerLayout.y
              }
            ]}
            onPress={reset}
          >
            <Text style={styles.resetText}>다시 해보기</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.explainButton,
              {
                left: beakerLayout.x + beakerLayout.width + 150,
                top: beakerLayout.y + 50
              }
            ]}
            onPress={() => setShowExplanation(true)}
          >
            <Text style={styles.resetText}>앙금 생성 풀이</Text>
          </TouchableOpacity>
        </>
      )}

      {/* 앙금 생성 과정 풀이 */}
      {showExplanation && beakerLayout && (
        <View
          style={[
            styles.explanationBox,
            {
              left: beakerLayout.x + beakerLayout.width + 300,
              top: beakerLayout.y,
              width: 350,
              maxHeight: 500
            }
          ]}
        >
          <ScrollView>
            <Text style={styles.explanationText}>
              AgNO₃(질산은) 수용액에 NaCl(염화나트륨) 수용액을 넣으면, 은 이온(Ag⁺)과 염화 이온(Cl⁻)이 만나{"\n\n"}
              반응하여 물에 잘 녹지 않는 AgCl(염화은) 고체, 즉 앙금이 생성됩니다.{"\n\n"}
              반응식: AgNO₃(aq) + NaCl(aq) → AgCl(s)↓ + NaNO₃(aq){"\n\n"}
              이렇게 만들어진 앙금은 비커 바닥에 하얗게 쌓이게 됩니다.
            </Text>
          </ScrollView>
        </View>
      )}

      {/* 시약 버튼 */}
      <View style={styles.buttonRow}>
        {REAGENTS.map(r => (
          <TouchableOpacity
            key={r.id}
            style={styles.chemButton}
            onPress={() => setReagents(prev => [...prev, r.id])}
          >
            <Text style={styles.chemText}>{r.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 드래그 아이템 */}
      {reagents.map((id, idx) => (
        <Draggable
          key={`${id}-${idx}`}
          defaultPosition={{ x: 20, y: 150 + idx * 60 }}
          onStop={e => handleDrop(id, idx, e)}
        >
          <View style={styles.molecule}>
            <Text style={styles.chemText}>
              {REAGENTS.find(r => r.id === id).label}
            </Text>
          </View>
        </Draggable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  backText: {
    fontSize: 16,
    marginLeft: 6,
    color: '#2c3e50',
    fontWeight: '500',
  },
  buttonRow: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
  },
  chemButton: {
    backgroundColor: '#ecf0f1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    elevation: 2,
  },
  chemText: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '600',
  },
  molecule: {
    position: 'absolute',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
  resetButton: {
    position: 'absolute',
    backgroundColor: '#ecf0f1',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    elevation: 2,
    zIndex: 10,
  },
  explainButton: {
    position: 'absolute',
    backgroundColor: '#ecf0f1',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    elevation: 2,
    zIndex: 10,
  },
  explanationBox: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    zIndex: 10,
  },
  explanationText: {
    fontSize: 14,
    color: '#2c3e50',
    lineHeight: 20,
  },
});
