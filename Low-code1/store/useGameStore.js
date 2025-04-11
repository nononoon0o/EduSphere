import { create } from "zustand";
import { Animated, Easing } from "react-native";

export const useGameStore = create((set, get) => ({
  inventory: [],
  animations: {},

  // ✅ Add element to inventory with animation
  addElement: (element) => {
    const newAnim = new Animated.Value(0);
    Animated.timing(newAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();

    set((state) => {
      console.log(`Adding element: ${element}`);
      return {
        inventory: [...state.inventory, element],
        animations: { ...state.animations, [element]: newAnim },
      };
    });
  },

  // ✅ Remove a specific element with fade-out animation
  removeElement: (element) => {
    set((state) => {
      const index = state.inventory.indexOf(element);
      if (index !== -1) {
        const newInventory = [...state.inventory];
        const removedElement = newInventory.splice(index, 1)[0];

        Animated.timing(state.animations[removedElement], {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }).start(() => {
          console.log(`Removed element: ${removedElement}`);
          set((state) => ({
            inventory: newInventory,
            animations: { ...state.animations, [removedElement]: undefined },
          }));
        });
      }
      return state;
    });
  },

  // ✅ React molecules with cool animations
  reactMolecules: () => {
    set((state) => {
      let newInventory = [...state.inventory];
      console.log("Before Reaction:", newInventory);
      const reactions = [];

      // 🌊 H₂O (Water) Reaction: 2H + O → H₂O
      if (countElement(newInventory, "H") >= 2 && countElement(newInventory, "O") >= 1) {
        reactions.push({ input: ["H", "H", "O"], output: "H₂O" });
      }

      // 🌫️ CO₂ (Carbon Dioxide) Reaction: C + 2O → CO₂
      if (countElement(newInventory, "C") >= 1 && countElement(newInventory, "O") >= 2) {
        reactions.push({ input: ["C", "O", "O"], output: "CO₂" });
      }

      // 🔥 CH₄ (Methane) Reaction: C + 4H → CH₄
      if (countElement(newInventory, "C") >= 1 && countElement(newInventory, "H") >= 4) {
        reactions.push({ input: ["C", "H", "H", "H", "H"], output: "CH₄" });
      }

      reactions.forEach(({ input, output }) => {
        input.forEach((el) => (newInventory = removeElementFromInventory(newInventory, el, 1)));
        newInventory.push(output);

        // 🎬 Add a popping effect when a molecule is formed
        const popAnim = new Animated.Value(0);
        Animated.spring(popAnim, {
          toValue: 1,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }).start();

        setTimeout(() => {
          Animated.timing(popAnim, {
            toValue: 0.8,
            duration: 500,
            useNativeDriver: true,
          }).start();
        }, 500);

        set((state) => ({
          animations: { ...state.animations, [output]: popAnim },
        }));
      });

      console.log("After Reaction:", newInventory);
      return { inventory: newInventory };
    });
  },

  // 🔄 Reset the game with animation
  resetGame: () => {
    set((state) => {
      Object.keys(state.animations).forEach((key) => {
        Animated.timing(state.animations[key], {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });

      setTimeout(() => {
        console.log("Game Reset!");
        set({ inventory: [], animations: {} });
      }, 500);

      return state;
    });
  },
}));

// ✅ Helper function to count occurrences of an element in inventory
const countElement = (inventory, element) => inventory.filter((e) => e === element).length;

// ✅ Helper function to remove multiple instances of an element
const removeElementFromInventory = (inventory, element, count) => {
  let removed = 0;
  return inventory.filter((e) => {
    if (e === element && removed < count) {
      removed++;
      return false;
    }
    return true;
  });
};