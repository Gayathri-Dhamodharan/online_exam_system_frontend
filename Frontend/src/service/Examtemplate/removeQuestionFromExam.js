import api from '../api';

export const removeQuestionFromExam = async (templateId, questionId) => {
  const result = await api.delete(
    `/api/exam-templates/${templateId}/questions/${questionId}`
  );
  return result;
};
