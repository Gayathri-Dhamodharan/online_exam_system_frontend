import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Mail, Lock, Eye, EyeOff, BookOpen, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";

// point axios at your backend
axios.defaults.baseURL = "http://localhost:5000";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const res = await axios.post("/api/user/login", values);
        const { token, user } = res.data;

        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role);
        localStorage.setItem("userId", user._id);
        localStorage.setItem("name", user.firstName);
        localStorage.setItem("lastname", user.lastname);
        localStorage.setItem("class", user.class);

        console.log("User ID:", localStorage.getItem("id"));
        console.log("User Name:", localStorage.getItem("name"));

        if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      } catch (err) {
        const msg = err.response?.data?.message || "Login failed";
        setErrors({ email: msg });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f1e8] via-[#82e8d6] to-[#001922] px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl px-8 py-8">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-sm text-gray-600">Sign in to your account</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                  placeholder="you@example.com"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="w-full pl-10 pr-10 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter password"
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
                <p className="text-xs text-red-500 mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-2 rounded-xl font-medium hover:scale-105 transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              Sign In <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-4 text-center text-sm">
            <p className="text-gray-600">
              Don’t have an account?
              <button
                onClick={() => navigate("/register")}
                className="text-teal-600 hover:underline ml-1"
              >
                Create one here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
