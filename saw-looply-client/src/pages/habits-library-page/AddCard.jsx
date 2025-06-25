import React from "react";

const AddCard = ({ onClick }) => {
  return (
    <div className="col-6 col-sm-6 col-md-4 col-lg-4 mb-4">
      <div
        className="card h-100 shadow-lg bg-primary border-0 text-center d-flex align-items-center justify-content-center"
        style={{
          borderRadius: "12px",
        }}
      >
        <div className="card-body d-flex flex-column align-items-center justify-content-center">
          <button
            className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2"
            onClick={onClick}
          >
            + New Habit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCard;
