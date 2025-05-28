import "./AuthPage.css"; // File CSS aggiuntivo
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../../firebase/auth";
import { useNavigate } from "react-router-dom";
import Alert from "../../Alert";
import { useState } from "react";
import { GoogleLoginButton } from "./GoogleLoginButton";

const AuthPage = () => {
  const [authType, setAuthType] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleAuthSwitch = () => {
    setAuthType(authType === "login" ? "register" : "login");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await doSignInWithEmailAndPassword(email, password);
      setSuccess("Login effettuato con successo!");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(
        err.message.includes("user-not-found")
          ? "Utente non trovato. Controlla le credenziali."
          : "Errore durante il login: " + err.message
      );
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();

    try {
      await doSignInWithGoogle();
    } catch (err) {
      setError("Errore durante il login con Google: " + err.message);
    }

    setSuccess("Login effettuato con successo!");
    setTimeout(() => navigate("/"), 2000);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await doCreateUserWithEmailAndPassword(email, password);
      setSuccess("Registrazione completata con successo!");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(
        err.message.includes("email-already-in-use")
          ? "Questa email è già in uso. Prova a eseguire il login."
          : err.message.includes("weak-password")
          ? "La password è troppo debole. Usa almeno 6 caratteri."
          : "Errore durante la registrazione: " + err.message
      );
    }
  };

  return (
    <div className="auth-container">
      <Alert message={error} type="error" onClose={() => setError("")} />
      <Alert message={success} type="success" onClose={() => setSuccess("")} />
      <div className="box-container">
        <div className="row border rounded-5 p-3 bg-white shadow box-area">
          <div className="col-md-6 rounded-4 auth-left">
            <img src="/logo.png" className="app-logo" alt="logo" />
          </div>

          <div className="col-md-6 auth-right">
            <div class="row align-items-center">
              <h2>{authType === "login" ? "Hello, Again" : "Welcome"}</h2>
              <p>
                {authType === "login"
                  ? "We are happy to have you back."
                  : "Create your account to get started."}
              </p>
              <form
                onSubmit={authType === "login" ? handleLogin : handleRegister}
              >
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {authType === "login" && (
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <a href="#" className="text-primary">
                      Forgot Password?
                    </a>
                  </div>
                )}
                <button type="submit" className="btn btn-primary w-100 mb-3">
                  {authType === "login" ? "Login" : "Sign Up"}
                </button>
                <GoogleLoginButton
                  authType={authType}
                  onClick={handleGoogleSignIn}
                />
              </form>
              <div className="mt-3">
                <p>
                  {authType === "login"
                    ? "Don't have an account? "
                    : "Already have an account? "}
                  <button
                    className="btn btn-link p-0 align-baseline"
                    onClick={handleAuthSwitch}
                  >
                    {authType === "login" ? "Sign Up" : "Login"}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
