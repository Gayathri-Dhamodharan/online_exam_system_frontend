
import React, { useState } from 'react';
import { 
  BookOpen, Clock, CheckCircle, Play, Eye, Award, Calendar, 
  User, Bell, Filter, Search, ChevronRight, Timer, Star,
  TrendingUp, Target, AlertCircle, Download
} from 'lucide-react';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");

  // Sample student data
  const studentInfo = {
    name: "Priya Sharma",
    studentId: "ST2024001",
    grade: "Grade 8",
    section: "A",
  };

  const upcomingExams = [
    {
      id: 1,
      title: "Mathematics - Algebra Fundamentals",
      subject: "Mathematics",
      date: "2024-06-28",
      time: "10:00 AM",
      duration: "60 min",
      totalMarks: 100,
      totalQuestions: 25,
      difficulty: "Medium",
      instructions: "Calculator allowed, rough sheets provided",
      daysLeft: 3,
    },
    {
      id: 2,
      title: "English Grammar & Comprehension",
      subject: "English",
      date: "2024-06-30",
      time: "2:00 PM",
      duration: "45 min",
      totalMarks: 50,
      totalQuestions: 20,
      difficulty: "Easy",
      instructions: "Read passages carefully before answering",
      daysLeft: 5,
    },
    {
      id: 3,
      title: "Science - Physics Laws",
      subject: "Science",
      date: "2024-07-02",
      time: "11:00 AM",
      duration: "75 min",
      totalMarks: 80,
      totalQuestions: 30,
      difficulty: "Hard",
      instructions: "Formula sheet will be provided",
      daysLeft: 7,
    },
    {
      id: 4,
      title: "Tamil Literature & Poetry",
      subject: "Tamil",
      date: "2024-07-05",
      time: "9:00 AM",
      duration: "50 min",
      totalMarks: 60,
      totalQuestions: 15,
      difficulty: "Medium",
      instructions: "Focus on classical literature",
      daysLeft: 10,
    },
  ];

  const finishedExams = [
    {
      id: 5,
      title: "Tamil Basic Grammar",
      subject: "Tamil",
      completedDate: "2024-06-20",
      score: 42,
      totalMarks: 50,
      percentage: 84,
      grade: "A",
      timeTaken: "35 min",
      rank: 5,
      totalStudents: 45,
      status: "excellent",
    },
    {
      id: 6,
      title: "History - Ancient Civilizations",
      subject: "History",
      completedDate: "2024-06-18",
      score: 68,
      totalMarks: 80,
      percentage: 85,
      grade: "A",
      timeTaken: "55 min",
      rank: 3,
      totalStudents: 42,
      status: "excellent",
    },
    {
      id: 7,
      title: "Mathematics - Basic Arithmetic",
      subject: "Mathematics",
      completedDate: "2024-06-15",
      score: 35,
      totalMarks: 50,
      percentage: 70,
      grade: "B+",
      timeTaken: "42 min",
      rank: 12,
      totalStudents: 40,
      status: "good",
    },
    {
      id: 8,
      title: "English Vocabulary Test",
      subject: "English",
      completedDate: "2024-06-12",
      score: 28,
      totalMarks: 40,
      percentage: 70,
      grade: "B+",
      timeTaken: "30 min",
      rank: 15,
      totalStudents: 38,
      status: "good",
    },
    {
      id: 9,
      title: "Science - Biology Basics",
      subject: "Science",
      completedDate: "2024-06-10",
      score: 24,
      totalMarks: 40,
      percentage: 60,
      grade: "B",
      timeTaken: "38 min",
      rank: 20,
      totalStudents: 35,
      status: "average",
    },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "excellent":
        return "text-green-600";
      case "good":
        return "text-blue-600";
      case "average":
        return "text-yellow-600";
      case "poor":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getGradeColor = (grade) => {
    if (grade === "A" || grade === "A+") return "bg-green-100 text-green-800";
    if (grade === "B+" || grade === "B") return "bg-blue-100 text-blue-800";
    if (grade === "C+" || grade === "C") return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const filteredUpcomingExams = upcomingExams.filter((exam) => {
    const matchesSearch =
      exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject =
      subjectFilter === "all" || exam.subject === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  const filteredFinishedExams = finishedExams.filter((exam) => {
    const matchesSearch =
      exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject =
      subjectFilter === "all" || exam.subject === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  const subjects = [
    "all",
    ...new Set(
      [...upcomingExams, ...finishedExams].map((exam) => exam.subject)
    ),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-teal-400 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {studentInfo.name}
                </h1>
                <p className="text-teal-100">
                  {studentInfo.studentId} • {studentInfo.grade}{" "}
                  {studentInfo.section}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="h-6 w-6 text-white cursor-pointer hover:text-teal-200" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  2
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-6 mb-8">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === "upcoming"
                ? "bg-teal-600 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-50 shadow"
            }`}
          >
            <Clock className="h-5 w-5" />
            <span>Upcoming Exams</span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-bold ${
                activeTab === "upcoming"
                  ? "bg-teal-500 text-white"
                  : "bg-teal-100 text-teal-800"
              }`}
            >
              {upcomingExams.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("finished")}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === "finished"
                ? "bg-teal-600 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-50 shadow"
            }`}
          >
            <CheckCircle className="h-5 w-5" />
            <span>Finished Exams</span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-bold ${
                activeTab === "finished"
                  ? "bg-teal-500 text-white"
                  : "bg-teal-100 text-teal-800"
              }`}
            >
              {finishedExams.length}
            </span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search exams..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <select
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject === "all" ? "All Subjects" : subject}
                    </option>
                  ))}
                </select>
                <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Exams */}
        {activeTab === "upcoming" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
              <Clock className="h-6 w-6 text-teal-600" />
              <span>Upcoming Examinations</span>
            </h2>

            {filteredUpcomingExams.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No upcoming exams
                </h3>
                <p className="text-gray-500">
                  You don't have any upcoming examinations at the moment.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredUpcomingExams.map((exam) => (
                  <div
                    key={exam.id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {exam.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3">
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
                          <div className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-bold">
                            {exam.daysLeft} days left
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>{exam.date}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{exam.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Timer className="h-4 w-4" />
                          <span>{exam.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Target className="h-4 w-4" />
                          <span>{exam.totalMarks} marks</span>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <p className="text-sm text-gray-600">
                          <strong>Questions:</strong> {exam.totalQuestions} •{" "}
                          <strong>Instructions:</strong> {exam.instructions}
                        </p>
                      </div>

                      <button className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2">
                        <Play className="h-4 w-4" />
                        <span>Start Exam</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Finished Exams */}
        {activeTab === "finished" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-teal-600" />
              <span>Finished Examinations</span>
            </h2>

            {filteredFinishedExams.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No finished exams
                </h3>
                <p className="text-gray-500">
                  You haven't completed any examinations yet.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFinishedExams.map((exam) => (
                  <div
                    key={exam.id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {exam.title}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getGradeColor(
                                exam.grade
                              )}`}
                            >
                              Grade {exam.grade}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            {exam.subject} • Completed on {exam.completedDate}
                          </p>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="text-center">
                              <div
                                className={`text-2xl font-bold ${getStatusColor(
                                  exam.status
                                )}`}
                              >
                                {exam.percentage}%
                              </div>
                              <div className="text-xs text-gray-500">Score</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-gray-900">
                                {exam.score}/{exam.totalMarks}
                              </div>
                              <div className="text-xs text-gray-500">Marks</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-gray-900">
                                {exam.rank}
                              </div>
                              <div className="text-xs text-gray-500">Rank</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-gray-900">
                                {exam.timeTaken}
                              </div>
                              <div className="text-xs text-gray-500">
                                Time Taken
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex justify-between items-center text-sm text-gray-600">
                              <span>
                                Class Performance: Rank {exam.rank} out of{" "}
                                {exam.totalStudents} students
                              </span>
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="font-medium">
                                  Performance: {exam.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2 ml-6">
                          <button className="bg-teal-100 hover:bg-teal-200 text-teal-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                            <Eye className="h-4 w-4" />
                            <span>View Details</span>
                          </button>
                          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                            <Download className="h-4 w-4" />
                            <span>Download</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;