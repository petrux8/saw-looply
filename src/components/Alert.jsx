import React from "react";

const Alert = ({ message, type, onClose }) => {
  if (!message) return null; // Non mostra nulla se non c'è un messaggio

  const alertType = type === "success" ? "alert-success" : "alert-danger";

  return (
    <div className={`alert ${alertType} alert-dismissible`} role="alert">
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