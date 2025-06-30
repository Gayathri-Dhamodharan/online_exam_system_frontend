import api from '../api';

export const addQuestion = async (payload, subjectId) => {
  const body = {
    ...payload,
    subject: subjectId,
    options:
      payload.type === "true_false"
        ? ["True", "False"]
        : payload.options,
  };
  const result = await api.post("/api/questions", body);
  return result;
};
