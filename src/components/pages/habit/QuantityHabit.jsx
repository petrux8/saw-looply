import React from "react";

const QuantityHabit = ({ habit, onUpdateProgress, currentDate }) => {
  const date = currentDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  return (
    <div className="mb-3">
      <div className="d-flex align-items-center">
        <input
          type="number"
          className="form-control"
          min="0"
          max={habit.target}
          value={habit.history[date] ? habit.history[date] : 0}
          onChange={(e) => onUpdateProgress(e.target.value)}
        />
      </div>
    </div>
  );
};

export default QuantityHabit;
