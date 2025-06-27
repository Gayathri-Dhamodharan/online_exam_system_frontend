// import React, { useState } from "react";
// import {
//   Plus,
//   Edit2,
//   Trash2,
//   Eye,
//   BookOpen,
//   FileText,
//   ArrowLeft,
//   Save,
//   X,
// } from "lucide-react";

// const QuestionBank = () => {
//   const [currentScreen, setCurrentScreen] = useState("dashboard");
//   const [selectedSubject, setSelectedSubject] = useState("");
//   const [selectedGrade, setSelectedGrade] = useState("");
//   const [showAddQuestion, setShowAddQuestion] = useState(false);
//   const [showEditQuestion, setShowEditQuestion] = useState(false);
//   const [editingQuestion, setEditingQuestion] = useState(null);
//   const [showCreateExam, setShowCreateExam] = useState(false);
//   const [selectedQuestions, setSelectedQuestions] = useState([]);
//   const [examTitle, setExamTitle] = useState("");

//   // Sample data
//   const [subjects] = useState(["English", "Tamil", "Maths"]);
//   const [grades] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

//   const [questionBank, setQuestionBank] = useState({
//     "English-1": [
//       {
//         id: "eng1-1",
//         question: 'What is the plural form of "child"?',
//         type: "mcq",
//         options: ["childs", "children", "childes", "child"],
//         correctAnswer: "children",
//       },
//       {
//         id: "eng1-2",
//         question: "A noun is a naming word.",
//         type: "true-false",
//         correctAnswer: "true",
//       },
//     ],
//     "Tamil-1": [
//       {
//         id: "tam1-1",
//         question: "தமிழ் எழுத்துக்களின் எண்ணிக்கை எவ்வளவு?",
//         type: "mcq",
//         options: ["245", "247", "246", "248"],
//         correctAnswer: "247",
//       },
//     ],
//     "Maths-1": [
//       {
//         id: "math1-1",
//         question: "What is 5 + 3?",
//         type: "mcq",
//         options: ["6", "7", "8", "9"],
//         correctAnswer: "8",
//       },
//       {
//         id: "math1-2",
//         question: "10 is greater than 5.",
//         type: "true-false",
//         correctAnswer: "true",
//       },
//     ],
//   });

//   const [createdExams, setCreatedExams] = useState([
//     {
//       id: "exam1",
//       title: "English Basic Test - Grade 1",
//       subject: "English",
//       grade: 1,
//       questionsCount: 5,
//       createdAt: "2024-06-20",
//       questions: [
//         {
//           id: "eng1-1",
//           question: 'What is the plural form of "child"?',
//           type: "mcq",
//           options: ["childs", "children", "childes", "child"],
//           correctAnswer: "children",
//         },
//       ],
//     },
//   ]);

//   const [newQuestion, setNewQuestion] = useState({
//     question: "",
//     type: "mcq",
//     options: ["", "", "", ""],
//     correctAnswer: "",
//   });

//   const getCurrentQuestions = () => {
//     const key = `${selectedSubject}-${selectedGrade}`;
//     return questionBank[key] || [];
//   };

//   const addQuestion = () => {
//     const key = `${selectedSubject}-${selectedGrade}`;
//     const questions = questionBank[key] || [];
//     const newId = `${selectedSubject.toLowerCase()}${selectedGrade}-${Date.now()}`;

//     const questionToAdd = {
//       ...newQuestion,
//       id: newId,
//     };

//     setQuestionBank((prev) => ({
//       ...prev,
//       [key]: [...questions, questionToAdd],
//     }));

//     setNewQuestion({
//       question: "",
//       type: "mcq",
//       options: ["", "", "", ""],
//       correctAnswer: "",
//     });
//     setShowAddQuestion(false);
//   };

//   const editQuestion = (questionId, updatedQuestion) => {
//     const key = `${selectedSubject}-${selectedGrade}`;
//     setQuestionBank((prev) => ({
//       ...prev,
//       [key]: prev[key].map((q) =>
//         q.id === questionId ? { ...updatedQuestion, id: questionId } : q
//       ),
//     }));
//     setShowEditQuestion(false);
//     setEditingQuestion(null);
//   };

//   const deleteQuestion = (questionId) => {
//     const key = `${selectedSubject}-${selectedGrade}`;
//     setQuestionBank((prev) => ({
//       ...prev,
//       [key]: prev[key].filter((q) => q.id !== questionId),
//     }));
//   };

//   const createExam = () => {
//     if (selectedQuestions.length === 0 || !examTitle.trim()) return;

//     const newExam = {
//       id: `exam-${Date.now()}`,
//       title: examTitle,
//       subject: selectedSubject,
//       grade: selectedGrade,
//       questionsCount: selectedQuestions.length,
//       createdAt: new Date().toISOString().split("T")[0],
//       questions: selectedQuestions,
//     };

//     setCreatedExams((prev) => [...prev, newExam]);
//     setSelectedQuestions([]);
//     setExamTitle("");
//     setShowCreateExam(false);
//     alert("Exam created successfully!");
//   };

//   // Dashboard Screen
//   const DashboardScreen = () => (
//     <div className="min-h-screen bg-gray-50  p-8">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-4xl font-bold text-teal-800 mb-8 text-center">
//           Question Bank Management
//         </h1>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div
//             onClick={() => setCurrentScreen("subjects")}
//             className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-105"
//           >
//             <div className="flex items-center justify-center mb-6">
//               <div className="bg-gradient-to-r from-teal-400 to-teal-600 p-4 rounded-full group-hover:scale-110 transition-transform">
//                 <Plus size={32} className="text-white" />
//               </div>
//             </div>
//             <h2 className="text-2xl font-bold text-teal-800 text-center mb-4">
//               Create Question Paper
//             </h2>
//             <p className="text-teal-600 text-center">
//               Add, edit, and manage questions for different subjects and grades
//             </p>
//           </div>

