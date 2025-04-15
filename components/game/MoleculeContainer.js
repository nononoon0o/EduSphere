import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Molecule from "./Molecule";

export default function MoleculeContainer() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* ✅ Test object to confirm rendering */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="green" />
      </mesh>

      {/* ✅ Your Molecules */}
      <Molecule position={[1, 2, 3]} element="H" color="blue" />
      <Molecule position={[-1, 0, 2]} element="O" color="red" />
      <Molecule position={[0, -1, -3]} element="C" color="black" />
    </Canvas>
  );
}