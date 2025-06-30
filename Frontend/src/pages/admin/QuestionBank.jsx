// import React, { useState, useEffect } from "react";
// import {
//   Plus,
//   FileText,
//   BookOpen,
//   ArrowLeft,
//   Edit2,
//   Trash2,
//   Save,
//   X,
// } from "lucide-react";
// import api from "../../service/api";

// const CLASSES = [
//   "1st Grade",
//   "2nd Grade",
//   "3rd Grade",
//   "4th Grade",
//   "5th Grade",
//   "6th Grade",
//   "7th Grade",
//   "8th Grade",
//   "9th Grade",
//   "10th Grade",
// ];

// export default function QuestionBank() {
//   const [screen, setScreen] = useState("dashboard"); // dashboard, subjects, questions, created-papers, exam-details

//   // data
//   const [subjects, setSubjects]           = useState([]);
//   const [selectedSubject, setSubject]     = useState(null);
//   const [questions, setQuestions]         = useState([]);
//   const [classFilter, setClassFilter]     = useState("All Classes");
//   const [templates, setTemplates]         = useState([]);
//   const [examDetails, setExamDetails]     = useState(null);

//   // modals/forms
//   const [showAddQ, setShowAddQ]           = useState(false);
//   const [showEditQ, setShowEditQ]         = useState(false);
//   const [editPayload, setEditPayload]     = useState(null);
//   const [showExamModal, setShowExamModal] = useState(false);
//   const [examClass, setExamClass]         = useState(CLASSES[0]);
//   const [examTitle, setExamTitle]         = useState("");
//   const [examDates, setExamDates]         = useState({
//     startDate: "",
//     endDate:   "",
//     duration:  30,
//   });
//   const [selectedQs, setSelectedQs]       = useState([]);

//   // ————— Screens —————

//   const DashboardScreen = () => (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-4xl font-bold text-teal-800 mb-8 text-center">
//           Question Bank Management
//         </h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div
//             onClick={() => setScreen("subjects")}
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
//             onClick={() => setScreen("created-papers")}
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

//   const SubjectScreen = () => (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex items-center mb-8">
//           <button
//             onClick={() => setScreen("dashboard")}
//             className="mr-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
//           >
//             <ArrowLeft className="text-teal-600" />
//           </button>
//           <h1 className="text-3xl font-bold text-teal-800">Select Subject</h1>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {subjects.map((s) => (
//             <div
//               key={s._id}
//               onClick={() => pickSubject(s)}
//               className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105"
//             >
//               <div className="flex items-center justify-center mb-4">
//                 <div className="bg-gradient-to-r from-teal-400 to-teal-600 p-3 rounded-full group-hover:scale-110 transition-transform">
//                   <BookOpen size={24} className="text-white" />
//                 </div>
//               </div>
//               <h3 className="text-xl font-semibold text-teal-800 text-center">
//                 {s.name}
//               </h3>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   const QuestionsScreen = () => {
//     const displayed =
//       classFilter === "All Classes"
//         ? questions
//         : questions.filter((q) => q.class === classFilter);

//     return (
//       <div className="min-h-screen bg-gray-50 p-8">
//         <div className="max-w-6xl mx-auto">
//           <div className="flex flex-col md:flex-row items-center justify-between mb-8">
//             <div className="flex items-center mb-4 md:mb-0">
//               <button
//                 onClick={() => setScreen("subjects")}
//                 className="mr-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
//               >
//                 <ArrowLeft className="text-teal-600" />
//               </button>
//               <h1 className="text-2xl md:text-3xl font-bold text-teal-800">
//                 {selectedSubject?.name} — Questions
//               </h1>
//             </div>
//             <div className="flex gap-4">
//               <button
//                 onClick={() => setShowAddQ(true)}
//                 className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-2 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all flex items-center gap-2"
//               >
//                 <Plus size={20} />
//                 Add Question
//               </button>
//               <button
//                 onClick={() => setShowExamModal(true)}
//                 className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 py-2 rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all flex items-center gap-2"
//               >
//                 <FileText size={20} />
//                 Create Exam
//               </button>
//             </div>
//           </div>

//           {/* Class Filter */}
//           <div className="flex items-center gap-4 mb-6">
//             <label className="font-medium text-teal-700">Filter by Class:</label>
//             <select
//               value={classFilter}
//               onChange={(e) => setClassFilter(e.target.value)}
//               className="p-2 border rounded"
//             >
//               <option>All Classes</option>
//               {CLASSES.map((c) => (
//                 <option key={c}>{c}</option>
//               ))}
//             </select>
//           </div>

