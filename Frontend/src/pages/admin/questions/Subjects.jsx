import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import api from "../../../service/api";

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const nav = useNavigate();

  useEffect(()=>{
    const subjectApiCall = async() =>{
        const result = await api.get(`/api/subjects`);
        setSubjects(result.data);
    }
    subjectApiCall();
  },[]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={() => nav(-1)}
            className="mr-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
          >
            <ArrowLeft className="text-teal-600" />
          </button>
          <h1 className="text-3xl font-bold text-teal-800">Select Subject</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subjects.map(s => (
            <div
              key={s._id}
              // navigate up one segment + into the subjectId param
              onClick={() => nav(`../${s._id}`)}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-teal-400 to-teal-600 p-3 rounded-full group-hover:scale-110 transition-transform">
                  <BookOpen size={24} className="text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-teal-800 text-center">
                {s.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
