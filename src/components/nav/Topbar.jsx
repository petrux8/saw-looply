const Topbar = ({ onBurgerClick }) => {
  return (
    <div className="d-flex justify-content-between align-items-center border-bottom border-2 d-md-none text-white p-3">
      {/* Logo a sinistra */}
      <div>
        <img
          src="/logo.png"
          alt="Logo"
          className="img-fluid"
          style={{
            maxWidth: "100px",
            maxHeight: "50px",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Burger Button a destra */}
      <button
        className="btn btn-primary"
        onClick={onBurgerClick}
      >
        ☰
      </button>
    </div>
  );
};

export default Topbar;