//           <div
//             onClick={() => setCurrentScreen("created-papers")}
//             className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-105"
//           >
//             <div className="flex items-center justify-center mb-6">
//               <div className="bg-gradient-to-r from-teal-500 to-teal-700 p-4 rounded-full group-hover:scale-110 transition-transform">
//                 <FileText size={32} className="text-white" />
//               </div>
//             </div>
//             <h2 className="text-2xl font-bold text-teal-800 text-center mb-4">
//               View Created Papers
//             </h2>
//             <p className="text-teal-600 text-center">
//               Browse and manage your created examination papers
//             </p>
//           </div>
          
//         </div>
//       </div>
//     </div>
//   );

//   // Subject Selection Screen
//   const SubjectScreen = () => (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex items-center mb-8">
//           <button
//             onClick={() => setCurrentScreen("dashboard")}
//             className="mr-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
//           >
//             <ArrowLeft className="text-teal-600" />
//           </button>
//           <h1 className="text-3xl font-bold text-teal-800">Select Subject</h1>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {subjects.map((subject) => (
//             <div
//               key={subject}
//               onClick={() => {
//                 setSelectedSubject(subject);
//                 setCurrentScreen("grades");
//               }}
//               className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105"
//             >
//               <div className="flex items-center justify-center mb-4">
//                 <div className="bg-gradient-to-r from-teal-400 to-teal-600 p-3 rounded-full group-hover:scale-110 transition-transform">
//                   <BookOpen size={24} className="text-white" />
//                 </div>
//               </div>
//               <h3 className="text-xl font-semibold text-teal-800 text-center">
//                 {subject}
//               </h3>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   // Grade Selection Screen
//   const GradeScreen = () => (
//     <div className="min-h-screen  bg-gray-50 p-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex items-center mb-8">
//           <button
//             onClick={() => setCurrentScreen("subjects")}
//             className="mr-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
//           >
//             <ArrowLeft className="text-teal-600" />
//           </button>
//           <h1 className="text-2xl md:text-3xl font-bold text-teal-800">
//             Select Grade - {selectedSubject}
//           </h1>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//           {grades.map((grade) => (
//             <div
//               key={grade}
//               onClick={() => {
//                 setSelectedGrade(grade);
//                 setCurrentScreen("questions");
//               }}
//               className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105"
//             >
//               <div className="text-center">
//                 <div className="bg-gradient-to-r from-teal-400 to-teal-600 text-white text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
//                   {grade}
//                 </div>
//                 <p className="text-teal-700 font-medium">Grade {grade}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   // Questions Management Screen
//   const QuestionsScreen = () => {
//     const questions = getCurrentQuestions();

//     return (
//       <div className="min-h-screen  bg-gray-50 p-8">
//         <div className="max-w-6xl mx-auto">
//           <div className="flex flex-col md:flex-row items-center justify-between mb-8">
//             <div className="flex items-center">
//               <button
//                 onClick={() => setCurrentScreen("grades")}
//                 className="mr-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
//               >
//                 <ArrowLeft className="text-teal-600" />
//               </button>
//               <h1 className="text-2xl md:text-3xl font-bold text-teal-800">
//                 {selectedSubject} - Grade {selectedGrade}
//               </h1>
//             </div>
//             <div className="flex gap-4">
//               <button
//                 onClick={() => setShowAddQuestion(true)}
//                 className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-2 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all flex items-center gap-2"
//               >
//                 <Plus size={20} />
//                 Add Question
//               </button>
//               <button
//                 onClick={() => setShowCreateExam(true)}
//                 className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 py-2 rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all flex items-center gap-2"
//               >
//                 <FileText size={20} />
//                 Create Exam
//               </button>
//             </div>
//           </div>

//           <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
//             {questions.length === 0 ? (
//               <div className="text-center py-12">
//                 <BookOpen size={64} className="mx-auto text-teal-300 mb-4" />
//                 <p className="text-teal-600 text-lg">
//                   No questions found. Add your first question!
//                 </p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {questions.map((question, index) => (
//                   <div
//                     key={question.id}
//                     className="border border-teal-200 rounded-lg p-4 hover:shadow-md transition-shadow"
//                   >
//                     <div className="flex justify-between items-start mb-3">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-2 mb-2">
//                           <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded text-sm font-medium">
//                             Q{index + 1}
//                           </span>
//                           <span className="bg-teal-500 text-white px-2 py-1 rounded text-sm">
//                             {question.type.toUpperCase()}
//                           </span>
//                         </div>
//                         <p className="text-teal-800 font-medium mb-2">
//                           {question.question}
//                         </p>

//                         {question.type === "mcq" && (
//                           <div className="grid grid-cols-2 gap-2">
//                             {question.options.map((option, optIndex) => (
//                               <div
//                                 key={optIndex}
//                                 className={`p-2 rounded text-sm border ${
//                                   option === question.correctAnswer
//                                     ? "bg-green-100 border-green-300 text-green-700"
//                                     : "bg-gray-50 border-gray-200"
//                                 }`}
//                               >
//                                 {String.fromCharCode(65 + optIndex)}. {option}
//                               </div>
//                             ))}
//                           </div>
//                         )}

