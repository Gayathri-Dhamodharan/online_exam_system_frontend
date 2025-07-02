import React from "react";
import {CheckCircle} from 'lucide-react'

const CompleteExam = ({
  selectedExam,
  answers,
  formatTime,
  timeLeft,
  setCurrentScreen,
  setSelectedExam,
  setAnswers,
  setCurrentQuestion,
  setQuestionStatuses,
  setTimeLeft

}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-md w-full text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Exam Completed!
        </h2>
        <p className="text-gray-600 mb-6">
          Your exam has been submitted successfully.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <h3 className="font-semibold text-gray-800 mb-2">
            {selectedExam.title}
          </h3>
          <p className="text-sm text-gray-600">
            Questions Answered: {Object.keys(answers).length} /{" "}
            {selectedExam?.questions?.length}
          </p>
          <p className="text-sm text-gray-600">
            Time Taken: {formatTime(selectedExam.duration * 60 - timeLeft)}
          </p>
        </div>
        <button
          onClick={() => {
            setCurrentScreen("examList");
            setSelectedExam(null);
            setAnswers({});
            setQuestionStatuses({});
            setCurrentQuestion(0);
            setTimeLeft(0);
          }}
          className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 font-medium"
        >
          Back to Exams
        </button>
      </div>
    </div>
  );
};

export default CompleteExam;
