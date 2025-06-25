const CACHE_NAME = "app-cache-v1";
const urlsToCache = [
  "/",
  "/dashboard",
  "/habits",
  "/index.html",
  "/offline.html",
  "/styles.css",
  "/main.js",
  "/bootstrap.min.css",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      try {
        return await cache.addAll(urlsToCache);
      } catch (error) {
        console.error("Errore durante cache add: ", error);
      }
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (!cacheWhitelist.includes(key)) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const url = new URL(event.request.url);

  // Escludi le richieste a Firestore
  if (url.hostname.includes("firestore.googleapis.com")) {
    return; // Non gestire queste richieste
  }

  event.respondWith(
    caches
      .match(event.request)
      .then((cachedResponse) => {
        // Avvia la richiesta di rete in background
        const networkFetch = fetch(event.request)
          .then((response) => {
            if (response && response.status === 200) {
              const responseClone = response.clone(); // clono PRIMA
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseClone);
              });
            }
            return response; // restituisco l’originale
          })
          .catch(() => {
            // Se la rete non è disponibile, restituisci la cache
            return cachedResponse;
          });

        // Restituisci la risposta dalla cache (se esiste) o aspetta quella della rete
        return cachedResponse || networkFetch;
      })
      .catch(() => {
        // Fallback definitivo: mostra una pagina offline o un messaggio
        return caches.match("/offline.html");
      })
  );
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
    body: data.body,
    icon: "/pwa-192x192.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function (event) {
  console.log("Notifica cliccata, gestendo apertura finestra.");

  const data = event.notification.data || {};
  const targetUrl = data.lookup || "/"; // URL di fallback

  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({ includeUncontrolled: true, type: "window" })
      .then((clientList) => {
        const matchingClient = clientList.find((client) =>
          client.url.includes(targetUrl)
        );

        if (matchingClient) {
          return matchingClient.focus();
        } else {
          return clients.openWindow(targetUrl);
        }
      })
  );
});