//                         {question.type === "true-false" && (
//                           <div className="flex gap-2">
//                             <span
//                               className={`px-3 py-1 rounded text-sm ${
//                                 question.correctAnswer === "true"
//                                   ? "bg-green-100 text-green-700 border border-green-300"
//                                   : "bg-gray-100 text-gray-600"
//                               }`}
//                             >
//                               True
//                             </span>
//                             <span
//                               className={`px-3 py-1 rounded text-sm ${
//                                 question.correctAnswer === "false"
//                                   ? "bg-green-100 text-green-700 border border-green-300"
//                                   : "bg-gray-100 text-gray-600"
//                               }`}
//                             >
//                               False
//                             </span>
//                           </div>
//                         )}
//                       </div>
//                       <div className="flex gap-2 ml-4">
//                         <button
//                           onClick={() => {
//                             setEditingQuestion(question);
//                             setShowEditQuestion(true);
//                           }}
//                           className="p-2 text-teal-600 hover:bg-teal-100 rounded transition-colors"
//                         >
//                           <Edit2 size={16} />
//                         </button>
//                         <button
//                           onClick={() => deleteQuestion(question.id)}
//                           className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors"
//                         >
//                           <Trash2 size={16} />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Add Question Modal */}
//         {showAddQuestion && (
//           <AddQuestionModal
//             onClose={() => setShowAddQuestion(false)}
//             onSave={addQuestion}
//             question={newQuestion}
//             setQuestion={setNewQuestion}
//           />
//         )}

//         {/* Edit Question Modal */}
//         {showEditQuestion && editingQuestion && (
//           <EditQuestionModal
//             onClose={() => {
//               setShowEditQuestion(false);
//               setEditingQuestion(null);
//             }}
//             onSave={(updatedQuestion) =>
//               editQuestion(editingQuestion.id, updatedQuestion)
//             }
//             question={editingQuestion}
//           />
//         )}

//         {/* Create Exam Modal */}
//         {showCreateExam && (
//           <CreateExamModal
//             questions={questions}
//             onClose={() => setShowCreateExam(false)}
//             onSave={createExam}
//             selectedQuestions={selectedQuestions}
//             setSelectedQuestions={setSelectedQuestions}
//             examTitle={examTitle}
//             setExamTitle={setExamTitle}
//           />
//         )}
//       </div>
//     );
//   };

//   // Created Papers Screen
//   const CreatedPapersScreen = () => (
//     <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-teal-100 to-teal-600 p-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex items-center mb-8">
//           <button
//             onClick={() => setCurrentScreen("dashboard")}
//             className="mr-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
//           >
//             <ArrowLeft className="text-teal-600" />
//           </button>
//           <h1 className="text-3xl font-bold text-teal-800">
//             Created Question Papers
//           </h1>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {createdExams.map((exam) => (
//             <div
//               key={exam.id}
//               onClick={() => {
//                 setCurrentScreen("exam-details");
//                 setSelectedSubject(exam.subject);
//                 setSelectedGrade(exam.grade);
//               }}
//               className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <div className="bg-gradient-to-r from-teal-400 to-teal-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
//                   <FileText size={20} className="text-white" />
//                 </div>
//                 <span className="text-teal-600 text-sm">{exam.createdAt}</span>
//               </div>
//               <h3 className="text-lg font-semibold text-teal-800 mb-2">
//                 {exam.title}
//               </h3>
//               <div className="space-y-1 text-sm text-teal-600">
//                 <p>Subject: {exam.subject}</p>
//                 <p>Grade: {exam.grade}</p>
//                 <p>Questions: {exam.questionsCount}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   // Exam Details Screen
//   const ExamDetailsScreen = () => {
//     const exam = createdExams.find(
//       (e) => e.subject === selectedSubject && e.grade === selectedGrade
//     );

//     if (!exam) return <div>Exam not found</div>;

//     return (
//       <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-teal-100 to-teal-600 p-8">
//         <div className="max-w-4xl mx-auto">
//           <div className="flex items-center mb-8">
//             <button
//               onClick={() => setCurrentScreen("created-papers")}
//               className="mr-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
//             >
//               <ArrowLeft className="text-teal-600" />
//             </button>
//             <h1 className="text-3xl font-bold text-teal-800">{exam.title}</h1>
//           </div>

//           <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
//             <div className="mb-6 p-4 bg-teal-50 rounded-lg">
//               <h2 className="text-xl font-semibold text-teal-800 mb-2">
//                 Exam Information
//               </h2>
//               <div className="grid md:grid-cols-2 gap-4 text-teal-600">
//                 <p>
//                   <strong>Subject:</strong> {exam.subject}
//                 </p>
//                 <p>
//                   <strong>Grade:</strong> {exam.grade}
//                 </p>
//                 <p>
//                   <strong>Total Questions:</strong> {exam.questionsCount}
//                 </p>
//                 <p>
//                   <strong>Created:</strong> {exam.createdAt}
//                 </p>
//               </div>
//             </div>

//             <div className="space-y-6">
//               <h3 className="text-xl font-semibold text-teal-800">Questions</h3>
//               {exam.questions.map((question, index) => (
//                 <div
//                   key={question.id}
//                   className="border border-teal-200 rounded-lg p-4"
//                 >
//                   <div className="flex items-center gap-2 mb-3">
//                     <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded font-medium">
//                       Question {index + 1}
//                     </span>
//                     <span className="bg-teal-500 text-white px-2 py-1 rounded text-sm">
//                       {question.type.toUpperCase()}
//                     </span>
//                   </div>

//                   <p className="text-teal-800 font-medium mb-3 text-lg">
//                     {question.question}
//                   </p>

