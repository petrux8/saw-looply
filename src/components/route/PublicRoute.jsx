import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/FirebaseAuthContext";

const PublicRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? <Navigate to="/" /> : children;
};

export default PublicRoute;
