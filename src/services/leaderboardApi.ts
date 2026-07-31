import { api } from './api';
import type { LearningCenter, LeaderboardStudent, LeaderboardTeacher, LeaderboardCourse } from '../types';

export type { LeaderboardStudent, LeaderboardTeacher, LeaderboardCourse };

export const leaderboardApi = {
  getTopStudents: async (): Promise<LeaderboardStudent[]> => {
    try {
      const data: any = await api.get('/quizzes/leaderboard/');
      const list = Array.isArray(data) ? data : (data?.results ?? []);
      return Array.isArray(list) ? list : [];
    } catch {
      return [];
    }
  },

  getTopTeachers: async (): Promise<LeaderboardTeacher[]> => {
    try {
      const data: any = await api.get('/quizzes/leaderboard/');
      const list = Array.isArray(data) ? data : (data?.results ?? []);
      return Array.isArray(list) ? list : [];
    } catch {
      return [];
    }
  },

  getTopCenters: async (): Promise<LearningCenter[]> => {
    try {
      const data: any = await api.get('/centers/');
      const list = Array.isArray(data) ? data : (data?.results ?? []);
      return Array.isArray(list) ? list : [];
    } catch {
      return [];
    }
  },

  getTopCourses: async (): Promise<LeaderboardCourse[]> => {
    try {
      const data: any = await api.get('/courses/');
      const list = Array.isArray(data) ? data : (data?.results ?? []);
      return Array.isArray(list) ? list : [];
    } catch {
      return [];
    }
  }
};
