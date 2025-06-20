import React, { useEffect, useState } from "react";
import { useHabits } from "../../context/HabitContext";
import HabitSearchBar from "./HabitSearchBar";
import HabitCard from "./HabitCard";
import { useHabitModals } from "../../hook/useHabitModals";
import HabitModal from "../../components/HabitModal";
import RemoveModal from "../../components/RemoveModal";
import Alert from "../../components/Alert";
import NoHabit from "../../components/NoHabit";

export default function HabitsLibraryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { habits } = useHabits();
  const [filteredHabits, setFilteredHabits] = useState([]);
  const [alert, setAlert] = useState({ message: "", type: "", fixed: false });

  const { editHabit, removeHabit, addHabit, isHabitNameUnique } = useHabits();

  const {
    showHabitModal,
    showRemoveModal,
    editingHabit,
    removingHabit,
    openHabitModal,
    closeHabitModal,
    openRemoveModal,
    closeRemoveModal,
  } = useHabitModals();

  useEffect(() => {
    if (!habits) return;

    if (!searchTerm || searchTerm === "") {
      setFilteredHabits(habits);
    } else {
      const filtered = habits.filter((habit) =>
        habit.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredHabits(filtered);
    }
  }, [habits, searchTerm]);

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
    <div className="container mt-5">
      <h1 className="mb-4">Habits Library</h1>
      <div className="p-3">
        <HabitSearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onSubmit={(e) => e.preventDefault()}
        />
      </div>

      <div className="row mt-4">
        {filteredHabits.length == 0 ? (
          <NoHabit
            text={"No habit found!"}
            hasAddHabit={true}
            onClick={() => openHabitModal()}
          />
        ) : (
          filteredHabits.map((habit, i) => (
            <HabitCard
              key={i}
              onEditHabit={openHabitModal}
              onRemoveHabit={openRemoveModal}
              habit={habit}
            />
          ))
        )}
      </div>

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

      <Alert
        message={alert.message}
        type={alert.type}
        fixed={alert.fixed}
        duration={3000}
        onClose={() => setAlert({ message: "", type: "", fixed: false })}
      />
    </div>
  );
}
