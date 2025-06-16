import { Navigate } from "react-router-dom";
import { useFirebaseAuth } from "../../context/FirebaseAuthContext";

const PublicRoute = ({ children }) => {
  const { currentUser } = useFirebaseAuth();

  return currentUser ? <Navigate to="/" /> : children;
};

export default PublicRoute;