//                   {question.type === "mcq" && (
//                     <div className="space-y-2">
//                       {question.options.map((option, optIndex) => (
//                         <div
//                           key={optIndex}
//                           className={`p-3 rounded border ${
//                             option === question.correctAnswer
//                               ? "bg-green-100 border-green-300 text-green-700 font-medium"
//                               : "bg-gray-50 border-gray-200"
//                           }`}
//                         >
//                           <span className="font-medium">
//                             {String.fromCharCode(65 + optIndex)}.
//                           </span>{" "}
//                           {option}
//                           {option === question.correctAnswer && (
//                             <span className="ml-2 text-green-600 font-bold">
//                               ✓ Correct Answer
//                             </span>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   {question.type === "true-false" && (
//                     <div className="flex gap-4">
//                       <div
//                         className={`px-4 py-2 rounded border ${
//                           question.correctAnswer === "true"
//                             ? "bg-green-100 border-green-300 text-green-700 font-medium"
//                             : "bg-gray-100 border-gray-200"
//                         }`}
//                       >
//                         True{" "}
//                         {question.correctAnswer === "true" && (
//                           <span className="ml-2 text-green-600 font-bold">
//                             ✓
//                           </span>
//                         )}
//                       </div>
//                       <div
//                         className={`px-4 py-2 rounded border ${
//                           question.correctAnswer === "false"
//                             ? "bg-green-100 border-green-300 text-green-700 font-medium"
//                             : "bg-gray-100 border-gray-200"
//                         }`}
//                       >
//                         False{" "}
//                         {question.correctAnswer === "false" && (
//                           <span className="ml-2 text-green-600 font-bold">
//                             ✓
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Add Question Modal Component
//   const AddQuestionModal = ({ onClose, onSave, question, setQuestion }) => (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-teal-800">Add New Question</h2>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         <div className="space-y-4">
//           <div>
//             <label className="block text-teal-700 font-medium mb-2">
//               Question Type
//             </label>
//             <select
//               value={question.type}
//               onChange={(e) =>
//                 setQuestion((prev) => ({ ...prev, type: e.target.value }))
//               }
//               className="w-full p-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//             >
//               <option value="mcq">Multiple Choice (MCQ)</option>
//               <option value="true-false">True/False</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-teal-700 font-medium mb-2">
//               Question
//             </label>
//             <textarea
//               value={question.question}
//               onChange={(e) =>
//                 setQuestion((prev) => ({ ...prev, question: e.target.value }))
//               }
//               className="w-full p-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//               rows="3"
//               placeholder="Enter your question here..."
//             />
//           </div>

//           {question.type === "mcq" && (
//             <div>
//               <label className="block text-teal-700 font-medium mb-2">
//                 Options
//               </label>
//               {question.options.map((option, index) => (
//                 <div key={index} className="mb-2">
//                   <input
//                     type="text"
//                     value={option}
//                     onChange={(e) => {
//                       const newOptions = [...question.options];
//                       newOptions[index] = e.target.value;
//                       setQuestion((prev) => ({ ...prev, options: newOptions }));
//                     }}
//                     className="w-full p-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                     placeholder={`Option ${String.fromCharCode(65 + index)}`}
//                   />
//                 </div>
//               ))}

//               <div className="mt-4">
//                 <label className="block text-teal-700 font-medium mb-2">
//                   Correct Answer
//                 </label>
//                 <select
//                   value={question.correctAnswer}
//                   onChange={(e) =>
//                     setQuestion((prev) => ({
//                       ...prev,
//                       correctAnswer: e.target.value,
//                     }))
//                   }
//                   className="w-full p-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                 >
//                   <option value="">Select correct answer</option>
//                   {question.options.map((option, index) => (
//                     <option key={index} value={option}>
//                       {String.fromCharCode(65 + index)}. {option}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           )}

//           {question.type === "true-false" && (
//             <div>
//               <label className="block text-teal-700 font-medium mb-2">
//                 Correct Answer
//               </label>
//               <div className="flex gap-4">
//                 <label className="flex items-center">
//                   <input
//                     type="radio"
//                     name="trueFalseAnswer"
//                     value="true"
//                     checked={question.correctAnswer === "true"}
//                     onChange={(e) =>
//                       setQuestion((prev) => ({
//                         ...prev,
//                         correctAnswer: e.target.value,
//                       }))
//                     }
//                     className="mr-2"
//                   />
//                   True
//                 </label>
//                 <label className="flex items-center">
//                   <input
//                     type="radio"
//                     name="trueFalseAnswer"
//                     value="false"
//                     checked={question.correctAnswer === "false"}
//                     onChange={(e) =>
//                       setQuestion((prev) => ({
//                         ...prev,
//                         correctAnswer: e.target.value,
//                       }))
//                     }
//                     className="mr-2"
//                   />
//                   False
//                 </label>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="flex gap-4 mt-6">
//           <button
//             onClick={onSave}
//             className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all flex items-center justify-center gap-2"
//           >
//             <Save size={20} />
//             Save Question
//           </button>
//           <button
//             onClick={onClose}
//             className="px-6 py-3 border border-teal-300 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   // Edit Question Modal Component
//   const EditQuestionModal = ({ onClose, onSave, question }) => {
//     const [editedQuestion, setEditedQuestion] = useState(question);

//     const handleSave = () => {
//       onSave(editedQuestion);
//     };

//     return (
//       <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
//         <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-teal-800">Edit Question</h2>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-gray-100 rounded-full"
//             >
//               <X size={20} />
//             </button>
//           </div>

//           <div className="space-y-4">
//             <div>
//               <label className="block text-teal-700 font-medium mb-2">
//                 Question Type
//               </label>
//               <select
//                 value={editedQuestion.type}
//                 onChange={(e) =>
//                   setEditedQuestion((prev) => ({
//                     ...prev,
//                     type: e.target.value,
//                   }))
//                 }
//                 className="w-full p-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//               >
//                 <option value="mcq">Multiple Choice (MCQ)</option>
//                 <option value="true-false">True/False</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-teal-700 font-medium mb-2">
//                 Question
//               </label>
//               <textarea
//                 value={editedQuestion.question}
//                 onChange={(e) =>
//                   setEditedQuestion((prev) => ({
//                     ...prev,
//                     question: e.target.value,
//                   }))
//                 }
//                 className="w-full p-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                 rows="3"
//                 placeholder="Enter your question here..."
//               />
//             </div>

