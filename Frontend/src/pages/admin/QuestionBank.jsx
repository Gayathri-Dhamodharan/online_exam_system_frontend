

import React, { useState } from "react";
import {
  Clock,
  Calendar,
  BookOpen,
  FileText,
  Plus,
  Eye,
  Trash2,
  Edit,
  ArrowLeft,
  Save,
  X,
} from "lucide-react";
import ClassSubject from "../../components/questionBank/classSubject";
import QuestionDashboard from "../../components/questionBank/questionDashboard";
import CreateQuestion from "../../components/questionBank/createQuestion";
import EditQuestion from "../../components/questionBank/editQuestion";
import CreateExam from "../../components/questionBank/createExam";
import EditExam from "../../components/questionBank/editExam";
import ViewExams from "../../components/questionBank/viewExams";
import ViewExamDetails from "../../components/questionBank/viewExamDetails";


const QuestionBank = () => {
  const [currentStep, setCurrentStep] = useState("classSubject"); // classSubject, dashboard, createQuestion, createExam, viewExams, viewExamDetails, editQuestion, editExam
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [questions, setQuestions] = useState([]);
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editingExam, setEditingExam] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState({
    type: "MCQ",
    questionText: "",
    options: ["", "", "", ""],
    answer: "",
    marks: 1,
  });
  const [currentExam, setCurrentExam] = useState({
    title: "",
    date: "",
    time: "",
    duration: "",
    selectedQuestions: [],
  });

  
  // const handleCreateQuestion = () => {
  //   if (currentQuestion.questionText && currentQuestion.answer) {
  //     const newQuestion = {
  //       ...currentQuestion,
  //       id: Date.now(),
  //       class: selectedClass,
  //       subject: selectedSubject,
  //     };
  //     setQuestions([...questions, newQuestion]);
  //     resetCurrentQuestion();
  //   }
  // };

  // const handleEditQuestion = (question) => {
  //   setEditingQuestion(question);
  //   setCurrentQuestion({ ...question });
  //   setCurrentStep("editQuestion");
  // };

  const handleUpdateQuestion = () => {
    if (currentQuestion.questionText && currentQuestion.answer) {
      setQuestions(
        questions.map((q) =>
          q.id === editingQuestion.id
            ? { ...currentQuestion, id: editingQuestion.id }
            : q
        )
      );
      setEditingQuestion(null);
      resetCurrentQuestion();
      setCurrentStep("createQuestion");
    }
  };

  const handleDeleteQuestion = (questionId) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      setQuestions(questions.filter((q) => q.id !== questionId));
      // Also remove from any exams
      setExams(
        exams.map((exam) => ({
          ...exam,
          selectedQuestions: exam.selectedQuestions.filter(
            (qId) => qId !== questionId
          ),
        }))
      );
    }
  };
  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setCurrentQuestion({ ...question });
    setCurrentStep("editQuestion");
  };

  const resetCurrentQuestion = () => {
    setCurrentQuestion({
      type: "MCQ",
      questionText: "",
      options: ["", "", "", ""],
      answer: "",
      marks: 1,
    });
  };

  const handleCreateExam = () => {
    if (
      currentExam.title &&
      currentExam.date &&
      currentExam.time &&
      currentExam.duration &&
      currentExam.selectedQuestions.length > 0
    ) {
      const newExam = {
        ...currentExam,
        id: Date.now(),
        class: selectedClass,
        subject: selectedSubject,
        questionsCount: currentExam.selectedQuestions.length,
        totalMarks: currentExam.selectedQuestions.reduce((sum, qId) => {
          const question = questions.find((q) => q.id === qId);
          return sum + (question?.marks || 0);
        }, 0),
      };
      setExams([...exams, newExam]);
      resetCurrentExam();
      setCurrentStep("dashboard");
    }
  };

  const handleEditExam = (exam) => {
    setEditingExam(exam);
    setCurrentExam({
      title: exam.title,
      date: exam.date,
      time: exam.time,
      duration: exam.duration,
      selectedQuestions: [...exam.selectedQuestions],
    });
    setCurrentStep("editExam");
  };

  const handleUpdateExam = () => {
    if (
      currentExam.title &&
      currentExam.date &&
      currentExam.time &&
      currentExam.duration &&
      currentExam.selectedQuestions.length > 0
    ) {
      const updatedExam = {
        ...currentExam,
        id: editingExam.id,
        class: selectedClass,
        subject: selectedSubject,
        questionsCount: currentExam.selectedQuestions.length,
        totalMarks: currentExam.selectedQuestions.reduce((sum, qId) => {
          const question = questions.find((q) => q.id === qId);
          return sum + (question?.marks || 0);
        }, 0),
      };
      setExams(exams.map((e) => (e.id === editingExam.id ? updatedExam : e)));
      setEditingExam(null);
      resetCurrentExam();
      setCurrentStep("viewExams");
    }
  };

  const resetCurrentExam = () => {
    setCurrentExam({
      title: "",
      date: "",
      time: "",
      duration: "",
      selectedQuestions: [],
    });
  };

  const handleDeleteExam = (examId) => {
    if (window.confirm("Are you sure you want to delete this exam?")) {
      setExams(exams.filter((exam) => exam.id !== examId));
    }
  };

  const handleViewExamDetails = (exam) => {
    setSelectedExam(exam);
    setCurrentStep("viewExamDetails");
  };

  const handleAddQuestionToExam = (questionId) => {
    const updatedExam = {
      ...selectedExam,
      selectedQuestions: [...selectedExam.selectedQuestions, questionId],
      questionsCount: selectedExam.selectedQuestions.length + 1,
      totalMarks:
        selectedExam.totalMarks +
        (questions.find((q) => q.id === questionId)?.marks || 0),
    };
    setSelectedExam(updatedExam);
    setExams(exams.map((e) => (e.id === selectedExam.id ? updatedExam : e)));
  };

  const handleRemoveQuestionFromExam = (questionId) => {
    const question = questions.find((q) => q.id === questionId);
    const updatedExam = {
      ...selectedExam,
      selectedQuestions: selectedExam.selectedQuestions.filter(
        (qId) => qId !== questionId
      ),
      questionsCount: selectedExam.selectedQuestions.length - 1,
      totalMarks: selectedExam.totalMarks - (question?.marks || 0),
    };
    setSelectedExam(updatedExam);
    setExams(exams.map((e) => (e.id === selectedExam.id ? updatedExam : e)));
  };

  const getDifficultyColor = (questionsCount) => {
    if (questionsCount <= 10) return "bg-green-100 text-green-700";
    if (questionsCount <= 20) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  const getDifficultyText = (questionsCount) => {
    if (questionsCount <= 10) return "Easy";
    if (questionsCount <= 20) return "Medium";
    return "Hard";
  };

  // Class and Subject Selection
  if (currentStep === "classSubject") {
    
    return (
    <div>
      <ClassSubject
        selectedClass={selectedClass}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
        setSelectedClass={setSelectedClass}
        setCurrentStep={setCurrentStep}
      />
    </div>
  );
  }

  // Dashboard
  if (currentStep === "dashboard") {
    return (

      <QuestionDashboard
        selectedClass={selectedClass}
        selectedSubject={selectedSubject}
        setCurrentStep={setCurrentStep}
        questions={questions}
        exams={exams}
      />
    );
  }

  // Create Question
  if (currentStep === "createQuestion") {
    const classSubjectQuestions = questions.filter(
      (q) => q.class === selectedClass && q.subject === selectedSubject
    );

    return (
      <CreateQuestion
      questions={questions}
selectedClass={selectedClass}
selectedSubject={selectedSubject}
setCurrentStep={setCurrentStep}
setCurrentQuestion={setCurrentQuestion}
currentQuestion={currentQuestion}
classSubjectQuestions={classSubjectQuestions}
setQuestions={setQuestions}
resetCurrentQuestion={resetCurrentQuestion}
handleDeleteQuestion={handleDeleteQuestion}
handleEditQuestion={handleEditQuestion}

      />
    );
  }

  // Edit Question
  if (currentStep === "editQuestion") {
    return (
      <EditQuestion
        selectedClass={selectedClass}
        selectedSubject={selectedSubject}
        setEditingQuestion={setEditingQuestion}
        resetCurrentQuestion={resetCurrentQuestion}
        setCurrentStep={setCurrentStep}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
        handleUpdateQuestion={handleUpdateQuestion}
      />
    );
  }

  // Create Exam
  if (currentStep === "createExam") {
    const classSubjectQuestions = questions.filter(
      (q) => q.class === selectedClass && q.subject === selectedSubject
    );

    return (
      // <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-teal-100 to-teal-600 p-6">
      //   <div className="max-w-4xl mx-auto">
      //     <div className="flex justify-between items-center mb-8">
      //       <h1 className="text-3xl font-bold text-gray-800">
      //         Create Exam - {selectedClass} {selectedSubject}
      //       </h1>
      //       <button
      //         onClick={() => setCurrentStep("createQuestion")}
      //         className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
      //       >
      //         Back to Questions
      //       </button>
      //     </div>

      //     <div className="bg-white rounded-xl shadow-lg p-8">
      //       <div className="grid md:grid-cols-2 gap-6">
      //         <div>
      //           <label className="block text-sm font-medium text-gray-700 mb-2">
      //             Exam Title
      //           </label>
      //           <input
      //             value={currentExam.title}
      //             onChange={(e) =>
      //               setCurrentExam({ ...currentExam, title: e.target.value })
      //             }
      //             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
      //             placeholder="Enter exam title"
      //           />
      //         </div>

      //         <div>
      //           <label className="block text-sm font-medium text-gray-700 mb-2">
      //             Date
      //           </label>
      //           <input
      //             type="date"
      //             value={currentExam.date}
      //             onChange={(e) =>
      //               setCurrentExam({ ...currentExam, date: e.target.value })
      //             }
      //             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
      //           />
      //         </div>

      //         <div>
      //           <label className="block text-sm font-medium text-gray-700 mb-2">
      //             Time
      //           </label>
      //           <input
      //             type="time"
      //             value={currentExam.time}
      //             onChange={(e) =>
      //               setCurrentExam({ ...currentExam, time: e.target.value })
      //             }
      //             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
      //           />
      //         </div>

      //         <div>
      //           <label className="block text-sm font-medium text-gray-700 mb-2">
      //             Duration (minutes)
      //           </label>
      //           <input
      //             type="number"
      //             value={currentExam.duration}
      //             onChange={(e) =>
      //               setCurrentExam({ ...currentExam, duration: e.target.value })
      //             }
      //             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
      //             placeholder="e.g., 60"
      //           />
      //         </div>
      //       </div>

      //       <div className="mt-6">
      //         <label className="block text-sm font-medium text-gray-700 mb-3">
      //           Select Questions
      //         </label>
      //         <div className="border border-gray-300 rounded-lg p-4 max-h-60 overflow-y-auto">
      //           {classSubjectQuestions.map((question, index) => (
      //             <div
      //               key={question.id}
      //               className="flex items-center space-x-3 mb-3"
      //             >
      //               <input
      //                 type="checkbox"
      //                 checked={currentExam.selectedQuestions.includes(
      //                   question.id
      //                 )}
      //                 onChange={(e) => {
      //                   if (e.target.checked) {
      //                     setCurrentExam({
      //                       ...currentExam,
      //                       selectedQuestions: [
      //                         ...currentExam.selectedQuestions,
      //                         question.id,
      //                       ],
      //                     });
      //                   } else {
      //                     setCurrentExam({
      //                       ...currentExam,
      //                       selectedQuestions:
      //                         currentExam.selectedQuestions.filter(
      //                           (id) => id !== question.id
      //                         ),
      //                     });
      //                   }
      //                 }}
      //                 className="w-4 h-4 text-teal-600 focus:ring-teal-500"
      //               />
      //               <div className="flex-1">
      //                 <p className="text-sm text-gray-800">
      //                   {question.questionText}
      //                 </p>
      //                 <p className="text-xs text-gray-500">
      //                   {question.type} - {question.marks} marks
      //                 </p>
      //               </div>
      //             </div>
      //           ))}

      //           {classSubjectQuestions.length === 0 && (
      //             <p className="text-gray-500 text-center py-4">
      //               No questions available. Please create questions first.
      //             </p>
      //           )}
      //         </div>
      //       </div>

      //       <button
      //         onClick={handleCreateExam}
      //         disabled={
      //           !currentExam.title ||
      //           !currentExam.date ||
      //           !currentExam.time ||
      //           !currentExam.duration ||
      //           currentExam.selectedQuestions.length === 0
      //         }
      //         className="mt-6 w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      //       >
      //         Create Exam
      //       </button>
      //     </div>
      //   </div>
      // </div>
      <CreateExam
        selectedClass={selectedClass}
        selectedSubject={selectedSubject}
        setCurrentStep={setCurrentStep}
        currentExam={currentExam}
        setCurrentExam={setCurrentExam}
        classSubjectQuestions={classSubjectQuestions}
        handleCreateExam={handleCreateExam}
      />
    );
  }

  // Edit Exam
  if (currentStep === "editExam") {
    const classSubjectQuestions = questions.filter(
      (q) => q.class === selectedClass && q.subject === selectedSubject
    );

    return (
      // <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-teal-100 to-teal-600 p-6">
      //   <div className="max-w-4xl mx-auto">
      //     <div className="flex justify-between items-center mb-8">
      //       <h1 className="text-3xl font-bold text-gray-800">
      //         Edit Exam - {selectedClass} {selectedSubject}
      //       </h1>
      //       <button
      //         onClick={() => {
      //           setEditingExam(null);
      //           resetCurrentExam();
      //           setCurrentStep("viewExams");
      //         }}
      //         className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
      //       >
      //         <ArrowLeft className="w-4 h-4 inline mr-2" />
      //         Back
      //       </button>
      //     </div>

      //     <div className="bg-white rounded-xl shadow-lg p-8">
      //       <div className="grid md:grid-cols-2 gap-6">
      //         <div>
      //           <label className="block text-sm font-medium text-gray-700 mb-2">
      //             Exam Title
      //           </label>
      //           <input
      //             value={currentExam.title}
      //             onChange={(e) =>
      //               setCurrentExam({ ...currentExam, title: e.target.value })
      //             }
      //             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
      //             placeholder="Enter exam title"
      //           />
      //         </div>

      //         <div>
      //           <label className="block text-sm font-medium text-gray-700 mb-2">
      //             Date
      //           </label>
      //           <input
      //             type="date"
      //             value={currentExam.date}
      //             onChange={(e) =>
      //               setCurrentExam({ ...currentExam, date: e.target.value })
      //             }
      //             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
      //           />
      //         </div>

      //         <div>
      //           <label className="block text-sm font-medium text-gray-700 mb-2">
      //             Time
      //           </label>
      //           <input
      //             type="time"
      //             value={currentExam.time}
      //             onChange={(e) =>
      //               setCurrentExam({ ...currentExam, time: e.target.value })
      //             }
      //             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
      //           />
      //         </div>

      //         <div>
      //           <label className="block text-sm font-medium text-gray-700 mb-2">
      //             Duration (minutes)
      //           </label>
      //           <input
      //             type="number"
      //             value={currentExam.duration}
      //             onChange={(e) =>
      //               setCurrentExam({ ...currentExam, duration: e.target.value })
      //             }
      //             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
      //             placeholder="e.g., 60"
      //           />
      //         </div>
      //       </div>

      //       <div className="mt-6">
      //         <label className="block text-sm font-medium text-gray-700 mb-3">
      //           Select Questions
      //         </label>
      //         <div className="border border-gray-300 rounded-lg p-4 max-h-60 overflow-y-auto">
      //           {classSubjectQuestions.map((question, index) => (
      //             <div
      //               key={question.id}
      //               className="flex items-center space-x-3 mb-3"
      //             >
      //               <input
      //                 type="checkbox"
      //                 checked={currentExam.selectedQuestions.includes(
      //                   question.id
      //                 )}
      //                 onChange={(e) => {
      //                   if (e.target.checked) {
      //                     setCurrentExam({
      //                       ...currentExam,
      //                       selectedQuestions: [
      //                         ...currentExam.selectedQuestions,
      //                         question.id,
      //                       ],
      //                     });
      //                   } else {
      //                     setCurrentExam({
      //                       ...currentExam,
      //                       selectedQuestions:
      //                         currentExam.selectedQuestions.filter(
      //                           (id) => id !== question.id
      //                         ),
      //                     });
      //                   }
      //                 }}
      //                 className="w-4 h-4 text-teal-600 focus:ring-teal-500"
      //               />
      //               <div className="flex-1">
      //                 <p className="text-sm text-gray-800">
      //                   {question.questionText}
      //                 </p>
      //                 <p className="text-xs text-gray-500">
      //                   {question.type} - {question.marks} marks
      //                 </p>
      //               </div>
      //             </div>
      //           ))}

      //           {classSubjectQuestions.length === 0 && (
      //             <p className="text-gray-500 text-center py-4">
      //               No questions available. Please create questions first.
      //             </p>
      //           )}
      //         </div>
      //       </div>

      //       <button
      //         onClick={handleUpdateExam}
      //         disabled={
      //           !currentExam.title ||
      //           !currentExam.date ||
      //           !currentExam.time ||
      //           !currentExam.duration ||
      //           currentExam.selectedQuestions.length === 0
      //         }
      //         className="mt-6 w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      //       >
      //         <Save className="w-4 h-4 inline mr-2" />
      //         Update Exam
      //       </button>
      //     </div>
      //   </div>
      // </div>
      <EditExam
        classSubjectQuestions={classSubjectQuestions}
        selectedClass={selectedClass}
        selectedSubject={selectedSubject}
        setEditingExam={setEditingExam}
        resetCurrentExam={resetCurrentExam}
        setCurrentStep={setCurrentStep}
        currentExam={currentExam}
        setCurrentExam={setCurrentExam}
        handleUpdateExam={handleUpdateExam}
      />
    );
  }

  // View Exams
  if (currentStep === "viewExams") {
    const classSubjectExams = exams.filter(
      (e) => e.class === selectedClass && e.subject === selectedSubject
    );

    return (
      <ViewExams
        selectedClass={selectedClass}
        selectedSubject={selectedSubject}
        setCurrentStep={setCurrentStep}
        classSubjectExams={classSubjectExams}
        getDifficultyText={getDifficultyText}
        handleEditExam={handleEditExam}
        handleDeleteExam={handleDeleteExam}
        getDifficultyColor={getDifficultyColor}
        handleViewExamDetails={handleViewExamDetails}
      />
    );
  }

  // View Exam Details
  if (currentStep === "viewExamDetails" && selectedExam) {
    const examQuestions = questions.filter((q) =>
      selectedExam.selectedQuestions.includes(q.id)
    );
    const availableQuestions = questions.filter(
      (q) =>
        q.class === selectedClass &&
        q.subject === selectedSubject &&
        !selectedExam.selectedQuestions.includes(q.id)
    );

    return (
      // <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-teal-100 to-teal-600 p-6">
      //   <div className="max-w-6xl mx-auto">
      //     <div className="flex justify-between items-center mb-8">
      //       <div>
      //         <h1 className="text-3xl font-bold text-gray-800">
      //           {selectedExam.title}
      //         </h1>
      //         <p className="text-gray-600 mt-2">
      //           {selectedClass} - {selectedSubject}
      //         </p>
      //         <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
      //           <span>
      //             <Calendar className="w-4 h-4 inline mr-1" />
      //             {selectedExam.date}
      //           </span>
      //           <span>
      //             <Clock className="w-4 h-4 inline mr-1" />
      //             {selectedExam.time}
      //           </span>
      //           <span>
      //             <Clock className="w-4 h-4 inline mr-1" />
      //             {selectedExam.duration} min
      //           </span>
      //           <span>
      //             <FileText className="w-4 h-4 inline mr-1" />
      //             {selectedExam.totalMarks} marks
      //           </span>
      //         </div>
      //       </div>
      //       <button
      //         onClick={() => setCurrentStep("viewExams")}
      //         className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
      //       >
      //         <ArrowLeft className="w-4 h-4 inline mr-2" />
      //         Back to Exams
      //       </button>
      //     </div>

      //     <div className="grid lg:grid-cols-2 gap-8">
      //       {/* Exam Questions */}
      //       <div className="bg-white rounded-xl shadow-lg p-6">
      //         <h2 className="text-xl font-semibold text-gray-800 mb-6">
      //           Exam Questions ({examQuestions.length})
      //         </h2>

      //         <div className="space-y-4 max-h-96 overflow-y-auto">
      //           {examQuestions.map((question, index) => (
      //             <div
      //               key={question.id}
      //               className="border border-gray-200 rounded-lg p-4"
      //             >
      //               <div className="flex justify-between items-start mb-2">
      //                 <span className="text-sm font-medium text-gray-600">
      //                   Q{index + 1} - {question.type}
      //                 </span>
      //                 <div className="flex items-center space-x-2">
      //                   <span className="text-sm text-teal-600 font-medium">
      //                     {question.marks} marks
      //                   </span>
      //                   <button
      //                     onClick={() =>
      //                       handleRemoveQuestionFromExam(question.id)
      //                     }
      //                     className="text-red-500 hover:text-red-700 transition-colors"
      //                     title="Remove from exam"
      //                   >
      //                     <X className="w-4 h-4" />
      //                   </button>
      //                 </div>
      //               </div>
      //               <p className="text-gray-800 text-sm mb-2">
      //                 {question.questionText}
      //               </p>
      //               {question.type === "MCQ" && question.options && (
      //                 <div className="text-xs text-gray-600 mb-2">
      //                   Options:{" "}
      //                   {question.options.filter((opt) => opt).join(", ")}
      //                 </div>
      //               )}
      //               <p className="text-xs text-green-600">
      //                 Answer: {question.answer}
      //               </p>
      //             </div>
      //           ))}

      //           {examQuestions.length === 0 && (
      //             <p className="text-gray-500 text-center py-8">
      //               No questions in this exam yet.
      //             </p>
      //           )}
      //         </div>
      //       </div>

      //       {/* Available Questions to Add */}
      //       <div className="bg-white rounded-xl shadow-lg p-6">
      //         <h2 className="text-xl font-semibold text-gray-800 mb-6">
      //           Available Questions ({availableQuestions.length})
      //         </h2>

      //         <div className="space-y-4 max-h-96 overflow-y-auto">
      //           {availableQuestions.map((question, index) => (
      //             <div
      //               key={question.id}
      //               className="border border-gray-200 rounded-lg p-4"
      //             >
      //               <div className="flex justify-between items-start mb-2">
      //                 <span className="text-sm font-medium text-gray-600">
      //                   {question.type}
      //                 </span>
      //                 <div className="flex items-center space-x-2">
      //                   <span className="text-sm text-teal-600 font-medium">
      //                     {question.marks} marks
      //                   </span>
      //                   <button
      //                     onClick={() => handleAddQuestionToExam(question.id)}
      //                     className="text-green-500 hover:text-green-700 transition-colors"
      //                     title="Add to exam"
      //                   >
      //                     <Plus className="w-4 h-4" />
      //                   </button>
      //                 </div>
      //               </div>
      //               <p className="text-gray-800 text-sm mb-2">
      //                 {question.questionText}
      //               </p>
      //               <p className="text-xs text-green-600">
      //                 Answer: {question.answer}
      //               </p>
      //             </div>
      //           ))}

      //           {availableQuestions.length === 0 && (
      //             <p className="text-gray-500 text-center py-8">
      //               No additional questions available to add.
      //             </p>
      //           )}
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      <ViewExamDetails
        selectedExam={selectedExam}
        selectedClass={selectedClass}
        selectedSubject={selectedSubject}
        examQuestions={examQuestions}
        handleRemoveQuestionFromExam={handleRemoveQuestionFromExam}
        handleAddQuestionToExam={handleAddQuestionToExam}
        availableQuestions={availableQuestions}
        setCurrentStep={setCurrentStep}
      />
    );
  }

  return null;
};

export default QuestionBank;