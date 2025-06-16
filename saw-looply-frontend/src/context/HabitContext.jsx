import React, { createContext, useContext, useEffect, useState } from "react";
import { subscribeToHabits, createHabit, updateHabit, deleteHabit } from "../service/habitService";

const HabitContext = createContext();

export const HabitProvider = ({ children, userId }) => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setHabits([]);
      setLoading(false);
      return;
    }

    const unsubscribe = subscribeToHabits(userId, (habits) => {
      setHabits(habits);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  const addHabit = async (habit) => {
    await createHabit(userId, habit);
  };

  const editHabit = async (habitId, updatedData) => {
    await updateHabit(userId, habitId, updatedData);
  };

  const removeHabit = async (habitId) => {
    await deleteHabit(userId, habitId);
  };

  return (
    <HabitContext.Provider value={{ habits, loading, addHabit, editHabit, removeHabit }}>
      {!loading && children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => useContext(HabitContext);
