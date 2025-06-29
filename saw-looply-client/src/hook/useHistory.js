import { useState, useEffect } from "react";
import { useHabits } from "../context/HabitContext";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

export const useHistory = ({ startDate, period }) => {
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
    setMinHabit(null);
    setMaxHabit(null);

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
        else{
          setMaxHabit(null);
        }

        if (minHabitId != null) {
          setMinHabit(getHabitName(minHabitId));
        }
        else{
          setMinHabit(null);
        }


        setHistory(completeHistory);
      } catch (error) {
        console.error("Error fetching history range:", error);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, period]);

  return { history, loading, maxHabit, minHabit };
};
