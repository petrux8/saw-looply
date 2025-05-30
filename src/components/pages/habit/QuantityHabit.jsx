import React from "react";

const QuantityHabit = ({ habit, onUpdateProgress }) => {
  return (
    <div className="mb-3">
      <div className="d-flex align-items-center">
        <input
          type="number"
          className="form-control"
          min="0"
          max={habit.target}
          value={habit.value}
          onChange={(e) => onUpdateProgress(habit.id, e.target.value)}
        />
      </div>
    </div>
  );
};

export default QuantityHabit;
