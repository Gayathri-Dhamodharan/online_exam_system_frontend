import React from "react";
import { Plus, Eye } from "lucide-react";

const QuestionDashboard = ({
  setCurrentStep,
  selectedClass,
  selectedSubject,
  questions,
  exams,
  questionsData,
}) => {
  // const selectID = localStorage.setItem(selectedClass.);
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-teal-100 to-teal-600 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Question Bank Dashboard
            </h1>
          </div>
          <button
            onClick={() => setCurrentStep("classSubject")}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Change Class/Subject
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Create Question Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Plus className="w-8 h-8 text-teal-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">
                Create Questions
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              Add new questions to your question bank for Class-{" "}
              {selectedClass?.name} {selectedSubject?.name}
            </p>
            <button
              onClick={() => setCurrentStep("createQuestion")}
              className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Start Creating Questions
            </button>
           
          </div>

          {/* View Exams Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Eye className="w-8 h-8 text-teal-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">
                View Question Paper
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              View and manage created exams for Class - {selectedClass?.name}{" "}
              {selectedSubject?.name}
            </p>
            <button
              onClick={() => setCurrentStep("viewExams")}
              className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors"
            >
              View All Exams
            </button>
            {/* <div className="mt-4 text-sm text-gray-500">
              Total Exams:{""}
              {
                exams.filter(
                  (e) =>
                    e.class === selectedClass?.name &&
                    e.subject === selectedSubject?.name
                ).length
              }
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDashboard;
