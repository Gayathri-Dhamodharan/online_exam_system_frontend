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
import ExamList from "../../components/examBank/examList";
import Instructions from "../../components/examBank/instructions";
import ExamConductingTab from "../../components/examBank/examConductingTab";
import CompleteExam from "../../components/examBank/completeExam";

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
      <ExamList
        exams={exams}
        getDifficultyColor={getDifficultyColor}
        getDaysLeftColor={getDaysLeftColor}
        startExam={startExam}
      />
    );
  }

  if (currentScreen === "instructions") {
    return (
      <Instructions
        selectedExam={selectedExam}
        commonInstructions={commonInstructions}
        setCurrentScreen={setCurrentScreen}
        beginExam={beginExam}
      />
    );
  }

  if (currentScreen === "exam") {
    const qData = selectedExam?.selectedQuestions?.[currentQuestion] || null;

    return (
      <ExamConductingTab
        isMobile={isMobile}
        setShowQuestionMenu={setShowQuestionMenu}
        selectedExam={selectedExam}
        formatTime={formatTime}
        timeLeft={timeLeft}
        navigateToQuestion={navigateToQuestion}
        getQuestionStatusColor={getQuestionStatusColor}
        questionStatuses={questionStatuses}
        showQuestionMenu={showQuestionMenu}
        currentQuestion={currentQuestion}
        qData={qData}
        answers={answers}
        setAnswers={setAnswers}
        markForReview={markForReview}
        submitExam={submitExam}
        saveAnswer={saveAnswer}
        exams={exams}
      />
    );
  }

  // Completed screen
  if (currentScreen === "completed") {
    return (
      // <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      //   <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-md w-full text-center">
      //     <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
      //     <h2 className="text-2xl font-bold text-gray-800 mb-2">
      //       Exam Completed!
      //     </h2>
      //     <p className="text-gray-600 mb-6">
      //       Your exam has been submitted successfully.
      //     </p>
      //     <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
      //       <h3 className="font-semibold text-gray-800 mb-2">
      //         {selectedExam.title}
      //       </h3>
      //       <p className="text-sm text-gray-600">
      //         Questions Answered: {Object.keys(answers).length} /{" "}
      //         {selectedExam.questions.length}
      //       </p>
      //       <p className="text-sm text-gray-600">
      //         Time Taken: {formatTime(selectedExam.duration * 60 - timeLeft)}
      //       </p>
      //     </div>
      //     <button
      //       onClick={() => {
      //         setCurrentScreen("examList");
      //         setSelectedExam(null);
      //         setAnswers({});
      //         setQuestionStatuses({});
      //         setCurrentQuestion(0);
      //         setTimeLeft(0);
      //       }}
      //       className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 font-medium"
      //     >
      //       Back to Exams
      //     </button>
      //   </div>
      // </div>
 <CompleteExam
 selectedExam={selectedExam}
 answers={answers}
 formatTime={formatTime}
 timeLeft={timeLeft}
 setCurrentScreen={setCurrentScreen}
 setSelectedExam={setSelectedExam}
 setCurrentQuestion={setCurrentQuestion}
 setQuestionStatuses={setQuestionStatuses}
 setTimeLeft={setTimeLeft}
 />
      
    );
  }

  return null;
};

export default Exam;
