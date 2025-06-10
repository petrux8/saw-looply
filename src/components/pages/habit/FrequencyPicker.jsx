import { ButtonGroup, ToggleButton, ToggleButtonGroup } from "react-bootstrap";

const FrequencyPicker = ({ state, dispatch }) => {
  const { habitFreq, habitDays } = state;

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
    console.log(value);
    dispatch({ name: "habitDays", value: value });
  };

  return (
    <>
      <div className="row mb-3">
        <label className="form-label">Repeat</label>
        <div className="col-md-4">
          <select
            className="form-select"
            value={habitFreq}
            onChange={(e) =>
              dispatch({ name: "habitFreq", value: e.target.value })
            }
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
      </div>
      {habitFreq === "weekly" && (
        <div className="row mb-3">
          <label className="form-label">Days</label>
          <ToggleButtonGroup
            className="col-md-4"
            type="checkbox"
            value={habitDays}
            onChange={handleDaysToggle}
          >
            {daysRadios.map((days, i) => (
              <ToggleButton
                key={i}
                id={`daysRadio-${i}`}
                type="radio"
                variant="outline-primary"
                name="daysRadio"
                value={days.value}
                checked={habitDays.includes(days.value)}
                onChange={() => handleDaysToggle(days.value)}
              >
                {days.name}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>
      )}
    </>
  );
};

export default FrequencyPicker;
