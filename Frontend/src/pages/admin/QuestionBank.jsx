import React, { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  BookOpen,
  FileText,
  ArrowLeft,
  Save,
  X,
} from "lucide-react";

const QuestionBankSystem = () => {
  const [currentScreen, setCurrentScreen] = useState("dashboard");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [showEditQuestion, setShowEditQuestion] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [showCreateExam, setShowCreateExam] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [examTitle, setExamTitle] = useState("");

  // Sample data
  const [subjects] = useState(["English", "Tamil", "Maths"]);
  const [grades] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  const [questionBank, setQuestionBank] = useState({
    "English-1": [
      {
        id: "eng1-1",
        question: 'What is the plural form of "child"?',
        type: "mcq",
        options: ["childs", "children", "childes", "child"],
        correctAnswer: "children",
      },
      {
        id: "eng1-2",
        question: "A noun is a naming word.",
        type: "true-false",
        correctAnswer: "true",
      },
    ],
    "Tamil-1": [
      {
        id: "tam1-1",
        question: "தமிழ் எழுத்துக்களின் எண்ணிக்கை எவ்வளவு?",
        type: "mcq",
        options: ["245", "247", "246", "248"],
        correctAnswer: "247",
      },
    ],
    "Maths-1": [
      {
        id: "math1-1",
        question: "What is 5 + 3?",
        type: "mcq",
        options: ["6", "7", "8", "9"],
        correctAnswer: "8",
      },
      {
        id: "math1-2",
        question: "10 is greater than 5.",
        type: "true-false",
        correctAnswer: "true",
      },
    ],
  });

  const [createdExams, setCreatedExams] = useState([
    {
      id: "exam1",
      title: "English Basic Test - Grade 1",
      subject: "English",
      grade: 1,
      questionsCount: 5,
      createdAt: "2024-06-20",
      questions: [
        {
          id: "eng1-1",
          question: 'What is the plural form of "child"?',
          type: "mcq",
          options: ["childs", "children", "childes", "child"],
          correctAnswer: "children",
        },
      ],
    },
  ]);

  const [newQuestion, setNewQuestion] = useState({
    question: "",
    type: "mcq",
    options: ["", "", "", ""],
    correctAnswer: "",
  });

  const getCurrentQuestions = () => {
    const key = `${selectedSubject}-${selectedGrade}`;
    return questionBank[key] || [];
  };

  const addQuestion = () => {
    const key = `${selectedSubject}-${selectedGrade}`;
    const questions = questionBank[key] || [];
    const newId = `${selectedSubject.toLowerCase()}${selectedGrade}-${Date.now()}`;

    const questionToAdd = {
      ...newQuestion,
      id: newId,
    };

    setQuestionBank((prev) => ({
      ...prev,
      [key]: [...questions, questionToAdd],
    }));

    setNewQuestion({
      question: "",
      type: "mcq",
      options: ["", "", "", ""],
      correctAnswer: "",
    });
    setShowAddQuestion(false);
  };

  const editQuestion = (questionId, updatedQuestion) => {
    const key = `${selectedSubject}-${selectedGrade}`;
    setQuestionBank((prev) => ({
      ...prev,
      [key]: prev[key].map((q) =>
        q.id === questionId ? { ...updatedQuestion, id: questionId } : q
      ),
    }));
    setShowEditQuestion(false);
    setEditingQuestion(null);
  };

  const deleteQuestion = (questionId) => {
    const key = `${selectedSubject}-${selectedGrade}`;
    setQuestionBank((prev) => ({
      ...prev,
      [key]: prev[key].filter((q) => q.id !== questionId),
    }));
  };

  const createExam = () => {
    if (selectedQuestions.length === 0 || !examTitle.trim()) return;

    const newExam = {
      id: `exam-${Date.now()}`,
      title: examTitle,
      subject: selectedSubject,
      grade: selectedGrade,
      questionsCount: selectedQuestions.length,
      createdAt: new Date().toISOString().split("T")[0],
      questions: selectedQuestions,
    };

    setCreatedExams((prev) => [...prev, newExam]);
    setSelectedQuestions([]);
    setExamTitle("");
    setShowCreateExam(false);
    alert("Exam created successfully!");
  };

  // Dashboard Screen
  const DashboardScreen = () => (
    <div className="min-h-screen bg-gray-50  p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-teal-800 mb-8 text-center">
          Question Bank Management
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            onClick={() => setCurrentScreen("subjects")}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-105"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-teal-400 to-teal-600 p-4 rounded-full group-hover:scale-110 transition-transform">
                <Plus size={32} className="text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-teal-800 text-center mb-4">
              Create Question Paper
            </h2>
            <p className="text-teal-600 text-center">
              Add, edit, and manage questions for different subjects and grades
            </p>
          </div>

          <div
            onClick={() => setCurrentScreen("created-papers")}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-105"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-teal-500 to-teal-700 p-4 rounded-full group-hover:scale-110 transition-transform">
                <FileText size={32} className="text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-teal-800 text-center mb-4">
              View Created Papers
            </h2>
            <p className="text-teal-600 text-center">
              Browse and manage your created examination papers
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );

  // Subject Selection Screen
  const SubjectScreen = () => (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={() => setCurrentScreen("dashboard")}
            className="mr-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
          >
            <ArrowLeft className="text-teal-600" />
          </button>
          <h1 className="text-3xl font-bold text-teal-800">Select Subject</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <div
              key={subject}
              onClick={() => {
                setSelectedSubject(subject);
                setCurrentScreen("grades");
              }}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-teal-400 to-teal-600 p-3 rounded-full group-hover:scale-110 transition-transform">
                  <BookOpen size={24} className="text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-teal-800 text-center">
                {subject}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Grade Selection Screen
  const GradeScreen = () => (
    <div className="min-h-screen  bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={() => setCurrentScreen("subjects")}
            className="mr-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
          >
            <ArrowLeft className="text-teal-600" />
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-teal-800">
            Select Grade - {selectedSubject}
          </h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {grades.map((grade) => (
            <div
              key={grade}
              onClick={() => {
                setSelectedGrade(grade);
                setCurrentScreen("questions");
              }}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105"
            >
              <div className="text-center">
                <div className="bg-gradient-to-r from-teal-400 to-teal-600 text-white text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  {grade}
                </div>
                <p className="text-teal-700 font-medium">Grade {grade}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Questions Management Screen
  const QuestionsScreen = () => {
    const questions = getCurrentQuestions();

    return (
      <div className="min-h-screen  bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="flex items-center">
              <button
                onClick={() => setCurrentScreen("grades")}
                className="mr-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
              >
                <ArrowLeft className="text-teal-600" />
              </button>
              <h1 className="text-2xl md:text-3xl font-bold text-teal-800">
                {selectedSubject} - Grade {selectedGrade}
              </h1>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowAddQuestion(true)}
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-2 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all flex items-center gap-2"
              >
                <Plus size={20} />
                Add Question
              </button>
              <button
                onClick={() => setShowCreateExam(true)}
                className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 py-2 rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all flex items-center gap-2"
              >
                <FileText size={20} />
                Create Exam
              </button>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
            {questions.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen size={64} className="mx-auto text-teal-300 mb-4" />
                <p className="text-teal-600 text-lg">
                  No questions found. Add your first question!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {questions.map((question, index) => (
                  <div
                    key={question.id}
                    className="border border-teal-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded text-sm font-medium">
                            Q{index + 1}
                          </span>
                          <span className="bg-teal-500 text-white px-2 py-1 rounded text-sm">
                            {question.type.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-teal-800 font-medium mb-2">
                          {question.question}
                        </p>

                        {question.type === "mcq" && (
                          <div className="grid grid-cols-2 gap-2">
                            {question.options.map((option, optIndex) => (
                              <div
                                key={optIndex}
                                className={`p-2 rounded text-sm border ${
                                  option === question.correctAnswer
                                    ? "bg-green-100 border-green-300 text-green-700"
                                    : "bg-gray-50 border-gray-200"
                                }`}
                              >
                                {String.fromCharCode(65 + optIndex)}. {option}
                              </div>
                            ))}
                          </div>
                        )}

                        {question.type === "true-false" && (
                          <div className="flex gap-2">
                            <span
                              className={`px-3 py-1 rounded text-sm ${
                                question.correctAnswer === "true"
                                  ? "bg-green-100 text-green-700 border border-green-300"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              True
                            </span>
                            <span
                              className={`px-3 py-1 rounded text-sm ${
                                question.correctAnswer === "false"
                                  ? "bg-green-100 text-green-700 border border-green-300"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              False
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => {
                            setEditingQuestion(question);
                            setShowEditQuestion(true);
                          }}
                          className="p-2 text-teal-600 hover:bg-teal-100 rounded transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => deleteQuestion(question.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Add Question Modal */}
        {showAddQuestion && (
          <AddQuestionModal
            onClose={() => setShowAddQuestion(false)}
            onSave={addQuestion}
            question={newQuestion}
            setQuestion={setNewQuestion}
          />
        )}

        {/* Edit Question Modal */}
        {showEditQuestion && editingQuestion && (
          <EditQuestionModal
            onClose={() => {
              setShowEditQuestion(false);
              setEditingQuestion(null);
            }}
            onSave={(updatedQuestion) =>
              editQuestion(editingQuestion.id, updatedQuestion)
            }
            question={editingQuestion}
          />
        )}

        {/* Create Exam Modal */}
        {showCreateExam && (
          <CreateExamModal
            questions={questions}
            onClose={() => setShowCreateExam(false)}
            onSave={createExam}
            selectedQuestions={selectedQuestions}
            setSelectedQuestions={setSelectedQuestions}
            examTitle={examTitle}
            setExamTitle={setExamTitle}
          />
        )}
      </div>
    );
  };

  // Created Papers Screen
  const CreatedPapersScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-teal-100 to-teal-600 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={() => setCurrentScreen("dashboard")}
            className="mr-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
          >
            <ArrowLeft className="text-teal-600" />
          </button>
          <h1 className="text-3xl font-bold text-teal-800">
            Created Question Papers
          </h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {createdExams.map((exam) => (
            <div
              key={exam.id}
              onClick={() => {
                setCurrentScreen("exam-details");
                setSelectedSubject(exam.subject);
                setSelectedGrade(exam.grade);
              }}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-r from-teal-400 to-teal-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <FileText size={20} className="text-white" />
                </div>
                <span className="text-teal-600 text-sm">{exam.createdAt}</span>
              </div>
              <h3 className="text-lg font-semibold text-teal-800 mb-2">
                {exam.title}
              </h3>
              <div className="space-y-1 text-sm text-teal-600">
                <p>Subject: {exam.subject}</p>
                <p>Grade: {exam.grade}</p>
                <p>Questions: {exam.questionsCount}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Exam Details Screen
  const ExamDetailsScreen = () => {
    const exam = createdExams.find(
      (e) => e.subject === selectedSubject && e.grade === selectedGrade
    );

    if (!exam) return <div>Exam not found</div>;

    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-teal-100 to-teal-600 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <button
              onClick={() => setCurrentScreen("created-papers")}
              className="mr-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
            >
              <ArrowLeft className="text-teal-600" />
            </button>
            <h1 className="text-3xl font-bold text-teal-800">{exam.title}</h1>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
            <div className="mb-6 p-4 bg-teal-50 rounded-lg">
              <h2 className="text-xl font-semibold text-teal-800 mb-2">
                Exam Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-teal-600">
                <p>
                  <strong>Subject:</strong> {exam.subject}
                </p>
                <p>
                  <strong>Grade:</strong> {exam.grade}
                </p>
                <p>
                  <strong>Total Questions:</strong> {exam.questionsCount}
                </p>
                <p>
                  <strong>Created:</strong> {exam.createdAt}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-teal-800">Questions</h3>
              {exam.questions.map((question, index) => (
                <div
                  key={question.id}
                  className="border border-teal-200 rounded-lg p-4"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded font-medium">
                      Question {index + 1}
                    </span>
                    <span className="bg-teal-500 text-white px-2 py-1 rounded text-sm">
                      {question.type.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-teal-800 font-medium mb-3 text-lg">
                    {question.question}
                  </p>

                  {question.type === "mcq" && (
                    <div className="space-y-2">
                      {question.options.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className={`p-3 rounded border ${
                            option === question.correctAnswer
                              ? "bg-green-100 border-green-300 text-green-700 font-medium"
                              : "bg-gray-50 border-gray-200"
                          }`}
                        >
                          <span className="font-medium">
                            {String.fromCharCode(65 + optIndex)}.
                          </span>{" "}
                          {option}
                          {option === question.correctAnswer && (
                            <span className="ml-2 text-green-600 font-bold">
                              ✓ Correct Answer
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {question.type === "true-false" && (
                    <div className="flex gap-4">
                      <div
                        className={`px-4 py-2 rounded border ${
                          question.correctAnswer === "true"
                            ? "bg-green-100 border-green-300 text-green-700 font-medium"
                            : "bg-gray-100 border-gray-200"
                        }`}
                      >
                        True{" "}
                        {question.correctAnswer === "true" && (
                          <span className="ml-2 text-green-600 font-bold">
                            ✓
                          </span>
                        )}
                      </div>
                      <div
                        className={`px-4 py-2 rounded border ${
                          question.correctAnswer === "false"
                            ? "bg-green-100 border-green-300 text-green-700 font-medium"
                            : "bg-gray-100 border-gray-200"
                        }`}
                      >
                        False{" "}
                        {question.correctAnswer === "false" && (
                          <span className="ml-2 text-green-600 font-bold">
                            ✓
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Add Question Modal Component
  const AddQuestionModal = ({ onClose, onSave, question, setQuestion }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-teal-800">Add New Question</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-teal-700 font-medium mb-2">
              Question Type
            </label>
            <select
              value={question.type}
              onChange={(e) =>
                setQuestion((prev) => ({ ...prev, type: e.target.value }))
              }
              className="w-full p-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="mcq">Multiple Choice (MCQ)</option>
              <option value="true-false">True/False</option>
            </select>
          </div>

          <div>
            <label className="block text-teal-700 font-medium mb-2">
              Question
            </label>
            <textarea
              value={question.question}
              onChange={(e) =>
                setQuestion((prev) => ({ ...prev, question: e.target.value }))
              }
              className="w-full p-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              rows="3"
              placeholder="Enter your question here..."
            />
          </div>

          {question.type === "mcq" && (
            <div>
              <label className="block text-teal-700 font-medium mb-2">
                Options
              </label>
              {question.options.map((option, index) => (
                <div key={index} className="mb-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...question.options];
                      newOptions[index] = e.target.value;
                      setQuestion((prev) => ({ ...prev, options: newOptions }));
                    }}
                    className="w-full p-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                  />
                </div>
              ))}

              <div className="mt-4">
                <label className="block text-teal-700 font-medium mb-2">
                  Correct Answer
                </label>
                <select
                  value={question.correctAnswer}
                  onChange={(e) =>
                    setQuestion((prev) => ({
                      ...prev,
                      correctAnswer: e.target.value,
                    }))
                  }
                  className="w-full p-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Select correct answer</option>
                  {question.options.map((option, index) => (
                    <option key={index} value={option}>
                      {String.fromCharCode(65 + index)}. {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {question.type === "true-false" && (
            <div>
              <label className="block text-teal-700 font-medium mb-2">
                Correct Answer
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="trueFalseAnswer"
                    value="true"
                    checked={question.correctAnswer === "true"}
                    onChange={(e) =>
                      setQuestion((prev) => ({
                        ...prev,
                        correctAnswer: e.target.value,
                      }))
                    }
                    className="mr-2"
                  />
                  True
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="trueFalseAnswer"
                    value="false"
                    checked={question.correctAnswer === "false"}
                    onChange={(e) =>
                      setQuestion((prev) => ({
                        ...prev,
                        correctAnswer: e.target.value,
                      }))
                    }
                    className="mr-2"
                  />
                  False
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={onSave}
            className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all flex items-center justify-center gap-2"
          >
            <Save size={20} />
            Save Question
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 border border-teal-300 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  // Edit Question Modal Component
  const EditQuestionModal = ({ onClose, onSave, question }) => {
    const [editedQuestion, setEditedQuestion] = useState(question);

    const handleSave = () => {
      onSave(editedQuestion);
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-teal-800">Edit Question</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-teal-700 font-medium mb-2">
                Question Type
              </label>
              <select
                value={editedQuestion.type}
                onChange={(e) =>
                  setEditedQuestion((prev) => ({
                    ...prev,
                    type: e.target.value,
                  }))
                }
                className="w-full p-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="mcq">Multiple Choice (MCQ)</option>
                <option value="true-false">True/False</option>
              </select>
            </div>

            <div>
              <label className="block text-teal-700 font-medium mb-2">
                Question
              </label>
              <textarea
                value={editedQuestion.question}
                onChange={(e) =>
                  setEditedQuestion((prev) => ({
                    ...prev,
                    question: e.target.value,
                  }))
                }
                className="w-full p-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                rows="3"
                placeholder="Enter your question here..."
              />
            </div>

            {editedQuestion.type === "mcq" && (
              <div>
                <label className="block text-teal-700 font-medium mb-2">
                  Options
                </label>
                {editedQuestion.options.map((option, index) => (
                  <div key={index} className="mb-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...editedQuestion.options];
                        newOptions[index] = e.target.value;
                        setEditedQuestion((prev) => ({
                          ...prev,
                          options: newOptions,
                        }));
                      }}
                      className="w-full p-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder={`Option ${String.fromCharCode(65 + index)}`}
                    />
                  </div>
                ))}

                <div className="mt-4">
                  <label className="block text-teal-700 font-medium mb-2">
                    Correct Answer
                  </label>
                  <select
                    value={editedQuestion.correctAnswer}
                    onChange={(e) =>
                      setEditedQuestion((prev) => ({
                        ...prev,
                        correctAnswer: e.target.value,
                      }))
                    }
                    className="w-full p-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">Select correct answer</option>
                    {editedQuestion.options.map((option, index) => (
                      <option key={index} value={option}>
                        {String.fromCharCode(65 + index)}. {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {editedQuestion.type === "true-false" && (
              <div>
                <label className="block text-teal-700 font-medium mb-2">
                  Correct Answer
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="editTrueFalseAnswer"
                      value="true"
                      checked={editedQuestion.correctAnswer === "true"}
                      onChange={(e) =>
                        setEditedQuestion((prev) => ({
                          ...prev,
                          correctAnswer: e.target.value,
                        }))
                      }
                      className="mr-2"
                    />
                    True
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="editTrueFalseAnswer"
                      value="false"
                      checked={editedQuestion.correctAnswer === "false"}
                      onChange={(e) =>
                        setEditedQuestion((prev) => ({
                          ...prev,
                          correctAnswer: e.target.value,
                        }))
                      }
                      className="mr-2"
                    />
                    False
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all flex items-center justify-center gap-2"
            >
              <Save size={20} />
              Update Question
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-teal-300 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Create Exam Modal Component
  const CreateExamModal = ({
    questions,
    onClose,
    onSave,
    selectedQuestions,
    setSelectedQuestions,
    examTitle,
    setExamTitle,
  }) => {
    const toggleQuestionSelection = (question) => {
      setSelectedQuestions((prev) => {
        const isSelected = prev.find((q) => q.id === question.id);
        if (isSelected) {
          return prev.filter((q) => q.id !== question.id);
        } else {
          return [...prev, question];
        }
      });
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-teal-800">
              Create Examination
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-teal-700 font-medium mb-2">
              Exam Title
            </label>
            <input
              type="text"
              value={examTitle}
              onChange={(e) => setExamTitle(e.target.value)}
              className="w-full p-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter exam title..."
            />
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-800 mb-4">
              Select Questions ({selectedQuestions.length} selected)
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {questions.map((question, index) => (
                <div
                  key={question.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedQuestions.find((q) => q.id === question.id)
                      ? "border-teal-500 bg-teal-50"
                      : "border-gray-200 hover:border-teal-300"
                  }`}
                  onClick={() => toggleQuestionSelection(question)}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={
                        !!selectedQuestions.find((q) => q.id === question.id)
                      }
                      onChange={() => toggleQuestionSelection(question)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded text-sm font-medium">
                          Q{index + 1}
                        </span>
                        <span className="bg-teal-500 text-white px-2 py-1 rounded text-sm">
                          {question.type.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-teal-800 font-medium">
                        {question.question}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={onSave}
              disabled={selectedQuestions.length === 0 || !examTitle.trim()}
              className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={20} />
              Create Exam
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-teal-300 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Main render logic
  switch (currentScreen) {
    case "subjects":
      return <SubjectScreen />;
    case "grades":
      return <GradeScreen />;
    case "questions":
      return <QuestionsScreen />;
    case "created-papers":
      return <CreatedPapersScreen />;
    case "exam-details":
      return <ExamDetailsScreen />;
    default:
      return <DashboardScreen />;
  }
};

export default QuestionBankSystem;
