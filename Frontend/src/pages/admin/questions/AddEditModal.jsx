import React, { useState } from "react";
import { X, Save } from "lucide-react";

const CLASSES = [
  "1st Grade","2nd Grade",/*…*/"10th Grade",
];

export default function AddEditModal({ question, onClose, onSave }) {
  const [p, setP] = useState({
    questionText: question?.questionText || "",
    class:        question?.class        || CLASSES[0],
    type:         question?.type         || "mcq",
    options:      question?.options      || ["", "", "", ""],
    answer:       question?.answer       || "",
    mark:         question?.mark         || 1,
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-teal-800">
            {question ? "Edit" : "Add"} Question
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>
        {/* …form fields exactly as before, just JSX… */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-teal-300 text-teal-600 rounded-lg hover:bg-teal-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(p)}
            className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
          >
            <Save size={20} />
            Save Question
          </button>
        </div>
      </div>
    </div>
  );
}
