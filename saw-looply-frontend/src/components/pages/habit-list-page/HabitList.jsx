import React, { useState, useEffect, useMemo } from "react";
import BinaryHabit from "./habit/BinaryHabit";
import QuantityHabit from "./habit/QuantityHabit";
import { useHabitsOfDay } from "../../../hook/useHabitsOfDay";
import { MdEdit, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useHabits } from "../../../context/HabitContext";

export default function HabitList({ currentDate }) {
  const { habitsOfDay, loading } = useHabitsOfDay({ currentDate });
  const { removeHabit, editHabit } = useHabits();

  const navigate = useNavigate();

  const dateString = useMemo(
    () => currentDate.toISOString().split("T")[0],
    [currentDate]
  );

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {habitsOfDay.length === 0 && <p>Non hai ancora creato nessun habit.</p>}
      <ul className="list-group">
        {habitsOfDay.map((habit) => {
          let habitComponent = null;
          switch (habit.type) {
            case "binary":
              habitComponent = (
                <BinaryHabit
                  key={habit.id}
                  habit={habit}
                  onToggleCompletion={() =>
                    editHabit(habit.id, {
                      history: {
                        ...habit.history,
                        [dateString]: !habit.history[dateString],
                      },
                    })
                  }
                  dateString={dateString}
                />
              );
              break;
            case "quantitative":
              habitComponent = (
                <QuantityHabit
                  key={habit.id}
                  habit={habit}
                  onUpdateProgress={(value) =>
                    editHabit(habit.id, {
                      history: {
                        ...habit.history,
                        [dateString]: value,
                      },
                    })
                  }
                  dateString={dateString}
                />
              );
              break;
            default:
              return null;
          }

          return (
            <li
              key={habit.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div className="d-flex align-items-center gap-1">
                <div className="row">
                  <MdEdit
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/update/${habit.id}`)}
                  />
                  <MdDelete
                    style={{ cursor: "pointer" }}
                    onClick={() => removeHabit(habit.id)}
                  />
                </div>

                <h5 className="mb-0">{habit.name}</h5>
              </div>
              <div>{habitComponent}</div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