//           {/* Questions List */}
//           <div className="space-y-4">
//             {displayed.length === 0 ? (
//               <div className="text-center py-12">
//                 <BookOpen size={64} className="mx-auto text-teal-300 mb-4" />
//                 <p className="text-teal-600 text-lg">
//                   No questions found for {classFilter}.
//                 </p>
//               </div>
//             ) : (
//               displayed.map((q, i) => (
//                 <div
//                   key={q._id}
//                   className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl flex justify-between transition-shadow"
//                 >
//                   <div>
//                     <div className="flex items-center gap-2 mb-2">
//                       <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded text-sm font-medium">
//                         Q{i + 1}
//                       </span>
//                       <span className="bg-teal-500 text-white px-2 py-1 rounded text-sm">
//                         {q.type.toUpperCase()}
//                       </span>
//                     </div>
//                     <p className="text-teal-800 font-medium mb-2">
//                       {q.questionText}
//                     </p>

//                     {q.type === "mcq" ? (
//                       <div className="grid grid-cols-2 gap-2">
//                         {q.options.map((opt, oi) => (
//                           <div
//                             key={oi}
//                             className={`p-2 rounded text-sm border ${
//                               opt === q.answer
//                                 ? "bg-green-100 border-green-300 text-green-700"
//                                 : "bg-gray-50 border-gray-200"
//                             }`}
//                           >
//                             {String.fromCharCode(65 + oi)}. {opt}
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="flex gap-2">
//                         <span
//                           className={`px-3 py-1 rounded text-sm ${
//                             q.answer === "true"
//                               ? "bg-green-100 text-green-700 border border-green-300"
//                               : "bg-gray-100 text-gray-600"
//                           }`}
//                         >
//                           True
//                         </span>
//                         <span
//                           className={`px-3 py-1 rounded text-sm ${
//                             q.answer === "false"
//                               ? "bg-green-100 text-green-700 border border-green-300"
//                               : "bg-gray-100 text-gray-600"
//                           }`}
//                         >
//                           False
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                   <div className="flex flex-col gap-2">
//                     <button
//                       onClick={() => {
//                         setEditPayload(q);
//                         setShowEditQ(true);
//                       }}
//                       className="p-2 text-teal-600 hover:bg-teal-100 rounded transition-colors"
//                     >
//                       <Edit2 size={16} />
//                     </button>
//                     <button
//                       onClick={() => handleDelQ(q._id)}
//                       className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         {/* Add Question Modal */}
//         {showAddQ && (
//           <AddEditModal
//             onClose={() => setShowAddQ(false)}
//             onSave={handleAddQ}
//           />
//         )}

//         {/* Edit Question Modal */}
//         {showEditQ && editPayload && (
//           <AddEditModal
//             question={editPayload}
//             onClose={() => setShowEditQ(false)}
//             onSave={(upd) => handleEditQ(editPayload._id, upd)}
//           />
//         )}

//         {/* Create Exam Modal */}
//         {showExamModal && (
//           <ExamModal
//             classes={CLASSES}
//             examClass={examClass}
//             onClassChange={setExamClass}
//             questions={questions.filter((q) => q.class === examClass)}
//             selectedQs={selectedQs}
//             onToggle={(q) =>
//               setSelectedQs((sel) =>
//                 sel.some((x) => x._id === q._id)
//                   ? sel.filter((x) => x._id !== q._id)
//                   : [...sel, q]
//               )
//             }
//             title={examTitle}
//             onTitleChange={setExamTitle}
//             dates={examDates}
//             onDatesChange={setExamDates}
//             onClose={() => setShowExamModal(false)}
//             onSave={handleCreateExam}
//           />
//         )}
//       </div>
//     );
//   };

//   const CreatedPapersScreen = () => (
//     <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-teal-100 to-teal-600 p-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex items-center mb-8">
//           <button
//             onClick={() => setScreen("dashboard")}
//             className="mr-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
//           >
//             <ArrowLeft className="text-teal-600" />
//           </button>
//           <h1 className="text-3xl font-bold text-teal-800">
//             Created Question Papers
//           </h1>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {templates.map((t) => (
//             <div
//               key={t._id}
//               onClick={() => viewExam(t)}
//               className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <div className="bg-gradient-to-r from-teal-400 to-teal-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
//                   <FileText size={20} className="text-white" />
//                 </div>
//                 <span className="text-teal-600 text-sm">
//                   {new Date(t.startDate).toLocaleDateString()} –{" "}
//                   {new Date(t.endDate).toLocaleDateString()}
//                 </span>
//               </div>
//               <h3 className="text-lg font-semibold text-teal-800 mb-2">
//                 {t.title}
//               </h3>
//               <div className="space-y-1 text-sm text-teal-600">
//                 <p>Class: {t.class}</p>
//                 <p>Questions: {t.questions.length}</p>
//                 <p>Total Marks: {t.totalMark}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   const ExamDetailsScreen = () => {
//     if (!examDetails) return null;
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-teal-100 to-teal-600 p-8">
//         <div className="max-w-4xl mx-auto">
//           <div className="flex items-center mb-8">
//             <button
//               onClick={() => setScreen("created-papers")}
//               className="mr-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
//             >
//               <ArrowLeft className="text-teal-600" />
//             </button>
//             <h1 className="text-3xl font-bold text-teal-800">
//               {examDetails.title}
//             </h1>
//           </div>

