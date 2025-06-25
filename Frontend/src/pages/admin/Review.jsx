import React, { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  BookOpen,
  Users,
  TrendingUp,
  BarChart3,
  PieChart,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
} from "recharts";

const Review = () => {
  const [filters, setFilters] = useState({
    subject: "All Subjects",
    grade: "All Grades",
    scoreRange: "All Scores",
    dateRange: "Last 30 days",
    examStatus: "Completed",
    searchTerm: "",
  });

  const [activeView, setActiveView] = useState("table");

  // Sample data
  const studentsData = [
    {
      id: 1,
      name: "Arjun Sharma",
      studentId: "ST001",
      subject: "Maths",
      grade: 5,
      examTitle: "Algebra Basics",
      score: 85,
      percentage: 85,
      timeTaken: "45 min",
      submissionDate: "2024-06-20",
      status: "Pass",
    },
    {
      id: 2,
      name: "Priya Patel",
      studentId: "ST002",
      subject: "English",
      grade: 6,
      examTitle: "Grammar Test",
      score: 92,
      percentage: 92,
      timeTaken: "38 min",
      submissionDate: "2024-06-19",
      status: "Pass",
    },
    {
      id: 3,
      name: "Ravi Kumar",
      studentId: "ST003",
      subject: "Tamil",
      grade: 4,
      examTitle: "Basic Tamil",
      score: 67,
      percentage: 67,
      timeTaken: "52 min",
      submissionDate: "2024-06-18",
      status: "Pass",
    },
    {
      id: 4,
      name: "Meera Singh",
      studentId: "ST004",
      subject: "Science",
      grade: 7,
      examTitle: "Physics Quiz",
      score: 78,
      percentage: 78,
      timeTaken: "42 min",
      submissionDate: "2024-06-17",
      status: "Pass",
    },
    {
      id: 5,
      name: "Karthik Raja",
      studentId: "ST005",
      subject: "Maths",
      grade: 8,
      examTitle: "Geometry",
      score: 45,
      percentage: 45,
      timeTaken: "60 min",
      submissionDate: "2024-06-16",
      status: "Fail",
    },
  ];

  const subjectDistribution = [
    { subject: "English", count: 45, avgScore: 78 },
    { subject: "Tamil", count: 38, avgScore: 72 },
    { subject: "Maths", count: 52, avgScore: 69 },
    { subject: "Science", count: 41, avgScore: 75 },
  ];

  const scoreDistribution = [
    { range: "0-25%", count: 5, color: "#ef4444" },
    { range: "26-50%", count: 12, color: "#f97316" },
    { range: "51-75%", count: 28, color: "#eab308" },
    { range: "76-100%", count: 35, color: "#22c55e" },
  ];

  const performanceTrend = [
    { week: "Week 1", avgScore: 72 },
    { week: "Week 2", avgScore: 75 },
    { week: "Week 3", avgScore: 78 },
    { week: "Week 4", avgScore: 76 },
  ];

  const FilterButton = ({ label, options, current, onChange }) => (
    <div className="relative">
      <select
        value={current}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <Filter className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  );

  const StatCard = ({ icon: Icon, title, value, subtitle, color = "teal" }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-teal-500">
      <div className="flex items-center space-x-4">
        <div
          className={`p-3 bg-gradient-to-br from-${color}-100 to-${color}-200 rounded-lg`}
        >
          <Icon className={`h-6 w-6 text-${color}-700`} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  );

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    if (status === "Pass") {
      return `${baseClasses} bg-green-100 text-green-800`;
    }
    return `${baseClasses} bg-red-100 text-red-800`;
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 75) return "text-green-600";
    if (percentage >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Results & Analytics
              </h1>
              <p className="text-teal-100">
                Comprehensive exam results and performance analysis
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <Download className="h-4 w-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Filter & Search
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
            <FilterButton
              label="Subject"
              options={["All Subjects", "English", "Tamil", "Maths", "Science"]}
              current={filters.subject}
              onChange={(value) => setFilters({ ...filters, subject: value })}
            />
            <FilterButton
              label="Grade"
              options={["All Grades", "Grade 1-3", "Grade 4-6", "Grade 7-10"]}
              current={filters.grade}
              onChange={(value) => setFilters({ ...filters, grade: value })}
            />
            <FilterButton
              label="Score Range"
              options={["All Scores", "0-25%", "26-50%", "51-75%", "76-100%"]}
              current={filters.scoreRange}
              onChange={(value) =>
                setFilters({ ...filters, scoreRange: value })
              }
            />
            <FilterButton
              label="Date Range"
              options={[
                "Last 7 days",
                "Last 30 days",
                "Last 3 months",
                "Custom",
              ]}
              current={filters.dateRange}
              onChange={(value) => setFilters({ ...filters, dateRange: value })}
            />
            <FilterButton
              label="Status"
              options={[
                "All Status",
                "Completed",
                "In Progress",
                "Not Started",
              ]}
              current={filters.examStatus}
              onChange={(value) =>
                setFilters({ ...filters, examStatus: value })
              }
            />
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={filters.searchTerm}
                onChange={(e) =>
                  setFilters({ ...filters, searchTerm: e.target.value })
                }
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard
            icon={Users}
            title="Students Appeared"
            value="176"
            subtitle="This period"
          />
          <StatCard
            icon={TrendingUp}
            title="Average Score"
            value="74.2%"
            subtitle="↑ 3.2% from last month"
          />
          <StatCard
            icon={BarChart3}
            title="Highest Score"
            value="98%"
            subtitle="Priya Patel - English"
          />
          <StatCard
            icon={PieChart}
            title="Pass Rate"
            value="89.2%"
            subtitle="157 out of 176 students"
          />
          <StatCard
            icon={Calendar}
            title="Completion Rate"
            value="94.3%"
            subtitle="166 completed exams"
          />
        </div>

        {/* View Toggle */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveView("table")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeView === "table"
                ? "bg-teal-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Results Table
          </button>
          <button
            onClick={() => setActiveView("analytics")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeView === "analytics"
                ? "bg-teal-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Analytics View
          </button>
        </div>

        {activeView === "table" ? (
          /* Results Table */
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Student
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Subject & Grade
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Exam Title
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Score
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Time Taken
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Submission
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {studentsData.map((student, index) => (
                    <tr
                      key={student.id}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">
                            {student.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {student.studentId}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {student.subject}
                        </div>
                        <div className="text-sm text-gray-500">
                          Grade {student.grade}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {student.examTitle}
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className={`text-lg font-semibold ${getScoreColor(
                            student.percentage
                          )}`}
                        >
                          {student.percentage}%
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {student.timeTaken}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {student.submissionDate}
                      </td>
                      <td className="px-6 py-4">
                        <span className={getStatusBadge(student.status)}>
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button className="text-teal-600 hover:text-teal-700">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-700">
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Analytics View */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Subject Performance */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Subject-wise Performance
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={subjectDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="avgScore"
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
                      <stop offset="100%" stopColor="#0d9488" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Score Distribution */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Score Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={scoreDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="count"
                  >
                    {scoreDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {scoreDistribution.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-600">{item.range}</span>
                    <span className="text-sm font-medium">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Trend */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Performance Trend
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="avgScore"
                    stroke="#0d9488"
                    strokeWidth={3}
                    dot={{ fill: "#0d9488" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Individual Performance Analysis */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Individual Performance Analysis
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900">Top Performers</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Priya Patel</span>
                      <span className="text-sm font-medium text-green-600">
                        92%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Arjun Sharma
                      </span>
                      <span className="text-sm font-medium text-green-600">
                        85%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900">Needs Attention</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Karthik Raja
                      </span>
                      <span className="text-sm font-medium text-red-600">
                        45%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
