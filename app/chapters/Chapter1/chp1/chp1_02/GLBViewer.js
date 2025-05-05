import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import * as THREE from 'three';
import { Asset } from 'expo-asset';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useRouter } from 'expo-router'; // 추가
import { Ionicons } from '@expo/vector-icons'; // 아이콘 추가
import styles from '../../../../../style/ChapterStyle/Chapter1/ch1Style/GLBViewerStyles';

const GLBViewer = () => {
  const router = useRouter(); // router 사용

  return (
    <View style={{ flex: 1 }}>
      {/* 🔙 뒤로가기 버튼 */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={20} color="#2c3e50" />
        <Text style={styles.backText}>뒤로가기</Text>
      </TouchableOpacity>

      <GLView
        style={{ flex: 1, backgroundColor: '#ffffff' }}
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
          renderer.setPixelRatio(window.devicePixelRatio);
          renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

          const hemiLight = new THREE.HemisphereLight(0xffffff, 0xeeeeee, 1.2);
          scene.add(hemiLight);

          const dirLight = new THREE.DirectionalLight(0xffffff, 1);
          dirLight.position.set(3, 10, 10);
          scene.add(dirLight);

          const modelAsset = Asset.fromModule(
            require('../../../../../assets/beaker/graduated-beaker.glb')
          );
          await modelAsset.downloadAsync();

          const loader = new GLTFLoader();
          loader.load(modelAsset.localUri, (gltf) => {
            const model = gltf.scene;

            model.scale.set(0.5, 0.5, 0.5);
            model.position.set(0, -0.5, 0);
            scene.add(model);

            let isDragging = false;
            let previousMousePosition = { x: 0, y: 0 };
            let targetRotation = { x: 0, y: 0 };

            const onMouseDown = (e) => {
              isDragging = true;
              previousMousePosition = { x: e.clientX, y: e.clientY };
            };

            const onMouseUp = () => {
              isDragging = false;
            };

            const onMouseMove = (e) => {
              if (!isDragging) return;

              const delta = {
                x: e.clientX - previousMousePosition.x,
                y: e.clientY - previousMousePosition.y,
              };

              targetRotation.y += delta.x * 0.01;
              targetRotation.x += delta.y * 0.01;
              targetRotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotation.x));
              previousMousePosition = { x: e.clientX, y: e.clientY };
            };

            document.addEventListener('mousedown', onMouseDown);
            document.addEventListener('mouseup', onMouseUp);
            document.addEventListener('mousemove', onMouseMove);

            const animate = () => {
              requestAnimationFrame(animate);
              model.rotation.y += (targetRotation.y - model.rotation.y) * 0.1;
              model.rotation.x += (targetRotation.x - model.rotation.x) * 0.1;
              renderer.render(scene, camera);
              gl.endFrameEXP();
            };

            animate();

            window.addEventListener('beforeunload', () => {
              document.removeEventListener('mousedown', onMouseDown);
              document.removeEventListener('mouseup', onMouseUp);
              document.removeEventListener('mousemove', onMouseMove);
            });
          });
        }}
      />
    </View>
  );
};


export default GLBViewer;