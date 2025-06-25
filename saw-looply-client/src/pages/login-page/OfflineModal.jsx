const OfflineModal = ({ show, handleRetryClick, countdown }) => {
  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">You are offline</h5>
          </div>
          <div className="modal-body">
            <p>Unable to log in. Please try again in <strong>{countdown}</strong> seconds.</p>
          </div>
          <div className="modal-footer"><button className="btn btn-primary" onClick={handleRetryClick}>Retry</button></div>
        </div>
      </div>
    </div>
  );
};

export default OfflineModal;
