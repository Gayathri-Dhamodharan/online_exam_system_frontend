

import React, { useState, useEffect } from "react";
import {
  Clock,
  Menu,
  X,
  CheckCircle,
  AlertCircle,
  Circle,
  Eye,
  Calendar,
  Timer,
  Award,
} from "lucide-react";

const Exam = () => {
  const [currentScreen, setCurrentScreen] = useState("examList"); // examList, instructions, exam, completed
  const [selectedExam, setSelectedExam] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [questionStatuses, setQuestionStatuses] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [showQuestionMenu, setShowQuestionMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Sample exam data
  const exams = [
    {
      id: 1,
      title: "Mathematics - Algebra Fundamentals",
      subject: "Mathematics",
      date: "2024-06-28",
      time: "10:00 AM",
      duration: 1, // minutes
      totalMarks: 100,
      passMarks: 40,
      difficulty: "Medium",
      questionsCount: 25,
      instructions: "Calculator allowed, rough sheets provided",
      daysLeft: 3,
      questions: [
        {
          id: 1,
          question: "What is the value of π (pi) approximately?",
          type: "mcq",
          options: ["3.14", "2.71", "1.41", "4.20"],
          correct: 0,
        },
        {
          id: 2,
          question: "Is the square root of 16 equal to 4?",
          type: "truefalse",
          options: ["True", "False"],
          correct: 0,
        },
        {
          id: 3,
          question: "What is 15 + 27?",
          type: "mcq",
          options: ["41", "42", "43", "44"],
          correct: 1,
        },
        {
          id: 4,
          question: "Is 0 a natural number?",
          type: "truefalse",
          options: ["True", "False"],
          correct: 1,
        },
        {
          id: 5,
          question: "What is the derivative of x²?",
          type: "mcq",
          options: ["x", "2x", "x²", "2x²"],
          correct: 1,
        },
      ],
    },
    {
      id: 2,
      title: "English Grammar & Comprehension",
      subject: "English",
      date: "2024-06-30",
      time: "2:00 PM",
      duration: 45,
      totalMarks: 50,
      passMarks: 20,
      difficulty: "Easy",
      questionsCount: 20,
      instructions: "Read passages carefully before answering",
      daysLeft: 5,
      questions: [],
    },
    {
      id: 3,
      title: "Science - Physics Laws",
      subject: "Science",
      date: "2024-07-02",
      time: "11:00 AM",
      duration: 75,
      totalMarks: 80,
      passMarks: 32,
      difficulty: "Hard",
      questionsCount: 30,
      instructions: "Formula sheet will be provided",
      daysLeft: 7,
      questions: [],
    },
    {
      id: 4,
      title: "Tamil Literature & Poetry",
      subject: "Tamil",
      date: "2024-07-05",
      time: "9:00 AM",
      duration: 50,
      totalMarks: 60,
      passMarks: 24,
      difficulty: "Medium",
      questionsCount: 15,
      instructions: "Focus on classical literature",
      daysLeft: 10,
      questions: [],
    },
  ];

  const commonInstructions = [
    "Read all questions carefully before answering.",
    "Each question has only one correct answer.",
    "You can navigate between questions using the question menu.",
    "Mark questions for review if you're unsure about your answer.",
    "Save your answer before moving to the next question.",
    "You can submit the exam before time runs out.",
    "Once submitted, you cannot change your answers.",
    "Ensure a stable internet connection throughout the exam.",
  ];

  // Handle window resize for isMobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Timer logic
  useEffect(() => {
    let timer;
    if (currentScreen === "exam" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setCurrentScreen("completed");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [currentScreen, timeLeft]);

  const startExam = (exam) => {
    setSelectedExam(exam);
    setCurrentScreen("instructions");
  };

  const beginExam = () => {
    setTimeLeft(selectedExam.duration * 60);
    setCurrentScreen("exam");
    setCurrentQuestion(0);
    // Initialize statuses
    const statuses = {};
    selectedExam.questions.forEach((_, idx) => {
      statuses[idx] = idx === 0 ? "current" : "not-visited";
    });
    setQuestionStatuses(statuses);
  };

  const saveAnswer = (questionIdx, answerIdx) => {
    setAnswers((prev) => ({ ...prev, [questionIdx]: answerIdx }));
    setQuestionStatuses((prev) => ({
      ...prev,
      [questionIdx]: "answered",
    }));
  };

  const markForReview = (questionIdx) => {
    setQuestionStatuses((prev) => ({
      ...prev,
      [questionIdx]: "review",
    }));
  };

  const navigateToQuestion = (questionIdx) => {
    setCurrentQuestion(questionIdx);
    setQuestionStatuses((prev) => ({
      ...prev,
      [questionIdx]:
        prev[questionIdx] === "not-visited" ? "current" : prev[questionIdx],
    }));
    setShowQuestionMenu(false);
  };

  const submitExam = () => {
    setCurrentScreen("completed");
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const getQuestionStatusColor = (status) => {
    switch (status) {
      case "answered":
        return "bg-green-500 text-white";
      case "review":
        return "bg-purple-500 text-white";
      case "current":
        return "bg-red-500 text-white";
      case "not-visited":
        return "bg-yellow-400 text-black";
      default:
        return "bg-gray-300 text-black";
    }
  };

  const getDifficultyColor = (diff) => {
    switch (diff.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDaysLeftColor = (days) => {
    if (days <= 3) return "bg-red-100 text-red-600";
    if (days <= 7) return "bg-yellow-100 text-yellow-600";
    return "bg-green-100 text-green-600";
  };

  // ***** RENDERING *****
  if (currentScreen === "examList") {
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
    );
  }

  if (currentScreen === "instructions") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Exam Instructions
            </h2>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">
                {selectedExam.title}
              </h3>
              <p className="text-gray-600">
                Duration: {selectedExam.duration} minutes | Total Marks:{" "}
                {selectedExam.totalMarks}
              </p>
            </div>
            <ul className="mb-8 space-y-2">
              {commonInstructions.map((inst, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  <span className="text-gray-700">{inst}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setCurrentScreen("examList")}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={beginExam}
                className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 font-medium"
              >
                Start Exam
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentScreen === "exam") {
    const qData = selectedExam.questions[currentQuestion];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header */}
        <div className="bg-white shadow-sm p-4 border-b border-gray-100">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {isMobile && (
                <button
                  onClick={() => setShowQuestionMenu(true)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  <Menu className="w-5 h-5" />
                </button>
              )}
              <h2 className="text-lg font-semibold text-gray-800">
                {selectedExam.title}
              </h2>
            </div>
            <div className="flex items-center space-x-2 text-red-600 font-mono text-lg">
              <Clock className="w-5 h-5" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto p-4 gap-4">
          {/* Sidebar / Menu */}
          {!isMobile && (
            <div className="w-full lg:w-64 bg-white rounded-xl shadow-sm border border-gray-100 p-4 h-fit">
              <h3 className="font-semibold mb-4 text-gray-800">
                Questions
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {selectedExam.questions.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => navigateToQuestion(idx)}
                    className={`w-10 h-10 rounded-md text-sm font-medium transition-colors ${getQuestionStatusColor(
                      questionStatuses[idx]
                    )}`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-purple-500 rounded"></div>
                  <span>For Review</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span>Current</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                  <span>Not Visited</span>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Question Menu Modal */}
          {isMobile && showQuestionMenu && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 w-full max-w-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-800">
                    Questions
                  </h3>
                  <button
                    onClick={() => setShowQuestionMenu(false)}
                    className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {selectedExam.questions.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => navigateToQuestion(idx)}
                      className={`w-10 h-10 rounded-md text-sm font-medium transition-colors ${getQuestionStatusColor(
                        questionStatuses[idx]
                      )}`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-purple-500 rounded"></div>
                    <span>For Review</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span>Current</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                    <span>Not Visited</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Question Panel */}
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Question {currentQuestion + 1} of{" "}
                  {selectedExam.questions.length}
                </h3>
                <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  {qData.type === "mcq"
                    ? "Multiple Choice"
                    : "True / False"}
                </span>
              </div>
              <p className="text-gray-700 text-lg mb-6">
                {qData.question}
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {qData.options.map((opt, idx) => (
                <label
                  key={idx}
                  className="flex items-center space-x-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={idx}
                    checked={answers[currentQuestion] === idx}
                    onChange={() =>
                      setAnswers((prev) => ({
                        ...prev,
                        [currentQuestion]: idx,
                      }))
                    }
                    className="text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-gray-700">{opt}</span>
                </label>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() =>
                  saveAnswer(currentQuestion, answers[currentQuestion])
                }
                disabled={answers[currentQuestion] === undefined}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Save Answer
              </button>
              <button
                onClick={() => markForReview(currentQuestion)}
                className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Mark for Review
              </button>
              <div className="flex-1"></div>
              <button
                onClick={submitExam}
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Submit Exam
              </button>
            </div>

            <div className="flex justify-between mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() =>
                  navigateToQuestion(Math.max(0, currentQuestion - 1))
                }
                disabled={currentQuestion === 0}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  navigateToQuestion(
                    Math.min(
                      selectedExam.questions.length - 1,
                      currentQuestion + 1
                    )
                  )
                }
                disabled={
                  currentQuestion === selectedExam.questions.length - 1
                }
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Completed screen
  if (currentScreen === "completed") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Exam Completed!
          </h2>
          <p className="text-gray-600 mb-6">
            Your exam has been submitted successfully.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-800 mb-2">
              {selectedExam.title}
            </h3>
            <p className="text-sm text-gray-600">
              Questions Answered: {Object.keys(answers).length} /{" "}
              {selectedExam.questions.length}
            </p>
            <p className="text-sm text-gray-600">
              Time Taken:{" "}
              {formatTime(
                selectedExam.duration * 60 - timeLeft
              )}
            </p>
          </div>
          <button
            onClick={() => {
              setCurrentScreen("examList");
              setSelectedExam(null);
              setAnswers({});
              setQuestionStatuses({});
              setCurrentQuestion(0);
              setTimeLeft(0);
            }}
            className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 font-medium"
          >
            Back to Exams
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default Exam;


// import React, { useState, useEffect } from "react";
// import api from "../../service/api";
// import { Clock, Menu, X } from "lucide-react";

// export default function Exam() {
//   const [exams, setExams]         = useState([]);
//   const [ae, setAe]               = useState(null);
//   const [screen, setScreen]       = useState("list"); // list, exam
//   const [qIdx, setQIdx]           = useState(0);
//   const [answers, setAnswers]     = useState({});
//   const [timeLeft, setTimeLeft]   = useState(0);
//   const [showMenu, setShowMenu]   = useState(false);

//   useEffect(()=>{
//     api.get('/student/assigned-exams')
//       .then(r=>setExams(r.data))
//       .catch(()=>alert('Load failed'));
//   },[]);

//   const start = async item => {
//     await api.post(`/student/assigned-exams/${item._id}/start`);
//     const { data } = await api.get(`/student/assigned-exams/${item._id}`);
//     setAe(data);
//     setTimeLeft(data.duration*60);
//     setScreen('exam');
//   };

//   // countdown
//   useEffect(()=>{
//     if(screen==='exam' && timeLeft>0){
//       const t = setTimeout(()=>setTimeLeft(t=>t-1),1000);
//       return ()=>clearTimeout(t);
//     }
//     if(screen==='exam' && timeLeft===0){
//       submit();
//     }
//   },[screen,timeLeft]);

//   const saveAns = idx => {
//     setAnswers(a=>({...a, [idx]:answers[idx]}));
//   };

//   const submit = async () => {
//     const payload = {
//       answers: Object.entries(answers).map(([idx,ans])=>({
//         question: ae.questions[idx].originalId,
//         answer: ans
//       }))
//     };
//     const { data } = await api.post(
//       `/student/assigned-exams/${ae.assignedId}/submit`,
//       payload
//     );
//     window.location.href = `/results/${data._id}`;
//   };

//   if(screen==='list'){
//     return (
//       <div className="p-8">
//         <h2 className="text-xl mb-4">Your Assigned Exams</h2>
//         {exams.map(x=>(
//           <div key={x._id} className="p-4 border mb-2 flex justify-between">
//             <span>{x.examTemplate.title}</span>
//             <button
//               onClick={()=>start(x)}
//               className="px-3 py-1 bg-teal-600 text-white rounded"
//             >
//               Start
//             </button>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   if(screen==='exam'){
//     const q = ae.questions[qIdx];
//     return (
//       <div className="p-8">
//         <div className="flex justify-between mb-4">
//           <h2>{ae.examTemplate.title}</h2>
//           <div className="flex items-center space-x-1">
//             <Clock/> <span>{Math.floor(timeLeft/60).toString().padStart(2,'0')}:{(timeLeft%60).toString().padStart(2,'0')}</span>
//           </div>
//         </div>

//         <div className="mb-4">
//           <h3>Question {qIdx+1} of {ae.questions.length}</h3>
//           <p className="mt-2">{q.questionText}</p>
//         </div>

//         <div className="space-y-2 mb-4">
//           {q.options.map((opt,i)=>(
//             <label key={i} className="flex items-center space-x-2">
//               <input
//                 type="radio"
//                 name="opt"
//                 checked={answers[qIdx]===opt}
//                 onChange={()=>setAnswers(a=>({...a,[qIdx]:opt}))}
//               />
//               <span>{opt}</span>
//             </label>
//           ))}
//         </div>

//         <div className="flex space-x-2">
//           <button
//             onClick={()=>saveAns(qIdx)}
//             className="px-4 py-2 bg-green-600 text-white rounded"
//             disabled={answers[qIdx]==null}
//           >
//             Save
//           </button>
//           <button
//             onClick={()=>setQIdx(i=>Math.max(0,i-1))}
//             className="px-4 py-2 border rounded"
//             disabled={qIdx===0}
//           >
//             Prev
//           </button>
//           <button
//             onClick={()=>setQIdx(i=>Math.min(ae.questions.length-1,i+1))}
//             className="px-4 py-2 border rounded"
//           >
//             Next
//           </button>
//           <div className="flex-1"></div>
//           <button
//             onClick={submit}
//             className="px-4 py-2 bg-red-600 text-white rounded"
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return null;
// }
