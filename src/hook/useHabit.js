// src/features/habits/hooks/useHabits.js
import { useState, useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { useFirebaseAuth } from "../context/FirebaseAuthContext";
import * as service from "../service/habitService";

export function useHabits({ currentDate }) {
  const { currentUser } = useFirebaseAuth();
  const [habits, setHabits] = useState([]);habits
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser && !currentDate) return;

    const q = service.getHabits(currentUser.uid, currentDate);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setHabits(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser, currentDate]);

  return { habits, loading };
}
