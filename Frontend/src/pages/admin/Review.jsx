import React, { useState, useMemo, useEffect } from "react";
import {
  Download,
  Filter,
  FileText,
  Table,
  User,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { getReview } from "../../service/Review/reviewService";

const Review = () => {
  const [cardData, setCardData] = useState({});
  const [tableData, setTableData] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedExam, setSelectedExam] = useState("");

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value.replace("Class ", ""));
  };

    const handleExamChange = (e) => {
    setSelectedExam(e.target.value);
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await getReview(selectedClass,selectedExam);
        console.log(response, "response");
        setCardData(response.data.card_data);
        setTableData(response.data.table_data);
      } catch (error) {
        console.log(error, "err");
      }
    };
    fetchDashboardData();
  }, [selectedClass,selectedExam]);

  const uniqueExams = ['AllExams','Unit Test', 'Mid Term', 'Quarterly', 'Half Yearly','Annual'];


  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className=" p-6 mb-6 flex justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
              <GraduationCap className="text-green-600" size={36} />
              Review Student Scores
            </h1>
            <p className="text-slate-600">
              Manage and export student performance data
            </p>
          </div>
          <div className="gap-4 px-4">
            <select
              value={selectedClass===""?`All Classes`:`Class ${selectedClass}`}

              onChange={handleClassChange}
              className="px-4 py-2 mx-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {/* Give the “All Classes” option an explicit empty-string value */}
              <option value="">All Classes</option>

              {[...Array(10)].map((_, i) => (
                <option key={i} value={`Class ${i + 1}`}>
                  Class {i + 1}
                </option>
              ))}
            </select>

            {/* <select
              value={selectedExam}
              onChange={handleExamChange}
              className="px-4 py-2 mx-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {uniqueExams.map((exam) => (
                <option key={exam} value={exam=== "AllExams" ? "" : exam}>
                  {exam}
                </option>
              ))}
            </select> */}
          </div>
        </div>

    
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-slate-700 mb-2">
              Total Students
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {cardData.total_student || 0}
            </p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-slate-700 mb-2">
              Average Score
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {cardData.avg_score}%
            </p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-slate-700 mb-2">
              Total Exams
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {cardData.total_exam}
            </p>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Class
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Exam
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Percentage
                  </th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Date
                  </th> */}
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Actions
                  </th> */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {tableData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      {item.student}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {item.class}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {item.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {item.exam}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {item.score}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {item.percentage} %
                    </td>

                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => sendStudentPDF(item.name)}
                        className="text-cyan-600 hover:text-cyan-900 flex items-center gap-1"
                        title="Send individual report"
                      >
                        <FileText size={16} />
                        Send PDF
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* {displayData.length === 0 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-12 text-center">
            <p className="text-gray-500 text-lg">
              No data found. Please select a class to view student scores.
            </p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Review;

// src/components/Review.js
