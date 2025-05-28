export function GoogleLoginButton({ authType, onClick }) {
  return (
    <button type="button" className="btn btn-light google-login w-100" onClick={onClick}>
      <img
        src="https://img.icons8.com/color/16/000000/google-logo.png"
        alt="Google Logo"
        className="me-2"
      />
      {authType === "login" ? "Sign in with Google" : "Sign up with Google"}
    </button>
  );
}