import React, { Suspense, lazy } from "react";
import { useRoutes, Navigate } from "react-router-dom";

const Dashboard     = lazy(() => import("./Dashboard"));
const Subjects      = lazy(() => import("./Subjects"));
const Questions     = lazy(() => import("./Questions"));
const CreatedPapers = lazy(() => import("./CreatedPapers"));
const ExamDetails   = lazy(() => import("./ExamDetails"));

export default function QuestionsRoutes() {
  return useRoutes([
    {
      path: "admin",
      children: [
        {
          path: "questions",
          children: [
            { index: true, element:
              <Suspense fallback={<div>Loading…</div>}><Dashboard/></Suspense>
            },
            {
              path: "subjects",
              element: <Suspense fallback={<div>Loading…</div>}><Subjects/></Suspense>,
            },
            {
              path: "questions",
              element: <Suspense fallback={<div>Loading…</div>}><Questions/></Suspense>,
            },
            {
              path: "created-papers",
              element: <Suspense fallback={<div>Loading…</div>}><CreatedPapers/></Suspense>,
            },
            {
              path: "exam-details/:id",
              element: <Suspense fallback={<div>Loading…</div>}><ExamDetails/></Suspense>,
            },
            { path: "*", element: <Navigate to="/admin/questions" replace /> },
          ],
        },
      ],
    },
  ]);
}
