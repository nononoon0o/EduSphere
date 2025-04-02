import React from "react";
import { Physics as CannonPhysics } from "@react-three/cannon";

export default function Physics({ children }) {
  return (
    <CannonPhysics
      gravity={[0, -9.81, 0]}
      defaultContactMaterial={{
        contactEquationStiffness: 1e7,
        friction: 0.1,
      }}
    >
      {children}
    </CannonPhysics>
  );
}
