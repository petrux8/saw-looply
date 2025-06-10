// src/features/habits/services/habitService.js
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  where,
  and,
  or,
  setDoc,
} from "firebase/firestore";

const col = collection(db, "habits");

export const getHabitsQuery = (userId, currentDate) => {
  const weekDay = currentDate.toLocaleDateString("en-GB", {
    weekday: "short",
  });

  const q = query(
    collection(db, "habits"),
    and(
      where("userId", "==", userId),
      or(
        where("repeat", "==", "daily"),
        where("days", "array-contains", weekDay),
      )
    )
  );

  return q;
};

export async function createHabit(userId, data) {
  await setDoc(doc(db, "habits", data.id), {
    ...data,
  });
}

export function updateHabit(habitId, updates) {
  return updateDoc(doc(db, "habits", habitId), updates);
}

export function deleteHabit(habitId) {
  return deleteDoc(doc(db, "habits", habitId));
}
