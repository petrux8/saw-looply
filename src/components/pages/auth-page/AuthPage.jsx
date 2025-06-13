import {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
} from "../../../firebase/auth";
import { useNavigate } from "react-router-dom";
import Alert from "../../Alert";
import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { generateFirebaseAuthAlertMessage } from "../../../firebase/ErrorHandler";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { db } from "../../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function AuthPage() {
  const [authType, setAuthType] = useState("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPswHidden, setPswHidden] = useState(true);
  const [error, setError] = useState("");

  const handleAuthSwitch = () => {
    setAuthType(authType === "login" ? "register" : "login");
  };

  const handlePswHidden = () => {
    setPswHidden(!isPswHidden);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await doSignInWithEmailAndPassword(email, password);
    } catch (err) {
      if (err instanceof FirebaseError) {
        generateFirebaseAuthAlertMessage(err);
      }
      setError(generateFirebaseAuthAlertMessage(err));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username) {
      setError("Username is required!");
      return;
    }

    try {
      const userCredential = await doCreateUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        username: username,
      });
    } catch (err) {
      if (err instanceof FirebaseError) {
        generateFirebaseAuthAlertMessage(err);
        setError(generateFirebaseAuthAlertMessage(err));
      } else {
        setError(err);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="row w-100 mx-0 rounded-5 shadow-lg overflow-hidden"
        style={{ maxWidth: "900px" }}
      >
        <div className="col-md-6 p-5 d-flex justify-content-center align-items-center bg-light">
          <img
            src="/logo.png"
            className="img-fluid"
            alt="logo"
            style={{ maxWidth: "400px" }}
          />
        </div>

        <div className="col-md-6 p-5 bg-white d-flex flex-column align-items-center">
          <h2>{authType === "login" ? "Hello, Again" : "Welcome"}</h2>
          <p className="text-muted">
            {authType === "login"
              ? "We are happy to have you back."
              : "Create your account to get started."}
          </p>
          <Alert message={error} type="error" onClose={() => setError("")} />
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
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {authType !== "login" && (
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter your username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group">
                <input
                  type={isPswHidden ? "password" : "text"}
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="input-group-text"
                  onClick={handlePswHidden}
                  style={{ cursor: "pointer" }}
                >
                  {isPswHidden ? <IoEyeSharp /> : <IoEyeOffSharp />}
                </span>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-3">
              {authType === "login" ? "Login" : "Sign Up"}
            </button>
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
