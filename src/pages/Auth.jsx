import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  // Funzione per registrare un nuovo utente
  const register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      console.log("Registrazione avvenuta con successo!");
    } catch (error) {
      console.error("Errore durante la registrazione:", error.message);
    }
  };

  // Funzione per fare login
  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      console.log("Login avvenuto con successo!");
    } catch (error) {
      console.error("Errore durante il login:", error.message);
    }
  };

  //Funzione per il login tramite Google
  const loginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      console.log("Accesso con Google avvenuto con successo!");
    } catch (error) {
      console.error("Errore durante l'accesso con Google:", error.message);
    }
  }

  // Funzione per fare logout
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log("Logout avvenuto con successo!");
    } catch (error) {
      console.error("Errore durante il logout:", error.message);
    }
  };

  return (
    <div className="container mt-5">
        <div className="card p-4">
            {!user ? (
            <div>
                <h2 className="mb-4">Login/Registrazione</h2>
                <input
                type="email"
                className="form-control mb-2"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <input
                type="password"
                className="form-control mb-2"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn btn-primary me-2" onClick={register}>Registrati</button>
                <button className="btn btn-success" onClick={login}>Accedi</button>
                <button className="btn btn-danger" onClick={loginGoogle}>Accedi con Google</button>
            </div>
            ) : (
            <div>
                <h2>Benvenuto, {user.email}!</h2>
                <button className="btn btn-danger" onClick={logout}>Esci</button>
            </div>
            )}
        </div>
    </div>
  );
}

export default Auth;
