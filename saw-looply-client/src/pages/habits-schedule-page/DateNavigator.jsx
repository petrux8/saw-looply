import dayjs from "dayjs";

const DateNavigator = ({ currentDate, setCurrentDate }) => {
  const handlePreviousDay = () => {
    setCurrentDate((prevDate) => dayjs(prevDate).subtract(1, "day").toDate());
  };

  const handleNextDay = () => {
    setCurrentDate((prevDate) => dayjs(prevDate).add(1, "day").toDate());
  };

  return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <div className="me-3">
          <h5 className="mb-0">{dayjs(currentDate).format("dddd")}</h5>
          <p className="mb-0">{dayjs(currentDate).format("D MMMM YYYY")}</p>
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
