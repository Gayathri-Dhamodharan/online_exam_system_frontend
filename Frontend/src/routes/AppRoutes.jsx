import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import QuestionBank from "../pages/admin/QuestionBank";
import AdminDashboard from "../pages/admin/AdminDashboard";
import UserDashboard from "../pages/user/UserDashboard";
import Exam from "../pages/user/Exam";
import PrivateRoute from "./PrivateRoute";
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";
import Review from "../pages/admin/Review";
import Result from "../pages/user/Result";
import Exams from "../pages/admin/Exams";

const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route element={<PublicRoute />}>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
       <Route path="/admin/register" element={<Register />} />
    </Route>

    {/* Admin Private Routes */}
    <Route element={<PrivateRoute allowedRole="admin" />}>
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/questions" element={<QuestionBank />} />
        <Route path="/admin/papers" element={<Exams />} />
        <Route path="/admin/results" element={<Review />} />
      </Route>
    </Route>

    {/* User Private Routes */}
    <Route element={<PrivateRoute allowedRole="user" />}>
      <Route element={<UserLayout />}>
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/exams" element={<Exam />} />
        <Route path="/user/results" element={<Result />} />
      </Route>
    </Route>

    {/* Fallback */}
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default AppRoutes;
