import React from "react";

const QuantityHabit = ({ habit, onUpdateProgress, dateString }) => {
  return (
    <div className="mb-3">
      <div className="d-flex align-items-center">
        <input
          type="number"
          className="form-control"
          min="0"
          value={habit.history[dateString] ? habit.history[dateString] : 0}
          onChange={(e) => onUpdateProgress(e.target.value)}
        />
      </div>
    </div>
  );
};

export default QuantityHabit;
