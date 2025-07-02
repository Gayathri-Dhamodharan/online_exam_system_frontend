import React from 'react'

const Instructions = ({selectedExam, commonInstructions, setCurrentScreen, beginExam}) => {
  return (
     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Exam Instructions
            </h2>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">
                {selectedExam.title}
              </h3>
              <p className="text-gray-600">
                Duration: {selectedExam.duration} minutes | Total Marks:{" "}
                {selectedExam.totalMarks}
              </p>
            </div>
            <ul className="mb-8 space-y-2">
              {commonInstructions.map((inst, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  <span className="text-gray-700">{inst}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setCurrentScreen("examList")}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={beginExam}
                className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 font-medium"
              >
                Start Exam
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Instructions