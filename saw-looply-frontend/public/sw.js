self.addEventListener("install", (event) => {
  console.log("Service Worker installed");
  self.skipWaiting(); // Fa sì che il SW si attivi immediatamente
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activated");
  event.waitUntil(clients.claim()); // Fa sì che il SW prenda il controllo immediato
});

self.addEventListener("push", (event) => {
  console.log("Push event ricevuto");
  if (!event.data) {
    console.error("Nessun dato ricevuto nel push event");
    return;
  }

  const data = event.data.json();
  const title = data.title || "Habit Tracker Reminder";
  const options = {
    body: data.body || "Non dimenticare di completare il tuo habit!",
    icon: "/logo.png", // Puoi aggiungere un'icona personalizzata
    badge: "/logo.png", // Un'icona per la barra delle notifiche
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  console.log("Notifica cliccata");
  event.notification.close();
  event.waitUntil(
    clients.openWindow("/") // Apri la tua app o una URL specifica
  );
});
