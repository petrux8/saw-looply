import React from "react";
import AddHabitButton from "./AddHabitButton";

const NoHabit = ({ text, hasAddHabit = false, onClick }) => {
  return (
    <div className="text-center py-5">
      <h4 className="text-muted">{text}</h4>
      <p className="text-muted">Why not create a new habit to stay on track?</p>
      {hasAddHabit && <AddHabitButton onClick={onClick} />}
    </div>
  );
}

export default NoHabit;