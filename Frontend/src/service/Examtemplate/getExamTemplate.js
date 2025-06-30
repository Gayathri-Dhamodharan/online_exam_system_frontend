import api from '../api';

/**
 * Fetch all exam templates for a given subject.
 * @param {string} subjectId
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export const getExamTemplates = async (subjectId) => {
  return api.get(`/api/exam-templates?subject=${subjectId}`);
};

/**
 * Fetch one exam template by its ID.
 * @param {string} templateId
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export const getExamTemplate = async (templateId) => {
  return api.get(`/api/exam-templates/${templateId}`);
};
