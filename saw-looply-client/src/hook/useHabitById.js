import { useState, useEffect } from "react";
import { useHabits } from "../context/HabitContext";

export const useHabitById = ({ id }) => {
  const { habits } = useHabits();
  const [habit, setHabit] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id || !habits) return;
    setError(false);

    const [filteredHabit] = habits.filter((habit) => {
      return habit.id === id;
    });

    if (!filteredHabit) {
      setError(true);
    }

    setHabit(filteredHabit);
  }, [habits, id]);

  return { habit, error };
};
