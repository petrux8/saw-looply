import { useState, useEffect } from "react";
import { useHabits } from "../context/HabitContext";

export const useHabitById = ({ id }) => {
  const { habits } = useHabits();
  const [habit, setHabit] = useState({});

  useEffect(() => {
    if (!id || !habits) return;
    

    const [filteredHabit] = habits.filter((habit) => {
      return habit.id === id;
    });

    setHabit(filteredHabit);
  }, [habits, id]);

  return { habit };
};
