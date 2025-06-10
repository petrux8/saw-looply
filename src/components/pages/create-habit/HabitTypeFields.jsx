const HabitTypeFields = ({ state, dispatch }) => {
  const { habitType, habitTarget, habitUnit, habitStartRange, habitEndRange } =
    state;

  if (habitType === "quantitative") {
    return (
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Target</label>
          <input
            type="number"
            className="form-control"
            value={habitTarget}
            onChange={(e) =>
              dispatch({ name: "habitTarget", value: e.target.value })
            }
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Unit of measure</label>
          <input
            type="text"
            className="form-control"
            value={habitUnit}
            onChange={(e) =>
              dispatch({ name: "habitUnit", value: e.target.value })
            }
            required
          />
        </div>
      </div>
    );
  }

  if (habitType === "rating") {
    return (
      <div className="row mb-3">
        <label className="form-label">Range</label>
        <div className="col-md-6">
          <input
            type="number"
            className="form-control"
            value={habitStartRange}
            onChange={(e) =>
              dispatch({ name: "habitStartRange", value: e.target.value })
            }
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="number"
            className="form-control"
            value={habitEndRange}
            onChange={(e) =>
              dispatch({ name: "habitEndRange", value: e.target.value })
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
