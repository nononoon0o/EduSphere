import { create } from "zustand";

export const useGameStore = create((set) => ({
  inventory: [],
  addElement: (element) => set((state) => ({ inventory: [...state.inventory, element] })),
}));