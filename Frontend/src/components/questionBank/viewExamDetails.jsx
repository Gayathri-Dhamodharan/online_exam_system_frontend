import React from "react";
import { Calendar, Clock, FileText, ArrowLeft, X, Plus } from "lucide-react";

const ViewExamDetails = ({
  selectedExam,
  selectedClass,
  selectedSubject,
  examQuestions,
  handleRemoveQuestionFromExam,
  handleAddQuestionToExam,
  availableQuestions,
  setCurrentStep,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-teal-100 to-teal-600 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {selectedExam.title}
            </h1>
            <p className="text-gray-600 mt-2">
              {selectedClass?.name} - {selectedSubject?.name}
            </p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
              <span>
                <Calendar className="w-4 h-4 inline mr-1" />
                {selectedExam.date}
              </span>
              <span>
                <Clock className="w-4 h-4 inline mr-1" />
                {selectedExam.time}
              </span>
              <span>
                <Clock className="w-4 h-4 inline mr-1" />
                {selectedExam.duration} min
              </span>
              <span>
                <FileText className="w-4 h-4 inline mr-1" />
                {selectedExam.totalMarks} marks
              </span>
            </div>
          </div>
          <button
            onClick={() => setCurrentStep("viewExams")}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 inline mr-2" />
            Back to Exams
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Exam Questions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Exam Questions ({examQuestions.length})
            </h2>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {examQuestions.map((question, index) => (
                <div
                  key={question.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      Q{index + 1} - {question.type}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-teal-600 font-medium">
                        {question.marks} marks
                      </span>
                      <button
                        onClick={() =>
                          handleRemoveQuestionFromExam(question.id)
                        }
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Remove from exam"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-800 text-sm mb-2">
                    {question.questionText}
                  </p>
                  {question.type === "MCQ" && question.options && (
                    <div className="text-xs text-gray-600 mb-2">
                      Options:{" "}
                      {question.options.filter((opt) => opt).join(", ")}
                    </div>
                  )}
                  <p className="text-xs text-green-600">
                    Answer: {question.answer}
                  </p>
                </div>
              ))}

              {examQuestions.length === 0 && (
                <p className="text-gray-500 text-center py-8">
                  No questions in this exam yet.
                </p>
              )}
            </div>
          </div>

          {/* Available Questions to Add */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Available Questions ({availableQuestions.length})
            </h2>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {availableQuestions.map((question, index) => (
                <div
                  key={question.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      {question.type}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-teal-600 font-medium">
                        {question.marks} marks
                      </span>
                      <button
                        onClick={() => handleAddQuestionToExam(question.id)}
                        className="text-green-500 hover:text-green-700 transition-colors"
                        title="Add to exam"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-800 text-sm mb-2">
                    {question.questionText}
                  </p>
                  <p className="text-xs text-green-600">
                    Answer: {question.answer}
                  </p>
                </div>
              ))}

              {availableQuestions.length === 0 && (
                <p className="text-gray-500 text-center py-8">
                  No additional questions available to add.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewExamDetails;
