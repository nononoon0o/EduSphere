import React, { useRef } from "react";
import { MeshWobbleMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Molecule({ position, element, color }) {
  const meshRef = useRef(); // Reference to the molecule mesh

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Floating effect using sine wave
      meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime()) * 0.2;

      // Rotate molecule slightly over time
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow>
      <sphereGeometry args={[0.5, 32, 32]} />
      <MeshWobbleMaterial attach="material" color={color} speed={2} factor={0.6} />
    </mesh>
  );
}