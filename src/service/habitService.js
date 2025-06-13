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

export async function createHabit(userId, data) {
  await setDoc(doc(db, `users/${userId}/habits`, data.id), {
    ...data,
  });
}

export function updateHabit(habitId, userId, updates) {
  return updateDoc(doc(db, `users/${userId}/habits`, habitId), updates);
}

export async function deleteHabit(habitId, userId) {
  try {
    await deleteDoc(doc(db, `users/${userId}/habits`, habitId));
    console.log("Habit deleted successfully");
  } catch (error) {
    console.error("Error deleting habit:", error);
  }
}
