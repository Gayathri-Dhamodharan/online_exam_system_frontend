import React from 'react'
import { ArrowLeft, Save } from "lucide-react";

const EditQuestion = ({
  selectedClass,
  selectedSubject,
  setEditingQuestion,
  resetCurrentQuestion,
  setCurrentStep,
  currentQuestion,
  setCurrentQuestion,
  handleUpdateQuestion,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-teal-100 to-teal-600 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Edit Question - {selectedClass} {selectedSubject}
          </h1>
          <button
            onClick={() => {
              setEditingQuestion(null);
              resetCurrentQuestion();
              setCurrentStep("createQuestion");
            }}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 inline mr-2" />
            Back
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Edit Question
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question Type
              </label>
              <select
                value={currentQuestion.type}
                onChange={(e) =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    type: e.target.value,
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                <option value="MCQ">Multiple Choice (MCQ)</option>
                <option value="True/False">True or False</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question Text
              </label>
              <textarea
                value={currentQuestion.questionText}
                onChange={(e) =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    questionText: e.target.value,
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                rows="3"
                placeholder="Enter your question here..."
              />
            </div>

            {currentQuestion.type === "MCQ" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Options
                </label>
                {currentQuestion.options.map((option, index) => (
                  <input
                    key={index}
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...currentQuestion.options];
                      newOptions[index] = e.target.value;
                      setCurrentQuestion({
                        ...currentQuestion,
                        options: newOptions,
                      });
                    }}
                    className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-teal-500"
                    placeholder={`Option ${index + 1}`}
                  />
                ))}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correct Answer
              </label>
              {currentQuestion.type === "True/False" ? (
                <select
                  value={currentQuestion.answer}
                  onChange={(e) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      answer: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Select Answer</option>
                  <option value="True">True</option>
                  <option value="False">False</option>
                </select>
              ) : (
                <input
                  value={currentQuestion.answer}
                  onChange={(e) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      answer: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter correct answer"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Marks
              </label>
              <input
                type="number"
                value={currentQuestion.marks}
                onChange={(e) =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    marks: parseInt(e.target.value) || 1,
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                min="1"
              />
            </div>

            <button
              onClick={handleUpdateQuestion}
              className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors"
            >
              <Save className="w-4 h-4 inline mr-2" />
              Update Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditQuestion;
