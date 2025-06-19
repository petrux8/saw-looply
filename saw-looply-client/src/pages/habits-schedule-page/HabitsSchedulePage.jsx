import React, { useEffect, useState, useMemo } from "react";
import DateNavigator from "./DateNavigator";
import HabitList from "./HabitList";
import HabitModal from "../../components/HabitModal";
import Alert from "../../components/Alert";
import { useHabitsOfDay } from "../../hook/useHabitsOfDay";
import { useHabitModals } from "../../hook/useHabitModals";
import { useHabits } from "../../context/HabitContext";
import RemoveModal from "../../components/RemoveModal";
import dayjs from "dayjs";
import { HabitScheduleSidebar } from "./sidebar/HabitScheduleSidebar";
import Loading from "../../components/Loading";
import NoHabit from "../../components/NoHabit";
import AddHabitButton from "../../components/AddHabitButton";

const HabitsSchedulePage = () => {
  const {
    editHabit,
    removeHabit,
    addHabit,
    isHabitNameUnique,
    toggleCompletion,
  } = useHabits();

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

  const [currentDate, setCurrentDate] = useState(dayjs());
  const [completedHabits, setCompletedHabits] = useState(0);
  const [alert, setAlert] = useState({ message: "", type: "", fixed: false });

  const isFuture = useMemo(() => {
    return (
      dayjs(currentDate).format("YYYY-MM-DD") > dayjs().format("YYYY-MM-DD")
    );
  }, [currentDate]);

  //prendo gli habit del giorno e la relativa history
  const { habitsOfDay, loading, historyOfDay } = useHabitsOfDay({
    currentDate,
    isFuture,
  });

  useEffect(() => {
    if (!habitsOfDay) return;
    const completed = historyOfDay ? Object.keys(historyOfDay).length : 0;
    setCompletedHabits(completed);
  }, [historyOfDay]);

  const percentToday = useMemo(() => {
    const totalHabits = habitsOfDay.length || 1;
    return (completedHabits / totalHabits) * 100;
  }, [completedHabits, habitsOfDay]);

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

  const handleToggleHabit = (habitId) => {
    toggleCompletion(habitId, dayjs(currentDate).format("YYYY-MM-DD"));
  };

  return (
      <div className="container mt-5">
        <div className="row gx-3">
          <div className="col-12 col-md-8 mb-3 bg-light">
            <h1>Your Habits</h1>
            <div className="d-flex justify-content-between align-items-center">
              <DateNavigator
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
              />
              <AddHabitButton onClick={() => openHabitModal()} />
            </div>
            <div className="p-3">
              {loading ? (
                <Loading />
              ) : habitsOfDay.length === 0 ? (
                <NoHabit
                  text={"No habits scheduled for today!"}
                  hasAddHabit={false}
                />
              ) : (
                <HabitList
                  onEditHabit={openHabitModal}
                  onRemoveHabit={openRemoveModal}
                  habitsOfDay={habitsOfDay}
                  historyOfDay={historyOfDay}
                  onToggleHabit={handleToggleHabit}
                  isFuture={isFuture}
                />
              )}
            </div>
          </div>
          <HabitScheduleSidebar
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            percentToday={percentToday}
          />
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
};

export default HabitsSchedulePage;
