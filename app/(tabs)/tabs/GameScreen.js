import React from "react";
import { Canvas } from "@react-three/fiber";
import { View } from "react-native";
import Molecule from "../../../components/game/Molecule"; 
import Platform from "../../../components/game/Platform";
import { Physics } from "@react-three/cannon";

// ✅ Complete Periodic Table Elements with Categorized Colors
const elements = [
  // 🟢 Hydrogen & Alkali Metals
  { number: 1, symbol: "H", name: "Hydrogène", color: "#4CAF50" },
  { number: 3, symbol: "Li", name: "Lithium", color: "#FF9800" },
  { number: 11, symbol: "Na", name: "Sodium", color: "#FF9800" },
  { number: 19, symbol: "K", name: "Potassium", color: "#FF9800" },
  { number: 37, symbol: "Rb", name: "Rubidium", color: "#FF9800" },
  { number: 55, symbol: "Cs", name: "Césium", color: "#FF9800" },
  { number: 87, symbol: "Fr", name: "Francium", color: "#FF9800" },

  // 🔵 Alkaline Earth Metals
  { number: 4, symbol: "Be", name: "Beryllium", color: "#2196F3" },
  { number: 12, symbol: "Mg", name: "Magnésium", color: "#2196F3" },
  { number: 20, symbol: "Ca", name: "Calcium", color: "#2196F3" },
  { number: 38, symbol: "Sr", name: "Strontium", color: "#2196F3" },
  { number: 56, symbol: "Ba", name: "Baryum", color: "#2196F3" },
  { number: 88, symbol: "Ra", name: "Radium", color: "#2196F3" },

  // 🔴 Transition Metals
  { number: 21, symbol: "Sc", name: "Scandium", color: "#F44336" },
  { number: 22, symbol: "Ti", name: "Titane", color: "#F44336" },
  { number: 23, symbol: "V", name: "Vanadium", color: "#F44336" },
  { number: 24, symbol: "Cr", name: "Chrome", color: "#F44336" },
  { number: 25, symbol: "Mn", name: "Manganèse", color: "#F44336" },
  { number: 26, symbol: "Fe", name: "Fer", color: "#F44336" },
  { number: 27, symbol: "Co", name: "Cobalt", color: "#F44336" },
  { number: 28, symbol: "Ni", name: "Nickel", color: "#F44336" },
  { number: 29, symbol: "Cu", name: "Cuivre", color: "#F44336" },
  { number: 30, symbol: "Zn", name: "Zinc", color: "#F44336" },
  { number: 39, symbol: "Y", name: "Yttrium", color: "#F44336" },
  { number: 40, symbol: "Zr", name: "Zirconium", color: "#F44336" },
  { number: 41, symbol: "Nb", name: "Niobium", color: "#F44336" },
  { number: 42, symbol: "Mo", name: "Molybdène", color: "#F44336" },
  { number: 43, symbol: "Tc", name: "Technétium", color: "#F44336" },
  { number: 44, symbol: "Ru", name: "Ruthénium", color: "#F44336" },
  { number: 45, symbol: "Rh", name: "Rhodium", color: "#F44336" },
  { number: 46, symbol: "Pd", name: "Palladium", color: "#F44336" },
  { number: 47, symbol: "Ag", name: "Argent", color: "#F44336" },
  { number: 48, symbol: "Cd", name: "Cadmium", color: "#F44336" },

  // 🟠 Poor Metals
  { number: 5, symbol: "B", name: "Bore", color: "#FFC107" },
  { number: 13, symbol: "Al", name: "Aluminium", color: "#FFC107" },
  { number: 31, symbol: "Ga", name: "Gallium", color: "#FFC107" },
  { number: 49, symbol: "In", name: "Indium", color: "#FFC107" },
  { number: 81, symbol: "Tl", name: "Thallium", color: "#FFC107" },

  // 🟡 Metalloids
  { number: 14, symbol: "Si", name: "Silicium", color: "#FFD700" },
  { number: 32, symbol: "Ge", name: "Germanium", color: "#FFD700" },
  { number: 33, symbol: "As", name: "Arsenic", color: "#FFD700" },
  { number: 51, symbol: "Sb", name: "Antimoine", color: "#FFD700" },
  { number: 52, symbol: "Te", name: "Tellure", color: "#FFD700" },

  // 🟣 Noble Gases
  { number: 2, symbol: "He", name: "Hélium", color: "#9C27B0" },
  { number: 10, symbol: "Ne", name: "Néon", color: "#9C27B0" },
  { number: 18, symbol: "Ar", name: "Argon", color: "#9C27B0" },
  { number: 36, symbol: "Kr", name: "Krypton", color: "#9C27B0" },
  { number: 54, symbol: "Xe", name: "Xénon", color: "#9C27B0" },
  { number: 86, symbol: "Rn", name: "Radon", color: "#9C27B0" },
  { number: 118, symbol: "Og", name: "Oganesson", color: "#9C27B0" },
];

export default function GameScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Canvas shadows camera={{ position: [0, 3, 10], fov: 50 }}>
        {/* ✅ Set plain dark background */}
        <color attach="background" args={["#0e0e0e"]} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />

        <Physics>
          {elements.map((el, index) => (
            <Molecule
              key={index}
              position={[
                Math.random() * 6 - 3,
                Math.random() * 3,
                Math.random() * 6 - 3,
              ]}
              color={el.color}
              name={el.name}
              symbol={el.symbol}
              atomicNumber={el.number}
            />
          ))}
          <Platform />
        </Physics>
      </Canvas>
    </View>
  );
}