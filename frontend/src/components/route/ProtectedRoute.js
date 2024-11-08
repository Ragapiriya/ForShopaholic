import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.authState);
  if (!isAuthenticated) {
    //not loggedin
    return <Navigate to="/login" />;
  }
  //logged in
  return children;
}
