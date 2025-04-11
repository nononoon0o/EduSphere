import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics, useBox, usePlane } from "@react-three/cannon";

function Ground() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -1, 0],
    args: [100, 100],
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#444" />
    </mesh>
  );
}

function Cube() {
  const [ref] = useBox(() => ({
    mass: 1,
    position: [0, 2, 0],
    args: [1, 1, 1],
    linearDamping: 0.2,
    angularDamping: 0.3,
  }));

  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="skyblue" />
    </mesh>
  );
}

function ScenePhysics({ children }) {
  return (
    <Physics
      gravity={[0, -9.81, 0]}
      allowSleep
      defaultContactMaterial={{
        contactEquationStiffness: 1e8,
        contactEquationRelaxation: 3,
        friction: 0.4,
        restitution: 0.2,
      }}
    >
      {children}
    </Physics>
  );
}

export default function App() {
  return (
    <Canvas shadows camera={{ position: [4, 4, 4], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={[5, 10, 5]}
        intensity={1}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <OrbitControls />

      <ScenePhysics>
        <Ground />
        <Cube />
      </ScenePhysics>
    </Canvas>
  );
}
