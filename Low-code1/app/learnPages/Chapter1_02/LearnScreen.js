import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, PanResponder, Animated } from 'react-native';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import * as THREE from 'three';
import { Asset } from 'expo-asset';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function GLBViewer() {
  const router = useRouter();
  const modelRef = useRef();
  const rotation = useRef({ y: 0 });
  const velocityY = useRef(0);
  const lastDx = useRef(0);
  const [reagents, setReagents] = useState([]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        const delta = gesture.dx - lastDx.current;
        velocityY.current = delta * 0.002;
        rotation.current.y += velocityY.current;
        lastDx.current = gesture.dx;
      },
      onPanResponderRelease: () => {
        lastDx.current = 0;
      },
      onPanResponderGrant: () => {
        velocityY.current = 0;
        lastDx.current = 0;
      },
    })
  ).current;

  return (
    <View style={{ flex: 1 }} {...panResponder.panHandlers}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={20} color="#2c3e50" />
        <Text style={styles.backText}>뒤로가기</Text>
      </TouchableOpacity>

      <GLView
        style={{ flex: 1 }}
        onContextCreate={async (gl) => {
          const scene = new THREE.Scene();
          scene.background = new THREE.Color(0xffffff);

          const camera = new THREE.PerspectiveCamera(
            75,
            gl.drawingBufferWidth / gl.drawingBufferHeight,
            0.1,
            1000
          );
          camera.position.set(0, 1, 7);

          const renderer = new Renderer({ gl });
          renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

          scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.2));
          const dirLight = new THREE.DirectionalLight(0xffffff, 1);
          dirLight.position.set(3, 10, 10);
          scene.add(dirLight);

          const modelAsset = Asset.fromModule(require('../../../assets/beaker/graduated-beaker.glb'));
          await modelAsset.downloadAsync();

          const loader = new GLTFLoader();
          loader.load(modelAsset.localUri, (gltf) => {
            const model = gltf.scene;
            model.scale.set(0.5, 0.5, 0.5);
            model.position.set(0, -0.5, 0);
            scene.add(model);
            modelRef.current = model;
          });

          const liquidMaterial = new THREE.MeshStandardMaterial({
            color: 0x3fa9f5,
            transparent: true,
            opacity: 0.6,
          });

          const liquid = new THREE.Mesh(
            new THREE.CylinderGeometry(1.5, 1.3, 2.4, 64),
            liquidMaterial
          );
          liquid.position.set(0, 0.8, 0);
          scene.add(liquid);

          const animate = () => {
            requestAnimationFrame(animate);
            rotation.current.y += velocityY.current;
            velocityY.current *= 0.95;
            if (modelRef.current) {
              modelRef.current.rotation.y = rotation.current.y;
            }
            renderer.render(scene, camera);
            gl.endFrameEXP();
          };
          animate();
        }}
      />

      {/* 시약 버튼 */}
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => setReagents(prev => [...prev, 'AgNO₃'])} style={styles.chemButton}>
          <Text style={styles.chemText}>AgNO₃</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setReagents(prev => [...prev, 'NaCl'])} style={styles.chemButton}>
          <Text style={styles.chemText}>NaCl</Text>
        </TouchableOpacity>
      </View>

      {/* 생성된 시약 아이콘들 */}
      {reagents.map((name, index) => (
        <DraggableMolecule key={`${name}-${index}`} name={name} top={150 + index * 60} />
      ))}
    </View>
  );
}

const DraggableMolecule = ({ name, top }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        { dx: pan.x, dy: pan.y },
      ], { useNativeDriver: false }),
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[styles.molecule, { top, transform: pan.getTranslateTransform() }]}
    >
      <Text style={styles.chemText}>{name}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute', top: 40, left: 20, zIndex: 10,
    flexDirection: 'row', backgroundColor: '#fff', borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 5, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, shadowRadius: 2, elevation: 3,
  },
  backText: {
    fontSize: 16, marginLeft: 6, color: '#2c3e50', fontWeight: '500',
  },
  buttonRow: {
    position: 'absolute', bottom: 30, left: 0, right: 0,
    flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center',
    paddingHorizontal: 20,
  },
  chemButton: {
    backgroundColor: '#ecf0f1', paddingHorizontal: 20,
    paddingVertical: 10, borderRadius: 12, elevation: 2,
  },
  chemText: {
    fontSize: 16, color: '#2c3e50', fontWeight: '600',
  },
  molecule: {
    position: 'absolute', right: 20, backgroundColor: '#fff',
    padding: 10, borderRadius: 8, elevation: 2,
  },
});
