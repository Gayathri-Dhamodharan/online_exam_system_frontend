// src/components/ClassPicker.jsx
import React, { useEffect, useState } from "react";
import { getAllClasses } from "../service/classesService";

export default function ClassPicker({ onSelect, initialValue = null }) {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(initialValue);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const data = await getAllClasses();
        if (isMounted) {
          setClasses(data);
        }
      } catch (e) {
        if (isMounted) {
          setError(typeof e === "string" ? e : "Failed to load classes");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();
    return () => { isMounted = false; };
  }, []);

  const handleChange = (e) => {
    const cls = classes.find((c) => c._id === e.target.value);
    setSelectedId(e.target.value);
    onSelect(cls);
  };

  if (loading) return <p>Loading classes…</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium text-teal-700">
        Select Class
      </label>
      <select
        value={selectedId || ""}
        onChange={handleChange}
        className="w-full p-2 border border-teal-200 rounded"
      >
        <option value="" disabled>
          — Choose a Class —
        </option>
        {classes.map((cls) => (
          <option key={cls._id} value={cls._id}>
            {cls.name} — Section {cls.section}
          </option>
        ))}
      </select>
    </div>
  );
}
