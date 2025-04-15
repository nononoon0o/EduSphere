import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { usePlane } from "@react-three/cannon"; // optional if using physics
import { MeshStandardMaterial } from "three";

export default function Platform({ position = [0, -1.2, 0], color = "#666666", size = [10, 10] }) {
  const [ref] = usePlane(() => ({
    position,
    rotation: [-Math.PI / 2, 0, 0],
    type: "Static",
  }));

  useFrame(() => {
    // Add any animations or updates if needed
  });

  return (
    <mesh ref={ref} receiveShadow position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={size} />
      <meshStandardMaterial
        attach="material"
        color={color}
        roughness={0.7}
        metalness={0.1}
      />
    </mesh>
  );
}
