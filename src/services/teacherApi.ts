import { api } from './api';
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
  getStudents: async (): Promise<StudentProgress[]> => {
    try {
      const data = await api.get<StudentProgress[]>('/teacher/students');
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch (err) {
      console.info('[teacherApi] GET /teacher/students fallback.');
      return FALLBACK_STUDENTS;
    }
  },

  createQuiz: async (quiz: { title: string; category: string; durationMinutes: number }): Promise<Quiz> => {
    try {
      return await api.post<Quiz>('/teacher/quizzes', quiz);
    } catch {
      return MOCK_QUIZZES[0];
    }
  },

  getQuizzes: async (): Promise<Quiz[]> => {
    try {
      const data = await api.get<Quiz[]>('/teacher/quizzes');
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch (err) {
      console.info('[teacherApi] GET /teacher/quizzes fallback.');
      return MOCK_QUIZZES;
    }
  },

  getSchedule: async (): Promise<TeacherScheduleItem[]> => {
    try {
      const data = await api.get<TeacherScheduleItem[]>('/teacher/schedule');
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch (err) {
      console.info('[teacherApi] GET /teacher/schedule fallback.');
      return FALLBACK_SCHEDULE;
    }
  },

  getCourseStats: async (): Promise<{ label: string; value: number | string }[]> => {
    try {
      const data = await api.get<{ label: string; value: number | string }[]>('/teacher/stats');
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch (err) {
      return [
        { label: 'Jami Talabalar', value: 142 },
        { label: 'O‘rtacha Ball', value: '7.5 Band' },
        { label: 'Topshirilgan Testlar', value: 580 }
      ];
    }
  }
};
