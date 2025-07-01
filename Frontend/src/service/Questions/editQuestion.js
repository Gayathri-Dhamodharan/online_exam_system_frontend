import api from "../api";

export const getQuestionById = async (id) => {
  const result = await api.get(`/api/questions/${id}`);
  return result;
};
export const updateQuestion = async (qId, payload) => {
  const result = await api.put(
    `/api/questions/update-question/${qId}`,
    payload
  );
  return result;
};

export const deleteQuestionById = async (id) => {
  const result = await api.delete(`/api/questions/delete-question/${id}`);
  return result;
};
