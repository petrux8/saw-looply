// self.addEventListener("push", (event) => {
//   console.log("Push event ricevuto");
//   if (!event.data) {
//     console.error("Nessun dato ricevuto nel push event");
//     return;
//   }

//   const data = event.data.json();
//   const title = data.title || "Habit Tracker Reminder";
//   const options = {
//     body: data.body,
//     icon: "/pwa-192x192.png",
//   };

//   event.waitUntil(self.registration.showNotification(title, options));
// });

// self.addEventListener("notificationclick", (event) => {
//   console.log("Notifica cliccata");
//   event.notification.close();
//   event.waitUntil(
//     clients.openWindow("/")
//   );
// });
