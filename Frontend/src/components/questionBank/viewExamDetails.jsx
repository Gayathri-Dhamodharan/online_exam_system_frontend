


import React, { useEffect, useState } from "react";
import { Calendar, Clock, FileText, ArrowLeft, X, Plus } from "lucide-react";
import { getSingleExam } from "../../service/Exams/examService";

const ViewExamDetails = ({
  selectedExam,
  setSelectedExam,
  selectedClass,
  selectedSubject,
  examQuestions,
  classSubjectExams,
  setClassSubjectExams,
  handleRemoveQuestionFromExam,
  handleAddQuestionToExam,
  availableQuestions,
  setCurrentStep,
}) => {
  const [examDetails, setExamDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("selectedExam:", selectedExam);
  console.log("examDetails:", examDetails);

  const fetchExamDetail = async () => {
    try {
      setLoading(true);

      let examId = null;

      // Extract exam ID from different possible structures
      if (typeof selectedExam === "string") {
        examId = selectedExam;
      } else if (selectedExam && selectedExam._id) {
        examId = selectedExam._id;
      } else if (selectedExam && selectedExam.id) {
        examId = selectedExam.id;
      }

      if (!examId) {
        console.error("No valid exam ID found");
        return;
      }

      const response = await getSingleExam(examId);
      console.log("API Response:", response);

      // Handle the response structure based on your API response format
      if (response && response.data) {
        console.log("Setting examDetails to:", response.data);
        setExamDetails(response.data);
        setSelectedExam(response.data);
      }
    } catch (error) {
      console.error("Error fetching exam details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedExam) {
      fetchExamDetail();
    }
  }, [selectedExam]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-teal-100 to-teal-600 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600">Loading exam details...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!examDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-teal-100 to-teal-600 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-red-600">
              Error loading exam details
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Helper functions
  const formatDate = (dateString) => {
    if (!dateString) return "No date set";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return "Invalid date";
    }
  };

  const getQuestionCount = () => {
    console.log("Getting question count for:", examDetails?.selectedQuestions); // Debug log
    if (
      examDetails?.selectedQuestions &&
      Array.isArray(examDetails.selectedQuestions)
    ) {
      return examDetails.selectedQuestions.length;
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-teal-100 to-teal-600 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {examDetails.title || "Exam Details"}
            </h1>
            <p className="text-gray-600 mt-2">
              {examDetails.class?.name ||
                selectedClass?.name ||
                "Unknown Class"}{" "}
              -{" "}
              {examDetails.subject?.name ||
                selectedSubject?.name ||
                "Unknown Subject"}
            </p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
              <span>
                <Calendar className="w-4 h-4 inline mr-1" />
                {formatDate(examDetails.startDate)}
              </span>
              <span>
                <Clock className="w-4 h-4 inline mr-1" />
                {examDetails.startTime || "No time set"}
              </span>
              <span>
                <Clock className="w-4 h-4 inline mr-1" />
                {examDetails.duration || 0} min
              </span>
              <span>
                <FileText className="w-4 h-4 inline mr-1" />
                {examDetails.totalMark || 0} marks
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
              Exam Questions ({getQuestionCount()})
            </h2>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {examDetails?.selectedQuestions &&
              Array.isArray(examDetails.selectedQuestions) &&
              examDetails.selectedQuestions.length > 0 ? (
                examDetails.selectedQuestions.map((questionObj, index) => {
                  console.log("Rendering question:", questionObj); // Debug log

                  // Handle the case where questionObj might be null or undefined
                  if (!questionObj) {
                    return (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="text-sm text-gray-500">
                          Question not found
                        </div>
                      </div>
                    );
                  }

                  const questionId = questionObj._id || questionObj.id;

                  return (
                    <div
                      key={questionId || index}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-medium text-gray-600">
                          Q{index + 1} -{" "}
                          {questionObj.questionType ||
                            questionObj.type ||
                            "Unknown Type"}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-teal-600 font-medium">
                            {questionObj.marks || 1} marks
                          </span>
                          {handleRemoveQuestionFromExam && (
                            <button
                              onClick={() =>
                                handleRemoveQuestionFromExam(questionId)
                              }
                              className="text-red-500 hover:text-red-700 transition-colors"
                              title="Remove from exam"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-800 text-sm mb-2">
                        {questionObj.questionText ||
                          "No question text available"}
                      </p>
                      {(questionObj.questionType === "multiple-choice" ||
                        questionObj.questionType === "MCQ" ||
                        questionObj.type === "MCQ") &&
                        questionObj.options && (
                          <div className="text-xs text-gray-600 mb-2">
                            Options:{" "}
                            {Array.isArray(questionObj.options)
                              ? questionObj.options
                                  .filter((opt) => opt && opt.trim())
                                  .join(", ")
                              : "No options available"}
                          </div>
                        )}
                      <p className="text-xs text-green-600">
                        Answer: {questionObj.answer || "No answer provided"}
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-2">
                    No questions in this exam yet.
                  </p>
                  <p className="text-xs text-gray-400">
                    Debug: selectedQuestions ={" "}
                    {JSON.stringify(examDetails?.selectedQuestions)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Available Questions to Add */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Available Questions (
              {availableQuestions ? availableQuestions.length : 0})
            </h2>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {availableQuestions &&
              Array.isArray(availableQuestions) &&
              availableQuestions.length > 0 ? (
                availableQuestions
                  .filter((question) => {
                    // Filter out questions that are already in the exam
                    const questionId = question._id || question.id;
                    // Check if this question ID exists in the selectedQuestions array
                    return !examDetails?.selectedQuestions?.some(
                      (selectedQuestion) =>
                        (selectedQuestion._id || selectedQuestion.id) ===
                        questionId
                    );
                  })
                  .map((question, index) => (
                    <div
                      key={question._id || question.id || index}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-medium text-gray-600">
                          {question.questionType ||
                            question.type ||
                            "Unknown Type"}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-teal-600 font-medium">
                            {question.marks || 1} marks
                          </span>
                          {handleAddQuestionToExam && (
                            <button
                              onClick={() =>
                                handleAddQuestionToExam(
                                  question._id || question.id
                                )
                              }
                              className="text-green-500 hover:text-green-700 transition-colors"
                              title="Add to exam"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-800 text-sm mb-2">
                        {question.questionText || "No question text available"}
                      </p>
                      <p className="text-xs text-green-600">
                        Answer: {question.answer || "No answer provided"}
                      </p>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-2">
                    No additional questions available to add.
                  </p>
                  <p className="text-xs text-gray-400">
                    Debug: availableQuestions ={" "}
                    {availableQuestions
                      ? availableQuestions.length
                      : "null/undefined"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewExamDetails;
