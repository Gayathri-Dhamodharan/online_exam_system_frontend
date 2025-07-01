import api from "../api";

export const addExamApi = async (payload) => {
  console.log(payload, "add exam");

  const result = await api.post("/api/exam/create-exam", payload);
  return result;
};

export const getExamApi = async (classId, subjId) => {
  const result = await api.post(`/api/exam/getall-exam/${classId}/${subjId}`);
  return result;
};
