// src/services/databaseService.js

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { firebaseConfig } from "../config";


// 🔐 Your Firebase config (move to config.js or .env in production)
const firebaseConfig = {
    apiKey: "AIzaSyAEvvoi7xGdIX5tmypTYtBqcBFzUVwPVh8",
    authDomain: "low-code-91f71.firebaseapp.com",
    projectId: "low-code-91f71",
    storageBucket: "low-code-91f71.firebasestorage.app",
    messagingSenderId: "797077443717",
    appId: "1:797077443717:web:a0737218890a50ddcdc5ec",
    measurementId: "G-XEZCN7Q965"
  };

// 🔥 Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🧪 Save a newly formed molecule
export const saveMolecule = async (userId, molecule) => {
  try {
    await addDoc(collection(db, "molecules"), {
      userId,
      molecule,
      createdAt: new Date().toISOString(),
    });
    console.log("✅ Molecule saved:", molecule);
  } catch (error) {
    console.error("❌ Failed to save molecule:", error);
  }
};

// 📦 Save inventory
export const saveInventory = async (userId, inventory) => {
  try {
    const userRef = doc(db, "inventories", userId);
    await setDoc(userRef, { inventory, updatedAt: new Date().toISOString() });
    console.log("✅ Inventory saved for", userId);
  } catch (error) {
    console.error("❌ Failed to save inventory:", error);
  }
};

// 📥 Fetch user's inventory
export const fetchInventory = async (userId) => {
  try {
    const userRef = doc(db, "inventories", userId);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap.data().inventory || [];
    } else {
      console.warn("⚠️ No inventory found for", userId);
      return [];
    }
  } catch (error) {
    console.error("❌ Failed to fetch inventory:", error);
    return [];
  }
};

// 📊 Fetch recent molecules globally
export const fetchRecentMolecules = async () => {
  try {
    const q = query(collection(db, "molecules"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("❌ Failed to fetch recent molecules:", error);
    return [];
  }
};