//           <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
//             <div className="mb-6 p-4 bg-teal-50 rounded-lg">
//               <h2 className="text-xl font-semibold text-teal-800 mb-2">
//                 Exam Information
//               </h2>
//               <div className="grid md:grid-cols-2 gap-4 text-teal-600">
//                 <p>
//                   <strong>Class:</strong> {examDetails.class}
//                 </p>
//                 <p>
//                   <strong>Total Questions:</strong>{" "}
//                   {examDetails.questions.length}
//                 </p>
//                 <p>
//                   <strong>Dates:</strong>{" "}
//                   {new Date(examDetails.startDate).toLocaleDateString()} –{" "}
//                   {new Date(examDetails.endDate).toLocaleDateString()}
//                 </p>
//                 <p>
//                   <strong>Duration:</strong> {examDetails.duration} min
//                 </p>
//               </div>
//             </div>

//             <div className="space-y-6">
//               <h3 className="text-xl font-semibold text-teal-800">
//                 Questions
//               </h3>
//               {examDetails.questions.map((q, i) => (
//                 <div
//                   key={q._id}
//                   className="border border-teal-200 rounded-lg p-4 flex justify-between items-center"
//                 >
//                   <div>
//                     <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded font-medium mr-2">
//                       Q{i + 1}
//                     </span>
//                     {q.questionText}
//                   </div>
//                   <button
//                     onClick={() => removeFromExam(q._id)}
//                     className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors"
//                   >
//                     <Trash2 size={16} />
//                   </button>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-8">
//               <h3 className="text-lg font-semibold text-teal-800 mb-2">
//                 Add More Questions
//               </h3>
//               <div className="space-y-2 max-h-60 overflow-y-auto">
//                 {questions
//                   .filter((q) => q.class === examDetails.class)
//                   .map((q) => (
//                     <label
//                       key={q._id}
//                       className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all hover:bg-teal-50"
//                     >
//                       <input
//                         type="checkbox"
//                         checked={examDetails.questions.some(
//                           (x) => x._id === q._id
//                         )}
//                         onChange={() =>
//                           examDetails.questions.some(
//                             (x) => x._id === q._id
//                           )
//                             ? removeFromExam(q._id)
//                             : addToExam(q._id)
//                         }
//                         className="mt-1"
//                       />
//                       {q.questionText}
//                     </label>
//                   ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };



//   // ————— Modals —————

//   function AddEditModal({ question, onClose, onSave }) {
//     const [p, setP] = useState({
//       questionText: question?.questionText || "",
//       class:        question?.class        || CLASSES[0],
//       type:         question?.type         || "mcq",
//       options:      question?.options      || ["", "", "", ""],
//       answer:       question?.answer       || "",
//       mark:         question?.mark         || 1,
//     });

//     return (
//       <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
//         <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-teal-800">
//               {question ? "Edit" : "Add"} Question
//             </h2>
//             <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
//               <X size={20} />
//             </button>
//           </div>

//           <div className="space-y-4">
//             <div>
//               <label className="block text-teal-700 font-medium mb-2">Class</label>
//               <select
//                 value={p.class}
//                 onChange={(e) => setP((q) => ({ ...q, class: e.target.value }))}
//                 className="w-full p-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//               >
//                 {CLASSES.map((c) => (
//                   <option key={c}>{c}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-teal-700 font-medium mb-2">Type</label>
//               <select
//                 value={p.type}
//                 onChange={(e) => setP((q) => ({ ...q, type: e.target.value }))}
//                 className="w-full p-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//               >
//                 <option value="mcq">Multiple Choice (MCQ)</option>
//                 <option value="true_false">True/False</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-teal-700 font-medium mb-2">Question Text</label>
//               <textarea
//                 rows={3}
//                 value={p.questionText}
//                 onChange={(e) => setP((q) => ({ ...q, questionText: e.target.value }))}
//                 className="w-full p-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                 placeholder="Enter your question here..."
//               />
//             </div>

