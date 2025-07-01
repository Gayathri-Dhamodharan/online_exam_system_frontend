import api from "../api";

export const getQuestions = async () => {
  const result = await api.get(`/api/questions`);
  return result;
};