//             {editedQuestion.type === "mcq" && (
//               <div>
//                 <label className="block text-teal-700 font-medium mb-2">
//                   Options
//                 </label>
//                 {editedQuestion.options.map((option, index) => (
//                   <div key={index} className="mb-2">
//                     <input
//                       type="text"
//                       value={option}
//                       onChange={(e) => {
//                         const newOptions = [...editedQuestion.options];
//                         newOptions[index] = e.target.value;
//                         setEditedQuestion((prev) => ({
//                           ...prev,
//                           options: newOptions,
//                         }));
//                       }}
//                       className="w-full p-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                       placeholder={`Option ${String.fromCharCode(65 + index)}`}
//                     />
//                   </div>
//                 ))}

//                 <div className="mt-4">
//                   <label className="block text-teal-700 font-medium mb-2">
//                     Correct Answer
//                   </label>
//                   <select
//                     value={editedQuestion.correctAnswer}
//                     onChange={(e) =>
//                       setEditedQuestion((prev) => ({
//                         ...prev,
//                         correctAnswer: e.target.value,
//                       }))
//                     }
//                     className="w-full p-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                   >
//                     <option value="">Select correct answer</option>
//                     {editedQuestion.options.map((option, index) => (
//                       <option key={index} value={option}>
//                         {String.fromCharCode(65 + index)}. {option}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             )}

//             {editedQuestion.type === "true-false" && (
//               <div>
//                 <label className="block text-teal-700 font-medium mb-2">
//                   Correct Answer
//                 </label>
//                 <div className="flex gap-4">
//                   <label className="flex items-center">
//                     <input
//                       type="radio"
//                       name="editTrueFalseAnswer"
//                       value="true"
//                       checked={editedQuestion.correctAnswer === "true"}
//                       onChange={(e) =>
//                         setEditedQuestion((prev) => ({
//                           ...prev,
//                           correctAnswer: e.target.value,
//                         }))
//                       }
//                       className="mr-2"
//                     />
//                     True
//                   </label>
//                   <label className="flex items-center">
//                     <input
//                       type="radio"
//                       name="editTrueFalseAnswer"
//                       value="false"
//                       checked={editedQuestion.correctAnswer === "false"}
//                       onChange={(e) =>
//                         setEditedQuestion((prev) => ({
//                           ...prev,
//                           correctAnswer: e.target.value,
//                         }))
//                       }
//                       className="mr-2"
//                     />
//                     False
//                   </label>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="flex gap-4 mt-6">
//             <button
//               onClick={handleSave}
//               className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all flex items-center justify-center gap-2"
//             >
//               <Save size={20} />
//               Update Question
//             </button>
//             <button
//               onClick={onClose}
//               className="px-6 py-3 border border-teal-300 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Create Exam Modal Component
//   const CreateExamModal = ({
//     questions,
//     onClose,
//     onSave,
//     selectedQuestions,
//     setSelectedQuestions,
//     examTitle,
//     setExamTitle,
//   }) => {
//     const toggleQuestionSelection = (question) => {
//       setSelectedQuestions((prev) => {
//         const isSelected = prev.find((q) => q.id === question.id);
//         if (isSelected) {
//           return prev.filter((q) => q.id !== question.id);
//         } else {
//           return [...prev, question];
//         }
//       });
//     };

//     return (
//       <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
//         <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-teal-800">
//               Create Examination
//             </h2>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-gray-100 rounded-full"
//             >
//               <X size={20} />
//             </button>
//           </div>

//           <div className="mb-6">
//             <label className="block text-teal-700 font-medium mb-2">
//               Exam Title
//             </label>
//             <input
//               type="text"
//               value={examTitle}
//               onChange={(e) => setExamTitle(e.target.value)}
//               className="w-full p-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//               placeholder="Enter exam title..."
//             />
//           </div>

//           <div className="mb-6">
//             <h3 className="text-lg font-semibold text-teal-800 mb-4">
//               Select Questions ({selectedQuestions.length} selected)
//             </h3>

//             <div className="space-y-3 max-h-60 overflow-y-auto">
//               {questions.map((question, index) => (
//                 <div
//                   key={question.id}
//                   className={`p-4 border rounded-lg cursor-pointer transition-all ${
//                     selectedQuestions.find((q) => q.id === question.id)
//                       ? "border-teal-500 bg-teal-50"
//                       : "border-gray-200 hover:border-teal-300"
//                   }`}
//                   onClick={() => toggleQuestionSelection(question)}
//                 >
//                   <div className="flex items-start gap-3">
//                     <input
//                       type="checkbox"
//                       checked={
//                         !!selectedQuestions.find((q) => q.id === question.id)
//                       }
//                       onChange={() => toggleQuestionSelection(question)}
//                       className="mt-1"
//                     />
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2 mb-2">
//                         <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded text-sm font-medium">
//                           Q{index + 1}
//                         </span>
//                         <span className="bg-teal-500 text-white px-2 py-1 rounded text-sm">
//                           {question.type.toUpperCase()}
//                         </span>
//                       </div>
//                       <p className="text-teal-800 font-medium">
//                         {question.question}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="flex gap-4">
//             <button
//               onClick={onSave}
//               disabled={selectedQuestions.length === 0 || !examTitle.trim()}
//               className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <Save size={20} />
//               Create Exam
//             </button>
//             <button
//               onClick={onClose}
//               className="px-6 py-3 border border-teal-300 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Main render logic
//   switch (currentScreen) {
//     case "subjects":
//       return <SubjectScreen />;
//     case "grades":
//       return <GradeScreen />;
//     case "questions":
//       return <QuestionsScreen />;
//     case "created-papers":
//       return <CreatedPapersScreen />;
//     case "exam-details":
//       return <ExamDetailsScreen />;
//     default:
//       return <DashboardScreen />;
//   }
// };

// export default QuestionBank;

// src/components/QuestionBank.jsx
// src/components/QuestionBank.jsx
import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  FileText,
  ArrowLeft,
  Save,
  X,
} from "lucide-react";
import api from "../../service/api";

