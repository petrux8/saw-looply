import { createContext, useState, useContext, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { registerServiceWorker, subscribeUserToPush } from "../notification";
import { ensureHistoryDayExists } from "../service/habitService";
import dayjs from "dayjs";

const FirebaseAuthContext = createContext();

export const FirebaseAuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [swRegistration, setSwRegistration] = useState(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      registerServiceWorker().then((registration) => {
        setSwRegistration(registration);
      });
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
      if (user && swRegistration) {
        await ensureHistoryDayExists(user.uid, dayjs().format("YYYY-MM-DD"));
        try {
          await subscribeUserToPush(user.uid, swRegistration); // Usa SW registrato
        } catch (error) {
          console.error("Error during subscription to push:", error);
        }
      }
    });

    return () => unsubscribe();
  }, [swRegistration]);

  return (
    <FirebaseAuthContext.Provider value={{ currentUser }}>
      {!loading && children}
    </FirebaseAuthContext.Provider>
  );
};

export const useFirebaseAuth = () => {
  const context = useContext(FirebaseAuthContext);
  if (context === undefined) {
    throw new Error(
      "useFirebaseAuth must be used within a FirebaseAuthProvider"
    );
  }
  return context;
}
