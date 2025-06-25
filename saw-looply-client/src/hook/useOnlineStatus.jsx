import { useState, useEffect } from "react";

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [realOnlineStatus, setRealOnlineStatus] = useState(true);

  const checkRealConnection = async () => {
    try {
      await fetch("https://www.google.com/favicon.ico", { mode: "no-cors" });
      setRealOnlineStatus(true);
    } catch (error) {
      setRealOnlineStatus(false);
    }
  };

  useEffect(() => {
    setRealOnlineStatus(true);
    checkRealConnection();

    const handleOnline = () => {
      setIsOnline(true);
      checkRealConnection();
    };

    const handleOffline = () => {
      setIsOnline(false);
      setRealOnlineStatus(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return { onlineStatus: realOnlineStatus && isOnline };
}
