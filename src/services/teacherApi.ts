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

  /**
   * Quiz yaratish
   * Swagger: POST /quizzes/
   */
  createQuiz: async (quiz: { title: string; category: string; durationMinutes: number }): Promise<Quiz> => {
    return await api.post<Quiz>(API_ENDPOINTS.QUIZZES.BASE, quiz);
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
