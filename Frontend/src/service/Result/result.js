import api from "../api";



export const getresult = async () => {
  const result = await api.get(`/api/exam_result/result`);
  return result;
};
