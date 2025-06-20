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
  getDocs,
  getDoc,
  deleteField,
  writeBatch,
} from "firebase/firestore";

const getHabitsCollectionRef = (userId) =>
  collection(db, `users/${userId}/habits`);

const getHistoryCollectionRef = (userId) =>
  collection(db, `users/${userId}/history`);

const getHabitsDocumentRef = (userId, habitId) =>
  doc(db, `users/${userId}/habits`, habitId);

const getHistoryDocumentRef = (userId, dayId) =>
  doc(db, `users/${userId}/history`, dayId);

export const setHabitCompletion = async (userId, habitId, dayId) => {
  const dayRef = getHistoryDocumentRef(userId, dayId);

  const daySnap = await getDoc(dayRef);

  if (!daySnap.exists()) {
    // Documento non esiste ancora
    await setDoc(dayRef, {
      [habitId]: true,
    });
    return { completed: true };
  }

  const data = daySnap.data();

  if (data[habitId]) {
    // Habit già completato -> togli completamento
    await updateDoc(dayRef, {
      [habitId]: deleteField(),
    });
    return { completed: false };
  } else {
    // Habit non completato -> aggiungi completamento
    await updateDoc(dayRef, {
      [habitId]: true,
    });
    return { completed: true };
  }
};

export const subscribeToHistoryDay = (userId, dayId, callback) => {
  const dayRef = getHistoryDocumentRef(userId, dayId);

  const unsubscribe = onSnapshot(dayRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data());
    } else {
      callback(null);
    }
  });

  return unsubscribe;
};

export const getHistoryRange = async (userId, startDate, endDate) => {
  const dayRef = getHistoryCollectionRef(userId);
  const q = query(
    dayRef,
    where("__name__", ">=", startDate.toISOString().split("T")[0]),
    where("__name__", "<=", endDate.toISOString().split("T")[0])
  );

  const querySnapshot = await getDocs(q);
  const results = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    habits: doc.data(),
  }));
  return results;
};

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
  const habitDocRef = getHabitsDocumentRef(userId, habit.id);
  await setDoc(habitDocRef, { ...habit });
};

//Update
export const updateHabit = async (userId, habitId, updates) => {
  const habitDocRef = getHabitsDocumentRef(userId, habitId);
  return updateDoc(habitDocRef, updates);
};

//Delete
export const deleteHabit = async (userId, habitId) => {
  const habitDocRef = getHabitsDocumentRef(userId, habitId);
  await deleteDoc(habitDocRef);

  const dayRef = getHistoryCollectionRef(userId);
  const daySnap = await getDocs(dayRef);

  const batch = writeBatch(db); // Creazione di un batch

  daySnap.forEach((docSnap) => {
    const data = docSnap.data();
    if (data[habitId]) {
      const dayDocRef = getHistoryDocumentRef(userId, docSnap.id);
      batch.update(dayDocRef, {
        [habitId]: deleteField(),
      });
    }
  });

  await batch.commit(); // Esegue tutte le operazioni in batch
};

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

const getHabitByName = (userId, habitName) => {
  const habitsCol = getHabitsCollectionRef(userId);

  const q = query(habitsCol, where("name", "==", habitName));

  return q;
};

export async function checkHabitName(userId, habitName) {
  const snapshot = await getDocs(getHabitByName(userId, habitName));
  return snapshot.empty ? -1 : snapshot.docs[0].id;
}
