import api from "../api";

export const getReview = async (cls,exam) => {
  const result = await api.get(
    `/api/admin/review${cls != "" ? `?class=${cls}` : ""}${exam != "" ? `&exam=${exam}` : ""}`
  );
  return result;
};
// http://localhost:5000/api/admin/review?class=4&exam=Mid-Term

// ${cls != "" ? `?class=${cls}` : ""}
// (class=${cls.class}&exam=${cls.exam})