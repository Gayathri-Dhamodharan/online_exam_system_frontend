import React, { useDebugValue, useEffect, useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  Clock,
  FileText,
  Eye,
} from "lucide-react";
import { getExamApi } from "../../service/Exams/examService";

const ViewExams = ({
  selectedClass,
  selectedExam,
  selectedSubject,
  setCurrentStep,
  setSelectedExam,
  classSubjectExams,
  getDifficultyText,
  setClassSubjectExams,
  handleEditExam,
  handleDeleteExam,
  getDifficultyColor,
}) => {
  console.log(selectedExam, "from teh view exam");
  const [examId, setExamId] = useState();

  const handleViewExamDetails = async () => {
    try {
      let subjectId = selectedSubject._id;
      let classId = selectedClass._id;
      const response = await getExamApi(classId, subjectId);

      // Fix: Access the nested data array
      if (
        response.data &&
        response.data.data &&
        Array.isArray(response.data.data)
      ) {
        setClassSubjectExams(response.data.data);
      } else if (Array.isArray(response.data)) {
        setClassSubjectExams(response.data);
      } else {
        console.log("Unexpected response structure:", response);
        setClassSubjectExams([]);
      }
    } catch (error) {
      console.log(error, "err");
      setClassSubjectExams([]); // Set empty array on error
    }
  };

  console.log(classSubjectExams, " response frm exam");

  useEffect(() => {
    handleViewExamDetails();
    console.log("initallty>>");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-teal-100 to-teal-600 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            View Exams - {selectedClass?.name} {selectedSubject?.name}
          </h1>
          <div className="space-x-4">
            <button
              onClick={() => setCurrentStep("createExam")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 inline mr-2" />
              Add Exam
            </button>
            <button
              onClick={() => setCurrentStep("dashboard")}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {classSubjectExams.map((exam) => (
            <div
              key={exam._id || exam.id} // Use _id as fallback since your data shows _id
              className="bg-white rounded-xl shadow-lg p-6 relative"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {exam.title || "Untitled Exam"} {/* Add fallback */}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {exam.subject?.name || exam.subject}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                      exam.selectedQuestions?.length || exam.questionsCount || 0
                    )}`}
                  >
                    {getDifficultyText(
                      exam.selectedQuestions?.length || exam.questionsCount || 0
                    )}
                  </span>
                  <button
                    onClick={() => handleEditExam(exam)}
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteExam(exam._id || exam.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    {exam.startDate
                      ? new Date(exam.startDate).toLocaleDateString()
                      : exam.date || "No date set"}
                  </span>
                </div>

                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    {exam.startTime || exam.time || "No time set"}
                  </span>
                </div>

                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">{exam.duration || 0} min</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <FileText className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    {exam.totalMark || exam.totalMarks || 0} marks
                  </span>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-500">
                Questions:{" "}
                {exam.selectedQuestions?.length || exam.questionsCount || 0} •
                Pass Mark: {exam.passMark || exam.passMarks || 0}
              </div>

              <button
                onClick={() => {
                  setCurrentStep("viewExamDetails");
                  // Pass the entire exam object instead of just the ID
                  setSelectedExam(exam);
                  console.log("Setting selected exam:", exam);
                }}
                className="mt-4 w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors"
              >
                <Eye className="w-4 h-4 inline mr-2" />
                View Exam
              </button>
            </div>
          ))}

          {classSubjectExams.length === 0 && (
            <div className="col-span-2 text-center py-12">
              <p className="text-gray-500 text-lg">
                No exams created yet for {selectedClass?.name}{" "}
                {selectedSubject?.name}
              </p>
              <button
                onClick={() => setCurrentStep("createQuestion")}
                className="mt-4 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Create Your First Exam
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewExams;