const CLASSES = [
  "1st Grade","2nd Grade","3rd Grade","4th Grade","5th Grade",
  "6th Grade","7th Grade","8th Grade","9th Grade","10th Grade"
];

export default function QuestionBank() {
  // ————— Screens —————
  const [screen, setScreen] = useState("dashboard"); // dashboard, subjects, questions, created-papers, exam-details

  // ————— Data State —————
  const [subjects, setSubjects]         = useState([]);
  const [selectedSubject, setSubject]   = useState(null);

  const [questions, setQuestions]       = useState([]);
  const [classFilter, setClassFilter]   = useState("All Classes");

  const [templates, setTemplates]       = useState([]);
  const [examDetails, setExamDetails]   = useState(null);

  // ————— Modals / Forms —————
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState("");

  const [showAddQ, setShowAddQ]           = useState(false);
  const [showEditQ, setShowEditQ]         = useState(false);
  const [editPayload, setEditPayload]     = useState(null);

  const [showExamModal, setShowExamModal] = useState(false);
  const [examClass, setExamClass]         = useState(CLASSES[0]);
  const [examTitle, setExamTitle]         = useState("");
  const [examDates, setExamDates]         = useState({
    startDate: "",
    endDate:   "",
    duration:  30,
  });
  const [selectedQs, setSelectedQs]       = useState([]);

  // ————— Load Subjects on Mount —————
  useEffect(() => {
    api.get("/api/subjects").then(r => setSubjects(r.data));
  }, []);

  // ————— Handlers —————

  // Create a new Subject
  const handleCreateSubject = () => {
    if (!newSubjectName.trim()) return;
    api.post("/api/subjects", { name: newSubjectName })
      .then(() => api.get("/api/subjects"))
      .then(r => {
        setSubjects(r.data);
        setShowAddSubject(false);
        setNewSubjectName("");
      })
      .catch(() => alert("Failed to create subject"));
  };

  // Select a subject → load its questions & templates
  const pickSubject = subj => {
    setSubject(subj);
    setScreen("questions");
    api.get(`/api/questions?subject=${subj._id}`)
      .then(r => setQuestions(r.data));
    api.get(`/api/exam-templates?subject=${subj._id}`)
      .then(r => setTemplates(r.data));
    setClassFilter("All Classes");
  };

  // Add/Edit/Delete Questions
  const handleAddQ = payload => {
    const body = {
      ...payload,
      subject: selectedSubject._id,
      options: payload.type === "true_false"
        ? ["True","False"]
        : payload.options,
    };
    api.post("/api/questions", body)
      .then(res => setQuestions(qs => [...qs, res.data]))
      .finally(() => setShowAddQ(false));
  };

  const handleEditQ = (id, payload) => {
    const body = {
      ...payload,
      options: payload.type === "true_false"
        ? ["True","False"]
        : payload.options,
    };
    api.put(`/api/questions/${id}`, body)
      .then(res => setQuestions(qs => qs.map(q => q._id === id ? res.data : q)))
      .finally(() => setShowEditQ(false));
  };

  const handleDelQ = id => {
    api.delete(`/api/questions/${id}`)
      .then(() => setQuestions(qs => qs.filter(q => q._id !== id)));
  };

  // Create Exam Template
  const handleCreateExam = () => {
    api.post("/api/exam-templates", {
      title:     examTitle,
      subject:   selectedSubject._id,
      class:     examClass,
      startDate: examDates.startDate,
      endDate:   examDates.endDate,
      duration:  examDates.duration,
      questions: selectedQs.map(q => ({
        _id:          q._id,
        questionText: q.questionText,
        class:        q.class,
        type:         q.type,
        options:      q.options,
        answer:       q.answer,
        mark:         q.mark,
      })),
    })
    .then(res => setTemplates(tpls => [...tpls, res.data]))
    .finally(() => {
      setShowExamModal(false);
      setSelectedQs([]);
      setExamTitle("");
      setScreen("dashboard"); // ← return to dashboard
    });
  };

  // View Exam Details
  const viewExam = tpl => {
    api.get(`/api/exam-templates/${tpl._id}`)
      .then(r => {
        setExamDetails(r.data);
        setScreen("exam-details");
      });
  };

  // Add/Remove question from existing exam
  const addToExam    = qId => api
    .post(`/api/exam-templates/${examDetails._id}/questions`, { questionId: qId })
    .then(r => setExamDetails(r.data));

  const removeFromExam = qId => api
    .delete(`/api/exam-templates/${examDetails._id}/questions/${qId}`)
    .then(r => setExamDetails(r.data));

  // ————— Render by Screen —————

  // 1) Dashboard
  if (screen === "dashboard") {
    return (
      <div className="min-h-screen p-8 bg-gray-50 text-center">
        <h1 className="text-4xl font-bold mb-12 text-teal-800">
          Question Bank Management
        </h1>
        <div className="space-y-4 max-w-sm mx-auto">
          <button
            onClick={() => setScreen("subjects")}
            className="w-full py-3 bg-teal-500 text-white rounded-lg flex justify-center items-center gap-2"
          >
            <Plus/> Manage Questions & Exams
          </button>
          <button
            onClick={() => setScreen("created-papers")}
            className="w-full py-3 bg-yellow-500 text-white rounded-lg flex justify-center items-center gap-2"
          >
            <FileText/> View Created Exams
          </button>
        </div>
      </div>
    );
  }

  // 2) Subjects List (with Add Subject)
  if (screen === "subjects") {
    return (
      <div className="min-h-screen p-8 bg-gray-50">
        <button
          onClick={() => setScreen("dashboard")}
          className="mb-4 p-2 bg-white rounded-full"
        >
          <ArrowLeft className="text-teal-600"/>
        </button>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-teal-800">Select Subject</h2>
          <button
            onClick={() => setShowAddSubject(true)}
            className="bg-teal-500 text-white px-4 py-2 rounded flex items-center gap-1"
          >
            <Plus size={16}/> Add Subject
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {subjects.map(s => (
            <div
              key={s._id}
              onClick={() => pickSubject(s)}
              className="p-6 bg-white rounded-xl shadow hover:shadow-xl cursor-pointer text-center"
            >
              <h3 className="text-xl font-semibold">{s.name}</h3>
            </div>
          ))}
        </div>
        {showAddSubject && (
          <AddSubjectModal
            name={newSubjectName}
            onNameChange={setNewSubjectName}
            onClose={() => setShowAddSubject(false)}
            onSave={handleCreateSubject}
          />
        )}
      </div>
    );
  }

  // 3) Questions Screen (with Class Filter)
  if (screen === "questions") {
    // filter by class or show all
    const displayed = classFilter === "All Classes"
      ? questions
      : questions.filter(q => q.class === classFilter);

    return (
      <div className="min-h-screen p-8 bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setScreen("subjects")}
            className="p-2 bg-white rounded-full"
          >
            <ArrowLeft className="text-teal-600"/>
          </button>
          <h2 className="text-2xl font-bold text-teal-800">
            {selectedSubject.name} — Questions
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAddQ(true)}
              className="bg-teal-500 text-white px-4 py-2 rounded flex items-center gap-1"
            >
              <Plus size={16}/> Add Q
            </button>
            <button
              onClick={() => setShowExamModal(true)}
              className="bg-teal-600 text-white px-4 py-2 rounded flex items-center gap-1"
            >
              <FileText size={16}/> New Exam
            </button>
          </div>
        </div>

        {/* Class Filter */}
        <div className="flex items-center gap-4 mb-4">
          <label className="font-medium text-teal-700">Filter by Class:</label>
          <select
            value={classFilter}
            onChange={e => setClassFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option>All Classes</option>
            {CLASSES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Question List */}
        <div className="space-y-4">
          {displayed.length === 0 ? (
            <div className="text-center py-12 text-teal-600">
              No questions found for {classFilter}.
            </div>
          ) : (
            displayed.map((q, i) => (
              <div
                key={q._id}
                className="bg-white p-4 rounded shadow flex justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold">Q{i+1}:</span> {q.questionText}
                    <span className="ml-4 px-2 py-0.5 bg-gray-100 rounded text-sm">
                      {q.class}
                    </span>
                  </div>
                  {q.type === "mcq" ? (
                    <ul className="grid grid-cols-2 gap-1 text-sm">
                      {q.options.map((opt, oi) => (
                        <li key={oi}>
                          {String.fromCharCode(65 + oi)}. {opt}
                          {opt === q.answer && <strong> ✓</strong>}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p><strong>Answer:</strong> {q.answer}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => { setEditPayload(q); setShowEditQ(true); }}
                    className="text-teal-600"
                  >
                    <Edit2 size={16}/>
                  </button>
                  <button
                    onClick={() => handleDelQ(q._id)}
                    className="text-red-600"
                  >
                    <Trash2 size={16}/>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modals */}
        {showAddQ && (
          <AddEditModal onClose={() => setShowAddQ(false)} onSave={handleAddQ} />
        )}
        {showEditQ && editPayload && (
          <AddEditModal
            question={editPayload}
            onClose={() => setShowEditQ(false)}
            onSave={upd => handleEditQ(editPayload._id, upd)}
          />
        )}
        {showExamModal && (
          <ExamModal
            classes={CLASSES}
            examClass={examClass}
            onClassChange={setExamClass}
            questions={questions.filter(q => q.class === examClass)}
            selectedQs={selectedQs}
            onToggle={q =>
              setSelectedQs(sel =>
                sel.some(x => x._id === q._id)
                  ? sel.filter(x => x._id !== q._id)
                  : [...sel, q]
              )
            }
            title={examTitle}
            onTitleChange={setExamTitle}
            dates={examDates}
            onDatesChange={setExamDates}
            onClose={() => setShowExamModal(false)}
            onSave={handleCreateExam}
          />
        )}
      </div>
    );
  }

  // 4) Created Exams
  if (screen === "created-papers") {
    return (
      <div className="min-h-screen p-8 bg-yellow-50">
        <button
          onClick={() => setScreen("dashboard")}
          className="mb-4 p-2 bg-white rounded-full"
        >
          <ArrowLeft className="text-teal-600"/>
        </button>
        <h2 className="text-3xl font-bold mb-6 text-teal-800">Created Exams</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {templates.map(t => (
            <div
              key={t._id}
              onClick={() => viewExam(t)}
              className="p-6 bg-white rounded-xl shadow hover:shadow-lg cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-2">{t.title}</h3>
              <p><strong>Class:</strong> {t.class}</p>
              <p><strong>Questions:</strong> {t.questions.length}</p>
              <p><strong>Total Marks:</strong> {t.totalMark}</p>
              <p>
                <strong>Dates:</strong>{" "}
                {new Date(t.startDate).toLocaleDateString()} –{" "}
                {new Date(t.endDate).toLocaleDateString()}
              </p>
              <p><strong>Duration:</strong> {t.duration} min</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 5) Exam Details
  if (screen === "exam-details" && examDetails) {
    return (
      <div className="min-h-screen p-8 bg-yellow-50">
        <button
          onClick={() => setScreen("created-papers")}
          className="mb-4 p-2 bg-white rounded-full"
        >
          <ArrowLeft className="text-teal-600"/>
        </button>
        <h2 className="text-3xl font-bold mb-2">{examDetails.title}</h2>
        <p className="mb-4"><strong>Class:</strong> {examDetails.class}</p>
        <div className="space-y-4">
          {examDetails.questions.map((q, i) => (
            <div
              key={q._id}
              className="bg-white p-4 rounded shadow flex justify-between"
            >
              <span>
                <strong>Q{i+1}:</strong> {q.questionText}
              </span>
              <button
                onClick={() => removeFromExam(q._id)}
                className="text-red-600"
              >
                <Trash2 size={16}/>
              </button>
            </div>
          ))}
        </div>
        <h3 className="mt-8 mb-2">Add More Questions</h3>
        <div className="space-y-2">
          {questions
            .filter(q => q.class === examDetails.class)
            .map(q => (
              <label key={q._id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={examDetails.questions.some(x => x._id === q._id)}
                  onChange={() =>
                    examDetails.questions.some(x => x._id === q._id)
                      ? removeFromExam(q._id)
                      : addToExam(q._id)
                  }
                />
                {q.questionText}
              </label>
            ))}
        </div>
      </div>
    );
  }

  return null;
}

// ————— Modals —————

function AddSubjectModal({ name, onNameChange, onClose, onSave }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-sm">
        <div className="flex justify-between mb-4">
          <h3 className="text-xl font-bold">Create New Subject</h3>
          <button onClick={onClose}><X/></button>
        </div>
        <label className="block mb-2">Subject Name</label>
        <input
          type="text"
          value={name}
          onChange={e => onNameChange(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          placeholder="e.g. Physics"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

function AddEditModal({ question, onClose, onSave }) {
  const [p, setP] = useState({
    questionText: question?.questionText || "",
    class:        question?.class        || CLASSES[0],
    type:         question?.type         || "mcq",
    options:      question?.options      || ["", "", "", ""],
    answer:       question?.answer       || "",
    mark:         question?.mark         || 1,
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between mb-4">
          <h3 className="text-xl font-bold">
            {question ? "Edit Question" : "Add Question"}
          </h3>
          <button onClick={onClose}><X/></button>
        </div>

        <label className="block mb-2">Class</label>
        <select
          value={p.class}
          onChange={e => setP(q => ({ ...q, class: e.target.value }))}
          className="w-full mb-4 p-2 border rounded"
        >
          {CLASSES.map(c => <option key={c}>{c}</option>)}
        </select>

        <label className="block mb-2">Type</label>
        <select
          value={p.type}
          onChange={e => setP(q => ({ ...q, type: e.target.value }))}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="mcq">MCQ</option>
          <option value="true_false">True/False</option>
        </select>

        <label className="block mb-2">Question Text</label>
        <textarea
          value={p.questionText}
          onChange={e => setP(q => ({ ...q, questionText: e.target.value }))}
          className="w-full mb-4 p-2 border rounded"
          rows={3}
        />

        {p.type === "mcq" ? (
          <>
            {p.options.map((opt, i) => (
              <input
                key={i}
                type="text"
                value={opt}
                onChange={e => {
                  const o = [...p.options];
                  o[i] = e.target.value;
                  setP(q => ({ ...q, options: o }));
                }}
                placeholder={`Option ${String.fromCharCode(65 + i)}`}
                className="w-full mb-2 p-2 border rounded"
              />
            ))}
            <label className="block mb-2">Answer</label>
            <select
              value={p.answer}
              onChange={e => setP(q => ({ ...q, answer: e.target.value }))}
              className="w-full mb-4 p-2 border rounded"
            >
              <option value="">Select correct</option>
              {p.options.map((o, i) => (
                <option key={i} value={o}>
                  {String.fromCharCode(65 + i)}. {o}
                </option>
              ))}
            </select>
          </>
        ) : (
          <>
            <label className="block mb-2">Answer</label>
            <select
              value={p.answer}
              onChange={e => setP(q => ({ ...q, answer: e.target.value }))}
              className="w-full mb-4 p-2 border rounded"
            >
              <option value="">Select</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </>
        )}

        <label className="block mb-2">Mark</label>
        <input
          type="number"
          value={p.mark}
          onChange={e => setP(q => ({ ...q, mark: +e.target.value }))}
          className="w-full mb-4 p-2 border rounded"
        />

        <div className="flex justify-end gap-2 sticky bottom-0 bg-white pt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={() => onSave(p)}
            className="px-4 py-2 bg-teal-600 text-white rounded flex items-center gap-1"
          >
            <Save/> Save
          </button>
        </div>
      </div>
    </div>
  );
}

function ExamModal({
  classes,
  examClass,
  onClassChange,
  questions,
  selectedQs,
  onToggle,
  title,
  onTitleChange,
  dates,
  onDatesChange,
  onClose,
  onSave,
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between mb-4">
          <h3 className="text-xl font-bold">Create Exam</h3>
          <button onClick={onClose}><X/></button>
        </div>

        <label className="block mb-2">Class</label>
        <select
          value={examClass}
          onChange={e => onClassChange(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        >
          {classes.map(c => <option key={c}>{c}</option>)}
        </select>

        <label className="block mb-2">Title</label>
        <input
          value={title}
          onChange={e => onTitleChange(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div>
            <label className="block mb-1">Start Date</label>
            <input
              type="date"
              value={dates.startDate}
              onChange={e => onDatesChange({ ...dates, startDate: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">End Date</label>
            <input
              type="date"
              value={dates.endDate}
              onChange={e => onDatesChange({ ...dates, endDate: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Duration (min)</label>
            <input
              type="number"
              value={dates.duration}
              onChange={e => onDatesChange({ ...dates, duration: +e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <h4 className="mb-2">Select Questions ({selectedQs.length})</h4>
        <div className="max-h-60 overflow-y-auto space-y-2 mb-4">
          {questions.map(q => (
            <label key={q._id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={!!selectedQs.find(x => x._id === q._id)}
                onChange={() => onToggle(q)}
              />
              {q.questionText}
            </label>
          ))}
        </div>

        <div className="flex justify-end gap-2 sticky bottom-0 bg-white pt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={!title.trim() || selectedQs.length === 0}
            className="px-4 py-2 bg-teal-600 text-white rounded disabled:opacity-50"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
