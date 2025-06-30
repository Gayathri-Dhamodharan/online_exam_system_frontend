import api from '../api';

export const getQuestions = async(subject) =>
{
    const result = await api.get(`/api/questions?subject=${subject._id}`);
    return result
}
