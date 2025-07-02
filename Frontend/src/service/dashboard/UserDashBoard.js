import api from "../api";

export const dashboardService = {
  // Get complete dashboard data
  getDashboard: async () => {
    const result = await api.get("/api/studDashboard");
    return result;
  },

  // Get subject performance
  getSubjectPerformance: async () => {
    const result = await api.get("/api/studDashboard/performance");
    return result;
  },

  // Get dashboard stats
  getStats: async () => {
    const result = await api.get("/api/studDashboard/stats");
    return result;
  },

  // Get recent performance
  getRecentPerformance: async (limit = 5) => {
    const result = await api.get(
      `/api/studDashboard/recent-performance?limit=${limit}`
    );
    return result;
  },

  // Get upcoming exams
  getUpcomingExams: async (limit = 10) => {
    const result = await api.get(
      `/api/studDashboard/upcoming-exams?limit=${limit}`
    );
    return result;
  },
};
