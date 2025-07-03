

import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Eye, Calendar, Trophy, Target } from "lucide-react";
import { getresult } from "../../service/Result/result";
import { useDispatch, useSelector } from "react-redux";
import { setResultDetails } from "../../redux/Slice/resultSlice";

const Result = () => {
  const [examHistory, setExamHistory] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const dispatch = useDispatch();
  const resultDetails = useSelector((state) => state.result.resultDetails);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await getresult();
        setExamHistory(response.data.attendedExams || []);
        dispatch(setResultDetails(response.data.attendedExams));
      } catch (error) {
        console.log(error, "err");
      }
    };
    fetchResults();
  }, []);

  console.log(resultDetails, "resultDetails>>>>");

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
    const correct = selectedResult.correctAnswers ?? selectedResult.score ?? 0;
    const total = selectedResult.totalQues ?? correct;
    const wrong = selectedResult.wrongAnswers ?? Math.max(total - correct, 0);
    const pieData = createPieData(correct, wrong);

    return (
      <div className="min-h-screen p-6 bg-gradient-to-br from-teal-50 to-teal-200">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={handleBackToMain}
            className="mb-6 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            ← Back to Dashboard
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-teal-800 mb-2">
                {selectedResult.title}
              </h1>
        
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-teal-800 mb-4 text-center">
                  Answer Distribution
                </h2>
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
                  <p className="text-3xl font-bold">
                    {correct}/{total}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">✓</span>
                    </div>
                    <p className="text-green-700 font-semibold">{correct}</p>
                    <p className="text-green-600 text-sm">Correct</p>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                    <div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">✗</span>
                    </div>
                    <p className="text-red-700 font-semibold">{wrong}</p>
                    <p className="text-red-600 text-sm">Wrong</p>
                  </div>
                </div>

                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-teal-600" />
                    <span className="font-semibold text-teal-800">
                      Accuracy Rate
                    </span>
                  </div>
                  <div className="w-full bg-teal-200 rounded-full h-3">
                    <div
                      className="bg-teal-600 h-3 rounded-full transition-all duration-500"
                      style={{
                        width: `${(correct / total) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-right text-sm text-teal-600 mt-1">
                    {((correct / total) * 100).toFixed(1)}%
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
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-teal-800 mb-2">
            Student Result Dashboard
          </h1>
          <p className="text-teal-600">
            Track your academic progress and performance
          </p>
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
                    Score
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
                {examHistory.map((exam, index) => {
                  const score = exam.score ?? 0;
                  const total = exam.totalQues ?? 1;
                  const percent = ((score / total) * 100).toFixed(1);

                  return (
                    <tr
                      key={exam._id}
                      className={`border-b border-gray-100 hover:bg-teal-25 transition-colors ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <td className="p-4 font-medium text-gray-800">
                        {exam.title}
                      </td>
                      <td className="p-4 text-gray-600">
                        {new Date(exam.startDate).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-center">
                        {score}/{total}
                      </td>
                      <td className="p-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            percent >= 80
                              ? "bg-green-100 text-green-800"
                              : percent >= 60
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {percent}%
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
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
