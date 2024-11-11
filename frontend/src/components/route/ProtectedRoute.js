import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../layouts/Loader";
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useSelector((state) => state.authState);
  if (!isAuthenticated && !loading) {
    //not loggedin
    return <Navigate to="/login" />;
  }
  if (isAuthenticated) {
    //logged in
    return children;
  }
  if (loading) {
    return <Loader />;
  }
}
