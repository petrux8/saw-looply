import React from "react";

const QuantityHabit = ({ habit, onUpdateProgress, dateString }) => {
  return (
    <div className="d-flex align-items-center">
      <input
        type="number"
        className="form-control me-2 w-auto"
        min="0"
        value={habit.history[dateString] ? habit.history[dateString] : 0}
        onChange={(e) => onUpdateProgress(e.target.value)}
        style={{ width: "80px" }}
      />
      <span className="text-muted text-center">
        {habit.unit ? habit.unit : "unità"}
      </span>
    </div>
  );
};

export default QuantityHabit;
