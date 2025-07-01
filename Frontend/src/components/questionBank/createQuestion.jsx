import React from 'react'
import {Edit,Trash2} from 'lucide-react'
import { useEffect } from 'react';
import api from '../../service/api';

const CreateQuestion = ({
  questions,
  selectedClass,
  selectedSubject,
  setCurrentStep,
  setCurrentQuestion,
  currentQuestion,
  classSubjectQuestions,
  setQuestions,
  handleEditQuestion,
  handleDeleteQuestion,
  resetCurrentQuestion,
}) => {
//  const id =localStorage.getItem("id");

useEffect(() => {
  (async () => {
    try {
      const { data } = await api.post("/api/questions");
      console.log("data",data);
      setCurrentQuestion(data);
      // setClasses(data);
    } catch (e) {
      console.error(e);
    }
  })();
}, []);


const handleCreateQuestion = () => {
    if (currentQuestion.questionText && currentQuestion.answer) {
      const newQuestion = {
        ...currentQuestion,
        id: Date.now(),
        class: selectedClass,
        subject: selectedSubject,
      };
      setQuestions([...questions, newQuestion]);
      resetCurrentQuestion();
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-teal-100 to-teal-600 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Create Questions - Class- {selectedClass}/ {selectedSubject}
          </h1>
          <div className="space-x-4">
            <button
              onClick={() => setCurrentStep("createExam")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Exam
            </button>
            <button
              onClick={() => setCurrentStep("dashboard")}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Question Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Add New Question
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
                onClick={handleCreateQuestion}
                className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Save Question
              </button>
            </div>
          </div>

          {/* Questions List */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Created Questions ({classSubjectQuestions.length})
            </h2>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {classSubjectQuestions.map((question, index) => (
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
                        onClick={() => handleEditQuestion(question)}
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(question.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
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

              {classSubjectQuestions.length === 0 && (
                <p className="text-gray-500 text-center py-8">
                  No questions created yet. Start by adding your first question!
                </p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CreateQuestion
