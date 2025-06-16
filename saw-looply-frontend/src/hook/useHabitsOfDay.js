import { useState, useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import * as service from "../service/habitService";
import { useHabits } from "../context/HabitContext";

export const useHabitsOfDay = ({ currentDate }) => {
  const { habits } = useHabits();
  const [habitsOfDay, setHabitsOfDay] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentDate || !habits) return;

    const weekDay = currentDate.toLocaleDateString("en-GB", {
      weekday: "short",
    });
    

    const filteredHabits = habits.filter((habit) => {
      return (
        habit.freq === "daily" || (habit.days && habit.days.includes(weekDay))
      );
    });

    setHabitsOfDay(filteredHabits);
    setLoading(false);
  }, [habits, currentDate]);

  return {habitsOfDay, loading};
};
