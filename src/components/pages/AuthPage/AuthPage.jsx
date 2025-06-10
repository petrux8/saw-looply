import {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../../firebase/auth";
import { useNavigate } from "react-router-dom";
import Alert from "../../Alert";
import { useState } from "react";
import { GoogleLoginButton } from "./GoogleLoginButton";
import { FirebaseError } from "firebase/app";
import { generateFirebaseAuthAlertMessage } from "../../../firebase/ErrorHandler";

export default function AuthPage() {
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
      if (err instanceof FirebaseError) {
        generateFirebaseAuthAlertMessage(err);
      }
      setError(generateFirebaseAuthAlertMessage(err));
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
      if (err instanceof FirebaseError) {
        generateFirebaseAuthAlertMessage(err);
      }
      setError(generateFirebaseAuthAlertMessage(err));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="row w-100 mx-0 rounded-5 shadow-lg overflow-hidden"
        style={{ maxWidth: "900px" }}
      >
        {/* Sezione Sinistra - Immagine */}
        <div className="col-md-6 p-4 d-flex justify-content-center align-items-center bg-primary">
          <img
            src="/logo.png"
            className="img-fluid"
            alt="logo"
            style={{ maxWidth: "400px" }}
          />
        </div>

        {/* Sezione Destra - Form di Login */}
        <div className="col-md-6 p-4 bg-white d-flex flex-column align-items-center">
          <h2>{authType === "login" ? "Hello, Again" : "Welcome"}</h2>
          <p className="text-muted">
            {authType === "login"
              ? "We are happy to have you back."
              : "Create your account to get started."}
          </p>
          <Alert message={error} type="error" onClose={() => setError("")} />
          <Alert
            message={success}
            type="success"
            onClose={() => setSuccess("")}
          />
          <form
            onSubmit={authType === "login" ? handleLogin : handleRegister}
            className="w-100"
          >
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
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
              <button className="btn btn-link p-0" onClick={handleAuthSwitch}>
                {authType === "login" ? "Sign Up" : "Login"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
