import api from '../api';

export const editQuestion = async (id, payload) => {
  const body = {
    ...payload,
    options:
      payload.type === "true_false"
        ? ["True", "False"]
        : payload.options,
  };
  const result = await api.put(`/api/questions/${id}`, body);
  return result;
};
 