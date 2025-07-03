import api from "../api";

export const getQuestions = async (classId, subjId) => {
  console.log(classId, subjId, "classId, subjId");

  const result = await api.get(
    `/api/questions/getAllQuestionsForCls/${classId}/${subjId}`
  );
  return result;
};
