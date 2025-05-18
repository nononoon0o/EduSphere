import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAEvvoi7xGdIX5tmypTYtBqcBFzUVwPVh8",
  authDomain: "low-code-91f71.firebaseapp.com",
  projectId: "low-code-91f71",
  storageBucket: "low-code-91f71.firebasestorage.app",
  messagingSenderId: "797077443717",
  appId: "1:797077443717:web:a0737218890a50ddcdc5ec",
  measurementId: "G-XEZCN7Q965"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);