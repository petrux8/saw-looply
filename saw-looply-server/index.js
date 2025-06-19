import express from "express";
import cors from "cors";
import webPush from "web-push";
import dotenv from "dotenv";
import admin from "firebase-admin";
import { readFileSync } from "fs";
import cron from "node-cron";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//credenziali da admin per firebase
const serviceAccount = JSON.parse(
  readFileSync("./serviceAccountKey.json", "utf-8")
);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const usersRef = db.collection("users");

if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
  console.error("VAPID Key not found");
  process.exit();
}

if (!serviceAccount) {
  console.error("Service account key is missing.");
  process.exit();
}

// VAPID keys
const vapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY,
};

webPush.setVapidDetails(
  "https://looply.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

app.get("/vapidPublicKey", (req, res) => {
  res.send(process.env.VAPID_PUBLIC_KEY);
});

// Route per salvare le sottoscrizioni
app.post("/subscribe", async (req, res) => {
  const { uid, subscription } = req.body;

  if (uid && subscription) {
    await usersRef
      .doc(uid)
      .set({ token: JSON.stringify(subscription) }, { merge: true });
    res.sendStatus(201);
  } else {
    return res.status(400).json({ message: "Invalid subscription object." });
  }
});

// Route per inviare notifiche push
app.post("/send-notification", async (req, res) => {
  const { userId, title, body } = req.body;

  const notificationPayload = {
    title: title || "Habit Tracker Reminder",
    body: body || "Sus",
  };

  try {
    const userDoc = await usersRef.doc(userId).get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found." });
    }

    const userData = userDoc.data();
    const subscriptionToken = userData.token;

    if (!subscriptionToken) {
      return res
        .status(400)
        .json({ message: "User has no subscription token." });
    }

    // Invia la notifica push
    await webPush.sendNotification(
      {
        endpoint: "",
        keys: { auth: "", p256dh: "" },
        ...JSON.parse(subscriptionToken),
      },
      JSON.stringify(notificationPayload)
    );

    console.log("inviata?");

    res.status(200).json({ message: "Notifications sent successfully!" });
  } catch (error) {
    console.error("Error sending notifications:", error);
    res.status(500).json({ message: "Failed to send notifications." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

async function checkAndSendScheduledNotifications() {
  const weekDay = new Date().toLocaleDateString("en-GB", {
    weekday: "short",
  });

  const todayKey = new Date().toISOString().split("T")[0];

  try {
    const usersSnapshot = await usersRef.get();

    usersSnapshot.forEach(async (userDoc) => {
      const userData = userDoc.data();

      if (!userData.token) return;

      const subscriptionToken = userData.token;

      const habitsRef = db
        .collection("users")
        .doc(userDoc.id)
        .collection("habits");

      //filtro gli habit in base a se sono notificabili
      const q1 = habitsRef
        .where("notifications", "==", true)
        .where("freq", "==", "daily");
      const q2 = habitsRef
        .where("notifications", "==", true)
        .where("days", "array-contains", weekDay);

      const [snap1, snap2] = await Promise.all([q1.get(), q2.get()]);

      const habitSnapshot = [...snap1.docs, ...snap2.docs];

      habitSnapshot.forEach(async (habitDoc) => {
        if(habitDoc.data().history[todayKey] == true) return;
        // Costruisci payload
        const payload = JSON.stringify({
          title: "Habit Tracker Reminder",
          body: habitDoc.data().name,
        });

        try {
          await webPush.sendNotification(
            {
              endpoint: "",
              keys: { auth: "", p256dh: "" },
              ...JSON.parse(subscriptionToken),
            },
            payload
          );
          console.log(`Notifica inviata a user ${userDoc.id}`);
        } catch (err) {
          console.error("Errore invio notifica a", userDoc.id, err);
        }
      });
    });
  } catch (err) {
    console.error("Errore nella schedulazione notifiche:", err);
  }
}

cron.schedule("* * * * *", () => {
  console.log("Eseguo il task schedulato per inviare notifiche");
  checkAndSendScheduledNotifications();
});
