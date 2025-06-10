import React, { useReducer, useState } from "react";
import Alert from "../../Alert";
import FrequencyPicker from "../habit/FrequencyPicker";
import { useFirebaseAuth } from "../../../context/FirebaseAuthContext";
import HabitTypeFields from "./HabitTypeFields";
import { createHabit } from "../../../service/habitService";

const initialHabitState = {
  habitName: "",
  habitType: "binary",
  habitTarget: 0,
  habitUnit: "",
  habitStartRange: 1,
  habitEndRange: 5,
  habitFreq: "daily",
  habitDays: [],
};

function reducer(state, action) {
  switch (action.name) {
    case "reset":
      return { ...action.value };
    default:
      return { ...state, [action.name]: action.value }; 
  }
}

const CreateHabitPage = () => {
  const [state, dispatch] = useReducer(reducer, initialHabitState);
  const { currentUser } = useFirebaseAuth();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const { habitName, habitType, habitFreq, habitDays, ...rest } = state;

    try {
      //todo tutti i controlli del caso

      // Creare il nuovo habit
      const baseHabit = {
        id: Date.now().toString(),
        userId: currentUser.uid,
        name: habitName,
        type: habitType,
        createdAt: new Date(),
        repeat: habitFreq,
        days: habitDays,
        history: {},
      };

      const newHabit =
        habitType !== "binary"
          ? {
              ...baseHabit,
              ...rest,
            }
          : { ...baseHabit };

      createHabit(currentUser.uid, newHabit);

      dispatch({ name: "reset", value: initialHabitState });
      setSuccess("Habit creato con successo!");
    } catch (err) {
      console.error(err);
      setError("Errore durante la creazione dell'habit.");
    }
  };

  const handleDaysToggle = (value) => {
    setHabitDays(value);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Crea un nuovo Habit</h1>
      {error && <Alert message={error} type="error" />}
      {success && <Alert message={success} type="success" />}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={state.habitName}
            onChange={(e) =>
              dispatch({ name: "habitName", value: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Type</label>
          <select
            className="form-select"
            id="habitType"
            value={state.habitType}
            onChange={(e) =>
              dispatch({ name: "habitType", value: e.target.value })
            }
            required
          >
            <option value="binary">Binary Habits (Done/Not done)</option>
            <option value="quantitative">
              Quantitative Habits (e.g., number of glasses of water)
            </option>
            <option value="rating">Rating Habits (e.g., sleep quality)</option>
          </select>
        </div>
        <HabitTypeFields state={state} dispatch={dispatch} />
        <FrequencyPicker state={state} dispatch={dispatch} />
        {/* {habitType === "quantitative" && (
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Target</label>
              <input
                type="number"
                className="form-control"
                value={habitTarget}
                onChange={(e) => setHabitTarget(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Unit of measure</label>
              <input
                type="text"
                className="form-control"
                value={habitUnit}
                onChange={(e) => setHabitUnit(e.target.value)}
                required
              />
            </div>
          </div>
        )}
        {habitType === "rating" && (
          <div className="row mb-3">
            <label className="form-label">Range</label>
            <div className="col-md-6">
              <input
                type="number"
                className="form-control"
                value={habitStartRange}
                onChange={(e) => setHabitStartRange(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                value={habitEndRange}
                onChange={(e) => setHabitEndRange(e.target.value)}
                required
              />
            </div>
          </div>
        )} */}
        {/* <div className="row mb-3">
          <label htmlFor="habitType" className="form-label">
            Repeat
          </label>
          <ButtonGroup className="col-md-4">
            {repeatRadios.map((repeat, i) => (
              <ToggleButton
                key={i}
                id={`repeatRadio-${i}`}
                type="radio"
                variant="outline-primary"
                name="repeatRadio"
                value={repeat.value}
                checked={habitFreq === repeat.value}
                onChange={(e) => setHabitFreq(e.currentTarget.value)}
              >
                {repeat.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </div>
        {habitFreq === "weekly" && (
          <div className="row mb-3">
            <label htmlFor="habitType" className="form-label">
              Days
            </label>
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
        )} */}
        <button type="submit" className="btn btn-primary">
          Salva Habit
        </button>
      </form>
    </div>
  );
};

export default CreateHabitPage;
