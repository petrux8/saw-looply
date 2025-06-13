// src/features/habits/hooks/useHabits.js
import { useState, useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { useFirebaseAuth } from "../context/FirebaseAuthContext";
import * as service from "../service/habitService";
import { parseISODateAsLocal } from "../util/parseDate";

export function useHabitsHistory({ currentDate }) {
  const { currentUser } = useFirebaseAuth();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const targetMonth = currentDate.getMonth();
    const targetYear = currentDate.getFullYear();
    const targetPrefix = `${targetYear}-${String(targetMonth + 1).padStart(2, "0")}`;

    const q = service.getHabits(currentUser.uid);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setHabits(
        snapshot.docs.map((doc) => {
          const { history} = doc.data();

          const filteredHistory = Object.keys(history)
            .filter((key) => key.startsWith(targetPrefix)) // Filtra le chiavi che iniziano con il prefisso
            .reduce((filteredHistory, key) => {
              filteredHistory[parseISODateAsLocal(key).getDate()] = history[key]; // Aggiunge la coppia chiave-valore all'oggetto filtrato
              return filteredHistory;
            }, {});     

          return { id: doc.id, ...doc.data() , history: filteredHistory };
        })
      );
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser, currentDate]);

  return { habits, loading };
}
