import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout } from "../../firebase/auth";

const linkList = [
  { name: "Habits List", path: "/" },
  { name: "Create", path: "/create" },
  { name: "Statistics", path: "/stats" },
];

export default function Sidebar({ isSidebarOpen, onToggle, closeSidebar }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth");
    } catch (error) {
      console.log("QUa?");
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
      {/* Sidebar */}
      <div
        className={`d-flex flex-column border-end border-2 vh-100 p-3 bg-white ${
          isSidebarOpen ? "position-fixed top-0 start-0 vh-100" : "d-none"
        } d-md-flex position-static`}
        style={{ width: "350px", zIndex: "1050" }}
      >
        <button
          className="btn btn-outline-primary d-md-none m-3"
          onClick={onToggle}
        >
          ☰
        </button>
        {/* Logo */}
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

        {/* Link principali */}
        <div className="mb-auto">
          {linkList.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => getLinkClass(isActive)}
              onClick={closeSidebar} // Chiudi la sidebar quando un link è cliccato
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Messaggio di errore */}
        {error && <p className="text-danger">{error}</p>}

        {/* Pulsante di Logout */}
        <button
          className="btn btn-outline-danger mt-3 w-100"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Overlay per dispositivi mobili */}
      {isSidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          onClick={onToggle}
          style={{ zIndex: "1040" }}
        ></div>
      )}
    </>
  );
}
