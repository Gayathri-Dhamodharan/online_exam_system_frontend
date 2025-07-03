import React, { useEffect, useState } from "react";
import api from "../../service/api";

const ClassSubject = ({
  selectedClass,
  selectedSubject,
  setSelectedSubject,
  setSelectedClass,
  setCurrentStep,
}) => {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/api/class");
        setClasses(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);
 
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/api/subjects");
        setSubjects(data);        
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  
  const handleClassSubjectSelect = () => {
    if (selectedClass && selectedSubject) {
      setCurrentStep("dashboard");
      console.log(selectedClass, "selectedClass");
      console.log(selectedSubject, "selectedSubject");
    }
  };
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-teal-100 to-teal-600 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Question Bank Management
          </h1>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Select Class and Subject
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Class Select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Class
                </label>
                <select
                  value={selectedClass?._id || ""}
                  onChange={(e) => {
                    const selected = classes.find(
                      (cls) => cls._id === e.target.value
                    );
                    setSelectedClass(selected);
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Choose a class</option>
                  {classes?.map((cls) => (
                    <option key={cls._id} value={cls._id}>
                      {cls.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject Select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Subject
                </label>
                <select
                  value={selectedSubject?._id || ""}
                  onChange={(e) => {
                    const selected = subjects.find(
                      (subject) => subject._id === e.target.value
                    );
                    setSelectedSubject(selected);
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Choose a subject</option>
                  {subjects.map((subject) => (
                    <option key={subject._id} value={subject._id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleClassSubjectSelect}
              disabled={!selectedClass || !selectedSubject}
              className="mt-6 w-full bg-teal-600 text-white py-3 px-6 rounded-lg hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassSubject;
