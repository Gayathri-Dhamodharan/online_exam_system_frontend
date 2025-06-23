import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRole }) => {
  const { token, role } = useSelector((state) => state.auth);

  if (!token || role !== allowedRole) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
