import api from "../api";

export const addExamApi = async (payload) => {
  const result = await api.post("/api/exam/create-exam", payload);
  return result;
};

export const getExamApi = async (classId, subjId) => {
  const result = await api.post(`/api/exam/getall-exam/${classId}/${subjId}`);
  return result;
};
export const getSingleExam = async (examId) => {
  console.log(examId, "examIdexamIdexamIdexamId");
  const result = await api.get(`/api/exam/get-singleExam/${examId}`);
  return result;
};

export const getAllUpcomingExamAPI = async (classID) => {
  console.log(classID, "examIdexamIdexamIdexamId");
  const result = await api.get(`/api/exam/class/${classID}`);
  return result;
};

 

export const submitExamResult = async (payload) => {
  const result = await api.post(`/api/exam/attend`, payload);
  return result;
};
