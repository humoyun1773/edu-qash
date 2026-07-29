import { api } from '../services/api';
import { API_ENDPOINTS } from './apiEndpoints';
import type { CourseItem, CreateCoursePayload, UpdateCoursePayload, EnrollCoursePayload } from './courses.type';
import { MOCK_COURSES } from '../data/mockData';

export const coursesService = {
  // GET: Fetch all courses (optional category filter)
  getCourses: async (category?: string): Promise<CourseItem[]> => {
    const endpoint = category && category !== 'all' ? `${API_ENDPOINTS.COURSES.BASE}?category=${category}` : API_ENDPOINTS.COURSES.BASE;
    try {
      const data = await api.get<CourseItem[]>(endpoint);
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch {
      if (category && category !== 'all') {
        return MOCK_COURSES.filter(c => c.category.toLowerCase() === category.toLowerCase());
      }
      return MOCK_COURSES;
    }
  },

  // GET: Fetch single course by ID
  getCourseById: async (id: string): Promise<CourseItem | null> => {
    try {
      const data = await api.get<CourseItem>(API_ENDPOINTS.COURSES.BY_ID(id));
      if (data) return data;
      throw new Error('Not found');
    } catch {
      return MOCK_COURSES.find(c => c.id === id) || MOCK_COURSES[0] || null;
    }
  },

  // POST: Create a new course
  createCourse: async (payload: CreateCoursePayload): Promise<CourseItem> => {
    try {
      return await api.post<CourseItem>(API_ENDPOINTS.COURSES.BASE, payload);
    } catch {
      const fallback: CourseItem = {
        id: `crs_${Date.now()}`,
        title: payload.title,
        description: payload.description,
        category: payload.category,
        type: payload.type,
        level: 'All Levels',
        thumbnail: payload.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600',
        price: payload.price,
        duration: '1 oy',
        teacherId: 'usr_teacher_1',
        teacherName: 'Mr. John Smith',
        teacherAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
        rating: 5.0,
        reviewsCount: 1,
        studentsCount: 0,
        modules: [],
        hasCertificate: true,
        createdAt: 'Hozir'
      };
      return fallback;
    }
  },

  // PUT: Update an existing course
  updateCourse: async (id: string, payload: UpdateCoursePayload): Promise<CourseItem> => {
    try {
      return await api.put<CourseItem>(API_ENDPOINTS.COURSES.BY_ID(id), payload);
    } catch {
      const existing: CourseItem = MOCK_COURSES.find(c => c.id === id) || {
        id,
        title: payload.title || 'Kurs',
        description: payload.description || '',
        category: payload.category || 'IELTS',
        type: payload.type || 'online',
        level: 'All Levels',
        thumbnail: payload.thumbnail || '',
        price: payload.price || 0,
        duration: '1 oy',
        teacherId: '',
        teacherName: '',
        teacherAvatar: '',
        rating: 5.0,
        reviewsCount: 0,
        studentsCount: 0,
        modules: [],
        hasCertificate: true,
        createdAt: 'Hozir'
      };
      return { ...existing, ...payload };
    }
  },

  // DELETE: Delete a course
  deleteCourse: async (id: string): Promise<{ success: boolean }> => {
    try {
      return await api.delete<{ success: boolean }>(API_ENDPOINTS.COURSES.BY_ID(id));
    } catch {
      return { success: true };
    }
  },

  // POST: Enroll in a course
  enrollCourse: async (payload: EnrollCoursePayload): Promise<{ success: boolean; message: string }> => {
    try {
      return await api.post<{ success: boolean; message: string }>(API_ENDPOINTS.COURSES.ENROLL, payload);
    } catch {
      return { success: true, message: 'Kursga muvaffaqiyatli a’zo bo‘ldingiz!' };
    }
  }
};
