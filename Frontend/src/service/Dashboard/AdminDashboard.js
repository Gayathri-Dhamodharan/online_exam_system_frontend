import api from "../api";

export const getAdminDashboardData = async (cls) => {
  const result = await api.get(
    `/api/admin/dashboard${cls != "" ? `?class=${cls}` : ""}`
  );
  return result;
};
