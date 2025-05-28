import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBlmH6vUFEPlMmVrI1aPDHIZfli0E_Ss8E",
  authDomain: "looply-281b4.firebaseapp.com",
  projectId: "looply-281b4",
  storageBucket: "looply-281b4.firebasestorage.app",
  messagingSenderId: "1094526595841",
  appId: "1:1094526595841:web:a23d4f7cf1032ccdfb2100"
};

const app = initializeApp(firebaseConfig);

// Inizializza Firestore e Auth
export const db = getFirestore(app);
export const auth = getAuth(app);

export const logout = () => {
  const auth = getAuth();
  return signOut(auth);
};

export default app;