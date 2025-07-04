// service/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://online-exam-system-backend-kr3u.onrender.com/",
  headers: { "Conten-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
