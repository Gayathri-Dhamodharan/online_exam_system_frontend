import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import api from "../../../service/api";

export default function ExamDetails() {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    api.get(`/exams/${id}`).then(r => setExam(r.data));
  }, [id]);

  useEffect(() => {
    if (exam) {
      api.get(`/questions?class=${exam.class}`).then(r => setQuestions(r.data));
    }
  }, [exam]);

  function removeFromExam(qId) { /* … */ }
  function addToExam(qId)    { /* … */ }

  if (!exam) return null;
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-teal-100 to-teal-600 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={() => nav(-1)}
            className="mr-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
          >
            <ArrowLeft className="text-teal-600" />
          </button>
          <h1 className="text-3xl font-bold text-teal-800">{exam.title}</h1>
        </div>

        {/* …render exam info + questions + add-more… */}
      </div>
    </div>
  );
}
