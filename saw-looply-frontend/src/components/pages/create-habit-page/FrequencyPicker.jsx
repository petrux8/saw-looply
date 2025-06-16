import { ButtonGroup, ToggleButton, ToggleButtonGroup } from "react-bootstrap";

const FrequencyPicker = ({ state, dispatch }) => {
  const { freq, days } = state;

  const daysRadios = [
    { name: "Mon", value: "Mon" },
    { name: "Tue", value: "Tue" },
    { name: "Wed", value: "Wed" },
    { name: "Thu", value: "Thu" },
    { name: "Fri", value: "Fri" },
    { name: "Sat", value: "Sat" },
    { name: "Sun", value: "Sun" },
  ];

  const handleDaysToggle = (value) => {
    dispatch({ name: "days", value: value });
  };

  return (
    <>
      <div className="row mb-3">
        <label className="form-label">Repeat</label>
        <div className="col-md-4">
          <select
            className="form-select"
            value={freq}
            onChange={(e) =>
              dispatch({ name: "freq", value: e.target.value })
            }
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
      </div>
      {freq === "weekly" && (
        <div className="row mb-3">
          <label className="form-label">Days</label>
          <ToggleButtonGroup
            className="col-md-4"
            type="checkbox"
            value={days}
            onChange={handleDaysToggle}
          >
            {daysRadios.map((daysRadio, i) => (
              <ToggleButton
                key={i}
                id={`daysRadio-${i}`}
                type="radio"
                variant="outline-primary"
                name="daysRadio"
                value={daysRadio.value}
                checked={days.includes(daysRadio.value)}
                onChange={() => handleDaysToggle(daysRadio.value)}
              >
                {daysRadio.name}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>
      )}
    </>
  );
};

export default FrequencyPicker;
