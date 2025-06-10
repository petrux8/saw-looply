const BinaryHabit = ({ habit, onToggleCompletion, currentDate }) => {

  return (
    <div className="d-flex align-items-center mb-3">
      <input
        type="checkbox"
        className="form-check-input me-3"
        checked={habit.history[currentDate] ? habit.history[currentDate] : false}
        onChange={() => onToggleCompletion(habit.id)}
      />
    </div>
  );
};

export default BinaryHabit;
