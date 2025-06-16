import { GiHamburgerMenu } from "react-icons/gi";

const Topbar = ({ onBurgerClick }) => {
  return (
    <div className="d-flex justify-content-between align-items-center border-bottom border-2 d-md-none text-white p-3">
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

      <button
        className="btn btn-primary"
        onClick={onBurgerClick}
      >
        <GiHamburgerMenu/>
      </button>
    </div>
  );
};

export default Topbar;
