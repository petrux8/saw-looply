import { useOnlineStatus } from "../hook/useOnlineStatus";

const OnlineStatusIndicator = () => {
  const { onlineStatus } = useOnlineStatus();

  return (
    <div
      className={`m-3 p-2 rounded shadow-sm text-white ${
        onlineStatus ? "bg-success" : "bg-danger"
      }`}
      style={{ zIndex: 1050 }}
    >
      <span className="fw-bold">
        {onlineStatus ? "🟢 Online" : "🔴 Offline"}
      </span>
    </div>
  );
};

export default OnlineStatusIndicator;
