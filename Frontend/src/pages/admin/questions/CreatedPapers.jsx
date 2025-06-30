import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import api from "../../../service/api";

export default function CreatedPapers() {
  const [templates, setTemplates] = useState(null);  
  const nav = useNavigate();



  // 1) Still loading?
  if (templates === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-teal-600 text-lg">Loading exams…</p>
      </div>
    );
  }

  // 2) If it’s not an array for some reason, bail out
  if (!Array.isArray(templates)) {
    console.error("Expected exams array but got:", templates);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg">
          Unexpected data format. See console for details.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-teal-100 to-teal-600 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={() => nav(-1)}
            className="mr-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
          >
            <ArrowLeft className="text-teal-600" />
          </button>
          <h1 className="text-3xl font-bold text-teal-800">
            Created Question Papers
          </h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((t) => {
            // 3) Extra guard per‐item
            const id    = t?._id;
            const start = t?.startDate;
            const end   = t?.endDate;
            if (!id) {
              console.warn("Skipping item with no _id:", t);
              return null;
            }

            return (
              <div
                key={id}
                onClick={() => nav(`../exam-details/${id}`)}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gradient-to-r from-teal-400 to-teal-600 p-2 rounded-lg">
                    <FileText size={20} className="text-white" />
                  </div>
                  <span className="text-teal-600 text-sm">
                    {start && !isNaN(Date.parse(start))
                      ? new Date(start).toLocaleDateString()
                      : "Unknown"}
                    {" – "}
                    {end && !isNaN(Date.parse(end))
                      ? new Date(end).toLocaleDateString()
                      : "Unknown"}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-teal-800 mb-2">
                  {t.title || "Untitled Exam"}
                </h3>
                <div className="space-y-1 text-sm text-teal-600">
                  <p>Class: {t.class || "—"}</p>
                  <p>Questions: {Array.isArray(t.questions) ? t.questions.length : "—"}</p>
                  <p>Total Marks: {t.totalMark ?? "—"}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
