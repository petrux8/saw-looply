import { initializeApp } from "firebase/app";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBlmH6vUFEPlMmVrI1aPDHIZfli0E_Ss8E",
  authDomain: "looply-281b4.firebaseapp.com",
  projectId: "looply-281b4",
  storageBucket: "looply-281b4.firebasestorage.app",
  messagingSenderId: "1094526595841",
  appId: "1:1094526595841:web:a23d4f7cf1032ccdfb2100",
};

const app = initializeApp(firebaseConfig);

const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});
const auth = getAuth(app);

const logout = () => {
  const auth = getAuth();
  return signOut(auth);
};

export { db, auth, app, logout };
