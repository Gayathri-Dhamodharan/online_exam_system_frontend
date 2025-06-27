import React, { useState, useEffect } from 'react';
import { Clock, Menu, X, CheckCircle, AlertCircle, Circle, Eye } from 'lucide-react';

const Exam = () => {
  const [currentScreen, setCurrentScreen] = useState('examList'); // examList, instructions, exam, completed
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
      title: "Mathematics Final Exam",
      subject: "Mathematics",
      date: "2025-07-01",
      duration: 120, // minutes
      totalMarks: 100,
      passMarks: 40,
      questions: [
        {
          id: 1,
          question: "What is the value of π (pi) approximately?",
          type: "mcq",
          options: ["3.14", "2.71", "1.41", "4.20"],
          correct: 0
        },
        {
          id: 2,
          question: "Is the square root of 16 equal to 4?",
          type: "truefalse",
          options: ["True", "False"],
          correct: 0
        },
        {
          id: 3,
          question: "What is 15 + 27?",
          type: "mcq",
          options: ["41", "42", "43", "44"],
          correct: 1
        },
        {
          id: 4,
          question: "Is 0 a natural number?",
          type: "truefalse",
          options: ["True", "False"],
          correct: 1
        },
        {
          id: 5,
          question: "What is the derivative of x²?",
          type: "mcq",
          options: ["x", "2x", "x²", "2x²"],
          correct: 1
        }
      ]
    },
    {
      id: 2,
      title: "Physics Midterm",
      subject: "Physics",
      date: "2025-07-03",
      duration: 90,
      totalMarks: 75,
      passMarks: 30,
      questions: []
    }
  ];

  const commonInstructions = [
    "Read all questions carefully before answering.",
    "Each question has only one correct answer.",
    "You can navigate between questions using the question menu.",
    "Mark questions for review if you're unsure about your answer.",
    "Save your answer before moving to the next question.",
    "Submit the exam before time runs out.",
    "Once submitted, you cannot change your answers.",
    "Ensure stable internet connection throughout the exam."
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let timer;
    if (currentScreen === 'exam' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setCurrentScreen('completed');
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
    setCurrentScreen('instructions');
  };

  const beginExam = () => {
    setTimeLeft(selectedExam.duration * 60); // Convert minutes to seconds
    setCurrentScreen('exam');
    setCurrentQuestion(0);
    // Initialize question statuses
    const statuses = {};
    selectedExam.questions.forEach((_, index) => {
      statuses[index] = index === 0 ? 'current' : 'not-visited';
    });
    setQuestionStatuses(statuses);
  };

  const saveAnswer = (questionIndex, answerIndex) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: answerIndex }));
    setQuestionStatuses(prev => ({ ...prev, [questionIndex]: 'answered' }));
  };

  const markForReview = (questionIndex) => {
    setQuestionStatuses(prev => ({ ...prev, [questionIndex]: 'review' }));
  };

  const navigateToQuestion = (questionIndex) => {
    setCurrentQuestion(questionIndex);
    setQuestionStatuses(prev => ({
      ...prev,
      [questionIndex]: prev[questionIndex] === 'not-visited' ? 'current' : prev[questionIndex]
    }));
    setShowQuestionMenu(false);
  };

  const submitExam = () => {
    setCurrentScreen('completed');
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getQuestionStatusColor = (status) => {
    switch (status) {
      case 'answered': return 'bg-green-500 text-white';
      case 'review': return 'bg-purple-500 text-white';
      case 'current': return 'bg-red-500 text-white';
      case 'not-visited': return 'bg-yellow-400 text-black';
      default: return 'bg-gray-300 text-black';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'answered': return <CheckCircle className="w-4 h-4" />;
      case 'review': return <Eye className="w-4 h-4" />;
      case 'current': return <AlertCircle className="w-4 h-4" />;
      default: return <Circle className="w-4 h-4" />;
    }
  };

  if (currentScreen === 'examList') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-teal-200 to-teal-600 p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Available Exams</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map(exam => (
              <div key={exam.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{exam.title}</h3>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p><span className="font-medium">Subject:</span> {exam.subject}</p>
                  <p><span className="font-medium">Date:</span> {exam.date}</p>
                  <p><span className="font-medium">Duration:</span> {exam.duration} minutes</p>
                  <p><span className="font-medium">Total Marks:</span> {exam.totalMarks}</p>
                  <p><span className="font-medium">Pass Marks:</span> {exam.passMarks}</p>
                </div>
                <button
                  onClick={() => startExam(exam)}
                  className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 px-4 rounded-md hover:from-teal-600 hover:to-teal-700 transition-all font-medium"
                >
                  Start Exam
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentScreen === 'instructions') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-teal-200 to-teal-600 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Exam Instructions</h2>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">{selectedExam.title}</h3>
              <p className="text-gray-600">Duration: {selectedExam.duration} minutes | Total Marks: {selectedExam.totalMarks}</p>
            </div>
            <div className="mb-8">
              <h4 className="font-semibold mb-4 text-gray-700">Please read the following instructions carefully:</h4>
              <ul className="space-y-2">
                {commonInstructions.map((instruction, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-teal-600 mr-2">•</span>
                    <span className="text-gray-700">{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setCurrentScreen('examList')}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={beginExam}
                className="px-6 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-md hover:from-teal-600 hover:to-teal-700 transition-all font-medium"
              >
                Start Exam
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentScreen === 'exam') {
    const currentQuestionData = selectedExam.questions[currentQuestion];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-teal-200 to-teal-600">
        {/* Header */}
        <div className="bg-white shadow-sm p-4">
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
              <h2 className="text-lg font-semibold text-gray-800">{selectedExam.title}</h2>
            </div>
            <div className="flex items-center space-x-2 text-red-600 font-mono text-lg">
              <Clock className="w-5 h-5" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>

        <div className="flex max-w-7xl mx-auto p-4 space-x-4">
          {/* Question Menu - Desktop */}
          {!isMobile && (
            <div className="w-64 bg-white rounded-lg shadow-lg p-4 h-fit">
              <h3 className="font-semibold mb-4 text-gray-800">Questions</h3>
              <div className="grid grid-cols-5 gap-2">
                {selectedExam.questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => navigateToQuestion(index)}
                    className={`w-10 h-10 rounded-md text-sm font-medium transition-colors ${getQuestionStatusColor(questionStatuses[index])}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-4 h-4 bg-purple-500 rounded"></div>
                  <span>For Review</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span>Current</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                  <span>Not Visited</span>
                </div>
              </div>
            </div>
          )}

          {/* Question Menu - Mobile Modal */}
          {isMobile && showQuestionMenu && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 w-full max-w-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-800">Questions</h3>
                  <button
                    onClick={() => setShowQuestionMenu(false)}
                    className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {selectedExam.questions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => navigateToQuestion(index)}
                      className={`w-10 h-10 rounded-md text-sm font-medium transition-colors ${getQuestionStatusColor(questionStatuses[index])}`}
                    >
                      {index + 1}
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

          {/* Main Question Area */}
          <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Question {currentQuestion + 1} of {selectedExam.questions.length}
                </h3>
                <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  {currentQuestionData.type === 'mcq' ? 'Multiple Choice' : 'True/False'}
                </span>
              </div>
              <p className="text-gray-700 text-lg mb-6">{currentQuestionData.question}</p>
            </div>

            <div className="space-y-3 mb-8">
              {currentQuestionData.options.map((option, index) => (
                <label key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={index}
                    checked={answers[currentQuestion] === index}
                    onChange={() => {}}
                    className="text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => saveAnswer(currentQuestion, answers[currentQuestion])}
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

            {/* Navigation */}
            <div className="flex justify-between mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => navigateToQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => navigateToQuestion(Math.min(selectedExam.questions.length - 1, currentQuestion + 1))}
                disabled={currentQuestion === selectedExam.questions.length - 1}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentScreen === 'completed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-teal-200 to-teal-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Exam Completed!</h2>
            <p className="text-gray-600">Your exam has been submitted successfully.</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">{selectedExam.title}</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Questions Answered: {Object.keys(answers).length} / {selectedExam.questions.length}</p>
              <p>Time Taken: {formatTime(selectedExam.duration * 60 - timeLeft)}</p>
            </div>
          </div>

          <button
            onClick={() => {
              setCurrentScreen('examList');
              setSelectedExam(null);
              setAnswers({});
              setQuestionStatuses({});
              setCurrentQuestion(0);
              setTimeLeft(0);
            }}
            className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 px-4 rounded-md hover:from-teal-600 hover:to-teal-700 transition-all font-medium"
          >
            Back to Exams
          </button>
        </div>
      </div>
    );
  }
};

export default Exam;