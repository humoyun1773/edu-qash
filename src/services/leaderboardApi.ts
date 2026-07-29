import { api } from './api';
import type { LearningCenter, LeaderboardStudent, LeaderboardTeacher, LeaderboardCourse } from '../types';
import { MOCK_CENTERS } from '../data/mockData';

export type { LeaderboardStudent, LeaderboardTeacher, LeaderboardCourse };

const FALLBACK_STUDENTS: LeaderboardStudent[] = [
  { rank: 1, name: 'Shahzod Rashidov', score: 'IELTS Band 8.5', tests: 24, avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200' },
  { rank: 2, name: 'Madina Saidova', score: 'IELTS Band 8.0', tests: 19, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' },
  { rank: 3, name: 'Jasur Bekmurodov', score: 'SAT 1520', tests: 15, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' }
];

const FALLBACK_TEACHERS: LeaderboardTeacher[] = [
  { rank: 1, name: 'Mr. John Smith (IELTS 8.5)', subject: 'IELTS Masterclass', rating: 4.95, studentsCount: 520, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' },
  { rank: 2, name: 'Elena Rostova', subject: 'SAT Math 800', rating: 4.91, studentsCount: 380, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200' }
];

export const leaderboardApi = {
  getTopStudents: async (): Promise<LeaderboardStudent[]> => {
    try {
      const data = await api.get<LeaderboardStudent[]>('/leaderboard/students');
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch (err) {
      console.info('[leaderboardApi] GET /leaderboard/students fallback.');
      return FALLBACK_STUDENTS;
    }
  },

  getTopTeachers: async (): Promise<LeaderboardTeacher[]> => {
    try {
      const data = await api.get<LeaderboardTeacher[]>('/leaderboard/teachers');
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch (err) {
      console.info('[leaderboardApi] GET /leaderboard/teachers fallback.');
      return FALLBACK_TEACHERS;
    }
  },

  getTopCenters: async (): Promise<LearningCenter[]> => {
    try {
      const data = await api.get<LearningCenter[]>('/leaderboard/centers');
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch (err) {
      console.info('[leaderboardApi] GET /leaderboard/centers fallback.');
      return MOCK_CENTERS;
    }
  },

  getTopCourses: async (): Promise<LeaderboardCourse[]> => {
    try {
      const data = await api.get<LeaderboardCourse[]>('/leaderboard/courses');
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch (err) {
      console.info('[leaderboardApi] GET /leaderboard/courses fallback.');
      return [];
    }
  }
};
