import React, { useEffect, useReducer } from "react";
import { Form, ToggleButton, ToggleButtonGroup } from "react-bootstrap";

const initialHabitState = {
  name: "",
  type: "binary",
  freq: "daily",
  days: ["Mon"],
  notifications: false,
};

const daysRadios = [
  { name: "Mon", value: "Mon" },
  { name: "Tue", value: "Tue" },
  { name: "Wed", value: "Wed" },
  { name: "Thu", value: "Thu" },
  { name: "Fri", value: "Fri" },
  { name: "Sat", value: "Sat" },
  { name: "Sun", value: "Sun" },
];

function reducer(state, action) {
  switch (action.name) {
    case "reset":
      return { ...action.value };
    default:
      return { ...state, [action.name]: action.value };
  }
}

const HabitModal = ({ show, onClose, habit, onSave }) => {
  const [state, dispatch] = useReducer(reducer, initialHabitState);

  useEffect(() => {
    if (show) {
      document.getElementById("habitName").focus();
    }
  }, [show]);

  useEffect(() => {
    if (habit != null) {
      dispatch({ name: "reset", value: habit });
    } else {
      dispatch({ name: "reset", value: initialHabitState });
    }
  }, [habit]);

  const handleDaysToggle = (value) => {
    dispatch({ name: "days", value: value });
  };

  const handleSave = () => {
    onSave(state);
    dispatch({ name: "reset", value: initialHabitState });
    onClose();
  };

  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {habit ? "Edit Habit" : "New Habit"}
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="habitName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="habitName"
                name="name"
                value={state.name}
                onChange={(e) =>
                  dispatch({ name: "name", value: e.target.value })
                }
                placeholder="Enter habit name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="freq" className="form-label">
                Frequency
              </label>
              <select
                className="form-select"
                value={state.freq}
                id="freq"
                onChange={(e) =>
                  dispatch({ name: "freq", value: e.target.value })
                }
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
            {state.freq === "weekly" && (
              <div className="row mb-3">
                <label htmlFor="days" className="form-label">
                  Days
                </label>
                <ToggleButtonGroup
                  className="col-md-4"
                  type="checkbox"
                  value={state.days}
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
                      checked={state.days.includes(daysRadio.value)}
                      onChange={() => handleDaysToggle(daysRadio.value)}
                    >
                      {daysRadio.name}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </div>
            )}
            <div className="mb-3">
              <label className="form-label d-flex align-items-center">
                <span className="me-3">Enable Notifications</span>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  checked={state.notifications}
                  onChange={(e) =>
                    dispatch({
                      name: "notifications",
                      value: e.target.checked,
                    })
                  }
                />
              </label>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitModal;
