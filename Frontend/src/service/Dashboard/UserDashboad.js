import api from "../api";

export const getUserDashboardData = async (userId) => {
  const result = await api.get(`/api/user/user-dashboard/${userId}`);
  return result;
};