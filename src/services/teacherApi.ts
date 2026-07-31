import { api } from './api';
import { API_ENDPOINTS } from '../api/apiEndpoints';
import type { Quiz, StudentProgress, TeacherScheduleItem } from '../types';
import { MOCK_QUIZZES } from '../data/mockData';

export type { StudentProgress, TeacherScheduleItem };

const FALLBACK_STUDENTS: StudentProgress[] = [
  { id: 'st_1', name: 'Shahzod Rashidov', email: 'shahzod@gmail.com', courseName: 'IELTS Masterclass 8.5', score: 'Overall Band 7.5' },
  { id: 'st_2', name: 'Madina Saidova', email: 'madina@gmail.com', courseName: 'Digital SAT Intensive', score: 'Math 780, EBRW 720' }
];

const FALLBACK_SCHEDULE: TeacherScheduleItem[] = [
  { day: 'Dushanba', title: 'IELTS Speaking Live Practice', time: '14:00 - 15:30' },
  { day: 'Chorshanba', title: 'SAT Math Problem Solving', time: '16:00 - 17:30' },
  { day: 'Juma', title: 'IELTS Writing Task 2 Evaluation', time: '18:00 - 19:30' }
];

export const teacherApi = {
  /**
   * O'qituvchiga tegishli talabalar ro'yxati
   * Swagger: GET /auth/profile/ (teacher profilidan courses/students olinadi)
   */
  getStudents: async (): Promise<StudentProgress[]> => {
    try {
      const data = await api.get<StudentProgress[]>(API_ENDPOINTS.TEACHER.STUDENTS);
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch {
      return FALLBACK_STUDENTS;
    }
  },

  /**
   * Quiz yaratish
   * Swagger: POST /quizzes/
   */
  createQuiz: async (quiz: { title: string; category: string; durationMinutes: number }): Promise<Quiz> => {
    try {
      return await api.post<Quiz>(API_ENDPOINTS.QUIZZES.BASE, quiz);
    } catch {
      return MOCK_QUIZZES[0];
    }
  },

  /**
   * O'qituvchi quizlari
   * Swagger: GET /quizzes/
   */
  getQuizzes: async (): Promise<Quiz[]> => {
    try {
      const data = await api.get<any>(API_ENDPOINTS.QUIZZES.BASE);
      const list = Array.isArray(data) ? data : (data?.results ?? []);
      if (list.length > 0) return list;
      throw new Error('Empty');
    } catch {
      return MOCK_QUIZZES;
    }
  },

  /**
   * Dars jadvali
   * Swagger: GET /courses/lessons/
   */
  getSchedule: async (): Promise<TeacherScheduleItem[]> => {
    try {
      const data = await api.get<any>(API_ENDPOINTS.TEACHER.SCHEDULE);
      const list = Array.isArray(data) ? data : (data?.results ?? []);
      if (list.length > 0) return list;
      throw new Error('Empty');
    } catch {
      return FALLBACK_SCHEDULE;
    }
  },

  /**
   * O'qituvchi statistikasi
   * Swagger: GET /analytics/overview/
   */
  getCourseStats: async (): Promise<{ label: string; value: number | string }[]> => {
    try {
      const data = await api.get<any>(API_ENDPOINTS.TEACHER.STATS);
      if (data && typeof data === 'object') {
        return [
          { label: 'Jami Talabalar', value: data.total_students ?? data.students_count ?? '-' },
          { label: "O'rtacha Ball", value: data.average_score ? `${data.average_score} Band` : '-' },
          { label: 'Topshirilgan Testlar', value: data.total_submissions ?? data.quizzes_count ?? '-' },
        ];
      }
      throw new Error('Empty');
    } catch {
      return [
        { label: 'Jami Talabalar', value: 142 },
        { label: "O'rtacha Ball", value: '7.5 Band' },
        { label: 'Topshirilgan Testlar', value: 580 }
      ];
    }
  }
};
