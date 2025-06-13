const HabitTypeFields = ({ state, dispatch }) => {
  const { type, target, unit, startRange, endRange } = state;

  if (type === "quantitative") {
    return (
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Target</label>
          <input
            type="number"
            className="form-control"
            value={target}
            onChange={(e) =>
              dispatch({ name: "target", value: e.target.value })
            }
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Unit of measure</label>
          <input
            type="text"
            className="form-control"
            value={unit}
            onChange={(e) => dispatch({ name: "unit", value: e.target.value })}
          />
        </div>
      </div>
    );
  }

  if (type === "rating") {
    return (
      <div className="row mb-3">
        <label className="form-label">Range</label>
        <div className="col-md-6">
          <input
            type="number"
            className="form-control"
            value={startRange}
            onChange={(e) =>
              dispatch({ name: "startRange", value: e.target.value })
            }
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="number"
            className="form-control"
            value={endRange}
            onChange={(e) =>
              dispatch({ name: "endRange", value: e.target.value })
            }
            required
          />
        </div>
      </div>
    );
  }

  return null;
};

export default HabitTypeFields;
