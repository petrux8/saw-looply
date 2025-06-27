import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useHabitById } from "../../hook/useHabitById";
import CalendarCard from "./CalendarCard";
import { useHabitHistory } from "../../hook/useHabitHistory";
import dayjs from "dayjs";
import { useOnlineStatus } from "../../hook/useOnlineStatus";
import OfflineFallback from "../../components/OfflineFallback";

const HabitStatisticsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { habit, error } = useHabitById({ id }) || null;
  const [startDate, setStartDate] = useState(dayjs().startOf("month"));
  const { habitHistory, longestStreak, totalDay } = useHabitHistory({
    habit,
    startDate,
  });
  const { onlineStatus } = useOnlineStatus();

  const completionRate = Math.round(
    (habitHistory.length / (totalDay ? totalDay : 1)) * 100
  );

  if (error) navigate("/habits");

  if (!habit) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">{habit.name} Statistics</h1>
      {onlineStatus ? (
        <div className="row">
          <div className="col-lg-8 col-md-12 mb-4">
            <div className="p-4 bg-white rounded shadow-sm">
              <h5 className="text-secondary mb-3">Habit Calendar</h5>
              <CalendarCard
                selectedDays={habitHistory}
                startDate={startDate}
                setStartDate={setStartDate}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-12 mb-4">
            <div className="p-4 bg-white rounded shadow-sm">
              <h5 className="text-secondary mb-3">Statistics</h5>
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td>
                      <i className="bi bi-graph-up text-primary"></i> Longest
                      Streak
                    </td>
                    <td>{longestStreak} days</td>
                  </tr>
                  <tr>
                    <td>
                      <i className="bi bi-calendar-check text-success"></i> Completed this
                      Month
                    </td>
                    <td>{habitHistory.length} days</td>
                  </tr>
                  <tr>
                    <td>
                      <i className="bi bi-percent text-info"></i> Completion
                      Rate
                    </td>
                    <td>{completionRate}%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 bg-white rounded shadow-sm">
              <h5 className="text-secondary mb-3">Progress</h5>
              <div className="progress" style={{ height: "20px" }}>
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: `${completionRate}%` }}
                  aria-valuenow={completionRate}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {completionRate}%
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <OfflineFallback
          text={"This feature is only available when you are online."}
        />
      )}
    </div>
  );
};

export default HabitStatisticsPage;