//             {p.type === "mcq" ? (
//               <>
//                 <div>
//                   <label className="block text-teal-700 font-medium mb-2">Options</label>
//                   {p.options.map((opt, idx) => (
//                     <input
//                       key={idx}
//                       type="text"
//                       value={opt}
//                       onChange={(e) => {
//                         const o = [...p.options];
//                         o[idx] = e.target.value;
//                         setP((q) => ({ ...q, options: o }));
//                       }}
//                       placeholder={`Option ${String.fromCharCode(65 + idx)}`}
//                       className="w-full mb-2 p-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                     />
//                   ))}
//                 </div>
//                 <div>
//                   <label className="block text-teal-700 font-medium mb-2">Correct Answer</label>
//                   <select
//                     value={p.answer}
//                     onChange={(e) => setP((q) => ({ ...q, answer: e.target.value }))}
//                     className="w-full p-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                   >
//                     <option value="">Select correct answer</option>
//                     {p.options.map((o, i) => (
//                       <option key={i} value={o}>
//                         {String.fromCharCode(65 + i)}. {o}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </>
//             ) : (
//               <div>
//                 <label className="block text-teal-700 font-medium mb-2">Correct Answer</label>
//                 <div className="flex gap-4">
//                   <label className="flex items-center">
//                     <input
//                       type="radio"
//                       name="trueFalseAnswer"
//                       value="true"
//                       checked={p.answer === "true"}
//                       onChange={(e) => setP((q) => ({ ...q, answer: e.target.value }))}
//                       className="mr-2"
//                     />
//                     True
//                   </label>
//                   <label className="flex items-center">
//                     <input
//                       type="radio"
//                       name="trueFalseAnswer"
//                       value="false"
//                       checked={p.answer === "false"}
//                       onChange={(e) => setP((q) => ({ ...q, answer: e.target.value }))}
//                       className="mr-2"
//                     />
//                     False
//                   </label>
//                 </div>
//               </div>
//             )}

//             <div>
//               <label className="block text-teal-700 font-medium mb-2">Mark</label>
//               <input
//                 type="number"
//                 value={p.mark}
//                 onChange={(e) => setP((q) => ({ ...q, mark: +e.target.value }))}
//                 className="w-full p-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//               />
//             </div>
//           </div>

