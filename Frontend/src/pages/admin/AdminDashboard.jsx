
import React, { useEffect, useState } from "react";
import * as LucideIcon from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { getAdminDashboardData } from "../../service/Dashboard/AdminDashboard";

const AdminDashboard = () => {
  const [classFilter, setClassFilter] = useState("");
  // State to hold data for cards, graph, and table
  const [cardData, setCardData] = useState([]);
  const [garphData, setGraphData] = useState([]);
  const [tableData, setTableData] = useState([]);

  const handleClassChange = (e) => {
    setClassFilter(e.target.value.replace("Class ", ""));
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await getAdminDashboardData(classFilter);
        setCardData(response.data.card_data);
        setGraphData(response.data.graph_data);
        setTableData(response.data.table_data);
      } catch (error) {
        console.log(error, "err");
      }
    };
    fetchDashboardData();
  }, [classFilter]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <select
          className="px-4 py-2 rounded-lg border"
          value={classFilter === "" ? `All Classes` : `Class ${classFilter}`}
          onChange={handleClassChange}
        >
          {/* Give the “All Classes” option an explicit empty-string value */}
          <option value="">All Classes</option>

          {[...Array(10)].map((_, i) => (
            <option key={i} value={`Class ${i + 1}`}>
              Class {i + 1}
            </option>
          ))}
        </select>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {cardData?.map(({ item, value, icon }, idx) => {
          // Pull out the correct icon component
          const DynamicIcon = LucideIcon[icon] || LucideIcon["Circle"];
          // fallback to something valid if icon name is wrong

          return (
            <div
              key={idx}
              className="bg-white rounded-lg shadow p-5 flex items-center justify-between"
            >
              <div>
                <h3 className="text-gray-600 font-medium">{item}</h3>
                <p className="text-3xl font-semibold mt-1">{value}</p>
              </div>
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                <DynamicIcon className="w-6 h-6 text-teal-600" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Line Chart */}
      <div className="bg-white rounded-lg shadow p-5">
        <h4 className="text-lg font-medium mb-4">Avg. Scores by Subject</h4>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart
              data={garphData || []}
              margin={{ top: 20, right: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="linear"
                dataKey="percentage"
                strokeWidth={2}
                dot={{ r: 4 }}
                stroke="rgba(0,150,136,1)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Upcoming Exams Table */}
      <div className="bg-white rounded-lg shadow p-5">
        <h4 className="text-lg font-medium mb-4">Upcoming Exams</h4>
        <div className="overflow-x-auto">
          <div className="max-h-64 overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200 table-auto">
              <thead className="bg-teal-50">
                <tr>
                  {["Title", "Class", "Subject", "Date"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-2 text-left text-sm font-medium text-teal-700"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tableData?.map((exam, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-2">{exam["title"]}</td>
                    <td className="px-4 py-2">{exam["class"]}</td>
                    <td className="px-4 py-2">{exam["subject"]}</td>
                    <td className="px-4 py-2">{exam["date"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;