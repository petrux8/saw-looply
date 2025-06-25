import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const HabitCard = ({ habit, onEditHabit, onRemoveHabit }) => {
  const navigate = useNavigate();

  return (
    <div className="col-6 col-sm-6 col-md-4 col-lg-4 mb-4">
      <div
        className="card h-100 shadow-sm border-0"
        style={{ borderRadius: "12px" }}
      >
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5
              className="card-title text-truncate mb-0"
              style={{ fontWeight: "normal", fontSize: "1.2rem" }}
            >
              {habit.name}
            </h5>
            <div className="d-flex align-items-center gap-2">
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
            </div>
          </div>

          {/* Frequency and Details Section */}
          <p className="text-muted mb-4">
            <small>
              Frequency: {habit.freq}
              {habit.freq === "weekly" && ` | Days: ${habit.days.join(", ")}`}
            </small>
          </p>

          {/* Button Section */}
          <button
            className="btn btn-outline-primary mt-auto"
            style={{ borderRadius: "8px" }}
            onClick={() => navigate(`/habits/${habit.id}`)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default HabitCard;