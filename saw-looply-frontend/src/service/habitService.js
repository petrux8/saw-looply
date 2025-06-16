// src/features/habits/services/habitService.js
import { db } from "../firebase/firebase";
import {
  collection,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  or,
  setDoc,
  onSnapshot,
} from "firebase/firestore";

const getHabitsCollectionRef = (userId) =>
  collection(db, `users/${userId}/habits`);

const getHabitsDocumentRef = (userId, habitId) =>
  doc(db, `users/${userId}/habits`, habitId);

export const subscribeToHabits = (userId, callback) => {
  const habitsRef = getHabitsCollectionRef(userId);
  const q = query(habitsRef);

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const habits = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(habits);
  });

  return unsubscribe;
};

//Crea
export const createHabit = async (userId, habit) => {
  const habitDocRef = getHabitsDocumentRef(userId, habit.id)
  await setDoc(habitDocRef, { ...habit });
}

//Update
export const updateHabit = async (userId, habitId, updates) => {
  const habitDocRef = getHabitsDocumentRef(userId, habitId)
  return updateDoc(habitDocRef, updates);
}

//Delete
export const deleteHabit = async (userId, habitId) => {
  const habitDocRef = getHabitsDocumentRef(userId, habitId)
  await deleteDoc(habitDocRef);
}

export const getHabitsOfDay = (userId, currentDate) => {
  const weekDay = currentDate.toLocaleDateString("en-GB", {
    weekday: "short",
  });
  const habitsCol = getHabitsCollectionRef(userId);

  const q = query(
    habitsCol,
    or(where("freq", "==", "daily"), where("days", "array-contains", weekDay))
  );

  return q;
};

export const getHabitByName = (userId, habitName) => {
  const habitsCol = getHabitsCollectionRef(userId);

  const q = query(habitsCol, where("name", "==", habitName));

  return q;
};

export const getHabits = (userId) => {
  const habitsCol = getHabitsCollectionRef(userId);

  const q = query(habitsCol);

  return q;
};

export async function getHabit(userId, data) {
  await setDoc(doc(db, `users/${userId}/habits`, data.id), {
    ...data,
  });
}
