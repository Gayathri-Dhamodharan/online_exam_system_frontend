import React from "react";
import{X,Clock,Menu} from "lucide-react"

const ExamConductingTab = ({
  isMobile,
  setShowQuestionMenu,
  selectedExam,
  formatTime,
  timeLeft,
  navigateToQuestion,
  getQuestionStatusColor,
  questionStatuses,
  showQuestionMenu,
  currentQuestion,
  qData,
  answers,
  setAnswers,
  submitExam,
  markForReview,
  saveAnswer,
  exams


}) => {

  console.log(selectedExam,"selectedExam>>>>>");
  console.log(qData,"11111111111111qData>>>>");
  return (
     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header */}
        <div className="bg-white shadow-sm p-4 border-b border-gray-100">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {isMobile && (
                <button
                  onClick={() => setShowQuestionMenu(true)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  <Menu className="w-5 h-5" />
                </button>
              )}
              <h2 className="text-lg font-semibold text-gray-800">
                {selectedExam.title}
              </h2>
            </div>
            <div className="flex items-center space-x-2 text-red-600 font-mono text-lg">
              <Clock className="w-5 h-5" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto p-4 gap-4">
          {/* Sidebar / Menu */}
          {!isMobile && (
            <div className="w-full lg:w-64 bg-white rounded-xl shadow-sm border border-gray-100 p-4 h-fit">
              <h3 className="font-semibold mb-4 text-gray-800">
                Questions
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {selectedExam?.selectedQuestions?.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => navigateToQuestion(idx)}
                    className={`w-10 h-10 rounded-md text-sm font-medium transition-colors ${getQuestionStatusColor(
                      questionStatuses[idx]
                    )}`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-purple-500 rounded"></div>
                  <span>For Review</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span>Current</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                  <span>Not Visited</span>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Question Menu Modal */}
          {isMobile && showQuestionMenu && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 w-full max-w-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-800">
                    Questions
                  </h3>
                  <button
                    onClick={() => setShowQuestionMenu(false)}
                    className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {selectedExam?.selectedQuestions.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => navigateToQuestion(idx)}
                      className={`w-10 h-10 rounded-md text-sm font-medium transition-colors ${getQuestionStatusColor(
                        questionStatuses[idx]
                      )}`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-purple-500 rounded"></div>
                    <span>For Review</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span>Current</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                    <span>Not Visited</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Question Panel */}
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Question {currentQuestion + 1} of{" "}
                  {selectedExam?.selectedQuestions?.length}
                </h3>
                <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  {qData?.type === "mcq"
                    ? "Multiple Choice"
                    : "True / False"}
                </span>
              </div>
              <p className="text-gray-700 text-lg mb-6">
                {qData?.questionText
                }
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {qData?.options?.map((opt, idx) => (
                <label
                  key={idx}
                  className="flex items-center space-x-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={idx}
                    checked={answers[currentQuestion] === idx}
                    onChange={() =>
                      setAnswers((prev) => ({
                        ...prev,
                        [currentQuestion]: idx,
                      }))
                    }
                    className="text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-gray-700">{opt}</span>
                </label>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() =>
                  saveAnswer(currentQuestion, answers[currentQuestion])
                }
                disabled={answers[currentQuestion] === undefined}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Save Answer
              </button>
              <button
                onClick={() => markForReview(currentQuestion)}
                className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Mark for Review
              </button>
              <div className="flex-1"></div>
              <button
                onClick={submitExam}
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Submit Exam
              </button>
            </div>

            <div className="flex justify-between mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() =>
                  navigateToQuestion(Math.max(0, currentQuestion - 1))
                }
                disabled={currentQuestion === 0}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  navigateToQuestion(
                    Math.min(
                      selectedExam?.selectedQuestions.length - 1,
                      currentQuestion + 1
                    )
                  )
                }
                disabled={
                  currentQuestion === selectedExam?.selectedQuestions?.length - 1
                }
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ExamConductingTab;
