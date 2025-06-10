import React, { useState, useEffect } from "react";
import BinaryHabit from "./habit/BinaryHabit";
import RatingHabit from "./habit/RatingHabit";
import QuantityHabit from "./habit/QuantityHabit";
import { useHabits } from "../../hook/useHabit";
import { updateHabit } from "../../service/habitService";

export default function HabitList({ currentDate }) {
  const { habits, loading } = useHabits({ currentDate });

  const date = currentDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {habits.length === 0 && <p>Non hai ancora creato nessun habit.</p>}
      <ul className="list-group">
        {habits.map((habit) => {
          let habitComponent = null;
          switch (habit.type) {
            case "binary":
              habitComponent = (
                <BinaryHabit
                  key={habit.id}
                  habit={habit}
                  onToggleCompletion={() =>
                    updateHabit(habit.id, {
                      history: {
                        ...habit.history,
                        [date]: !habit.history[date],
                      },
                    })
                  }
                  currentDate={currentDate}
                />
              );
              break;
            case "rating":
              habitComponent = (
                <RatingHabit
                  key={habit.id}
                  habit={habit}
                  onUpdateRating={(value) =>
                    updateHabit(habit.id, {
                      history: {
                        ...habit.history,
                        [date]: value,
                      },
                    })
                  }
                  currentDate={currentDate}
                />
              );
              break;
            case "quantitative":
              habitComponent = (
                <QuantityHabit
                  key={habit.id}
                  habit={habit}
                  onUpdateProgress={(value) =>
                    updateHabit(habit.id, {
                      history: {
                        ...habit.history,
                        [date]: value,
                      },
                    })
                  }
                  currentDate={currentDate}
                />
              );
              break;
            default:
              return null; // Gestione di tipi sconosciuti
          }

          return (
            <li
              key={habit.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <h5>{habit.name}</h5>
              {habitComponent}
            </li>
          );
        })}
      </ul>
    </>
  );
}
