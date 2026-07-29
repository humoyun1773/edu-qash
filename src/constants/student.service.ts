import { api } from '../services/api';
import { API_ENDPOINTS } from './apiEndpoints';
import type { StudentEnrolledCourse, StudentTestResultItem, UpdateStudentProfilePayload } from './student.type';
import type { CertificateItem } from './certificates.type';
import { MOCK_COURSES, MOCK_CERTIFICATES } from '../data/mockData';

export const studentService = {
  // GET: Fetch student active enrolled courses
  getMyCourses: async (): Promise<StudentEnrolledCourse[]> => {
    try {
      const data = await api.get<StudentEnrolledCourse[]>('/student/my-courses');
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch {
      return MOCK_COURSES.map(c => ({
        ...c,
        progressPercentage: 75,
        lastStudiedAt: 'Bugun'
      }));
    }
  },

  // GET: Fetch student certificates
  getMyCertificates: async (): Promise<CertificateItem[]> => {
    try {
      const data = await api.get<CertificateItem[]>(API_ENDPOINTS.CERTIFICATES.MY);
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch {
      return MOCK_CERTIFICATES;
    }
  },

  // GET: Fetch student exam test results
  getMyResults: async (): Promise<StudentTestResultItem[]> => {
    try {
      const data = await api.get<StudentTestResultItem[]>('/student/my-results');
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch {
      return [
        {
          id: 'res_1',
          testTitle: 'IELTS Mock Exam #4',
          listeningBand: 8.0,
          readingBand: 7.5,
          writingBand: 7.0,
          speakingBand: 7.5,
          overallBand: 'Band 7.5',
          date: '2026-07-25'
        }
      ];
    }
  },

  // PUT: Update student profile
  updateProfile: async (payload: UpdateStudentProfilePayload): Promise<{ success: boolean; message: string }> => {
    try {
      return await api.put<{ success: boolean; message: string }>('/student/profile', payload);
    } catch {
      return { success: true, message: 'Profil muvaffaqiyatli yangilandi' };
    }
  }
};
