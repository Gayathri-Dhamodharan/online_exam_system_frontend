// import React from 'react'

// const AdminDashboard = () => {
//   return (
//     <div>
//       hgggbjvjv
//     </div>
//   )
// }

// export default AdminDashboard
import React, { useState } from "react";
import {
  BarChart3,
  FileText,
  Users,
  BookOpen,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Edit,
  Plus,
  Calendar,
  Award,
  Target,
} from "lucide-react";

const AdminDashboard = () => {
  // Mock data - in real app, this would come from API
  const [dashboardData] = useState({
    stats: {
      totalQuestions: 1245,
      totalPapers: 28,
      totalStudents: 156,
      activeExams: 3,
    },
    recentActivity: [
      {
        action: "New question added",
        subject: "Mathematics",
        time: "2 hours ago",
        type: "success",
      },
      {
        action: "Exam completed",
        paper: "Physics Unit Test",
        time: "4 hours ago",
        type: "info",
      },
      {
        action: "Question paper created",
        subject: "Chemistry",
        time: "1 day ago",
        type: "success",
      },
      {
        action: "Student registered",
        name: "John Doe",
        time: "2 days ago",
        type: "info",
      },
      {
        action: "Review completed",
        paper: "Biology Quiz",
        time: "3 days ago",
        type: "warning",
      },
    ],
    upcomingExams: [
      {
        title: "Mathematics Final",
        date: "2025-06-28",
        students: 45,
        status: "scheduled",
        duration: "2 hours",
      },
      {
        title: "Physics Midterm",
        date: "2025-06-30",
        students: 38,
        status: "draft",
        duration: "1.5 hours",
      },
      {
        title: "Chemistry Quiz",
        date: "2025-07-02",
        students: 52,
        status: "scheduled",
        duration: "45 mins",
      },
      {
        title: "English Essay",
        date: "2025-07-05",
        students: 41,
        status: "draft",
        duration: "2 hours",
      },
    ],
    recentResults: [
      {
        exam: "Biology Test",
        avgScore: 78,
        totalStudents: 42,
        date: "2025-06-20",
        highestScore: 96,
      },
      {
        exam: "History Quiz",
        avgScore: 85,
        totalStudents: 38,
        date: "2025-06-18",
        highestScore: 98,
      },
      {
        exam: "English Essay",
        avgScore: 72,
        totalStudents: 45,
        date: "2025-06-15",
        highestScore: 89,
      },
      {
        exam: "Math Algebra",
        avgScore: 68,
        totalStudents: 51,
        date: "2025-06-12",
        highestScore: 95,
      },
    ],
    subjectStats: [
      {
        subject: "Mathematics",
        questions: 234,
        papers: 8,
        avgScore: 76,
        color: "bg-blue-500",
      },
      {
        subject: "Physics",
        questions: 189,
        papers: 6,
        avgScore: 68,
        color: "bg-green-500",
      },
      {
        subject: "Chemistry",
        questions: 156,
        papers: 5,
        avgScore: 82,
        color: "bg-purple-500",
      },
      {
        subject: "Biology",
        questions: 178,
        papers: 4,
        avgScore: 79,
        color: "bg-red-500",
      },
      {
        subject: "English",
        questions: 145,
        papers: 5,
        avgScore: 74,
        color: "bg-yellow-500",
      },
    ],
  });

  const StatCard = ({ title, value, icon: Icon, color, subtitle, trend }) => (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-3xl font-bold ${color} mb-2`}>{value}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          {trend && (
            <div className="flex items-center mt-2">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-xs text-green-600 font-medium">
                {trend}
              </span>
            </div>
          )}
        </div>
        <div
          className={`p-3 rounded-full ${color
            .replace("text-", "bg-")
            .replace("500", "100")}`}
        >
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
    </div>
  );

  const getStatusBadge = (status) => {
    const badges = {
      scheduled: "bg-green-100 text-green-800 border-green-200",
      draft: "bg-yellow-100 text-yellow-800 border-yellow-200",
      active: "bg-blue-100 text-blue-800 border-blue-200",
      completed: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return badges[status] || badges.draft;
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "info":
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Manage your online examination system efficiently
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
        <StatCard
          title="Total Questions"
          value={dashboardData.stats.totalQuestions.toLocaleString()}
          icon={BookOpen}
          color="text-teal-600"
          subtitle="Across all subjects"
          trend="+12% this month"
        />
        <StatCard
          title="Question Papers"
          value={dashboardData.stats.totalPapers}
          icon={FileText}
          color="text-blue-600"
          subtitle="Created this semester"
          trend="+8% this month"
        />
        <StatCard
          title="Total Students"
          value={dashboardData.stats.totalStudents}
          icon={Users}
          color="text-purple-600"
          subtitle="Registered users"
          trend="+15% this month"
        />
        <StatCard
          title="Active Exams"
          value={dashboardData.stats.activeExams}
          icon={TrendingUp}
          color="text-orange-600"
          subtitle="Currently running"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        {/* Recent Activity */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Clock className="h-5 w-5 text-teal-600 mr-2" />
                Recent Activity
              </h3>
            </div>
            <div className="space-y-4 max-h-70 overflow-y-auto">
              {dashboardData.recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.subject || activity.paper || activity.name} •{" "}
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Exams */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Calendar className="h-5 w-5 text-teal-600 mr-2" />
                Upcoming Exams
              </h3>
              <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Exam Title
                    </th>
                    <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Students
                    </th>
                    <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {dashboardData.upcomingExams.map((exam, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-3 px-2">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {exam.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {exam.duration}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-sm text-gray-900">
                        {new Date(exam.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-3 px-2 text-sm text-gray-900">
                        {exam.students}
                      </td>
                      <td className="py-3 px-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(
                            exam.status
                          )}`}
                        >
                          {exam.status}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex space-x-2">
                          <button className="text-gray-400 hover:text-gray-600">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        {/* Recent Results */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Award className="h-5 w-5 text-teal-600 mr-2" />
              Recent Results
            </h3>
          </div>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {dashboardData.recentResults.map((result, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{result.exam}</h4>
                  <span className="text-xs text-gray-500">{result.date}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Avg Score: {result.avgScore}%</span>
                  <span>Students: {result.totalStudents}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${result.avgScore}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Highest: {result.highestScore}%</span>
                  <span
                    className={`font-medium ${
                      result.avgScore >= 80
                        ? "text-green-600"
                        : result.avgScore >= 70
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {result.avgScore >= 80
                      ? "Excellent"
                      : result.avgScore >= 70
                      ? "Good"
                      : "Needs Improvement"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Statistics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <BarChart3 className="h-5 w-5 text-teal-600 mr-2" />
              Subject Statistics
            </h3>
          </div>
          <div className="space-y-4">
            {dashboardData.subjectStats.map((subject, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-900">
                    {subject.subject}
                  </h4>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      subject.avgScore >= 80
                        ? "bg-green-100 text-green-800"
                        : subject.avgScore >= 70
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {subject.avgScore}% avg
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>Questions: {subject.questions}</div>
                  <div>Papers: {subject.papers}</div>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${subject.color}`}
                    style={{ width: `${subject.avgScore}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Target className="h-5 w-5 text-teal-600 mr-2" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center justify-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-3 rounded-lg transition-colors duration-200 font-medium">
            <Plus className="h-4 w-4" />
            <span>Add Question</span>
          </button>
          <button className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors duration-200 font-medium">
            <FileText className="h-4 w-4" />
            <span>Create Paper</span>
          </button>
          <button className="flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg transition-colors duration-200 font-medium">
            <Users className="h-4 w-4" />
            <span>View Students</span>
          </button>
          <button className="flex items-center justify-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-lg transition-colors duration-200 font-medium">
            <BarChart3 className="h-4 w-4" />
            <span>View Reports</span>
          </button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Performance Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">78%</div>
            <div className="text-sm text-green-700 font-medium mb-1">
              Overall Pass Rate
            </div>
            <div className="text-xs text-green-600">↑ 5% from last month</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">8.2</div>
            <div className="text-sm text-blue-700 font-medium mb-1">
              Avg Questions/Paper
            </div>
            <div className="text-xs text-blue-600">Optimal range</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">92%</div>
            <div className="text-sm text-purple-700 font-medium mb-1">
              Student Satisfaction
            </div>
            <div className="text-xs text-purple-600">Based on feedback</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;