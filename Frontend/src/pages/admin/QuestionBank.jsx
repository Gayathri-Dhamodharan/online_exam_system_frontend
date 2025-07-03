import React, { useEffect, useState } from "react";
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
import { addQuestion } from "../../service/Questions/addQuestions";
import {
  deleteQuestionById,
  updateQuestion,
} from "../../service/Questions/editQuestion";
import { getQuestions } from "../../service/Questions/getQuestions";
import { addExamApi, getExamApi } from "../../service/Exams/examService";

const QuestionBank = () => {
  const [currentStep, setCurrentStep] = useState("classSubject"); // classSubject, dashboard, createQuestion, createExam, viewExams, viewExamDetails, editQuestion, editExam
  const [selectedClass, setSelectedClass] = useState();
  const [selectedSubject, setSelectedSubject] = useState();
  const [classSubjectExams, setClassSubjectExams] = useState([]);

  const [questions, setQuestions] = useState([]);
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState();
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editingExam, setEditingExam] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState({
    questionType: "multiple-choice",
    questionText: "",
    options: ["", "", "", ""],
    answer: "",
    marks: 1,
  });
  const [questionsData, setQuestionsData] = useState([]);
  const [currentExam, setCurrentExam] = useState({
    title: "",
    date: "",
    time: "",
    duration: "",
    selectedQuestions: [],
  });

  console.log("questionsData", questionsData);

  const handleUpdateQuestion = async () => {
    if (currentQuestion.questionText && currentQuestion.answer) {
      setQuestions(
        questions.map((q) =>
          q.id === editingQuestion.id
            ? { ...currentQuestion, id: editingQuestion.id }
            : q
        )
      );

      try {
        const response = await updateQuestion(editingQuestion, currentQuestion);

        if (response?.status == "200") {
          alert("updated successfully ");
          setEditingQuestion(null);
          resetCurrentQuestion();
          getAllQuestions();
          setCurrentStep("createQuestion");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const classId = selectedClass?._id;
  const subjId = selectedSubject?._id;

  // console.log(classId, subjId, "subjId,classId");

  const getAllQuestions = async () => {
    try {
      const response = await getQuestions(classId, subjId);
      setQuestionsData(response?.data);
    } catch (err) {
      alert("something went wrong");
      console.log(err, "err");
    }
  };
  useEffect(() => {
    if (classId && subjId) {
      getAllQuestions();
    }
  }, [classId, subjId]);

  const handleDeleteQuestion = async (questionId) => {
    try {
      const deletedData = await deleteQuestionById(questionId);

      if (deletedData?.status == "200") {
        getAllQuestions();
        setEditingQuestion(null);
        resetCurrentQuestion();

        setCurrentStep("createQuestion");
      }
    } catch (error) {
      console.log(error, "deletedData-error");
    }
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setCurrentQuestion({ ...question });
    setCurrentStep("editQuestion");
  };

  const resetCurrentQuestion = () => {
    setCurrentQuestion({
      questionType: "multiple-choice",
      questionText: "",
      options: ["", "", "", ""],
      answer: "",
      marks: 1,
    });
  };

  const handleCreateExam = async () => {
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
        passMark: currentExam?.passMark || 0,
        startDate: currentExam?.startDate || 0,
        duration: currentExam?.duration || 0,
        startTime: currentExam?.time || "00:00",
      };
      try {
        const response = await addExamApi(newExam);
      } catch (err) {
        console.log(err, "err");
      }
      setExams([...exams, newExam]);
      resetCurrentExam();
      setCurrentStep("dashboard");
    }
  };

  // <<<<<<----------------->>>>>>

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

  const handleViewExamDetails = async (exam) => {
    try {
      const response = await getExamApi(newExam);
    } catch (error) {
      console.log(error, "err");
    }
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
        questionsData={questionsData}
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
        questionsData={questionsData}
        getAllQuestions={getAllQuestions}
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
        editingQuestion={editingQuestion}
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
      <CreateExam
        selectedClass={selectedClass}
        selectedSubject={selectedSubject}
        setCurrentStep={setCurrentStep}
        currentExam={currentExam}
        setCurrentExam={setCurrentExam}
        classSubjectQuestions={classSubjectQuestions}
        handleCreateExam={handleCreateExam}
        getAllQuestions={getAllQuestions}
        questionsData={questionsData}
      />
    );
  }

  // View Exams
  if (currentStep === "viewExams") {
    return (
      <ViewExams
        setSelectedExam={setSelectedExam}
        selectedExam={selectedExam}
        selectedClass={selectedClass}
        selectedSubject={selectedSubject}
        setCurrentStep={setCurrentStep}
        classSubjectExams={classSubjectExams}
        setClassSubjectExams={setClassSubjectExams}
        getDifficultyText={getDifficultyText}
        getDifficultyColor={getDifficultyColor}
        handleViewExamDetails={handleViewExamDetails}
      />
    );
  }

  if (currentStep === "viewExamDetails" && selectedExam) {
    const availableQuestions = questions.filter(
      (q) => q.class === selectedClass && q.subject === selectedSubject
    );
    return (
      <ViewExamDetails
        selectedExam={selectedExam}
        setSelectedExam={setSelectedExam}
        selectedClass={selectedClass}
        selectedSubject={selectedSubject}
        setClassSubjectExams={setClassSubjectExams}
        classSubjectExams={classSubjectExams}
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