//           <div className="flex gap-4 mt-6">
//             <button
//               onClick={onClose}
//               className="px-6 py-3 border border-teal-300 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={() => onSave(p)}
//               className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all flex items-center justify-center gap-2"
//             >
//               <Save size={20} />
//               Save Question
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   function ExamModal({
//     classes,
//     examClass,
//     onClassChange,
//     questions,
//     selectedQs,
//     onToggle,
//     title,
//     onTitleChange,
//     dates,
//     onDatesChange,
//     onClose,
//     onSave,
//   }) {
//     return (
//       <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
//         <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="text-2xl font-bold text-teal-800">Create Examination</h3>
//             <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
//               <X size={20} />
//             </button>
//           </div>

//           <div className="space-y-4">
//             <div>
//               <label className="block text-teal-700 font-medium mb-2">Class</label>
//               <select
//                 value={examClass}
//                 onChange={(e) => onClassChange(e.target.value)}
//                 className="w-full p-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//               >
//                 {classes.map((c) => (
//                   <option key={c}>{c}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-teal-700 font-medium mb-2">Exam Title</label>
//               <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => onTitleChange(e.target.value)}
//                 placeholder="Enter exam title..."
//                 className="w-full p-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//               />
//             </div>

//             <div className="grid grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-teal-700 font-medium mb-1">Start Date</label>
//                 <input
//                   type="date"
//                   value={dates.startDate}
//                   onChange={(e) => onDatesChange({ ...dates, startDate: e.target.value })}
//                   className="w-full p-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-teal-700 font-medium mb-1">End Date</label>
//                 <input
//                   type="date"
//                   value={dates.endDate}
//                   onChange={(e) => onDatesChange({ ...dates, endDate: e.target.value })}
//                   className="w-full p-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-teal-700 font-medium mb-1">Duration (min)</label>
//                 <input
//                   type="number"
//                   value={dates.duration}
//                   onChange={(e) => onDatesChange({ ...dates, duration: +e.target.value })}
//                   className="w-full p-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             <div>
//               <h4 className="text-teal-800 font-semibold mb-2">
//                 Select Questions ({selectedQs.length})
//               </h4>
//               <div className="space-y-3 max-h-60 overflow-y-auto">
//                 {questions.map((q, i) => (
//                   <label
//                     key={q._id}
//                     className={`p-4 border rounded-lg cursor-pointer transition-all ${
//                       selectedQs.some((x) => x._id === q._id)
//                         ? "border-teal-500 bg-teal-50"
//                         : "border-gray-200 hover:border-teal-300"
//                     }`}
//                     onClick={() => onToggle(q)}
//                   >
//                     <div className="flex items-center gap-2">
//                       <input
//                         type="checkbox"
//                         checked={selectedQs.some((x) => x._id === q._id)}
//                         onChange={() => onToggle(q)}
//                         className="mt-1"
//                       />
//                       <span className="font-medium">
//                         Q{i + 1}:
//                       </span>
//                       <span>{q.questionText}</span>
//                     </div>
//                   </label>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="flex gap-4 mt-6">
//             <button
//               onClick={onClose}
//               className="px-6 py-3 border border-teal-300 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={onSave}
//               disabled={!title.trim() || selectedQs.length === 0}
//               className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <Save size={20} />
//               Create Exam
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }


//   // ————— Main —————
//   switch (screen) {
//     case "subjects":
//       return <SubjectScreen />;
//     case "questions":
//       return <QuestionsScreen />;
//     case "created-papers":
//       return <CreatedPapersScreen />;
//     case "exam-details":
//       return <ExamDetailsScreen />;
//     default:
//       return <DashboardScreen />;
//   }
// }

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

  const classes = [
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10",
    "Class 11",
    "Class 12",
  ];
  const subjects = [
    "Mathematics",
    "English",
    "Science",
    "Physics",
    "Chemistry",
    "Biology",
    "Tamil",
    "Social Science",
  ];

  const handleClassSubjectSelect = () => {
    if (selectedClass && selectedSubject) {
      setCurrentStep("dashboard");
    }
  };

  const handleCreateQuestion = () => {
    if (currentQuestion.questionText && currentQuestion.answer) {
      const newQuestion = {
        ...currentQuestion,
        id: Date.now(),
        class: selectedClass,
        subject: selectedSubject,
      };
      setQuestions([...questions, newQuestion]);
      resetCurrentQuestion();
    }
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setCurrentQuestion({ ...question });
    setCurrentStep("editQuestion");
  };

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
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-teal-100 to-teal-600 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Question Bank Management
          </h1>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Select Class and Subject
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Class
                </label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Choose a class</option>
                  {classes.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Subject
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Choose a subject</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleClassSubjectSelect}
              disabled={!selectedClass || !selectedSubject}
              className="mt-6 w-full bg-teal-600 text-white py-3 px-6 rounded-lg hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  if (currentStep === "dashboard") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-teal-100 to-teal-600 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Question Bank Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                {selectedClass} - {selectedSubject}
              </p>
            </div>
            <button
              onClick={() => setCurrentStep("classSubject")}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Change Class/Subject
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Create Question Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Plus className="w-8 h-8 text-teal-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Create Questions
                </h2>
              </div>
              <p className="text-gray-600 mb-4">
                Add new questions to your question bank for {selectedClass}{" "}
                {selectedSubject}
              </p>
              <button
                onClick={() => setCurrentStep("createQuestion")}
                className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Start Creating Questions
              </button>
              <div className="mt-4 text-sm text-gray-500">
                Total Questions:{" "}
                {
                  questions.filter(
                    (q) =>
                      q.class === selectedClass && q.subject === selectedSubject
                  ).length
                }
              </div>
            </div>

            {/* View Exams Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Eye className="w-8 h-8 text-teal-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-800">
                  View Exams
                </h2>
              </div>
              <p className="text-gray-600 mb-4">
                View and manage created exams for {selectedClass}{" "}
                {selectedSubject}
              </p>
              <button
                onClick={() => setCurrentStep("viewExams")}
                className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors"
              >
                View All Exams
              </button>
              <div className="mt-4 text-sm text-gray-500">
                Total Exams:{" "}
                {
                  exams.filter(
                    (e) =>
                      e.class === selectedClass && e.subject === selectedSubject
                  ).length
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Create Question
  if (currentStep === "createQuestion") {
    const classSubjectQuestions = questions.filter(
      (q) => q.class === selectedClass && q.subject === selectedSubject
    );

    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-teal-100 to-teal-600 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Create Questions - {selectedClass} {selectedSubject}
            </h1>
            <div className="space-x-4">
              <button
                onClick={() => setCurrentStep("createExam")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Exam
              </button>
              <button
                onClick={() => setCurrentStep("dashboard")}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Question Form */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Add New Question
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question Type
                  </label>
                  <select
                    value={currentQuestion.type}
                    onChange={(e) =>
                      setCurrentQuestion({
                        ...currentQuestion,
                        type: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="MCQ">Multiple Choice (MCQ)</option>
                    <option value="True/False">True or False</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question Text
                  </label>
                  <textarea
                    value={currentQuestion.questionText}
                    onChange={(e) =>
                      setCurrentQuestion({
                        ...currentQuestion,
                        questionText: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    rows="3"
                    placeholder="Enter your question here..."
                  />
                </div>

                {currentQuestion.type === "MCQ" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Options
                    </label>
                    {currentQuestion.options.map((option, index) => (
                      <input
                        key={index}
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...currentQuestion.options];
                          newOptions[index] = e.target.value;
                          setCurrentQuestion({
                            ...currentQuestion,
                            options: newOptions,
                          });
                        }}
                        className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-teal-500"
                        placeholder={`Option ${index + 1}`}
                      />
                    ))}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correct Answer
                  </label>
                  {currentQuestion.type === "True/False" ? (
                    <select
                      value={currentQuestion.answer}
                      onChange={(e) =>
                        setCurrentQuestion({
                          ...currentQuestion,
                          answer: e.target.value,
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="">Select Answer</option>
                      <option value="True">True</option>
                      <option value="False">False</option>
                    </select>
                  ) : (
                    <input
                      value={currentQuestion.answer}
                      onChange={(e) =>
                        setCurrentQuestion({
                          ...currentQuestion,
                          answer: e.target.value,
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter correct answer"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marks
                  </label>
                  <input
                    type="number"
                    value={currentQuestion.marks}
                    onChange={(e) =>
                      setCurrentQuestion({
                        ...currentQuestion,
                        marks: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    min="1"
                  />
                </div>

                <button
                  onClick={handleCreateQuestion}
                  className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Save Question
                </button>
              </div>
            </div>

            {/* Questions List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Created Questions ({classSubjectQuestions.length})
              </h2>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {classSubjectQuestions.map((question, index) => (
                  <div
                    key={question.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        Q{index + 1} - {question.type}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-teal-600 font-medium">
                          {question.marks} marks
                        </span>
                        <button
                          onClick={() => handleEditQuestion(question)}
                          className="text-blue-500 hover:text-blue-700 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteQuestion(question.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-800 text-sm mb-2">
                      {question.questionText}
                    </p>
                    <p className="text-xs text-green-600">
                      Answer: {question.answer}
                    </p>
                  </div>
                ))}

                {classSubjectQuestions.length === 0 && (
                  <p className="text-gray-500 text-center py-8">
                    No questions created yet. Start by adding your first
                    question!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Edit Question
  if (currentStep === "editQuestion") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-teal-100 to-teal-600 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Edit Question - {selectedClass} {selectedSubject}
            </h1>
            <button
              onClick={() => {
                setEditingQuestion(null);
                resetCurrentQuestion();
                setCurrentStep("createQuestion");
              }}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 inline mr-2" />
              Back
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Edit Question
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question Type
                </label>
                <select
                  value={currentQuestion.type}
                  onChange={(e) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      type: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                >
                  <option value="MCQ">Multiple Choice (MCQ)</option>
                  <option value="True/False">True or False</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question Text
                </label>
                <textarea
                  value={currentQuestion.questionText}
                  onChange={(e) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      questionText: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  rows="3"
                  placeholder="Enter your question here..."
                />
              </div>

              {currentQuestion.type === "MCQ" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Options
                  </label>
                  {currentQuestion.options.map((option, index) => (
                    <input
                      key={index}
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...currentQuestion.options];
                        newOptions[index] = e.target.value;
                        setCurrentQuestion({
                          ...currentQuestion,
                          options: newOptions,
                        });
                      }}
                      className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-teal-500"
                      placeholder={`Option ${index + 1}`}
                    />
                  ))}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correct Answer
                </label>
                {currentQuestion.type === "True/False" ? (
                  <select
                    value={currentQuestion.answer}
                    onChange={(e) =>
                      setCurrentQuestion({
                        ...currentQuestion,
                        answer: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select Answer</option>
                    <option value="True">True</option>
                    <option value="False">False</option>
                  </select>
                ) : (
                  <input
                    value={currentQuestion.answer}
                    onChange={(e) =>
                      setCurrentQuestion({
                        ...currentQuestion,
                        answer: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter correct answer"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Marks
                </label>
                <input
                  type="number"
                  value={currentQuestion.marks}
                  onChange={(e) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      marks: parseInt(e.target.value) || 1,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  min="1"
                />
              </div>

              <button
                onClick={handleUpdateQuestion}
                className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors"
              >
                <Save className="w-4 h-4 inline mr-2" />
                Update Question
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Create Exam
  if (currentStep === "createExam") {
    const classSubjectQuestions = questions.filter(
      (q) => q.class === selectedClass && q.subject === selectedSubject
    );

    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-teal-100 to-teal-600 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Create Exam - {selectedClass} {selectedSubject}
            </h1>
            <button
              onClick={() => setCurrentStep("createQuestion")}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Back to Questions
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exam Title
                </label>
                <input
                  value={currentExam.title}
                  onChange={(e) =>
                    setCurrentExam({ ...currentExam, title: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter exam title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={currentExam.date}
                  onChange={(e) =>
                    setCurrentExam({ ...currentExam, date: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  value={currentExam.time}
                  onChange={(e) =>
                    setCurrentExam({ ...currentExam, time: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={currentExam.duration}
                  onChange={(e) =>
                    setCurrentExam({ ...currentExam, duration: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g., 60"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Questions
              </label>
              <div className="border border-gray-300 rounded-lg p-4 max-h-60 overflow-y-auto">
                {classSubjectQuestions.map((question, index) => (
                  <div
                    key={question.id}
                    className="flex items-center space-x-3 mb-3"
                  >
                    <input
                      type="checkbox"
                      checked={currentExam.selectedQuestions.includes(
                        question.id
                      )}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCurrentExam({
                            ...currentExam,
                            selectedQuestions: [
                              ...currentExam.selectedQuestions,
                              question.id,
                            ],
                          });
                        } else {
                          setCurrentExam({
                            ...currentExam,
                            selectedQuestions:
                              currentExam.selectedQuestions.filter(
                                (id) => id !== question.id
                              ),
                          });
                        }
                      }}
                      className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">
                        {question.questionText}
                      </p>
                      <p className="text-xs text-gray-500">
                        {question.type} - {question.marks} marks
                      </p>
                    </div>
                  </div>
                ))}

                {classSubjectQuestions.length === 0 && (
                  <p className="text-gray-500 text-center py-4">
                    No questions available. Please create questions first.
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={handleCreateExam}
              disabled={
                !currentExam.title ||
                !currentExam.date ||
                !currentExam.time ||
                !currentExam.duration ||
                currentExam.selectedQuestions.length === 0
              }
              className="mt-6 w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Create Exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Edit Exam
  if (currentStep === "editExam") {
    const classSubjectQuestions = questions.filter(
      (q) => q.class === selectedClass && q.subject === selectedSubject
    );

    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-teal-100 to-teal-600 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Edit Exam - {selectedClass} {selectedSubject}
            </h1>
            <button
              onClick={() => {
                setEditingExam(null);
                resetCurrentExam();
                setCurrentStep("viewExams");
              }}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 inline mr-2" />
              Back
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exam Title
                </label>
                <input
                  value={currentExam.title}
                  onChange={(e) =>
                    setCurrentExam({ ...currentExam, title: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter exam title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={currentExam.date}
                  onChange={(e) =>
                    setCurrentExam({ ...currentExam, date: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  value={currentExam.time}
                  onChange={(e) =>
                    setCurrentExam({ ...currentExam, time: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={currentExam.duration}
                  onChange={(e) =>
                    setCurrentExam({ ...currentExam, duration: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g., 60"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Questions
              </label>
              <div className="border border-gray-300 rounded-lg p-4 max-h-60 overflow-y-auto">
                {classSubjectQuestions.map((question, index) => (
                  <div
                    key={question.id}
                    className="flex items-center space-x-3 mb-3"
                  >
                    <input
                      type="checkbox"
                      checked={currentExam.selectedQuestions.includes(
                        question.id
                      )}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCurrentExam({
                            ...currentExam,
                            selectedQuestions: [
                              ...currentExam.selectedQuestions,
                              question.id,
                            ],
                          });
                        } else {
                          setCurrentExam({
                            ...currentExam,
                            selectedQuestions:
                              currentExam.selectedQuestions.filter(
                                (id) => id !== question.id
                              ),
                          });
                        }
                      }}
                      className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">
                        {question.questionText}
                      </p>
                      <p className="text-xs text-gray-500">
                        {question.type} - {question.marks} marks
                      </p>
                    </div>
                  </div>
                ))}

                {classSubjectQuestions.length === 0 && (
                  <p className="text-gray-500 text-center py-4">
                    No questions available. Please create questions first.
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={handleUpdateExam}
              disabled={
                !currentExam.title ||
                !currentExam.date ||
                !currentExam.time ||
                !currentExam.duration ||
                currentExam.selectedQuestions.length === 0
              }
              className="mt-6 w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="w-4 h-4 inline mr-2" />
              Update Exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  // View Exams
  if (currentStep === "viewExams") {
    const classSubjectExams = exams.filter(
      (e) => e.class === selectedClass && e.subject === selectedSubject
    );

    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-teal-100 to-teal-600 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              View Exams - {selectedClass} {selectedSubject}
            </h1>
            <div className="space-x-4">
              <button
                onClick={() => setCurrentStep("createExam")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Add Exam
              </button>
              <button
                onClick={() => setCurrentStep("dashboard")}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {classSubjectExams.map((exam) => (
              <div
                key={exam.id}
                className="bg-white rounded-xl shadow-lg p-6 relative"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {exam.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{exam.subject}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                        exam.questionsCount
                      )}`}
                    >
                      {getDifficultyText(exam.questionsCount)}
                    </span>
                    <button
                      onClick={() => handleEditExam(exam)}
                      className="text-blue-500 hover:text-blue-700 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteExam(exam.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">{exam.date}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{exam.time}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{exam.duration} min</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <FileText className="w-4 h-4 mr-2" />
                    <span className="text-sm">{exam.totalMarks} marks</span>
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-500">
                  Questions: {exam.questionsCount} • Instructions: Read passages
                  carefully before answering
                </div>

                <button
                  onClick={() => handleViewExamDetails(exam)}
                  className="mt-4 w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  <Eye className="w-4 h-4 inline mr-2" />
                  View Exam
                </button>
              </div>
            ))}

            {classSubjectExams.length === 0 && (
              <div className="col-span-2 text-center py-12">
                <p className="text-gray-500 text-lg">
                  No exams created yet for {selectedClass} {selectedSubject}
                </p>
                <button
                  onClick={() => setCurrentStep("createQuestion")}
                  className="mt-4 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Create Your First Exam
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
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
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-teal-100 to-teal-600 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {selectedExam.title}
              </h1>
              <p className="text-gray-600 mt-2">
                {selectedClass} - {selectedSubject}
              </p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                <span>
                  <Calendar className="w-4 h-4 inline mr-1" />
                  {selectedExam.date}
                </span>
                <span>
                  <Clock className="w-4 h-4 inline mr-1" />
                  {selectedExam.time}
                </span>
                <span>
                  <Clock className="w-4 h-4 inline mr-1" />
                  {selectedExam.duration} min
                </span>
                <span>
                  <FileText className="w-4 h-4 inline mr-1" />
                  {selectedExam.totalMarks} marks
                </span>
              </div>
            </div>
            <button
              onClick={() => setCurrentStep("viewExams")}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 inline mr-2" />
              Back to Exams
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Exam Questions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Exam Questions ({examQuestions.length})
              </h2>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {examQuestions.map((question, index) => (
                  <div
                    key={question.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        Q{index + 1} - {question.type}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-teal-600 font-medium">
                          {question.marks} marks
                        </span>
                        <button
                          onClick={() =>
                            handleRemoveQuestionFromExam(question.id)
                          }
                          className="text-red-500 hover:text-red-700 transition-colors"
                          title="Remove from exam"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-800 text-sm mb-2">
                      {question.questionText}
                    </p>
                    {question.type === "MCQ" && question.options && (
                      <div className="text-xs text-gray-600 mb-2">
                        Options:{" "}
                        {question.options.filter((opt) => opt).join(", ")}
                      </div>
                    )}
                    <p className="text-xs text-green-600">
                      Answer: {question.answer}
                    </p>
                  </div>
                ))}

                {examQuestions.length === 0 && (
                  <p className="text-gray-500 text-center py-8">
                    No questions in this exam yet.
                  </p>
                )}
              </div>
            </div>

            {/* Available Questions to Add */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Available Questions ({availableQuestions.length})
              </h2>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {availableQuestions.map((question, index) => (
                  <div
                    key={question.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        {question.type}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-teal-600 font-medium">
                          {question.marks} marks
                        </span>
                        <button
                          onClick={() => handleAddQuestionToExam(question.id)}
                          className="text-green-500 hover:text-green-700 transition-colors"
                          title="Add to exam"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-800 text-sm mb-2">
                      {question.questionText}
                    </p>
                    <p className="text-xs text-green-600">
                      Answer: {question.answer}
                    </p>
                  </div>
                ))}

                {availableQuestions.length === 0 && (
                  <p className="text-gray-500 text-center py-8">
                    No additional questions available to add.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default QuestionBank;