import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Eye, Calendar, Trophy, Target } from 'lucide-react';

const Result = () => {
  const [selectedResult, setSelectedResult] = useState(null);

  // Sample current result data
  const currentResult = {
    examName: "Mathematics Final Exam",
    date: "2024-06-25",
    totalQuestions: 50,
    correctAnswers: 38,
    wrongAnswers: 12,
    totalMarks: 100,
    obtainedMarks: 76,
    percentage: 76
  };

  // Sample previous exam data
  const examHistory = [
    {
      id: 1,
      examName: "Physics Mid-term",
      date: "2024-06-20",
      totalMarks: 80,
      obtainedMarks: 65,
      percentage: 81.25,
      correctAnswers: 26,
      wrongAnswers: 6,
      totalQuestions: 32
    },
    {
      id: 2,
      examName: "Chemistry Quiz",
      date: "2024-06-18",
      totalMarks: 50,
      obtainedMarks: 42,
      percentage: 84,
      correctAnswers: 21,
      wrongAnswers: 4,
      totalQuestions: 25
    },
    {
      id: 3,
      examName: "Biology Test",
      date: "2024-06-15",
      totalMarks: 75,
      obtainedMarks: 58,
      percentage: 77.33,
      correctAnswers: 23,
      wrongAnswers: 7,
      totalQuestions: 30
    },
    {
      id: 4,
      examName: "English Literature",
      date: "2024-06-12",
      totalMarks: 60,
      obtainedMarks: 48,
      percentage: 80,
      correctAnswers: 24,
      wrongAnswers: 6,
      totalQuestions: 30
    }
  ];

  // const createPieData = (correct, wrong) => [
  //   { name: 'Correct Answers', value: correct, color: '#10B981' },
  //   { name: 'Wrong Answers', value: wrong, color: '#EF4444' }
  // ];

  // const CustomTooltip = ({ active, payload }) => {
  //   if (active && payload && payload.length) {
  //     const data = payload[0];
  //     return (
  //       <div className="bg-white p-3 rounded-lg shadow-lg border border-teal-200">
  //         <p className="font-medium" style={{ color: data.payload.color }}>
  //           {data.name}: {data.value}
  //         </p>
  //         <p className="text-sm text-gray-600">
  //           {((data.value / (data.payload.payload.correct + data.payload.payload.wrong)) * 100).toFixed(1)}%
  //         </p>
  //       </div>
  //     );
  //   }
  //   return null;
  // };

  const createPieData = (correct, wrong) => {
    const total = correct + wrong;
    return [
      { name: "Correct Answers", value: correct, color: "#10B981", total },
      { name: "Wrong Answers", value: wrong, color: "#EF4444", total },
    ];
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const { name, value, color, total } = data.payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-teal-200">
          <p className="font-medium" style={{ color }}>
            {name}: {value}
          </p>
          <p className="text-sm text-gray-600">
            {((value / total) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  const handleViewResult = (exam) => {
    setSelectedResult(exam);
  };

  const handleBackToMain = () => {
    setSelectedResult(null);
  };

  if (selectedResult) {
    const pieData = createPieData(selectedResult.correctAnswers, selectedResult.wrongAnswers);
    
    return (
      <div className="min-h-screen p-6" style={{ background: 'linear-gradient(135deg, #E6FFFA 0%, #B2F5EA 50%, #4FD1C7 100%)' }}>
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={handleBackToMain}
            className="mb-6 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            ← Back to Dashboard
          </button>
          
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-teal-800 mb-2">{selectedResult.examName}</h1>
              <p className="text-teal-600 flex items-center justify-center gap-2">
                <Calendar size={16} />
                {selectedResult.date}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-teal-800 mb-4 text-center">Answer Distribution</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl p-6 text-center">
                  <Trophy className="w-8 h-8 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold mb-1">Final Score</h3>
                  <p className="text-3xl font-bold">{selectedResult.obtainedMarks}/{selectedResult.totalMarks}</p>
                  <p className="text-teal-100">({selectedResult.percentage.toFixed(1)}%)</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">✓</span>
                    </div>
                    <p className="text-green-700 font-semibold">{selectedResult.correctAnswers}</p>
                    <p className="text-green-600 text-sm">Correct</p>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                    <div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">✗</span>
                    </div>
                    <p className="text-red-700 font-semibold">{selectedResult.wrongAnswers}</p>
                    <p className="text-red-600 text-sm">Wrong</p>
                  </div>
                </div>

                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-teal-600" />
                    <span className="font-semibold text-teal-800">Accuracy Rate</span>
                  </div>
                  <div className="w-full bg-teal-200 rounded-full h-3">
                    <div 
                      className="bg-teal-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(selectedResult.correctAnswers / selectedResult.totalQuestions) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-right text-sm text-teal-600 mt-1">
                    {((selectedResult.correctAnswers / selectedResult.totalQuestions) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main dashboard view
  const currentPieData = createPieData(currentResult.correctAnswers, currentResult.wrongAnswers);

  return (
    <div
      className="min-h-screen p-6 bg-gradient-to-br from-slate-50 to-slate-100" 
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-teal-800 mb-2">
            Student Result Dashboard
          </h1>
          <p className="text-teal-600">
            Track your academic progress and performance
          </p>
        </div>

        {/* Current Result Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-teal-800 mb-6 text-center">
            Current Result
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-teal-800 mb-4 text-center">
                Answer Distribution
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={currentPieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={90}
                      dataKey="value"
                    >
                      {currentPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3">
                  {currentResult.examName}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <Calendar size={16} />
                  <span>{currentResult.date}</span>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold">
                    {currentResult.obtainedMarks}/{currentResult.totalMarks}
                  </p>
                  <p className="text-teal-100">({currentResult.percentage}%)</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <div className="w-10 h-10 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <p className="text-green-700 font-bold text-xl">
                    {currentResult.correctAnswers}
                  </p>
                  <p className="text-green-600">Correct Answers</p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                  <div className="w-10 h-10 bg-red-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white font-bold">✗</span>
                  </div>
                  <p className="text-red-700 font-bold text-xl">
                    {currentResult.wrongAnswers}
                  </p>
                  <p className="text-red-600">Wrong Answers</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Previous Exams Table */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-teal-800 mb-6">
            Previous Exam Results
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-teal-50 border-b border-teal-200">
                  <th className="text-left p-4 font-semibold text-teal-800">
                    Exam Name
                  </th>
                  <th className="text-left p-4 font-semibold text-teal-800">
                    Date
                  </th>
                  <th className="text-center p-4 font-semibold text-teal-800">
                    Marks
                  </th>
                  <th className="text-center p-4 font-semibold text-teal-800">
                    Percentage
                  </th>
                  <th className="text-center p-4 font-semibold text-teal-800">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {examHistory.map((exam, index) => (
                  <tr
                    key={exam.id}
                    className={`border-b border-gray-100 hover:bg-teal-25 transition-colors ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="p-4 font-medium text-gray-800">
                      {exam.examName}
                    </td>
                    <td className="p-4 text-gray-600">{exam.date}</td>
                    <td className="p-4 text-center">
                      <span className="font-semibold">
                        {exam.obtainedMarks}/{exam.totalMarks}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          exam.percentage >= 80
                            ? "bg-green-100 text-green-800"
                            : exam.percentage >= 70
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {exam.percentage.toFixed(1)}%
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleViewResult(exam)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                      >
                        <Eye size={16} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;