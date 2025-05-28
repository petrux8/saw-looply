import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const HabitList = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    console.log("OK");

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

  if (loading) {
    return <div>Caricamento in corso...</div>;
  }

  return (
    <div className="container mt-5">
      <h1>I tuoi Habits</h1>
      {habits.length === 0 && <p>Non hai ancora creato nessun habit.</p>}
      <ul className="list-group">
        {habits.map((habit) => (
          <li key={habit.id} className="list-group-item">
            <h5>{habit.name}</h5>
            <p>{habit.description}</p>
            <small>
              Stato: {habit.isCompleted ? "Completato" : "Non completato"}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HabitList;
