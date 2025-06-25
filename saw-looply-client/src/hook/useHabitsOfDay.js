import { useState, useEffect } from "react";
import { useHabits } from "../context/HabitContext";
import dayjs from "dayjs";

export const useHabitsOfDay = ({ currentDate, isFuture }) => {
  const { habits } = useHabits();
  const [habitsOfDay, setHabitsOfDay] = useState([]);
  const [historyOfDay, setHistoryOfDay] = useState({});
  const [loading, setLoading] = useState(true);
  const { subscribeHistory } = useHabits();

  useEffect(() => {
    if (!currentDate || !habits) return;
    setHistoryOfDay({});
    setLoading(true);

    const weekDay = dayjs(currentDate).format("ddd");

    const dayId = dayjs(currentDate).format("YYYY-MM-DD");

    //prendo gli habit solo se sono stati creati prima di currentDate
    //e sono giornalieri o settimanali ed è il giorno giusto
    const filteredHabits = habits.filter((habit) => {
      const habitDate = dayjs(+habit.id).format("YYYY-MM-DD");
      return (
        habitDate <= dayId &&
        (habit.freq === "daily" || (habit.days && habit.days.includes(weekDay)))
      );
    });

    setHabitsOfDay(filteredHabits);

    let unsubscribe = null;

    if (!isFuture) {
      try {
        unsubscribe = subscribeHistory(dayId, (history) => {
          setHistoryOfDay(history);
        });
      } catch (err) {
        console.log("Errore");
      }
    }

    setLoading(false);

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [habits, currentDate]);

  return { habitsOfDay, historyOfDay, loading };
};
