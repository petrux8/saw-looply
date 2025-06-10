import React, { useState } from "react";
import { db, auth } from "../../firebase/firebase"; // Importa Firebase config
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import Alert from "../Alert";
import { ButtonGroup, ToggleButton, ToggleButtonGroup } from "react-bootstrap";

const CreateHabitPage = () => {
  const [habitName, setHabitName] = useState("");
  const [habitType, setHabitType] = useState("binary");
  const [habitTarget, setHabitTarget] = useState(0);
  const [habitUnit, setHabitUnit] = useState("");
  const [habitStartRange, setHabitStartRange] = useState(1);
  const [habitEndRange, setHabitEndRange] = useState(5);
  const [habitFreq, setHabitFreq] = useState("daily");
  const [habitDays, setHabitDays] = useState([]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const repeatRadios = [
    { name: "Daily", value: "daily" },
    { name: "Weekly", value: "weekly" },
  ];

  const daysRadios = [
    { name: "Mon", value: "Mon" },
    { name: "Tue", value: "Tue" },
    { name: "Wed", value: "Wed" },
    { name: "Thu", value: "Thu" },
    { name: "Fri", value: "Fri" },
    { name: "Sat", value: "Sat" },
    { name: "Sun", value: "Sun" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!habitName) {
      setError("Il nome dell'habit è obbligatorio.");
      return;
    }

    try {
      const user = auth.currentUser; // Ottieni l'utente autenticato

      //todo tutti i controlli del caso

      // Creare il nuovo habit
      const baseHabit = {
        id: Date.now().toString(),
        userId: user.uid,
        name: habitName,
        type: habitType,
        createdAt: new Date(),
        repeat: habitFreq,
        days: habitDays,
        history: {},
      };

      const newHabit =
        habitType === "rating"
          ? {
              ...baseHabit,
              startRange: habitStartRange,
              endRange: habitEndRange,
              value: habitStartRange,
            }
          : habitType === "quantitative"
          ? { ...baseHabit, target: habitTarget, unit: habitUnit, value: 0 }
          : { ...baseHabit };

      await setDoc(doc(db, "habits", newHabit.id), { ...newHabit });

      setHabitName("");
      setHabitTarget(0);
      setHabitType("binary");
      setHabitUnit("");
      setHabitStartRange("1");
      setHabitEndRange("5");
      setHabitFreq("daily");
      setHabitDays([]);
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
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Type</label>
          <select
            className="form-select"
            id="habitType"
            value={habitType}
            onChange={(e) => setHabitType(e.target.value)}
            required
          >
            <option value="binary">Binary Habits (Done/Not done)</option>
            <option value="quantitative">
              Quantitative Habits (e.g., number of glasses of water)
            </option>
            <option value="rating">Rating Habits (e.g., sleep quality)</option>
          </select>
        </div>
        {habitType === "quantitative" && (
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
        )}
        <div className="row mb-3">
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
        )}
        <button type="submit" className="btn btn-primary">
          Salva Habit
        </button>
      </form>
    </div>
  );
};

export default CreateHabitPage;
