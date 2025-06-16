import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CalendarCard = ({ year, month, habit }) => {
  const getDaysInMonth = (year, month) => {
    const days = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => i + 1);
  };

  const getStartOffset = (year, month) => {
    // Converto il giorno da (0=Sunday) a (0=Monday)
    const firstDay = new Date(year, month, 1).getDay();
    return (firstDay + 6) % 7;
  };

  const daysInMonth = getDaysInMonth(year, month);
  const startOffset = getStartOffset(year, month);
  const totalGridCells = 42;
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const isHighlighted = (day) => {
    return habit.history[day];
  };

  const isDisabled = (day, j) => {
    return habit.freq === "weekly" && day && !habit.days.includes(daysOfWeek[j]);
  };

  const calendarDays = [
    ...Array(startOffset).fill(null), // Giorni vuoti prima del primo giorno del mese
    ...daysInMonth, // Giorni del mese
    ...Array(totalGridCells - daysInMonth.length - startOffset).fill(null), // Giorni vuoti dopo l'ultimo giorno del mese
  ];

  //raggruppo i giorni del mese in
  const calendarWeeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    calendarWeeks.push(calendarDays.slice(i, i + 7));
  }

  return (
    <Card className="shadow-lg p-4">
      <div>
        <div className="container text-center">
          <div className="row">
            {daysOfWeek.map((day, index) => (
              <div className="col" key={index}>
                {day}
              </div>
            ))}
          </div>
          {calendarWeeks.map((week, i) => (
            <div className="row" key={i}>
              {week.map((day, j) => (
                <div
                  key={j}
                  className={`col d-flex justify-content-center align-items-center ${
                    isDisabled(day, j) ? "bg-light" : isHighlighted(day) ? "bg-primary rounded-5 text-white" : ""
                  }`}
                  style={{ width: "40px", height: "40px" }}
                >
                  {day}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default CalendarCard;
