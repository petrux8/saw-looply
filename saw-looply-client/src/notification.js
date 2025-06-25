export const subscribeUserToPush = async (uid, registration) => {
  if (!registration) {
    console.error("Service Worker not registrated");
    return;
  }

  await requestNotificationPermission();
  const response = await fetch("http://localhost:3000/vapidPublicKey");
  const vapidPublicKey = await response.text();

  const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: convertedVapidKey,
  });

  // Invia la subscription al backend
  await fetch("http://localhost:3000/subscribe", {
    method: "POST",
    body: JSON.stringify({ uid, subscription }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("Utente iscritto alle notifiche push:", subscription);
};

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const registerServiceWorker = async () => {
  try {
    const registration = await navigator.serviceWorker.register(
      "/sw-custom.js"
    );
    console.log("Service Worker registrato:", registration);
    return registration;
  } catch (error) {
    console.error("Errore registrazione Service Worker:", error);
  }
};

export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    console.error("Notifiche non supportate dal browser.");
    return false;
  }

  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    console.log("Permessi notifiche concessi.");
    return true;
  }

  console.log("Permessi notifiche negati.");
  return false;
};
