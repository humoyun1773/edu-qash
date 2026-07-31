import { api } from './api';
import { API_ENDPOINTS } from '../api/apiEndpoints';
import type { Quiz, StudentProgress, TeacherScheduleItem } from '../types';

export type { StudentProgress, TeacherScheduleItem };

export const teacherApi = {
  /**
   * O'qituvchiga tegishli talabalar ro'yxati
   * Swagger: GET /auth/profile/
   */
  getStudents: async (): Promise<StudentProgress[]> => {
    try {
      const data: any = await api.get(API_ENDPOINTS.TEACHER.STUDENTS);
      const list = Array.isArray(data) ? data : (data?.results ?? data?.students ?? []);
      return Array.isArray(list) ? list : [];
    } catch {
      return [];
    }
  },

  createQuiz: async (quiz: { title: string; category: string; durationMinutes?: number; passScore?: number }): Promise<Quiz> => {
    try {
      const res: any = await api.post(API_ENDPOINTS.QUIZZES.BASE, quiz);
      return {
        id: String(res.id || `q_${Date.now()}`),
        title: res.title || quiz.title,
        category: (res.category || quiz.category || 'IELTS') as any,
        durationMinutes: res.duration_minutes || quiz.durationMinutes || 30,
        negativeMarking: false,
        shuffleQuestions: true,
        passScore: res.pass_score || quiz.passScore || 70,
        questions: res.questions || []
      };
    } catch (err) {
      console.warn('[teacherApi] createQuiz API error, fallback:', err);
      return {
        id: `q_${Date.now()}`,
        title: quiz.title,
        category: (quiz.category as any) || 'IELTS',
        durationMinutes: quiz.durationMinutes || 30,
        negativeMarking: false,
        shuffleQuestions: true,
        passScore: quiz.passScore || 70,
        questions: []
      };
    }
  },

  /**
   * O'qituvchi quizlari
   * Swagger: GET /quizzes/
   */
  getQuizzes: async (): Promise<Quiz[]> => {
    try {
      const data: any = await api.get(API_ENDPOINTS.QUIZZES.BASE);
      const list = Array.isArray(data) ? data : (data?.results ?? []);
      return Array.isArray(list) ? list : [];
    } catch {
      return [];
    }
  },

  /**
   * Darslar jadvali
   * Swagger: GET /courses/lessons/
   */
  getSchedule: async (): Promise<TeacherScheduleItem[]> => {
    try {
      const data: any = await api.get(API_ENDPOINTS.TEACHER.SCHEDULE);
      const list = Array.isArray(data) ? data : (data?.results ?? []);
      return Array.isArray(list) ? list : [];
    } catch {
      return [];
    }
  },

  /**
   * O'qituvchi statistikasi
   * Swagger: GET /analytics/overview/
   */
  getStats: async () => {
    try {
      return await api.get(API_ENDPOINTS.TEACHER.STATS);
    } catch {
      return { totalStudents: 0, totalQuizzes: 0, averageScore: 0 };
    }
  },

  getCourseStats: async () => {
    try {
      return await api.get(API_ENDPOINTS.TEACHER.STATS);
    } catch {
      return { totalStudents: 0, totalQuizzes: 0, averageScore: 0 };
    }
  }
};
