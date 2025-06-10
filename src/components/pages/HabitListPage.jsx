import React, { useEffect, useState } from "react";
import DateNavigator from "./Datenavigator";
import HabitList from "./HabitList";

const HabitListPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // if (loading) {
  //   return (
  //     <div className="d-flex justify-content-center align-items-center vh-100">
  //       <div className="spinner-border text-primary" role="status">
  //         <span className="visually-hidden">Caricamento...</span>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="container mt-5">
      <h1>I tuoi Habits</h1>
      <DateNavigator currentDate={currentDate} setCurrentDate={setCurrentDate}/>
      <HabitList currentDate={currentDate}/>
    </div>
  );
};

export default HabitListPage;
