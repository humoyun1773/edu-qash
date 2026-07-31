import { api } from './api';
import type { Quiz } from '../types';

export const quizzesApi = {
  getQuizzes: async (): Promise<Quiz[]> => {
    try {
      const data: any = await api.get('/quizzes/');
      const list = Array.isArray(data) ? data : (data?.results ?? []);
      return Array.isArray(list) ? list : [];
    } catch (err) {
      console.error('[quizzesApi] GET /quizzes/ error:', err);
      return [];
    }
  },

  submitQuizResult: async (quizId: string, answers: Record<number, number>): Promise<{ score: number; totalPoints: number }> => {
    return await api.post<{ score: number; totalPoints: number }>(`/quizzes/attempts/`, { quizId, answers });
  },

  importExcelQuestions: async (fileData: FormData): Promise<{ success: boolean; importedCount: number }> => {
    return await api.post<{ success: boolean; importedCount: number }>('/quizzes/import-excel/', fileData);
  }
};
