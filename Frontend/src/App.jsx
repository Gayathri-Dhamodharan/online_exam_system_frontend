import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      // App.jsx
      <Routes>
        {/* Admin */}
        <Route path="/admin/*" element={<LayoutAdmin />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="exams" element={<ExamList />} />
          <Route path="exams/create" element={<CreateExam />} />
          <Route path="questions" element={<QuestionBank />} />
          <Route path="results" element={<ResultsPage />} />
        </Route>

        {/* Student */}
        <Route path="/student/*" element={<LayoutStudent />}>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="exams" element={<AvailableExams />} />
          <Route path="results" element={<StudentResults />} />
        </Route>
      </Routes>
    </>
  );
}

export default App
