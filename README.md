# Looply Habit Tracker

**Looply** è un'applicazione per la gestione e il monitoraggio delle abitudini. Utilizza **React** e **Bootstrap** per il frontend, **Firebase** come Backend-as-a-Service (BaaS), e un server Node.js con **Express** per le funzionalità lato server.


## Funzionalità principali

- **Gestione degli habit**: Aggiungi nuovi habit e personalizza la loro frequenza (giornaliera, settimanale, specifici giorni della settimana).
- **Promemoria con notifiche push**: Ricevi notifiche per gli habit programmati.
- **Pianificazione degli habit**: Consulta gli habit schedulati nei vari giorni
- **Statistiche**:
  - Statistiche generali per mese/anno
  - Statistiche specifiche per habit, tra cui: longest streak, giorni totali completati, progress bar.

## Requisiti

1. **Node.js** 
2. **npm** o **yarn** 
3. **Firebase** configurato con le regole Firestore riportate di seguito.
4. File di configurazione sensibili (non inclusi nel repository per motivi di sicurezza):
   - `.env` -> contiene le vapid keys (server)
   - `serviceAccountKey.json` -> contiene le credenziali Firebase Admin SDK (server)


## Come avviare il progetto

### 1. Clona il repository
```bash
git clone https://github.com/petrux8/saw-looply.git
cd saw-looply
```

### 2. Configura il server

Vai nella cartella `saw-looply-server`:
```bash
cd saw-looply-server
```

Installa le dipendenze:
```bash
npm install
```
Avvia il server:
```bash
node index.js
```

### 3. Configura il client

Vai nella cartella `saw-looply-client`:
```bash
cd ../saw-looply-client
```

Installa le dipendenze:
```bash
npm install
```

Avvia il client:
```bash
npm run build
npm run preview
```

## Regole di sicurezza Firestore

Copia e incolla le seguenti regole nel pannello delle regole di sicurezza di Firestore:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
  
    match /users/{userId} {
    allow read, write: if request.auth != null && request.auth.uid == userId;
    
      match /{subCollection=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }

    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

