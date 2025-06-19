import React from "react";

export default function AddHabitButton({onClick}) {
  return (
    <button className="btn btn-primary" onClick={onClick}>
      + New Habit
    </button>
  );
}
