import React, { useState } from "react";
import DateNavigator from "./DateNavigator";
import HabitList from "./HabitList";
import MyDateCalendar from "./MyDateCalendar";
import { useNavigate } from "react-router-dom";

const HabitListPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="row gx-3">
        {/* Contenuto principale */}
        <div className="col-12 col-md-8 mb-3 bg-light">
          <h1>Your Habits</h1>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <DateNavigator
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
            />
            <button className="btn btn-outline-danger" onClick={() => navigate("/create")}>+ New habit</button>
          </div>
          <HabitList currentDate={currentDate} />
        </div>

        {/* Calendario */}
        <div className="col-12 col-md-4">
          <div className="p-3 bg-white">
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
