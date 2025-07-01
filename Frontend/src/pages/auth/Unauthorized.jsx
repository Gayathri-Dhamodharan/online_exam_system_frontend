// src/pages/Unauthorized.jsx
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const nav = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">403 — Unauthorized</h1>
      <p className="mb-6">You don’t have permission to view that page.</p>
      <button
        onClick={() => nav(-1)}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Go Back
      </button>
    </div>
  );
};

export default Unauthorized;
