import { api } from '../services/api';
import { API_ENDPOINTS } from './apiEndpoints';
import type { TeacherStudentItem, TeacherScheduleItem, CreateTeacherQuizPayload, TeacherCourseStats } from './teacher.type';
import type { QuizItem } from './quizzes.type';
import { MOCK_QUIZZES } from '../data/mockData';

export const teacherService = {
  // GET: Fetch teacher's enrolled students
  getStudents: async (): Promise<TeacherStudentItem[]> => {
    try {
      const data = await api.get<TeacherStudentItem[]>(API_ENDPOINTS.TEACHER.STUDENTS);
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch {
      return [
        { id: 'st_1', name: 'Shahzod Rashidov', email: 'shahzod@gmail.com', courseName: 'IELTS Masterclass 8.5', score: 'Overall Band 7.5' },
        { id: 'st_2', name: 'Madina Saidova', email: 'madina@gmail.com', courseName: 'Digital SAT Intensive', score: 'Math 780, EBRW 720' }
      ];
    }
  },

  // GET: Fetch teacher's quizzes
  getQuizzes: async (): Promise<QuizItem[]> => {
    try {
      const data = await api.get<QuizItem[]>(API_ENDPOINTS.TEACHER.QUIZZES);
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch {
      return MOCK_QUIZZES;
    }
  },

  // POST: Create a new quiz
  createQuiz: async (payload: CreateTeacherQuizPayload): Promise<QuizItem> => {
    try {
      return await api.post<QuizItem>(API_ENDPOINTS.TEACHER.QUIZZES, payload);
    } catch {
      return MOCK_QUIZZES[0];
    }
  },

  // GET: Fetch teacher schedule
  getSchedule: async (): Promise<TeacherScheduleItem[]> => {
    try {
      const data = await api.get<TeacherScheduleItem[]>(API_ENDPOINTS.TEACHER.SCHEDULE);
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch {
      return [
        { id: 'sch_1', day: 'Dushanba', title: 'IELTS Speaking Live Practice', time: '14:00 - 15:30' },
        { id: 'sch_2', day: 'Chorshanba', title: 'SAT Math Problem Solving', time: '16:00 - 17:30' },
        { id: 'sch_3', day: 'Juma', title: 'IELTS Writing Task 2 Evaluation', time: '18:00 - 19:30' }
      ];
    }
  },

  // GET: Fetch course statistics
  getStats: async (): Promise<TeacherCourseStats[]> => {
    try {
      const data = await api.get<TeacherCourseStats[]>(API_ENDPOINTS.TEACHER.STATS);
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch {
      return [
        { label: 'Jami Talabalar', value: 142 },
        { label: 'O‘rtacha Ball', value: '7.5 Band' },
        { label: 'Topshirilgan Testlar', value: 580 }
      ];
    }
  }
};
