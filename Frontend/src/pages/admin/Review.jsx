import React, { useState, useMemo } from 'react';
import { Download, Filter, FileText, Table, User, BookOpen, GraduationCap } from 'lucide-react';

const Review = () => {
  // Sample data
  const [studentsData] = useState([
    { id: 1, name: 'John Smith', class: '10A', subject: 'Mathematics', exam: 'Mid-term', score: 85, maxScore: 100, date: '2024-03-15' },
    { id: 2, name: 'John Smith', class: '10A', subject: 'Physics', exam: 'Mid-term', score: 78, maxScore: 100, date: '2024-03-15' },
    { id: 3, name: 'John Smith', class: '10A', subject: 'Chemistry', exam: 'Mid-term', score: 92, maxScore: 100, date: '2024-03-15' },
    { id: 4, name: 'Emily Johnson', class: '10A', subject: 'Mathematics', exam: 'Mid-term', score: 94, maxScore: 100, date: '2024-03-15' },
    { id: 5, name: 'Emily Johnson', class: '10A', subject: 'Physics', exam: 'Mid-term', score: 88, maxScore: 100, date: '2024-03-15' },
    { id: 6, name: 'Emily Johnson', class: '10A', subject: 'Chemistry', exam: 'Mid-term', score: 91, maxScore: 100, date: '2024-03-15' },
    { id: 7, name: 'Michael Brown', class: '10B', subject: 'Mathematics', exam: 'Mid-term', score: 76, maxScore: 100, date: '2024-03-15' },
    { id: 8, name: 'Michael Brown', class: '10B', subject: 'Physics', exam: 'Mid-term', score: 82, maxScore: 100, date: '2024-03-15' },
    { id: 9, name: 'Sarah Davis', class: '11A', subject: 'Mathematics', exam: 'Final', score: 89, maxScore: 100, date: '2024-04-20' },
    { id: 10, name: 'Sarah Davis', class: '11A', subject: 'Biology', exam: 'Final', score: 95, maxScore: 100, date: '2024-04-20' },
    { id: 11, name: 'David Wilson', class: '11A', subject: 'Mathematics', exam: 'Final', score: 73, maxScore: 100, date: '2024-04-20' },
    { id: 12, name: 'David Wilson', class: '11A', subject: 'Biology', exam: 'Final', score: 80, maxScore: 100, date: '2024-04-20' },
    { id: 13, name: 'Lisa Anderson', class: '12A', subject: 'Mathematics', exam: 'Quarterly', score: 97, maxScore: 100, date: '2024-05-10' },
    { id: 14, name: 'Lisa Anderson', class: '12A', subject: 'Computer Science', exam: 'Quarterly', score: 99, maxScore: 100, date: '2024-05-10' },
    { id: 15, name: 'Robert Taylor', class: '12A', subject: 'Mathematics', exam: 'Quarterly', score: 84, maxScore: 100, date: '2024-05-10' },
  ]);

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedExam, setSelectedExam] = useState('');
  const [viewMode, setViewMode] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectSubject,setSelectSubject] = useState('')

  // Get unique values
  const uniqueClasses = [...new Set(studentsData.map(item => item.class))].sort();
  const uniqueExams = [...new Set(studentsData.map(item => item.exam))].sort();

  // Filter data by class and exam
  const filteredData = useMemo(() => {
    let data = studentsData;
    if (selectedClass) {
      data = data.filter(item => item.class === selectedClass);
    }
    if (selectedExam) {
      data = data.filter(item => item.exam === selectedExam);
    }
    if(selectSubject)
    {
            data = data.filter((item) => item.subject === selectedExam);

    }
    return data;
  }, [studentsData, selectedClass, selectedExam]);

  // Get students in filtered data
  const studentsInClass = useMemo(() => {
    return [...new Set(filteredData.map(item => item.name))].sort();
  }, [filteredData]);

  // subject
    const subjectsForStudent = useMemo(() => {
      return [...new Set(filteredData.map((item) => item.subject))].sort();
    }, [filteredData]);

  // Get data based on view mode
  const displayData = useMemo(() => {
    if (viewMode === 'byStudent' && selectedStudent) {
      return filteredData.filter(item => item.name === selectedStudent);
    }
    return filteredData;
  }, [filteredData, viewMode, selectedStudent]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (displayData.length === 0) return { totalStudents: 0, avgScore: 0, totalExams: 0 };
    
    const uniqueStudentsCount = new Set(displayData.map(item => item.name)).size;
    const totalScore = displayData.reduce((sum, item) => sum + item.score, 0);
    const avgScore = totalScore / displayData.length;
    
    return {
      totalStudents: uniqueStudentsCount,
      avgScore: avgScore.toFixed(1),
      totalExams: displayData.length
    };
  }, [displayData]);

  // Export functions
  const exportToPDF = () => {
    const content = generateReportContent();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `student-scores-${selectedClass || 'all'}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Class', 'Subject', 'Exam', 'Score', 'Max Score', 'Percentage', 'Date'];
    const csvContent = [
      headers.join(','),
      ...displayData.map(item => [
        item.name,
        item.class,
        item.subject,
        item.exam,
        item.score,
        item.maxScore,
        `${((item.score / item.maxScore) * 100).toFixed(1)}%`,
        item.date
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `student-scores-${selectedClass || 'all'}-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateReportContent = () => {
    const title = viewMode === 'byStudent' 
      ? `Individual Student Report - ${selectedStudent}`
      : `Class Report - ${selectedClass || 'All Classes'}`;
    
    let content = `${title}\n`;
    content += `Generated on: ${new Date().toLocaleDateString()}\n\n`;
    content += `Statistics:\n`;
    content += `Total Students: ${stats.totalStudents}\n`;
    content += `Total Exams: ${stats.totalExams}\n`;
    content += `Average Score: ${stats.avgScore}%\n\n`;
    content += `Detailed Scores:\n`;
    content += `${'='.repeat(80)}\n`;
    
    displayData.forEach(item => {
      content += `Student: ${item.name}\n`;
      content += `Class: ${item.class} | Subject: ${item.subject} | Exam: ${item.exam}\n`;
      content += `Score: ${item.score}/${item.maxScore} (${((item.score/item.maxScore)*100).toFixed(1)}%)\n`;
      content += `Date: ${item.date}\n`;
      content += `${'-'.repeat(40)}\n`;
    });
    
    return content;
  };

  const sendStudentPDF = (studentName) => {
    const studentData = filteredData.filter(item => item.name === studentName);
    const content = generateStudentPDFContent(studentName, studentData);
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${studentName.replace(' ', '_')}-scores-report.txt`;
    a.click();
    URL.revokeObjectURL(url);
    alert(`Report for ${studentName} has been downloaded!`);
  };

  const generateStudentPDFContent = (studentName, data) => {
    let content = `STUDENT SCORE REPORT\n`;
    content += `Student Name: ${studentName}\n`;
    content += `Class: ${data[0]?.class || 'N/A'}\n`;
    content += `Report Generated: ${new Date().toLocaleDateString()}\n\n`;
    content += `${'='.repeat(60)}\n`;
    content += `EXAM SCORES:\n`;
    content += `${'='.repeat(60)}\n\n`;
    
    data.forEach(item => {
      content += `Subject: ${item.subject}\n`;
      content += `Exam: ${item.exam}\n`;
      content += `Score: ${item.score}/${item.maxScore} (${((item.score/item.maxScore)*100).toFixed(1)}%)\n`;
      content += `Date: ${item.date}\n`;
      content += `${'-'.repeat(30)}\n`;
    });
    
    const totalScore = data.reduce((sum, item) => sum + item.score, 0);
    const totalMax = data.reduce((sum, item) => sum + item.maxScore, 0);
    const overallPercentage = ((totalScore / totalMax) * 100).toFixed(1);
    
    content += `\nOVERALL PERFORMANCE:\n`;
    content += `Total Score: ${totalScore}/${totalMax}\n`;
    content += `Overall Percentage: ${overallPercentage}%\n`;
    
    return content;
  };

  const getScoreColor = (score, maxScore) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 75) return 'text-blue-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

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
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setSelectedStudent("");
                setViewMode("all");
              }}
              className="px-4 py-2 mx-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">All Classes</option>
              {uniqueClasses.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>

            <select
              value={selectedExam}
              onChange={(e) => {
                setSelectedExam(e.target.value);
                setSelectedStudent("");
                setViewMode("all");
              }}
              className="px-4 py-2 mx-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">All Exams</option>
              {uniqueExams.map((exam) => (
                <option key={exam} value={exam}>
                  {exam}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* View Mode Selection */}
        {(selectedClass || selectedExam) && (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-6">
            <h3 className="font-semibold text-slate-700 mb-4">View Options:</h3>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  setViewMode("all");
                  setSelectedStudent("");
                }}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  viewMode === "all"
                    ? "bg-green-600 text-white"
                    : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                }`}
              >
                <Table size={18} />
                All Students & Subjects
              </button>
              <button
                onClick={() => setViewMode("byStudent")}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  viewMode === "byStudent"
                    ? "bg-green-600 text-white"
                    : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                }`}
              >
                <User size={18} />
                By Student
              </button>
              <button
                onClick={() => setViewMode("bySubject")}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  viewMode === "bySubject"
                    ? "bg-green-600 text-white"
                    : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                }`}
              >
                <BookOpen size={18} />
                By Subject
              </button>
            </div>

            {/* Student Selection for Individual View */}
            {viewMode === "byStudent" && (
              <div className="mt-4">
                <label className="block font-semibold text-slate-700 mb-2">
                  Select Student:
                </label>
                <select
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Choose a student...</option>
                  {studentsInClass.map((student) => (
                    <option key={student} value={student}>
                      {student}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {viewMode === "bySubject" && (
              <div className="mt-4">
                <label className="block font-semibold text-slate-700 mb-2">
                  Select Subject:
                </label>
                <select
                  value={selectSubject}
                  onChange={(e) => setSelectSubject(e.target.value)}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Choose a student...</option>
                  {subjectsForStudent.map((student) => (
                    <option key={student} value={student}>
                      {student}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-slate-700 mb-2">
              Total Students
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {stats.totalStudents}
            </p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-slate-700 mb-2">
              Average Score
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {stats.avgScore}%
            </p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-slate-700 mb-2">
              Total Exams
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {stats.totalExams}
            </p>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-slate-800">
              {viewMode === "byStudent" && selectedStudent
                ? `Scores for ${selectedStudent}`
                : `${
                    selectedClass ? `Class ${selectedClass}` : "All Classes"
                  } ${selectedExam ? `- ${selectedExam}` : "- All Exams"}`}
            </h3>
          </div>

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
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {displayData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      {item.name}
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
                      <span
                        className={`font-semibold ${getScoreColor(
                          item.score,
                          item.maxScore
                        )}`}
                      >
                        {item.score}/{item.maxScore}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`font-semibold ${getScoreColor(
                          item.score,
                          item.maxScore
                        )}`}
                      >
                        {((item.score / item.maxScore) * 100).toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => sendStudentPDF(item.name)}
                        className="text-cyan-600 hover:text-cyan-900 flex items-center gap-1"
                        title="Send individual report"
                      >
                        <FileText size={16} />
                        Send PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {displayData.length === 0 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-12 text-center">
            <p className="text-gray-500 text-lg">
              No data found. Please select a class to view student scores.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;

