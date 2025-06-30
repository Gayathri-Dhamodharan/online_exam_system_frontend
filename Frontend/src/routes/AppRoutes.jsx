// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Unauthorized from "../pages/auth/Unauthorized";

import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Review from "../pages/admin/Review";

import UserLayout from "../layouts/UserLayout";
import UserDashboard from "../pages/user/UserDashboard";
import Exam from "../pages/user/Exam";
import Result from "../pages/user/Result";

// ── Split QuestionBank screens ──
import Dashboard from "../pages/admin/questions/Dashboard";
import Subjects from "../pages/admin/questions/Subjects";
import Questions from "../pages/admin/questions/Questions";
import CreatedPapers from "../pages/admin/questions/CreatedPapers";
import ExamDetails from "../pages/admin/questions/ExamDetails";
import QuestionBank from "../pages/admin/QuestionBank";

const AppRoutes = () => (
  <Routes>
    {/* Public (no auth) */}
    <Route element={<PublicRoute />}>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/register" element={<Register />} />
    </Route>

    {/* Admin-only */}
    <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
      <Route path="/admin" element={<AdminLayout />}>
        {/* dashboard */}
        <Route index element={<AdminDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* questions/* */}
        {/* <Route path="questions">
          <Route index element={<Dashboard />} />
          <Route path="subjects" element={<Subjects />} />
          <Route path=":subjectId" element={<Questions />} />
          <Route path="created-papers" element={<CreatedPapers />} />
          <Route path="exam-details/:id" element={<ExamDetails />} />
        </Route> */}
        <Route path="/admin/questions" element={<QuestionBank />} />

        {/* other admin pages */}
        <Route path="/admin/results" element={<Review />} />
      </Route>
    </Route>

    {/* Student-only */}
    <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
      <Route path="/user" element={<UserLayout />}>
        <Route index element={<UserDashboard />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="exams" element={<Exam />} />
        <Route path="results" element={<Result />} />
      </Route>
    </Route>

    {/* Unauthorized & catch-all */}
    <Route path="/unauthorized" element={<Unauthorized />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
