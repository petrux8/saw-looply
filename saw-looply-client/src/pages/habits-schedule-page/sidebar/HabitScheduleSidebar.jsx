import DailyGauge from "./DailyGauge";
import MyDateCalendar from "./MyDateCalendar";

export const HabitScheduleSidebar = ({
  currentDate,
  setCurrentDate,
  percentToday,
}) => (
  <div className="col-12 col-md-4">
    <div
      className="p-3 bg-white rounded shadow-sm mb-3 "
      style={{ overflowX: "auto" }}
    >
      <div className="d-flex justify-content-center">
        <h3>Daily Statistics</h3>
      </div>
      <div className="d-flex justify-content-center">
        <DailyGauge percentage={percentToday} />
      </div>
    </div>
    <div
      className="p-3 bg-white rounded shadow-sm mb-3"
      style={{ overflowX: "auto" }}
    >
      <div className="d-flex justify-content-center">
        <MyDateCalendar
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
      </div>
    </div>
  </div>
);
