import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus, FileText, Edit2, Trash2, BookOpen } from "lucide-react";
import api from "../../../service/api";
import AddEditModal from "./AddEditModal";
import ExamModal     from "./ExamModal";

const CLASSES = [
  "1st Grade","2nd Grade","3rd Grade","4th Grade","5th Grade",
  "6th Grade","7th Grade","8th Grade","9th Grade","10th Grade",
];

export default function Questions() {
  const { subjectId } = useParams();  
  const nav = useNavigate();

  const [questions,  setQuestions]  = useState([]);
  const [subject,    setSubject]    = useState(null);
  const [classFilter, setClassFilter] = useState("All Classes");
  const [showAddQ,   setShowAddQ]   = useState(false);
  const [showEditQ,  setShowEditQ]  = useState(false);
  const [editPayload,setEditPayload]= useState(null);
  const [showExamModal, setShowExamModal] = useState(false);
  const [examClass,  setExamClass]  = useState(CLASSES[0]);
  const [examTitle,  setExamTitle]  = useState("");
  const [examDates,  setExamDates]  = useState({ startDate: "", endDate: "", duration: 30 });
  const [selectedQs, setSelectedQs] = useState([]);

  // 1) Don’t even try to load if there’s no subjectId
  useEffect(() => {
    if (!subjectId) return;
    console.log('subjectId: ',subjectId);
    const getSpecificSubjectDetais = async() =>{
        const result = api.get(`/`);
    }
  }, [subjectId]);

  // 2) Early return while loading subject
  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-teal-600 text-lg">Loading questions…</p>
      </div>
    );
  }

  const displayed =
    classFilter === "All Classes"
      ? questions
      : questions.filter(q => q.class === classFilter);

  function handleAddQ(q)       { /* … */ }
  function handleEditQ(id, u)  { /* … */ }
  function handleDelQ(id)      { /* … */ }
  function handleCreateExam()  { /* … */ }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* …header, filter, list markup unchanged… */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={() => nav(-1)}
            className="mr-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
          >
            <ArrowLeft className="text-teal-600" />
          </button>
          <h1 className="text-3xl font-bold text-teal-800">
            {subject.name} — Questions
          </h1>
        </div>

        {/* …rest of your existing JSX… */}
      </div>
    </div>
  );
}
