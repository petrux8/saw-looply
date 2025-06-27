import React, { useState } from "react";
import MyDatePicker from "./MyDatePicker";
import { ToggleButton, ButtonGroup } from "react-bootstrap";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useHistory } from "../../hook/useHistory";
import LineGraph from "./LineGraph";
import { useOnlineStatus } from "../../hook/useOnlineStatus";
import OfflineFallback from "../../components/OfflineFallback";

dayjs.locale("en");
dayjs.extend(localizedFormat);

const OverallStatsPage = () => {
  const [period, setPeriod] = useState("month");
  const [startDate, setStartDate] = useState(dayjs().startOf("month"));
  const { history, loading, minHabit, maxHabit } = useHistory({
    startDate,
    period,
  });
  const { onlineStatus } = useOnlineStatus();

  const periodRadios = [
    { name: "Month", value: "month" },
    { name: "Year", value: "year" },
  ];

  return (
    <div className="container mt-5">
      <h1>Statistics</h1>
      {onlineStatus ? <div>
        <div className="container my-4">
          <div className="row align-items-center">
            <div className="col-md-8 d-flex">
              <MyDatePicker
                type={period}
                currentDate={startDate}
                setCurrentDate={setStartDate}
              />
            </div>
            <div className="col-md-4 d-flex">
              <ButtonGroup className="d-flex w-100">
                {periodRadios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant="outline-primary"
                    name="radio"
                    value={radio.value}
                    checked={period === radio.value}
                    onClick={() => {
                      setPeriod(radio.value);
                      setStartDate(dayjs().startOf(radio.value));
                    }}
                    className="flex-fill"
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </div>
          </div>
        </div>
        {loading && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "200px" }}
          >
            <p>Loading...</p>
          </div>
        )}
        {!loading && (
          <div className="container my-4">
            <div className="row">
              <div className="col-lg-8 col-12 mb-4 mb-lg-0">
                <LineGraph
                  type={period}
                  data={[{ name: "Completion Count", data: history }]}
                />
              </div>
              <div className="col-lg-4 col-12">
                <div className="row">
                  {maxHabit && minHabit && (
                    <>
                      <div className="col-6 col-md-12 mb-4">
                        <div className="card shadow p-3">
                          <h5>Most completed Habit</h5>
                          <p>{maxHabit}</p>
                        </div>
                      </div>
                      <div className="col-6 col-md-12">
                        <div className="card shadow p-3">
                          <h5>Least Completed Habit</h5>
                          <p>{minHabit}</p>
                        </div>
                      </div>
                    </>)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div> : <OfflineFallback
        text={"This feature is only available when you are online."}
      />}
    </div>
  );
};

export default OverallStatsPage;
