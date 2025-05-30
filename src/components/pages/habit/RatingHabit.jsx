import React from "react";

const RatingHabit = ({ habit, onUpdateRating }) => {
  return (
    <div className="mb-3">
      <div className="d-flex align-items-center">
        <input
          type="range"
          className="form-range me-3"
          min={habit.startRange}
          max={habit.endRange}
          value={habit.value}
          onChange={(e) => onUpdateRating(habit.id, e.target.value)}
        />
        <input
          type="number"
          className="form-control"
          min={habit.startRange}
          max={habit.endRange}
          value={habit.value}
          onChange={(e) => onUpdateRating(habit.id, e.target.value)}
        />
      </div>
    </div>
  );
};

export default RatingHabit;
