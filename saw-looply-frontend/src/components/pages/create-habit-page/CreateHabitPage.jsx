import React, { useReducer, useState } from "react";
import Alert from "../../Alert";
import FrequencyPicker from "./FrequencyPicker";
import { useFirebaseAuth } from "../../../context/FirebaseAuthContext";
import HabitTypeFields from "./HabitTypeFields";
import { createHabit, getHabitByName } from "../../../service/habitService";
import { getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useHabits } from "../../../context/HabitContext";

const initialHabitState = {
  name: "",
  type: "binary",
  target: 0,
  unit: "",
  startRange: 1,
  endRange: 5,
  freq: "daily",
  days: ["Mon"],
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
  const { habitId } = useParams();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Logica vecchia per update
  // useEffect(() => {
  //   if (!habitId) return;

  //   setLoading(true);
  //   getHabitById(habitId)
  //     .then((habitData) => {
  //       dispatch({ name: "reset", value: habitData });
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setError("Failed to load habit");
  //       setLoading(false);
  //     });
  // }, [habitId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const { name, type, target, unit, startRange, endRange, freq, days } =
      state;

    try {
      //habitName deve essere unico

      if (!name) {
        setError("Habit name is required!");
        return;
      }

      const snapshot = await getDocs(getHabitByName(currentUser.uid, name));
      if (!snapshot.empty) {
        setError("Habit name must be unique.");
        return;
      }

      if (freq === "weekly" && (!days || days.length === 0)) {
        setError("At least one day must be selected for a weekly habit.");
        return;
      }

      if (
        type === "rating" &&
        (startRange == null || endRange == null || startRange >= endRange)
      ) {
        setError("Invalid start and end range for a rating habit.");
        return;
      }

      if (type === "quantitative" && (!target || !unit)) {
        setError("Target and unit are required for a quantitative habit.");
        return;
      }

      // Creare il nuovo habit
      const newHabit = {
        id: Date.now().toString(),
        name: name,
        type: type,
        createdAt: new Date(),
        freq: freq,
        history: {},
        ...(freq === "weekly" ? { days: days } : {}),
        ...(freq === "rating"
          ? { startRange: startRange, endRange: endRange }
          : {}),
        ...(type === "quantitative" ? { unit: unit, target: target } : {}),
      };

      createHabit(currentUser.uid, newHabit);

      dispatch({ name: "reset", value: initialHabitState });
      setSuccess("Habit successfully created!");
    } catch (err) {
      console.error(err);
      setError("Error: " + err);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Create new Habit</h1>
      <Alert message={error} type="error" onClose={() => setError("")} />
      <Alert message={success} type="success" onClose={() => setSuccess("")} />
      {/* {error && (
        <div
          className="alert alert-warning alert-dismissible fade show position-fixed"
          style={{
            top: "20px",
            right: "20px",
            zIndex: 1050,
            maxWidth: "300px",
          }}
          role="alert"
        >
          <strong>Attenzione!</strong> Questo è un avviso.
        </div>
      )} */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={state.name}
            onChange={(e) => dispatch({ name: "name", value: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Type</label>
          <select
            className="form-select"
            id="habitType"
            value={state.type}
            onChange={(e) => dispatch({ name: "type", value: e.target.value })}
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
        <button type="submit" className="btn btn-primary">
          Save Habit
        </button>
      </form>
    </div>
  );
};

export default CreateHabitPage;
