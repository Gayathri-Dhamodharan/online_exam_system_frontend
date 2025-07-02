import api from "../api";

export const addQuestion = async (payload) => {
  const result = await api.post("/api/questions/create-questions", payload);
  return result;
};
