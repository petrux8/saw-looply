const BinaryHabit = ({ habit, onToggleCompletion, currentDate }) => {
  
  const date = currentDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  return (
    <div className="d-flex align-items-center mb-3">
      <input
        type="checkbox"
        className="form-check-input me-3"
        checked={habit.history[date] ? habit.history[date] : false}
        onChange={() => onToggleCompletion(habit.id)}
      />
    </div>
  );
};

export default BinaryHabit;
