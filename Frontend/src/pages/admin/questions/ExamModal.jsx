import React from "react";
import { X, Save } from "lucide-react";

export default function ExamModal({
  classes, examClass, onClassChange,
  questions, selectedQs, onToggle,
  title, onTitleChange,
  dates, onDatesChange,
  onClose, onSave,
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-teal-800">Create Examination</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>
        {/* …fields for class, title, dates, question checklist… */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-teal-300 text-teal-600 rounded-lg hover:bg-teal-50"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={!title.trim() || selectedQs.length === 0}
            className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={20} />
            Create Exam
          </button>
        </div>
      </div>
    </div>
  );
}
