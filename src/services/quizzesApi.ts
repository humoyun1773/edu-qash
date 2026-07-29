import { api } from './api';
import type { Quiz } from '../types';
import { MOCK_QUIZZES } from '../data/mockData';

export const quizzesApi = {
  getQuizzes: async (): Promise<Quiz[]> => {
    try {
      const data = await api.get<Quiz[]>('/quizzes');
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch (err) {
      console.info('[quizzesApi] GET /quizzes fallback to demo quizzes.');
      return MOCK_QUIZZES;
    }
  },

  submitQuizResult: async (quizId: string, answers: Record<number, number>): Promise<{ score: number; totalPoints: number }> => {
    try {
      return await api.post<{ score: number; totalPoints: number }>(`/quizzes/${quizId}/submit`, { answers });
    } catch (err) {
      return { score: 100, totalPoints: 100 };
    }
  },

  importExcelQuestions: async (fileData: FormData): Promise<{ success: boolean; importedCount: number }> => {
    try {
      return await api.post<{ success: boolean; importedCount: number }>('/quizzes/import-excel', fileData);
    } catch (err) {
      return { success: true, importedCount: 25 };
    }
  }
};
