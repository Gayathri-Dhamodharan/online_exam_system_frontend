import api from '../api';

export const addQuestionToExam = async (templateId, questionId) => {
  const result = await api.post(
    `/api/exam-templates/${templateId}/questions`,
    { questionId }
  );
  return result;
};
