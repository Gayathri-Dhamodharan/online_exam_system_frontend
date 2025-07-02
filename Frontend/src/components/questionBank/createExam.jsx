import React from "react";

const CreateExam = ({
  selectedClass,
  selectedSubject,
  setCurrentStep,
  currentExam,
  setCurrentExam,
  classSubjectQuestions,
  handleCreateExam,
  // getAllQuestions,
  questionsData ,
}) => {
  console.log(questionsData, "questionsData");
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-teal-100 to-teal-600 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Create Exam - {selectedClass?.name} {selectedSubject?.name}
          </h1>
          <button
            onClick={() => setCurrentStep("createQuestion")}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to Questions
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Exam Title
              </label>
              <input
                value={currentExam.title}
                onChange={(e) =>
                  setCurrentExam({ ...currentExam, title: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Enter exam title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={currentExam.date}
                onChange={(e) =>
                  setCurrentExam({ ...currentExam, date: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time
              </label>
              <input
                type="time"
                value={currentExam.time}
                onChange={(e) =>
                  setCurrentExam({ ...currentExam, time: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (minutes)
              </label>
              <input
                type="number"
                value={currentExam.duration}
                onChange={(e) =>
                  setCurrentExam({ ...currentExam, duration: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="e.g., 60"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Questions
            </label>
            <div className="border border-gray-300 rounded-lg p-4 max-h-60 overflow-y-auto">
              {questionsData.map((question, index) => (
                <div
                  key={question._id}
                  className="flex items-center space-x-3 mb-3"
                >
                  <input
                    type="checkbox"
                    checked={currentExam.selectedQuestions.includes(
                      question._id
                    )}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCurrentExam({
                          ...currentExam,
                          selectedQuestions: [
                            ...currentExam.selectedQuestions,
                            question._id,
                          ],
                        });
                      } else {
                        setCurrentExam({
                          ...currentExam,
                          selectedQuestions:
                            currentExam.selectedQuestions.filter(
                              (id) => id !== question._id
                            ),
                        });
                      }
                    }}
                    className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">
                      {question.questionText}
                    </p>
                    <p className="text-xs text-gray-500">
                      {question.type} - {question.marks} marks
                    </p>
                  </div>
                </div>
              ))}

              {classSubjectQuestions.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  No questions available. Please create questions first.
                </p>
              )}
            </div>
          </div>

          <button
            onClick={handleCreateExam}
            disabled={
              !currentExam.title ||
              !currentExam.date ||
              !currentExam.time ||
              !currentExam.duration ||
              currentExam.selectedQuestions.length === 0
            }
            className="mt-6 w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Create Exam
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateExam;
