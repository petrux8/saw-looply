import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import BinaryHabit from "./habit/BinaryHabit";
import RatingHabit from "./habit/RatingHabit";
import QuantityHabit from "./habit/QuantityHabit";

const HabitList = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(db, "habits"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const habitList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHabits(habitList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const onToggleCompletion = (habitId) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === habitId ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  const onUpdateProgress = (habitId, value) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === habitId ? { ...habit, value: parseInt(value, 10) } : habit
      )
    );
  };

  const onUpdateRating = (habitId, value) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === habitId ? { ...habit, value: parseInt(value, 10) } : habit
      )
    );
  };

  // if (loading) {
  //   return (
  //     <div className="d-flex justify-content-center align-items-center vh-100">
  //       <div className="spinner-border text-primary" role="status">
  //         <span className="visually-hidden">Caricamento...</span>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="container mt-5">
      <h1>I tuoi Habits</h1>
      {habits.length === 0 && <p>Non hai ancora creato nessun habit.</p>}
      <ul className="list-group">
        {habits.map((habit) => {
          let habitComponent = null;
          switch (habit.type) {
            case "binary":
              habitComponent = (
                <BinaryHabit
                  key={habit.id}
                  habit={habit}
                  onToggleCompletion={onToggleCompletion}
                />
              );
              break;
            case "rating":
              habitComponent = (
                <RatingHabit
                  key={habit.id}
                  habit={habit}
                  onUpdateRating={onUpdateRating}
                />
              );
              break;
            case "quantitative":
              habitComponent = (
                <QuantityHabit
                  key={habit.id}
                  habit={habit}
                  onUpdateProgress={onUpdateProgress}
                />
              );
              break;
            default:
              return null; // Gestione di tipi sconosciuti
          }

          return (
            <li
              key={habit.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <h5>{habit.name}</h5>
              {habitComponent}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HabitList;
