import React, { createContext, useContext, useEffect, useState } from "react";
import {
  subscribeToHabits,
  createHabit,
  updateHabit,
  deleteHabit,
  checkHabitName,
  setHabitCompletion,
  subscribeToHistoryDay,
  getHistoryRange,
} from "../service/habitService";

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

    const unsubscribe = subscribeToHabits(userId, (habitsSnapshot) => {
      setHabits(habitsSnapshot);
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

  const getHabitName = (habitId) => {
    return habits.filter((habit) => habit.id == habitId)[0].name;
  };

  const isHabitNameUnique = async (habitName) => {
    return await checkHabitName(userId, habitName);
  };

  const toggleCompletion = async (habitId, dayId) => {
    setHabitCompletion(userId, habitId, dayId);
  };

  const subscribeHistory = (dayId, callback) => {
    return subscribeToHistoryDay(userId, dayId, callback);
  };

  const fetchHistoryRange = (startDate, endDate) => {
    return getHistoryRange(userId, startDate, endDate);
  };

  return (
    <HabitContext.Provider
      value={{
        habits,
        loading,
        addHabit,
        editHabit,
        removeHabit,
        isHabitNameUnique,
        toggleCompletion,
        subscribeHistory,
        fetchHistoryRange,
        getHabitName,
      }}
    >
      {!loading && children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => useContext(HabitContext);
