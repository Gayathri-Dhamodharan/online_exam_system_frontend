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
import { addExamApi } from "../../service/Exams/examService";

const QuestionBank = () => {
  const [currentStep, setCurrentStep] = useState("classSubject"); // classSubject, dashboard, createQuestion, createExam, viewExams, viewExamDetails, editQuestion, editExam
  const [selectedClass, setSelectedClass] = useState();
  const [selectedSubject, setSelectedSubject] = useState();
  const [questions, setQuestions] = useState([]);
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
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

  console.log(
    editingQuestion,
    " editingQuestioneditingQuestioneditingQuestion"
  );

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
        console.log("response for update ", response);

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
  const getAllQuestions = async () => {
    try {
      const response = await getQuestions();
      setQuestionsData(response?.data);
      console.log(response, "response888888");
    } catch (err) {
      alert("something went wrong");
      console.log(err, "err");
    }
  };
  const handleDeleteQuestion = async (questionId) => {
    try {
      const deletedData = await deleteQuestionById(questionId);
      console.log(deletedData, "deletedData");

      if (deletedData?.status == "200") {
        getAllQuestions();
        setEditingQuestion(null);
        resetCurrentQuestion();

        setCurrentStep("createQuestion");
      }
    } catch (error) {
      console.log(error, "deletedData-error");
    }
    // if (window.confirm("Are you sure you want to delete this question?")) {
    //   setQuestions(questions.filter((q) => q.id !== questionId));
    //   // Also remove from any exams
    //   setExams(
    //     exams.map((exam) => ({
    //       ...exam,
    //       selectedQuestions: exam.selectedQuestions.filter(
    //         (qId) => qId !== questionId
    //       ),
    //     }))
    //   );
    // }
  };
  useEffect(() => {
    getAllQuestions();
    console.log("initial call");
  }, []);
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
      };
      // console.log(newExam, "uhuhikhnikh");
      try {
        const response = await addExamApi(newExam);

        console.log(response, " response frm exam");
      } catch (err) {
        console.log(err, "err");
      }
      // setExams([...exams, newExam]);
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

  const handleViewExamDetails = async (exam) => {
    try {
      const response = await getExamApi(newExam);
      console.log(response, " response frm exam");
    } catch (error) {
      console.log(err, "err");
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

  // Edit Exam
  if (currentStep === "editExam") {
    const classSubjectQuestions = questions.filter(
      (q) => q.class === selectedClass && q.subject === selectedSubject
    );

    return (
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
