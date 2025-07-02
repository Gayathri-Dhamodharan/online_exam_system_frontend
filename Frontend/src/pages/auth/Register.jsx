// src/components/Register.jsx
import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { Mail, Lock, Eye, EyeOff, Users, ArrowRight } from "lucide-react";

// point axios at your backend
axios.defaults.baseURL = "http://localhost:5000";

const classOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const gradeOptions = ["A", "B", "C"];

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // student vs admin mode
  const mode = pathname === "/admin/register" ? "admin" : "student";

  // shared input styling
  const inputClass = `
    w-full px-3 py-2 text-sm border rounded-lg
    focus:ring-1 focus:ring-teal-500
    ${mode === "student" ? "border-blue-500" : "border-red-500"}
  `;

  // validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid").required("Required"),
    password: Yup.string().min(6, "Min 6 chars").required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Must match")
      .required("Required"),
    // student-only
    class: Yup.string().required("Class is required"),
    section: Yup.string().required("Section is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: mode,
      class: "",
      section: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const endpoint =
          mode === "admin" ? "api/user/admin/register" : "api/user/register";
        await axios.post(endpoint, values);
        // on success, redirect to login
        navigate("/login");
      } catch (err) {
        setErrors({
          email: err.response?.data?.message || "Registration failed.",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br 
    from-[#f5f1e8] via-[#82e8d6] to-[#001922] px-4"
    >
      <div className="w-full max-w-md">
        <div className="bg-white/90 rounded-xl shadow-lg p-6">
          <div className="text-center mb-4">
            <Users className="mx-auto mb-2 w-12 h-12 text-teal-600" />
            <h2 className="text-2xl font-bold text-gray-800">
              {mode === "admin" ? "Admin Sign Up" : "Student Sign Up"}
            </h2>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <input type="hidden" name="role" value={mode} />

            {/* First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {["firstName", "lastName"].map((field) => (
                <div key={field}>
                  <label className="block text-xs text-gray-700 mb-1">
                    {field === "firstName" ? "First Name" : "Last Name"}
                  </label>
                  <input
                    name={field}
                    value={formik.values[field]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={inputClass}
                    placeholder={
                      field === "firstName" ? "First name" : "Last name"
                    }
                  />
                  {formik.touched[field] && formik.errors[field] && (
                    <p className="text-xs text-red-500">
                      {formik.errors[field]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs text-gray-700 mb-1">Email</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${inputClass} pl-10`}
                  placeholder="you@example.com"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-xs text-red-500">{formik.errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${inputClass} pl-10 pr-10`}
                  placeholder="••••••••"
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-xs text-red-500">{formik.errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${inputClass} pl-10 pr-10`}
                  placeholder="••••••••"
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showConfirm ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-xs text-red-500">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>

            {/* Role-specific fields */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* Class Dropdown */}
              <div>
                <label className="block text-xs text-gray-700 mb-1">
                  Class
                </label>
                <select
                  name="class"
                  value={formik.values.class}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputClass}
                >
                  <option value="">Select class</option>
                  {classOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {formik.touched.class && formik.errors.class && (
                  <p className="text-xs text-red-500">{formik.errors.class}</p>
                )}
              </div>
              {/* Grade Dropdown */}
              <div>
                <label className="block text-xs text-gray-700 mb-1">
                  Section
                </label>
                <select
                  name="section"
                  value={formik.values.section}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={inputClass}
                >
                  <option value="">Select section</option>
                  {gradeOptions.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
                {formik.touched.grade && formik.errors.grade && (
                  <p className="text-xs text-red-500">{formik.errors.grade}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-2 rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {mode === "admin" ? "Create Admin" : "Create Student"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-teal-600 hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
