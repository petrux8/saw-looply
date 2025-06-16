import { Navigate } from "react-router-dom";
import { useFirebaseAuth } from "../../context/FirebaseAuthContext";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useFirebaseAuth();

  return currentUser ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;
