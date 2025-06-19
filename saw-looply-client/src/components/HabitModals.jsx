import React from "react";
import { useHabitModals } from "../hook/useHabitModals";
import HabitModal from "./HabitModal";
import RemoveModal from "./RemoveModal";
import { useHabits } from "../context/HabitContext";

export default function HabitModals() {
  const {
    editHabit,
    removeHabit,
    addHabit,
    isHabitNameUnique,
  } = useHabits();

  const {
    showHabitModal,
    showRemoveModal,
    editingHabit,
    removingHabit,
    closeHabitModal,
    closeRemoveModal,
  } = useHabitModals();

  const handleSaveHabit = async (habitData) => {
    const { name, freq, days, type, notifications } = habitData;
    if (!name) {
      setAlert({
        message: "Habit name is required!",
        type: "warning",
        fixed: true,
      });
      return;
    }

    const dupeHabitId = await isHabitNameUnique(name);

    if (
      dupeHabitId != -1 &&
      (!editingHabit || dupeHabitId != editingHabit.id)
    ) {
      setAlert({
        message: "Habit name must be unique.",
        type: "warning",
        fixed: true,
      });
      return;
    }

    if (freq === "weekly" && (!days || days.length === 0)) {
      setAlert({
        message: "At least one day must be selected for a weekly habit.",
        type: "warning",
        fixed: true,
      });
      return;
    }

    try {
      if (editingHabit) {
        editHabit(editingHabit.id, habitData);
        setAlert({
          message: "Habit updated successfully!",
          type: "success",
          fixed: true,
        });
      } else {
        const newHabit = {
          id: Date.now().toString(),
          name: name,
          freq: freq,
          ...(freq === "weekly" ? { days: days } : { days: [] }),
          notifications: notifications,
          history: {},
        };

        addHabit(newHabit);
        setAlert({
          message: "Habit created successfully!",
          type: "success",
          fixed: true,
        });
      }
    } catch (err) {
      setAlert({
        message: "Failed to save habit.",
        type: "error",
        fixed: true,
      });
    }
  };

  return (
    <>
      <HabitModal
        show={showHabitModal}
        habit={editingHabit}
        onClose={closeHabitModal}
        onSave={handleSaveHabit}
      />
      <RemoveModal
        show={showRemoveModal}
        onClose={closeRemoveModal}
        onDelete={() => {
          removeHabit(removingHabit);
          closeRemoveModal();
        }}
      />
    </>
  );
}
