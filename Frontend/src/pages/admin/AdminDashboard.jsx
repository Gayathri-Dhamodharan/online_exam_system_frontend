import React from "react";
import {
  FileText,
  Users,
  Award,
  Target,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const AdminDashboard = () => {
  // KPI data
  const kpis = [
    { title: "Total Exams", value: 12, icon: FileText },
    { title: "Total Students", value: 345, icon: Users },
    { title: "Avg. Score", value: "75%", icon: Award },
    { title: "Pass Rate", value: "82%", icon: Target },
  ];

  // Performance data
  const performanceData = [
    { subject: "Math", score: 78 },
    { subject: "Physics", score: 72 },
    { subject: "Chemistry", score: 85 },
    { subject: "Biology", score: 80 },
    { subject: "English", score: 76 },
  ];

  // Upcoming exams
  const upcomingExams = [
    { subject: "Math", title: "Quadratics", date: "2025-07-10", status: "Scheduled" },
    { subject: "Physics", title: "Thermodynamics", date: "2025-07-12", status: "Completed" },
    { subject: "Chemistry", title: "Organic Reaction", date: "2025-07-15", status: "Scheduled" },
    { subject: "Biology", title: "Cell Biology", date: "2025-07-18", status: "Scheduled" },
    { subject: "English", title: "Essay Writing", date: "2025-07-20", status: "Draft" },
    // …more rows
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <select className="px-4 py-2 rounded-lg border">
          <option>All Classes</option>
          {[...Array(10)].map((_, i) => (
            <option key={i}>Class {i + 1}</option>
          ))}
        </select>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {kpis.map(({ title, value, icon: Icon }, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow p-5 flex items-center justify-between"
          >
            <div>
              <h3 className="text-gray-600 font-medium">{title}</h3>
              <p className="text-3xl font-semibold mt-1">{value}</p>
            </div>
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
              <Icon className="w-6 h-6 text-teal-600" />
            </div>
          </div>
        ))}
      </div>

      {/* Line Chart */}
      <div className="bg-white rounded-lg shadow p-5">
        <h4 className="text-lg font-medium mb-4">Avg. Scores by Subject</h4>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart
              data={performanceData}
              margin={{ top: 20, right: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="linear"
                dataKey="score"
                strokeWidth={2}
                dot={{ r: 4 }}
                stroke="rgba(0,150,136,1)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Upcoming Exams Table */}
      <div className="bg-white rounded-lg shadow p-5">
        <h4 className="text-lg font-medium mb-4">Upcoming Exams</h4>
        <div className="overflow-x-auto">
          <div className="max-h-64 overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200 table-auto">
              <thead className="bg-teal-50">
                <tr>
                  {["Subject", "Title", "Date", "Status"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-2 text-left text-sm font-medium text-teal-700"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {upcomingExams.map((exam, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-2">{exam.subject}</td>
                    <td className="px-4 py-2">{exam.title}</td>
                    <td className="px-4 py-2">{exam.date}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`
                          px-3 py-1 inline-block text-xs font-semibold rounded-full
                          ${
                            exam.status === "Scheduled"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }
                        `}
                      >
                        {exam.status}
                      </span>
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

export default AdminDashboard;


// import React, { useState, useEffect } from "react";
// import { FileText, Users, Award, Target } from "lucide-react";
// import {
//   getAllResults,
//   getExamTemplates,
//   // getQuestions,
//   // getSubjects,
// } from "../../service/api";
// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
// } from "recharts";

// const AdminDashboard = () => {
//   const [kpis, setKpis] = useState([]);
//   const [performanceData, setPerformanceData] = useState([]);
//   const [upcomingExams, setUpcomingExams] = useState([]);

//   useEffect(() => {
//     // KPI 1: total students (from getAllResults unique student count)
//     getAllResults().then((res) => {
//       const all = res.data;
//       const uniqueStudents = new Set(all.map((r) => r.student._id)).size;
//       setKpis((k) => [
//         { title: "Total Students", value: uniqueStudents, icon: Users },
//         ...k,
//       ]);
//     });

//     // KPI 2: average score across all results
//     getAllResults().then((res) => {
//       const all = res.data;
//       const avg =
//         all.reduce((s, r) => s + r.obtainedMarks, 0) / all.length || 0;
//       setKpis((k) => [
//         ...k,
//         { title: "Avg. Score", value: `${avg.toFixed(1)}%`, icon: Award },
//       ]);
//     });

//     // KPI 3 & 4: highest & lowest
//     getAllResults().then((res) => {
//       const all = res.data;
//       if (all.length) {
//         const marks = all.map((r) => r.obtainedMarks);
//         setKpis((k) => [
//           ...k,
//           { title: "Highest Score", value: Math.max(...marks), icon: Target },
//           { title: "Lowest Score", value: Math.min(...marks), icon: FileText },
//         ]);
//       }
//     });

//     // Performance by subject (line chart)
//     getAllResults().then((res) => {
//       // compute avg% per subject
//       const bySub = {};
//       res.data.forEach((r) => {
//         const key = r.examTemplate.subject.name || r.examTemplate.subject;
//         if (!bySub[key]) bySub[key] = [];
//         bySub[key].push((r.obtainedMarks / r.examTemplate.totalMark) * 100);
//       });
//       setPerformanceData(
//         Object.entries(bySub).map(([subject, arr]) => ({
//           subject,
//           score: arr.reduce((a, b) => a + b, 0) / arr.length,
//         }))
//       );
//     });

//     // Upcoming exams
//     getExamTemplates().then((res) => {
//       const now = new Date();
//       setUpcomingExams(
//         res.data.filter((e) => new Date(e.startDate) > now).slice(0, 5)
//       );
//     });
//   }, []);

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen space-y-8">
//       {/* Top Bar */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//         <select className="px-4 py-2 rounded-lg border">
//           <option>All Classes</option>
//           {[...Array(12)].map((_, i) => (
//             <option key={i}>{i + 1}th Grade</option>
//           ))}
//         </select>
//       </div>

//       {/* KPI CARDS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
//         {kpis.map(({ title, value, 
//         // icon: Icon 

//         }, i) => (
//           <div
//             key={i}
//             className="bg-white rounded-lg shadow p-5 flex items-center justify-between"
//           >
//             <div>
//               <h3 className="text-gray-600 font-medium">{title}</h3>
//               <p className="text-3xl font-semibold mt-1">{value}</p>
//             </div>
//             <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
//               <Icon className="w-6 h-6 text-teal-600" />
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Line Chart */}
//       <div className="bg-white rounded-lg shadow p-5">
//         <h4 className="text-lg font-medium mb-4">
//           Avg. Scores by Subject
//         </h4>
//         <div style={{ width: "100%", height: 300 }}>
//           <ResponsiveContainer>
//             <LineChart
//               data={performanceData}
//               margin={{ top: 20, right: 20, bottom: 5 }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="subject" />
//               <YAxis allowDecimals={false} />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="score"
//                 strokeWidth={2}
//                 dot={{ r: 4 }}
//                 stroke="#0f766e"
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Upcoming Exams Table */}
//       <div className="bg-white rounded-lg shadow p-5">
//         <h4 className="text-lg font-medium mb-4">Upcoming Exams</h4>
//         <div className="overflow-x-auto">
//           <div className="max-h-64 overflow-y-auto">
//             <table className="min-w-full divide-y divide-gray-200 table-auto">
//               <thead className="bg-teal-50">
//                 <tr>
//                   {["Title", "Start Date", "End Date", "Duration"].map(
//                     (h) => (
//                       <th
//                         key={h}
//                         className="px-4 py-2 text-left text-sm font-medium text-teal-700"
//                       >
//                         {h}
//                       </th>
//                     )
//                   )}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {upcomingExams.map((exam, idx) => (
//                   <tr key={idx}>
//                     <td className="px-4 py-2">{exam.title}</td>
//                     <td className="px-4 py-2">
//                       {new Date(exam.startDate).toLocaleDateString()}
//                     </td>
//                     <td className="px-4 py-2">
//                       {new Date(exam.endDate).toLocaleDateString()}
//                     </td>
//                     <td className="px-4 py-2">{exam.duration} min</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
