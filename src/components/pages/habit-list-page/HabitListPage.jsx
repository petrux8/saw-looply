import React, { useState } from "react";
import DateNavigator from "./DateNavigator";
import HabitList from "./HabitList";
import MyDateCalendar from "./MyDateCalendar";

const HabitListPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className="container mt-5">
      <div className="row gx-3">
        {/* Contenuto principale */}
        <div className="col-12 col-md-8 mb-3 bg-light">
          <h1>Your Habits</h1>
          <DateNavigator
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
          />
          <HabitList currentDate={currentDate} />
        </div>

        {/* Calendario */}
        <div className="col-12 col-md-4">
          <div
            className="p-3 bg-white"
          >
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
