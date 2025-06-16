// src/features/habits/hooks/useHabits.js
import { useState, useEffect } from "react";
import { parseISODateAsLocal } from "../util/parseDate";
import { useHabits } from "../context/HabitContext";

export function useHabitsHistory({ currentDate }) {
  const { habits } = useHabits();
  const [habitsHistoryFiltered, setHabitsHistoryFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentDate || !habits) return;

    const targetMonth = currentDate.getMonth();
    const targetYear = currentDate.getFullYear();
    const targetPrefix = `${targetYear}-${String(targetMonth + 1).padStart(
      2,
      "0"
    )}`;

    const habitsHistory = habits.map((habit) => {
      const filteredHistory = Object.keys(habit.history)
        .filter((key) => key.startsWith(targetPrefix)) 
        .reduce((filteredHistory, key) => {
          filteredHistory[parseISODateAsLocal(key).getDate()] = habit.history[key];
          return filteredHistory;
        }, {});
      return { ...habit, history: filteredHistory };
    });

    setHabitsHistoryFiltered(habitsHistory);
      setLoading(false);
    }, [habits, currentDate]);

  return { habitsHistoryFiltered, loading };
}
