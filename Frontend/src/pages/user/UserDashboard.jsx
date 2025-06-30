

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  BookOpen,
  Calendar,
  TrendingUp,
  AlertCircle,
  Award,
  Clock,
} from "lucide-react";

const UserDashboard = () => {
  // Sample data for the dashboard
  const statsData = {
    questionsAttended: 145,
    upcomingExams: 3,
    highestScoreSubject: "Mathematics",
    subjectToFocus: "Physics",
  };

  // Sample data for bar chart - last attended exams
  const examData = [
    { subject: "Math", percentage: 92 },
    { subject: "Physics", percentage: 76 },
    { subject: "Chemistry", percentage: 88 },
    { subject: "Biology", percentage: 94 },
    { subject: "English", percentage: 82 },
  ];

  // Sample data for upcoming exams table
  const upcomingExams = [
    {
      id: 1,
      subject: "Advanced Mathematics",
      title: "Calculus & Integration",
      date: "2024-07-15",
      score: "Not Attempted",
    },
    {
      id: 2,
      subject: "Organic Chemistry",
      title: "Reaction Mechanisms",
      date: "2024-07-18",
      score: "Not Attempted",
    },
    {
      id: 3,
      subject: "Modern Physics",
      title: "Quantum Mechanics",
      date: "2024-07-20",
      score: "Not Attempted",
    },
  ];

  const StatCard = ({ title, value, icon: Icon, gradient }) => (
    <div
      className={`${gradient} rounded-xl p-6 text-teal-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-teal-700 mb-2">{title}</p>
          <p className="text-2xl font-bold text-teal-900">{value}</p>
        </div>
        <div className="bg-teal-200/50 p-3 rounded-lg">
          <Icon size={24} className="text-teal-700" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Student Dashboard
          </h1>
          <p className="text-gray-600">
            Track your academic progress and upcoming examinations
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Questions Attended"
            value={statsData.questionsAttended}
            icon={BookOpen}
            gradient="bg-gradient-to-br from-teal-50 to-teal-150"
          />
          <StatCard
            title="Upcoming Exams"
            value={statsData.upcomingExams}
            icon={Calendar}
            gradient="bg-gradient-to-br from-teal-50 to-teal-150"
          />
          <StatCard
            title="Highest Scored Subject"
            value={statsData.highestScoreSubject}
            icon={Award}
            gradient="bg-gradient-to-br from-teal-50 to-teal-150"
          />
          <StatCard
            title="Subject to Focus"
            value={statsData.subjectToFocus}
            icon={AlertCircle}
            gradient="bg-gradient-to-br from-teal-50 to-teal-150"
          />
        </div>

        {/* Charts and Table Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6 order-1 lg:order-none">
            <div className="flex items-center mb-6">
              <TrendingUp className="text-teal-600 mr-3" size={24} />
              <h2 className="text-xl font-semibold text-gray-800">
                Recent Exam Performance
              </h2>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={examData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="subject"
                    tick={{ fontSize: 12 }}
                    stroke="#6b7280"
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    stroke="#6b7280"
                    domain={[0, 100]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [`${value}%`, "Score"]}
                  />
                  <Bar
                    dataKey="percentage"
                    fill="url(#tealGradient)"
                    radius={[4, 4, 0, 0]}
                  />
                  <defs>
                    <linearGradient
                      id="tealGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#14b8a6" />
                      <stop offset="100%" stopColor="#0f766e" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Upcoming Exams Table */}
          <div className="bg-white rounded-xl shadow-lg p-6 order-2 lg:order-none">
            <div className="flex items-center mb-6">
              <Clock className="text-teal-600 mr-3" size={24} />
              <h2 className="text-xl font-semibold text-gray-800">
                Upcoming Examinations
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-teal-50 to-teal-100">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-teal-800 rounded-tl-lg">
                      Subject
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-teal-800">
                      Title
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-teal-800">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-teal-800 rounded-tr-lg">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingExams.map((exam, index) => (
                    <tr
                      key={exam.id}
                      className={`border-b border-gray-100 hover:bg-teal-50 transition-colors duration-200 ${
                        index === upcomingExams.length - 1 ? "border-b-0" : ""
                      }`}
                    >
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">
                        {exam.subject}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {exam.title}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {exam.date}
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          {exam.score}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-8 bg-gradient-to-r from-teal-500 to-teal-700 rounded-xl p-6 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Keep Up the Great Work!
              </h3>
              <p className="text-teal-100">
                You're making excellent progress. Focus on Physics to improve
                your overall performance.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="bg-white text-teal-600 px-6 py-2 rounded-lg font-medium hover:bg-teal-50 transition-colors duration-200">
                View Detailed Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

// import React, { useState, useEffect } from "react";
// import {
//   BookOpen,
//   Calendar,
//   TrendingUp,
//   AlertCircle,
//   Award,
//   Clock,
// } from "lucide-react";
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
// } from "recharts";
// import { getAvailableExams } from "../../service/api";

// const UserDashboard = () => {
//   const [statsData, setStatsData] = useState({
//     questionsAttended: 0,
//     upcomingExams: 0,
//     highestScoreSubject: "",
//     subjectToFocus: "",
//   });
//   const [examData, setExamData] = useState([]);
//   const [upcomingExams, setUpcomingExams] = useState([]);

//   useEffect(() => {
//     getAvailableExams().then((res) => {
//       const exams = res.data;
//       setUpcomingExams(exams);

//       setStatsData((s) => ({
//         ...s,
//         upcomingExams: exams.length,
//       }));

//       // simulate last 5 performance entries
//       setExamData(
//         exams.slice(0, 5).map((e, i) => ({
//           subject: e.subject,
//           percentage: Math.floor(Math.random() * 100),
//         }))
//       );
//     });
//   }, []);

//   const StatCard = ({ title, value, icon: Icon }) => (
//     <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm font-medium text-gray-700">{title}</p>
//           <p className="text-2xl font-bold text-gray-900">{value}</p>
//         </div>
//         <div className="bg-gray-100 p-3 rounded-lg">
//           <Icon size={24} className="text-gray-700" />
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">
//             Student Dashboard
//           </h1>
//           <p className="text-gray-600">
//             Track your academic progress and upcoming exams
//           </p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <StatCard
//             title="Questions Attended"
//             value={statsData.questionsAttended}
//             icon={BookOpen}
//           />
//           <StatCard
//             title="Upcoming Exams"
//             value={statsData.upcomingExams}
//             icon={Calendar}
//           />
//           <StatCard
//             title="Highest Scored Subject"
//             value={statsData.highestScoreSubject || "Math"}
//             icon={Award}
//           />
//           <StatCard
//             title="Subject to Focus"
//             value={statsData.subjectToFocus || "Physics"}
//             icon={AlertCircle}
//           />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Bar Chart */}
//           <div className="bg-white rounded-xl p-6 shadow-lg">
//             <div className="flex items-center mb-6">
//               <TrendingUp className="text-gray-600 mr-3" size={24} />
//               <h2 className="text-xl font-semibold text-gray-800">
//                 Recent Exam Performance
//               </h2>
//             </div>
//             <div className="h-80">
//               <ResponsiveContainer>
//                 <BarChart
//                   data={examData}
//                   margin={{ top: 20, right: 30, bottom: 5 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                   <XAxis dataKey="subject" stroke="#6b7280" />
//                   <YAxis stroke="#6b7280" domain={[0, 100]} />
//                   <Tooltip />
//                   <Bar dataKey="percentage" fill="#0f766e" radius={[4, 4, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Upcoming Exams Table */}
//           <div className="bg-white rounded-xl p-6 shadow-lg">
//             <div className="flex items-center mb-6">
//               <Clock className="text-gray-600 mr-3" size={24} />
//               <h2 className="text-xl font-semibold text-gray-800">
//                 Upcoming Examinations
//               </h2>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="bg-gray-50">
//                     <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
//                       Subject
//                     </th>
//                     <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
//                       Title
//                     </th>
//                     <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
//                       Date
//                     </th>
//                     <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
//                       Status
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {upcomingExams.map((exam) => (
//                     <tr
//                       key={exam._id}
//                       className="border-b hover:bg-gray-50 transition-colors"
//                     >
//                       <td className="px-4 py-4 text-sm font-medium text-gray-900">
//                         {exam.subject}
//                       </td>
//                       <td className="px-4 py-4 text-sm text-gray-700">
//                         {exam.title}
//                       </td>
//                       <td className="px-4 py-4 text-sm text-gray-700">
//                         {new Date(exam.startDate).toLocaleDateString()}
//                       </td>
//                       <td className="px-4 py-4">
//                         <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
//                           Not Attempted
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                   {upcomingExams.length === 0 && (
//                     <tr>
//                       <td colSpan={4} className="p-4 text-center text-gray-500">
//                         No upcoming exams
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//         {/* Motivational Banner */}
//         <div className="mt-8 bg-gradient-to-r from-teal-500 to-teal-700 rounded-xl p-6 text-white">
//           <div className="flex flex-col md:flex-row items-center justify-between">
//             <div>
//               <h3 className="text-lg font-semibold mb-2">
//                 Keep Up the Great Work!
//               </h3>
//               <p>
//                 You’re making excellent progress. Focus on Physics to improve
//                 your overall performance.
//               </p>
//             </div>
//             <button className="mt-4 md:mt-0 bg-white text-teal-600 px-6 py-2 rounded-lg font-medium hover:bg-teal-50">
//               View Detailed Reports
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;
