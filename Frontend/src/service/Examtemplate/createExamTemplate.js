import api from '../api';

export const createExamTemplate = async ({
  title,
  subjectId,
  examClass,
  startDate,
  endDate,
  duration,
  questions,
}) => {
  // questions should be an array of question objects with the desired fields
  const body = {
    title,
    subject: subjectId,
    class: examClass,
    startDate,
    endDate,
    duration,
    questions,
  };
  const result = await api.post("/api/exam-templates", body);
  return result;
};
