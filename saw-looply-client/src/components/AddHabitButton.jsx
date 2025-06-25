import React from "react";

const AddHabitButton = ({ onClick }) => {
  return (
    <button className="btn btn-primary" onClick={onClick}>
      + New Habit
    </button>
  );
};

export default AddHabitButton;
