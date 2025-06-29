import React from "react";
import { Spinner } from "react-bootstrap";
import { MdEdit, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const HabitCard = ({ habit, onEditHabit, onRemoveHabit }) => {
  const navigate = useNavigate();

  return (
    <div className="col-6 col-sm-6 col-md-4 col-lg-4 mb-4">
      <div
        className={`card h-100 shadow-sm border-0 ${
          habit.isDeleted ? "opacity-50" : ""
        }`}
        style={{ borderRadius: "12px" }}
      >
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex">
              <h5
                className="card-title mb-0"
                style={{ fontWeight: "normal", fontSize: "1.2rem" }}
              >
                {habit.name}
              </h5>
              {(!habit.isSynced || habit.isDeleted) && (
                <Spinner
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="text-primary ms-3"
                />
              )}
            </div>
{!habit.isDeleted &&            <div className="d-flex align-items-center gap-2">
              <MdEdit
                size={20}
                style={{ cursor: "pointer" }}
                onClick={() => onEditHabit(habit)}
                className="text-primary"
              />
              <MdDelete
                size={20}
                style={{ cursor: "pointer" }}
                onClick={() => onRemoveHabit(habit.id)}
                className="text-danger"
              />
            </div>}
          </div>

          <p className="text-muted mb-4">
            <small>
              Frequency: {habit.freq}
              {habit.freq === "weekly" && ` | Days: ${habit.days.join(", ")}`}
            </small>
          </p>

          <button
            className={`btn mt-auto ${habit.isDeleted ? "btn-outline-secondary disabled" : "btn-outline-primary"} `}
            style={{ borderRadius: "8px" }}
            onClick={() => navigate(`/habits/${habit.id}`)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default HabitCard;
