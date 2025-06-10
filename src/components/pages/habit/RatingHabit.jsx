import React from "react";

const RatingHabit = ({ habit, onUpdateRating, currentDate }) => {
  const date = currentDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  return (
    <div className="mb-3">
      <div className="d-flex align-items-center">
        <input
          type="range"
          className="form-range me-3"
          min={habit.startRange}
          max={habit.endRange}
          value={habit.history[date]? habit.history[date] : 0}
          onChange={(e) => onUpdateRating(e.target.value)}
        />
        <input
          type="number"
          className="form-control"
          min={habit.startRange}
          max={habit.endRange}
          value={habit.history[date]? habit.history[date] : 0}
          onChange={(e) => onUpdateRating(e.target.value)}
        />
      </div>
    </div>
  );
};

export default RatingHabit;
