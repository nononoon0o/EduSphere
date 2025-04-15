import React, { useRef, useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useSpring, a } from "@react-spring/three";
import * as THREE from "three";

export default function Molecule({ position, color, name, symbol, atomicNumber, atomicMass }) {
  const meshRef = useRef();
  const [active, setActive] = useState(false);
  const [dragging, setDragging] = useState(false);
  const { camera, mouse, raycaster, scene } = useThree();
  const [textSize, setTextSize] = useState(12);
  const [textVisible, setTextVisible] = useState(true);

  const spring = useSpring({
    scale: active ? 1.4 : 1,
    config: { tension: 100, friction: 20 },
  });

  useEffect(() => {
    const id = setInterval(() => {
      const currentScale = spring.scale.get();
      setTextSize(12 * currentScale);
    }, 50);
    return () => clearInterval(id);
  }, [spring.scale]);

  useFrame(({ clock }) => {
    if (meshRef.current && !dragging) {
      const t = clock.getElapsedTime();
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
      meshRef.current.position.y = position[1] + Math.sin(t) * 0.2;
    }

    // Raycaster pour visibilité du texte
    const direction = new THREE.Vector3().subVectors(meshRef.current.position, camera.position).normalize();
    raycaster.set(camera.position, direction);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const firstObject = intersects[0].object;
      setTextVisible(firstObject === meshRef.current);
    }
  });
  

  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -position[1]);
  const intersectPoint = new THREE.Vector3();

  const handlePointerDown = (e) => {
    e.stopPropagation();
    setActive(true);
    setDragging(true);
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerUp = (e) => {
    e.stopPropagation();
    setActive(false);
    setDragging(false);
    e.target.releasePointerCapture(e.pointerId);
    console.log("Molecule dropped:", symbol);
  };

  const handlePointerMove = (e) => {
    if (dragging && meshRef.current) {
      e.stopPropagation();
      raycaster.setFromCamera(mouse, camera);
      if (raycaster.ray.intersectPlane(plane, intersectPoint)) {
        meshRef.current.position.x = intersectPoint.x;
        meshRef.current.position.z = intersectPoint.z;
      }
    }
  };

  return (
    <a.mesh
      ref={meshRef}
      position={position}
      scale={spring.scale}
      castShadow
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={color} />

      {/* Numéro atomique */}
      <Html position={[0.2, 0.0, 0]} center>
        <div style={{ fontSize: `${textSize * 0.8}px`, color: "white", opacity: textVisible ? 0.8 : 0 }}>
          {atomicNumber ?? ""}
        </div>
      </Html>

      {/* Symbole */}
      <Html position={[0, 0, 0]} center>
        <div style={{ fontSize: `${textSize * 1.5}px`, color: "white", opacity: textVisible ? 1 : 0 }}>
          {symbol || "?"}
        </div>
      </Html>

      {/* Masse atomique */}
      <Html position={[0, 0, 0]} center>
        <div style={{ fontSize: `${textSize * 0.8}px`, color: "white", opacity: textVisible ? 0.7 : 0 }}>
          {atomicMass ?? ""}
        </div>
      </Html>

      {/* Nom */}
      <Html position={[0, 0.3, 0]} center>
        <div style={{ fontSize: `${textSize}px`, color: "white", opacity: textVisible ? 1 : 0 }}>
          {name || "Molecule"}
        </div>
      </Html>
    </a.mesh>
  );
}
