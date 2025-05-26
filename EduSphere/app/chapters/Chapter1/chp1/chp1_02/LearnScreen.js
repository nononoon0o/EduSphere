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
import styles from '../../../../../style/ChapterStyle/Chapter1/ch2Style/GLBViewerStyle';


// 시약 목록과 앙금 매핑
const REAGENTS = [
  { id: 'AgNO3',     label: 'AgNO₃'   },
  { id: 'NaCl',      label: 'NaCl'    },
  { id: 'BaCl2',     label: 'BaCl₂'   },
  { id: 'Na2SO4',    label: 'Na₂SO₄'  },
  { id: 'CaCl2',     label: 'CaCl₂'   },
  { id: 'Na2CO3',    label: 'Na₂CO₃'  },
  { id: 'Pb(NO3)2',  label: 'Pb(NO₃)₂' },
  { id: 'KI',        label: 'KI'      },
];

// 앙금 색상 및 설명 매핑
const PRECIPITATES = {
  'AgNO3+NaCl':    { color: 0xffffff, description: 'AgNO₃(aq) + NaCl(aq) → AgCl(s)↓ (흰색 앙금)' },
  'BaCl2+Na2SO4':  { color: 0xffffff, description: 'BaCl₂(aq) + Na₂SO₄(aq) → BaSO₄(s)↓ (흰색 앙금)' },
  'CaCl2+Na2CO3':  { color: 0xffffff, description: 'CaCl₂(aq) + Na₂CO₃(aq) → CaCO₃(s)↓ (흰색 앙금)' },
  'KI+Pb(NO3)2':   { color: 0xffff00, description: 'Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(s)↓ (노란색 앙금)' },
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

  // 앙금용 지오메트리/머티리얼 미리 생성 (리퀴드 하단 반경에 맞춤)
  const precipGeom = useRef(new THREE.CircleGeometry(1.3, 32));
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
  const precipKey = [...droppedReagents].sort().join('+');
  const precipData = PRECIPITATES[precipKey];
  const hasPrecip = Boolean(precipData);

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
      setDroppedReagents(prev => prev.includes(id) ? prev : [...prev, id]);
      setReagents(prev => {
        const copy = [...prev];
        copy.splice(idx, 1);
        return copy;
      });
    }
  };

  // 앙금 생성 useEffect
  useEffect(() => {
    if (precipData && sceneRef.current) {
      if (!sceneRef.current.getObjectByName('precip')) {
        precipMat.current.color.set(precipData.color);
        const mesh = new THREE.Mesh(precipGeom.current, precipMat.current);
        mesh.name = 'precip';
        mesh.rotation.x = -Math.PI / 2;
        // 액체 내부 바닥에 고정
        mesh.position.set(0, -0.4, 0);
        sceneRef.current.add(mesh);
      }
    }
  }, [precipData]);

  return (
    <View style={{ flex: 1 }} {...panResponder.panHandlers}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/chapters/Chapter1/Chapter1_02')}>
        <Ionicons name="arrow-back" size={20} color="#2c3e50" />
        <Text style={styles.backText}>뒤로가기</Text>
      </TouchableOpacity>

      <GLView
        style={{ flex: 1 }}
        onContextCreate={async gl => {
          glContext.current = gl;
          const scene = new THREE.Scene(); scene.background = new THREE.Color(0xffffff); sceneRef.current = scene;
          const camera = new THREE.PerspectiveCamera(75, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000);
          camera.position.set(0, 1, 7); cameraRef.current = camera;
          const renderer = new Renderer({ gl }); renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight); rendererRef.current = renderer;
          scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.2));
          const dlight = new THREE.DirectionalLight(0xffffff, 1); dlight.position.set(3, 10, 10); scene.add(dlight);
          const asset = Asset.fromModule(require('../../../../../assets/beaker/graduated-beaker.glb')); await asset.downloadAsync();
          new GLTFLoader().load(asset.localUri, gltf => { const m = gltf.scene; m.scale.set(0.5, 0.5, 0.5); m.position.set(0, -0.5, 0); scene.add(m); modelRef.current = m; });
          const liquid = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.3, 2.4, 64), new THREE.MeshStandardMaterial({ color: 0x0089ff, transparent: true, opacity: 0.3 }));
          liquid.position.set(0, 0.8, 0); scene.add(liquid); liquidRef.current = liquid;
        }}
      />

      {hasPrecip && beakerLayout && (
        <>
          <TouchableOpacity style={[styles.resetButton, { left: beakerLayout.x + beakerLayout.width + 150, top: beakerLayout.y }]} onPress={reset}>
            <Text style={styles.resetText}>다시 해보기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.explainButton, { left: beakerLayout.x + beakerLayout.width + 150, top: beakerLayout.y + 50 }]} onPress={() => setShowExplanation(true)}>
            <Text style={styles.resetText}>앙금 생성 풀이</Text>
          </TouchableOpacity>
        </>
      )}

      {showExplanation && beakerLayout && (
        <View style={[styles.explanationBox, { left: beakerLayout.x + beakerLayout.width + 300, top: beakerLayout.y, width: 350, maxHeight: 500 }]}>        
          <ScrollView>
            <Text style={styles.explanationText}>{precipData?.description}</Text>
          </ScrollView>
        </View>
      )}

      <View style={styles.buttonRow}>
        {REAGENTS.map(r => (
          <TouchableOpacity key={r.id} style={styles.chemButton} onPress={() => setReagents(prev => [...prev, r.id])}>
            <Text style={styles.chemText}>{r.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {reagents.map((id, idx) => (
        <Draggable key={`${id}-${idx}`} defaultPosition={{ x: 20, y: 150 + idx * 60 }} onStop={e => handleDrop(id, idx, e)}>
          <View style={styles.molecule}><Text style={styles.chemText}>{REAGENTS.find(r => r.id === id).label}</Text></View>
        </Draggable>
      ))}
       <View style={[styles.navigation, {  bottom: 100 }]}>
    {/* 이전 버튼 */}
    <TouchableOpacity
      style={styles.prevButton}
      onPress={() => router.push('/chapters/Chapter1/chp1/chp1_02/ConceptSummaryScreen')}
    >
      <View style={styles.prevButtonCircle}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </View>
      <Text style={styles.prevButtonText}>이전으로</Text>
    </TouchableOpacity>

    {/* 다음 버튼 */}
    <TouchableOpacity
      style={styles.nextButton}
      onPress={() => router.push('/chapters/Chapter1/chp1/chp1_02/VideoLearningScreen')}
    >
      <Text style={styles.nextButtonText}>다음으로</Text>
      <View style={styles.nextButtonCircle}>
        <Ionicons name="arrow-forward" size={24} color="#3498db" />
      </View>
    </TouchableOpacity>
  </View>
    </View>
  );
}
