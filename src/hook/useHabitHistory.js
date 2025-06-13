// src/features/habits/hooks/useHabits.js
import { useState, useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { useFirebaseAuth } from "../context/FirebaseAuthContext";
import * as service from "../service/habitService";
import { parseISODateAsLocal } from "../util/parseDate";

export function useHabitsHistory({ currentDate }) {
  const { currentUser } = useFirebaseAuth();
  const [habitsHistory, setHabitsHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const targetMonth = currentDate.getMonth();
    const targetYear = currentDate.getFullYear();
    const targetPrefix = `${targetYear}-${String(targetMonth + 1).padStart(2, "0")}`;

    const q = service.getHabitsHistory(currentUser.uid);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setHabitsHistory(
        snapshot.docs.map((doc) => {
          const { name, history, type, target, days } = doc.data();

          const filteredHistory = Object.keys(history)
            .filter((key) => key.startsWith(targetPrefix)) // Filtra le chiavi che iniziano con il prefisso
            .reduce((filteredHistory, key) => {
              filteredHistory[parseISODateAsLocal(key).getDate()] = history[key]; // Aggiunge la coppia chiave-valore all'oggetto filtrato
              return filteredHistory;
            }, {});     

          return { id: doc.id, name, type, target, days, history: filteredHistory };
        })
      );
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser, currentDate]);

  return { habitsHistory, loading };
}
