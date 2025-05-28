import React, { useState } from "react";
import { db, auth } from "../firebase"; // Importa Firebase config
import { collection, addDoc } from "firebase/firestore";

const CreateHabit = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name) {
      setError("Il nome dell'habit è obbligatorio.");
      return;
    }

    try {
      const user = auth.currentUser; // Ottieni l'utente autenticato
      if (!user) {
        setError("Devi essere autenticato per creare un habit.");
        return;
      }

      await addDoc(collection(db, "habits"), {
        userId: user.uid,
        name,
        description,
        isCompleted: false,
        createdAt: new Date(),
      });

      setName("");
      setDescription("");
      setSuccess("Habit creato con successo!");
    } catch (err) {
      console.error(err);
      setError("Errore durante la creazione dell'habit.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Crea un nuovo Habit</h1>
      {error && <div className="alert alert-danger alert-dismissible">
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        {error}
      </div>}
      {success && <div className="alert alert-success alert-dismissible">
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        {success}
        </div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome dell'Habit</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descrizione (Opzionale)</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Salva Habit
        </button>
      </form>
    </div>
  );
};

export default CreateHabit;
