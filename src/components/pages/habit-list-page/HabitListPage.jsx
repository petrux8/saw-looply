import React, { useEffect, useState } from "react";
import DateNavigator from "./DateNavigator";
import HabitList from "./HabitList";
import MyDateCalendar from "./MyDateCalendar";

const HabitListPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 col-md-8 mb-3 bg-light">
          <h1>Your Habits</h1>
          <DateNavigator
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
          />
          <HabitList currentDate={currentDate} />
        </div>
        <div className="col-12 col-md-4 bg-white position-sticky" style={{ height: "80vh" }}>
          <div className="p-3 position-sticky" style={{ top: "0" }}>
            <MyDateCalendar
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitListPage;
