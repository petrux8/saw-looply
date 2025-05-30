const BinaryHabit = ({ habit, onToggleCompletion }) => {
  return (
    <div className="d-flex align-items-center mb-3">
      <input
        type="checkbox"
        className="form-check-input me-3"
        checked={habit.completed}
        onChange={() => onToggleCompletion(habit.id)}
      />
    </div>
  );
};

export default BinaryHabit;
