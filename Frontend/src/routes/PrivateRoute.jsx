// import { useSelector } from "react-redux";
// import { Navigate, Outlet } from "react-router-dom";

// const PrivateRoute = ({ allowedRole }) => {
//   const { token, role } = useSelector((state) => state.auth);

//   if (!token || role !== allowedRole) {
//     return <Navigate to="/login" />;
//   }

//   return <Outlet />;
// };

// export default PrivateRoute;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("selectedRole");

  if (!token || role == allowedRole) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;

