import React from 'react'
import {Clock, Calendar, Timer, Award, } from 'lucide-react'
import api from '../../service/api';

const ExamList = ({exams, getDifficultyColor, getDaysLeftColor, startExam }) => {

  const className = localStorage.getItem("class");

// useEffect(async() => {
//   try {}
//     const response = await api.get(`/api/exams/${className}`);
//     console.log(response.data, "response data from exam list")
//   } catch (error) {
//      console.error("Error fetching exams:",error);    
//   }

//   return () => {
    
//   }
// }, [third])


  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-6">
            <Clock className="text-teal-600 mr-3" size={28} />
            <h1 className="text-3xl font-bold text-gray-800">
              Upcoming Examinations
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="p-6 pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {exam.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {exam.subject}
                      </p>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                          exam.difficulty
                        )}`}
                      >
                        {exam.difficulty}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getDaysLeftColor(
                          exam.daysLeft
                        )}`}
                      >
                        {exam.daysLeft} days left
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{exam.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{exam.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Timer className="w-4 h-4 mr-2" />
                      <span>{exam.duration} min</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="w-4 h-4 mr-2" />
                      <span>{exam.totalMarks} marks</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Questions:</span>{" "}
                    {exam.questionsCount} •{" "}
                    <span className="font-medium">Instructions:</span>{" "}
                    {exam.instructions}
                  </p>
                </div>
                <div className="px-6 pb-6">
                  <button
                    onClick={() => startExam(exam)}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    <span className="mr-2">▶</span>
                    Start Exam
                    <span className="ml-2">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}

export default ExamList