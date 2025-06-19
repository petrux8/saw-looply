import React from "react";
import { LineChart } from "@mui/x-charts";

export default function Stats({ habit }) {
  console.log(habit.history);

  return (
    <LineChart
      dataset={habit.history}
      xAxis={[{ dataKey: "day" }]}
      series={[
        {
          dataKey: "value",
        },
      ]}
      height={300}
    />
  );
}

// import { Card } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

// const CalendarCard = ({ year, month, habit }) => {
//   const getDaysInMonth = (year, month) => {
//     const days = new Date(year, month + 1, 0).getDate();
//     return Array.from({ length: days }, (_, i) => i + 1);
//   };

//   const getStartOffset = (year, month) => {
//     const firstDay = new Date(year, month, 1).getDay();
//     return (firstDay + 6) % 7; // Converto il giorno da (0=Sunday) a (0=Monday)
//   };

//   const daysInMonth = getDaysInMonth(year, month);
//   const startOffset = getStartOffset(year, month);
//   const totalGridCells = 42;
//   const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

//   const isHighlighted = (day) => habit.history[day];
//   const isDisabled = (day, j) =>
//     habit.freq === "weekly" && day && !habit.days.includes(daysOfWeek[j]);

//   const calendarDays = [
//     ...Array(startOffset).fill(null), // Giorni vuoti prima del primo giorno del mese
//     ...daysInMonth, // Giorni del mese
//     ...Array(totalGridCells - daysInMonth.length - startOffset).fill(null), // Giorni vuoti dopo l'ultimo giorno del mese
//   ];

//   const calendarWeeks = [];
//   for (let i = 0; i < calendarDays.length; i += 7) {
//     calendarWeeks.push(calendarDays.slice(i, i + 7));
//   }

//   return (
//     <Card className="shadow-lg p-4">
//       <div>
//         <div className="container text-center">
//           <div className="row">
//             {daysOfWeek.map((day, index) => (
//               <div className="col" key={index}>
//                 {day}
//               </div>
//             ))}
//           </div>
//           {calendarWeeks.map((week, i) => (
//             <div className="row" key={i}>
//               {week.map((day, j) => (
//                 <div
//                   key={j}
//                   className={`col d-flex justify-content-center align-items-center`}
//                   style={{ width: "36px", height: "36px", margin: "2px" }}
//                 >
//                   <div
//                     className={`d-flex justify-content-center align-items-center rounded-circle ${
//                       isHighlighted(day)
//                         ? "bg-primary text-white "
//                         : isDisabled(day, j)
//                         ? "bg-light text-muted"
//                         : day ? "border border-secondary text-dark"
//                         : ""
//                     }`}
//                     style={{ width: "35px", height: "35px" }}
//                   >
//                     {day}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//     </Card>
//   );
// };

// export default CalendarCard;
