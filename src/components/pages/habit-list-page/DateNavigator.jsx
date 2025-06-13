import { useState } from "react";

const DateNavigator = ({ currentDate, setCurrentDate }) => {

  const handlePreviousDay = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  };

  const handleNextDay = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  };

  return (
    <div className="d-flex justify-content-between align-items-center">
      {/* Date Section */}
      <div className="d-flex align-items-center">
        <div className="me-3">
          <h5 className="mb-0">
            {currentDate.toLocaleDateString("en-GB", {
              weekday: "long",
            })}
          </h5>
          <p className="mb-0">
            {currentDate.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div>
          <button
            className="btn btn-outline-danger me-2"
            onClick={handlePreviousDay}
          >
            &lt;
          </button>
          <button className="btn btn-outline-danger" onClick={handleNextDay}>
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateNavigator;
