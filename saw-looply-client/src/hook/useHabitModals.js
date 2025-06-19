import { useState } from "react";

export const useHabitModals = () => {
  const [showHabitModal, setShowHabitModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [removingHabit, setRemovingHabit] = useState(null);

  const openHabitModal = (habit = null) => {
    setEditingHabit(habit);
    setShowHabitModal(true);
  };

  const closeHabitModal = () => {
    setEditingHabit(null);
    setShowHabitModal(false);
  };

  const openRemoveModal = (habitId) => {
    setRemovingHabit(habitId);
    setShowRemoveModal(true);
  };

  const closeRemoveModal = () => {
    setRemovingHabit(null);
    setShowRemoveModal(false);
  };

  return {
    showHabitModal,
    showRemoveModal,
    editingHabit,
    removingHabit,
    openHabitModal,
    closeHabitModal,
    openRemoveModal,
    closeRemoveModal,
  };
};
