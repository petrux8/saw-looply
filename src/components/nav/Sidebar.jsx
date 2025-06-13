import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout } from "../../firebase/auth";

const linkList = [
  { name: "Habits List", path: "/" },
  { name: "Create", path: "/create" },
  { name: "Statistics", path: "/stats" },
];

export default function Sidebar({
  isSidebarOpen,
  onToggle,
  closeSidebar,
  isSmallerThanLg,
}) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth");
    } catch (error) {
      console.error("Errore durante il logout:", error);
      setError("Logout fallito. Riprova.");
    }
  };

  const getLinkClass = (isActive) =>
    isActive
      ? "btn btn-primary w-100 mb-2"
      : "btn btn-outline-primary w-100 mb-2";

  return (
    <>
      <div
        className={`d-flex flex-column bg-white vh-100 p-3 position-fixed ${
          isSmallerThanLg ? (isSidebarOpen ? "top-0 start-0" : "d-none") : ""
        }`}
        style={{
          width: "350px",
          height: "100vh",
          zIndex: isSmallerThanLg ? "1050" : "1030",
        }}
      >
        <div className="text-center mb-4">
          <img
            src="/logo.png"
            alt="Logo"
            className="img-fluid"
            style={{
              maxWidth: "100%",
              maxHeight: "100px",
              objectFit: "contain",
            }}
          />
        </div>

        <div className="mb-auto">
          {linkList.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => getLinkClass(isActive)}
              onClick={closeSidebar}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {error && <p className="text-danger">{error}</p>}

        <button
          className="btn btn-outline-danger mt-3 w-100"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      {isSidebarOpen && isSmallerThanLg && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          onClick={onToggle}
          style={{ zIndex: "1040" }}
        ></div>
      )}
    </>
  );
}
