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
} from "firebase/firestore";

const getHabitsCollectionRef = (userId) =>
  collection(db, `users/${userId}/habits`);

export const getHabits = (userId, currentDate) => {
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

export const getHabitsHistory = (userId) => {
  const habitsCol = getHabitsCollectionRef(userId);

  const q = query(habitsCol);

  return q;
};

export async function createHabit(userId, data) {
  await setDoc(doc(db, `users/${userId}/habits`, data.id), {
    ...data,
  });
}

export function updateHabit(habitId, updates) {
  return updateDoc(doc(db, `users/${userId}/habits`, habitId), updates);
}

export function deleteHabit(habitId) {
  return deleteDoc(doc(db, `users/${userId}/habits`, habitId));
}
