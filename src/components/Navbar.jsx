import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logout } from "../firebase"; // Importa il logout
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Ascolta i cambiamenti dello stato di autenticazione
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Funzione per gestire il logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth"); // Reindirizza alla pagina di login dopo il logout
    } catch (error) {
      console.error("Errore durante il logout:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Habit Tracker</Link>
        <Link className="btn btn-primary" to="/create">Crea Habit</Link>
        <div className="d-flex">
          {user ? (
            <>
              <span className="navbar-text me-3">Ciao, {user.email}</span>
              <button
                className="btn btn-outline-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link className="btn btn-outline-primary" to="/auth">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
