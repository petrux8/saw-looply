// src/features/habits/hooks/useHabits.js
import { useState, useEffect } from "react";
import { useHabits } from "../context/HabitContext";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

export const useHabitHistory = ({ habit, startDate }) => {
  const { fetchHistoryRange } = useHabits();
  const [habitHistory, setHabitHistory] = useState([]);
  const [longestStreak, setLongestStreak] = useState(0);
  const [totalDay, setTotalDay] = useState(0);
  const [loading, setLoading] = useState(true);

  dayjs.locale("en");
  dayjs.extend(localizedFormat);

  useEffect(() => {
    if (!startDate || !habit || habit == {}) return;
    setLoading(true);
    setLongestStreak(0);
    setTotalDay(0);
    setHabitHistory([]);

    const fetchData = async () => {
      try {
        const endDate = startDate.endOf("month");

        const rawHistory = await fetchHistoryRange(startDate, endDate);

        // const filteredHistory = rawHistory
        //   .filter((day) => day.habits[id])
        //   .map((day) => day.id);

        const filteredHistory = [];
        let longestStreak = 0;
        let currentStreak = 0;
        let totalDay = 0;

        for (
          let currentDate = startDate.startOf("day");
          currentDate.isBefore(endDate) || currentDate.isSame(endDate);
          currentDate = currentDate.add(1, "day")
        ) {
          if (currentDate.isBefore(dayjs()) &&
            (habit.freq == "daily" || (habit.freq == "weekly" &&
            habit.days.includes(currentDate.format("ddd"))))
          ) {
            totalDay++;
          }
          const dateStr = currentDate.format("YYYY-MM-DD");
          const foundEntry = rawHistory.find(
            (entry) => entry.id === dateStr && entry.habits[habit.id]
          );
          if (foundEntry) {
            currentStreak += 1;
            filteredHistory.push(dateStr);
          } else {
            if (longestStreak < currentStreak) longestStreak = currentStreak;
            currentStreak = 0;
          }
        }

        if (longestStreak < currentStreak) longestStreak = currentStreak;
        currentStreak = 0;
        setLongestStreak(longestStreak);
        setTotalDay(totalDay);

        setHabitHistory(filteredHistory);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, habit]);

  return { habitHistory, longestStreak, totalDay , loading };
}
