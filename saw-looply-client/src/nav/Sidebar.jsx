import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout } from "../firebase/auth";
import OnlineStatusIndicator from "./OnlineStatusIndicator";

const linkList = [
  { name: "Habits Schedule", path: "/" },
  { name: "Progress Dashboard", path: "/dashboard" },
  { name: "Habits Library", path: "/habits" },
];

const Sidebar = ({
  isSidebarOpen,
  onToggle,
  closeSidebar,
  isSmallerThanLg,
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
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
        <OnlineStatusIndicator />

        <div className="mb-auto p-3">
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
        <div className="p-3">
          <button
            className="btn btn-outline-danger w-100 mt-3 mb-3"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
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
};

export default Sidebar;
