export function GoogleLoginButton({ onClick }) {
  return (
    <button
      type="button"
      className="btn btn-light google-login w-100"
      style={{ minWidth: "150px" }}
      onClick={onClick}
    >
      <img
        src="https://img.icons8.com/color/16/000000/google-logo.png"
        alt="Google Logo"
        className="me-2"
      />
      Continue with Google
    </button>
  );
}
