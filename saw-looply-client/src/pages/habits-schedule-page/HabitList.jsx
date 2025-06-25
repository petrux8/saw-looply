import { MdEdit, MdDelete, MdInfo, MdMoreVert } from "react-icons/md";
import { Link } from "react-router-dom";
import { Dropdown, Spinner } from "react-bootstrap";

const HabitList = ({
  habitsOfDay,
  onEditHabit,
  onRemoveHabit,
  onToggleHabit,
  historyOfDay,
  isFuture,
}) => {
  return (
    <ul className="list-group">
      {habitsOfDay.map((habit) => (
        <li
          key={habit.id}
          className={`list-group-item mb-2 rounded border-0 bg-light ${
            habit.isDeleted ? "text-muted" : ""
          }`}
        >
          <div
            className={`d-flex align-items-center gap-3 ${
              habit.isDeleted ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <div className="d-flex align-items-center">
              <input
                type="checkbox"
                className={`form-check-input ${
                  isFuture || habit.isDeleted
                    ? "border-transparent"
                    : "border-primary"
                }`}
                checked={
                  habit.isDeleted
                    ? false
                    : historyOfDay
                    ? historyOfDay[habit.id] == true
                    : false
                }
                onChange={(event) =>
                  onToggleHabit(habit.id, event.target.checked)
                }
                disabled={isFuture || habit.isDeleted}
              />
            </div>

            <div className="flex-grow-1 p-3 bg-white rounded shadow-sm">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">{habit.name}</h5>
                  <small className="text-muted">
                    Frequency: {habit.freq}
                    {habit.freq === "weekly" &&
                      ` | Days: ${habit.days.join(", ")}`}
                  </small>
                </div>
                <div className="d-flex align-items-center gap-3">
                  {(!habit.isSynced || habit.isDeleted) && (
                    <Spinner
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="text-primary"
                    />
                  )}
                  <Dropdown>
                    <Dropdown.Toggle
                      as="div"
                      className="no-caret"
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <MdMoreVert size={20} className="text-dark" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => onEditHabit(habit)}>
                        <MdEdit className="me-2 text-primary" /> Edit
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => onRemoveHabit(habit.id)}>
                        <MdDelete className="me-2 text-danger" /> Delete
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to={`/habits/${habit.id}`}>
                        <MdInfo className="me-2 text-info" /> Details
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default HabitList;
