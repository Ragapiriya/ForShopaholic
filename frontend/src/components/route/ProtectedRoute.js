import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../layouts/Loader";
export default function ProtectedRoute({ children,isAdmin }) {
  const { isAuthenticated, loading,user } = useSelector((state) => state.authState);
  if (!isAuthenticated && !loading) {
    //not loggedin
    return <Navigate to="/login" />;
  }
  if (isAuthenticated) {
    //logged in 
    if(isAdmin === true && user.role !== 'admin')
    {
      //not admin ---> directed to home url
      return <Navigate to='/'/>
    }
    return children;
  }
  if (loading) {
    return <Loader />;
  }
}
