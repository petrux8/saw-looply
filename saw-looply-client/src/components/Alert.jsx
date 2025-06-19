import React, { useEffect } from "react";

const Alert = ({ message, type, onClose, duration = null, fixed = false }) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!message) return null; // Non mostra nulla se non c'è un messaggio

  const alertType =
    type === "success"
      ? "alert-success"
      : type === "error"
      ? "alert-danger"
      : "alert-warning";

  const alertClass = `alert ${alertType} alert-dismissible ${
    fixed
      ? "position-fixed top-0 start-50 translate-middle-x w-50 mt-3"
      : ""
  }`;

  return (
    <div
      className={alertClass}
      style={{
        zIndex: 1055, // Valore superiore a quello della sidebar e degli altri elementi
      }}
      role="alert"
    >
      {message}
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={onClose}
      ></button>
    </div>
  );
};

export default Alert;
