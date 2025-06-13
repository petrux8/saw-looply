const BinaryHabit = ({ habit, onToggleCompletion, dateString }) => {

  return (
    <div className="d-flex align-items-center mb-3">
      <input
        type="checkbox"
        className="form-check-input me-3"
        checked={habit.history[dateString] ? habit.history[dateString] : false}
        onChange={() => onToggleCompletion(habit.id)}
      />
    </div>
  );
};

export default BinaryHabit;
