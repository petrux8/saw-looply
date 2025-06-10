import React from "react";

const QuantityHabit = ({ habit, onUpdateProgress, currentDate }) => {
  return (
    <div className="mb-3">
      <div className="d-flex align-items-center">
        <input
          type="number"
          className="form-control"
          min="0"
          max={habit.target}
          value={habit.history[currentDate] ? habit.history[currentDate] : 0}
          onChange={(e) => onUpdateProgress(e.target.value)}
        />
      </div>
    </div>
  );
};

export default QuantityHabit;
