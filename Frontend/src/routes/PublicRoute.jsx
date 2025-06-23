import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { token, role } = useSelector((state) => state.auth);

  // If logged in, redirect to dashboard based on role
  if (token && role) {
    return <Navigate to={`/${role}/dashboard`} />;
  }

  return <Outlet />;
};

export default PublicRoute;
