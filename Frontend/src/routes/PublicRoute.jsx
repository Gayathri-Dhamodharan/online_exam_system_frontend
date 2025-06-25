// import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import React from "react";

const PublicRoute = () => {
  // MOCK token/role until Redux is connected
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // 'admin' or 'user'

  // If logged in, redirect to corresponding dashboard
  if (token && role) {
    return <Navigate to={`/${role}/dashboard`} />;
  }

  return <Outlet />;
};

export default PublicRoute;
