import React from "react";
import { useNavigate } from "react-router-dom";
import { Plus, FileText } from "lucide-react";

export default function Dashboard() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-teal-800 mb-8 text-center">
          Question Bank Management
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            onClick={() => nav("subjects")}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-105"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-teal-400 to-teal-600 p-4 rounded-full group-hover:scale-110 transition-transform">
                <Plus size={32} className="text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-teal-800 text-center mb-4">
              Create Question Paper
            </h2>
            <p className="text-teal-600 text-center">
              Add, edit, and manage questions for different subjects and grades
            </p>
          </div>

          <div
            onClick={() => nav("created-papers")}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-105"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-teal-500 to-teal-700 p-4 rounded-full group-hover:scale-110 transition-transform">
                <FileText size={32} className="text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-teal-800 text-center mb-4">
              View Created Papers
            </h2>
            <p className="text-teal-600 text-center">
              Browse and manage your created examination papers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
