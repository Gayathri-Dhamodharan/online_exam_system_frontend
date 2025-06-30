// src/service/classesService.js
import api from "./api";

// Fetch all classes
export async function getAllClasses() {
  try {
    const res = await api.get("/api/class");
    return res.data;
  } catch (err) {
    console.error("classesService.getAllClasses:", err);
    // You can throw to let caller handle it
    throw err.response?.data?.error || err.message;
  }
}

// Fetch a single class by ID
export async function getClassById(id) {
  try {
    const res = await api.get(`/api/class/${id}`);
    return res.data;
  } catch (err) {
    console.error("classesService.getClassById:", err);
    throw err.response?.data?.error || err.message;
  }
}
