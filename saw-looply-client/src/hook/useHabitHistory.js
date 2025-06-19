// src/features/habits/hooks/useHabits.js
import { useState, useEffect } from "react";
import { useHabits } from "../context/HabitContext";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

export function useHabitsHistory({ startDate, period }) {
  const { fetchHistoryRange, getHabitName } = useHabits();
  const [history, setHistory] = useState([]);
  const [minHabit, setMinHabit] = useState(null);
  const [maxHabit, setMaxHabit] = useState(null);
  const [loading, setLoading] = useState(true);

  dayjs.locale("en");
  dayjs.extend(localizedFormat);

  useEffect(() => {
    if (!startDate || !period) return;

    setLoading(true);

    const fetchData = async () => {
      try {
        const endDate = startDate.endOf(period);

        const rawHistory = await fetchHistoryRange(startDate, endDate);

        const completeHistory = [];
        const completionHabit = {};

        let completedHabit = 0;

        for (
          let currentDate = startDate.startOf("day");
          currentDate.isBefore(endDate) || currentDate.isSame(endDate);
          currentDate = currentDate.add(1, "day")
        ) {
          const dateStr = currentDate.format("YYYY-MM-DD");
          const foundEntry = rawHistory.find((entry) => entry.id === dateStr);
          if (foundEntry) {
            for (const habit in foundEntry.habits) {
              if (completionHabit[habit]) {
                completionHabit[habit] += 1;
              } else {
                completionHabit[habit] = 1;
              }
            }
          }
          const foundEntryValue = foundEntry
            ? Object.keys(foundEntry.habits).length
            : 0;
          completedHabit += foundEntryValue;
          completeHistory.push({
            x: dateStr,
            y: foundEntryValue,
          });
        }

        const maxHabitId = Object.entries(completionHabit).reduce(
          (max, [habitId, value]) =>
            value > max.value ? { habitId, value } : max,
          { habitId: null, value: -Infinity }
        ).habitId;

        const minHabitId = Object.entries(completionHabit).reduce(
          (min, [habitId, value]) =>
            value < min.value ? { habitId, value } : min,
          { habitId: null, value: +Infinity }
        ).habitId;

        if (maxHabitId != null) {
          setMaxHabit(getHabitName(maxHabitId));
        }

        if (minHabitId != null) {
          setMinHabit(getHabitName(minHabitId));
        }

        setHistory(completeHistory); // Aggiorna lo stato
      } catch (error) {
        console.error("Error fetching history range:", error);
        setHistory([]); // Fallback in caso di errore
      } finally {
        setLoading(false); // Fine del caricamento
      }
    };

    fetchData();
  }, [startDate, period]);

  return { history, loading, maxHabit, minHabit };
}
