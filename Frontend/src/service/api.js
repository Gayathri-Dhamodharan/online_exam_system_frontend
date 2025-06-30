
import axios from "axios";

const api = axios.create({
  baseURL: "https://online-exam-system-backend-kr3u.onrender.com",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default api;

