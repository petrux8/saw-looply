import React, { useMemo, useState } from "react";
import Stats from "./Stats";
import { useHabitsHistory } from "../../../hook/useHabitHistory";
import CalendarCard from "./CalendarCard";
import MyLineChart from "./MyLineChart";

export default function StatsPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { habitsHistory } = useHabitsHistory({ currentDate });

  const monthDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return Array.from(
      { length: daysInMonth },
      (_, i) =>
        `${year}-${String(month + 1).padStart(2, "0")}-${String(i + 1).padStart(
          2,
          "0"
        )}`
    );
  }, [currentDate]);

  const changeMonth = (increment) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + increment,
      1
    );
    setCurrentDate(newDate);
  };

  return (
    <div className="container mt-5">
      <h1>Habits Statistics</h1>
      <div className="d-flex align-items-center">
        <div className="me-3">
          <h5 className="mb-0">
            {currentDate.toLocaleDateString("en-GB", {
              month: "long",
              year: "numeric",
            })}
          </h5>
        </div>
        <div>
          <button
            className="btn btn-outline-danger me-2"
            onClick={() => changeMonth(-1)}
          >
            &lt;
          </button>
          <button
            className="btn btn-outline-danger"
            onClick={() => changeMonth(+1)}
          >
            &gt;
          </button>
        </div>
      </div>
      {habitsHistory.map((habit, i) => (
        <div key={i}>
          <h5>
            {habit.name}
          </h5>
          {habit.type === "binary" && (
            <CalendarCard
              year={currentDate.getFullYear()}
              month={currentDate.getMonth()}
              habit={habit}
            />
          )}
          {habit.type !== "binary" && (
            <MyLineChart
              year={currentDate.getFullYear()}
              month={currentDate.getMonth()}
              habit={habit}
            />
          )}
        </div>
      ))}
    </div>
  );
}
