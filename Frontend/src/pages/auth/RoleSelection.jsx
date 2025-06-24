import React from 'react'
import { useNavigate } from "react-router-dom";
import { ShieldCheck, UserRound } from "lucide-react";

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleSelect = (role, type) => {
    localStorage.setItem("selectedRole", role);
    navigate(`/${type}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-xl shadow-md space-y-6">
        <h2 className="text-2xl font-bold text-center">Choose Your Role</h2>

        {/* Admin Card */}
        <div className="border rounded-lg p-4 space-y-4 text-center">
          <div className="flex justify-center text-blue-600">
            <ShieldCheck size={40} />
          </div>
          <h3 className="font-semibold text-lg">Administrator</h3>
          <p className="text-sm text-gray-600">
            Create and manage exams, questions, and view results
          </p>
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            onClick={() => handleSelect("admin", "login")}
          >
            Login as Admin
          </button>
          <button
            className="w-full border border-blue-600 text-blue-600 py-2 rounded-md hover:bg-blue-50"
            onClick={() => handleSelect("admin", "register")}
          >
            Register as Admin
          </button>
        </div>

        {/* Student Card */}
        <div className="border rounded-lg p-4 space-y-4 text-center">
          <div className="flex justify-center text-green-600">
            <UserRound size={40} />
          </div>
          <h3 className="font-semibold text-lg">Student</h3>
          <p className="text-sm text-gray-600">
            Take exams and view your results and performance
          </p>
          <button
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
            onClick={() => handleSelect("user", "login")}
          >
            Login as Student
          </button>
          <button
            className="w-full border border-green-600 text-green-600 py-2 rounded-md hover:bg-green-50"
            onClick={() => handleSelect("user", "register")}
          >
            Register as Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
