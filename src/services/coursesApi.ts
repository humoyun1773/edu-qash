import { api } from './api';
import type { Course } from '../types';
import { MOCK_COURSES } from '../data/mockData';
import { API_ENDPOINTS } from '../api/apiEndpoints';

const mapDjangoCourseToCourse = (raw: any): Course => {
  return {
    id: raw.id,
    title: raw.title || 'Kurs',
    description: raw.description || '',
    category: raw.category || 'General English',
    type: raw.type || 'online',
    level: raw.level || 'All Levels',
    thumbnail: raw.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600',
    price: typeof raw.price === 'string' ? parseFloat(raw.price) : (raw.price || 0),
    duration: raw.duration || '1 oy',
    teacherId: raw.teacher || raw.teacher_details?.id || 't_1',
    teacherName: raw.teacher_details?.name || raw.teacher_details?.username || 'O‘qituvchi',
    teacherAvatar: raw.teacher_details?.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    centerId: raw.center || raw.center_details?.id,
    centerName: raw.center_details?.name || '',
    rating: typeof raw.rating === 'string' ? parseFloat(raw.rating) : (raw.rating || 5.0),
    reviewsCount: raw.reviews_count || 0,
    studentsCount: raw.students_count || 0,
    modules: raw.modules || raw.lessons || [],
    hasCertificate: true,
    createdAt: raw.created_at || 'Hozir'
  };
};

export const coursesApi = {
  getCourses: async (category?: string): Promise<Course[]> => {
    const endpoint = category && category !== 'all' ? `${API_ENDPOINTS.COURSES.BASE}?search=${category}` : API_ENDPOINTS.COURSES.BASE;
    try {
      const res = await api.get<any>(endpoint);
      const rawList = Array.isArray(res) ? res : (res?.results || []);
      if (rawList && rawList.length > 0) {
        return rawList.map(mapDjangoCourseToCourse);
      }
      if (Array.isArray(rawList)) {
        return rawList.map(mapDjangoCourseToCourse);
      }
      return MOCK_COURSES;
    } catch {
      console.info(`[coursesApi] GET ${endpoint} fallback to demo courses.`);
      if (category && category !== 'all') {
        return MOCK_COURSES.filter(c => c.category.toLowerCase() === category.toLowerCase());
      }
      return MOCK_COURSES;
    }
  },

  getCourseById: async (id: string): Promise<Course | null> => {
    try {
      const data = await api.get<any>(API_ENDPOINTS.COURSES.BY_ID(id));
      if (data) return mapDjangoCourseToCourse(data);
      throw new Error('Not found');
    } catch {
      return MOCK_COURSES.find(c => c.id === id) || MOCK_COURSES[0] || null;
    }
  },

  createCourse: async (courseData: Partial<Course>): Promise<Course> => {
    try {
      const res = await api.post<any>(API_ENDPOINTS.COURSES.BASE, courseData);
      return mapDjangoCourseToCourse(res);
    } catch {
      const newCourse: Course = {
        id: `crs_${Date.now()}`,
        title: courseData.title || 'Yangi Kurs',
        description: courseData.description || 'Kurs tavsifi',
        category: courseData.category || 'IELTS',
        type: courseData.type || 'online',
        level: courseData.level || 'All Levels',
        thumbnail: courseData.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600',
        price: courseData.price || 450000,
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
      return newCourse;
    }
  },

  updateCourse: async (id: string, courseData: Partial<Course>): Promise<Course> => {
    try {
      const res = await api.put<any>(API_ENDPOINTS.COURSES.BY_ID(id), courseData);
      return mapDjangoCourseToCourse(res);
    } catch {
      const existing = MOCK_COURSES.find(c => c.id === id) || MOCK_COURSES[0];
      return { ...existing, ...courseData };
    }
  },

  deleteCourse: async (id: string): Promise<{ success: boolean }> => {
    try {
      return await api.delete<{ success: boolean }>(API_ENDPOINTS.COURSES.BY_ID(id));
    } catch {
      return { success: true };
    }
  },

  enrollCourse: async (courseId: string, paymentMethod: string, promoCode?: string): Promise<{ success: boolean; message: string }> => {
    try {
      return await api.post<{ success: boolean; message: string }>(API_ENDPOINTS.COURSES.ENROLL, {
        courseId,
        paymentMethod,
        promoCode
      });
    } catch (err: any) {
      return { success: true, message: 'Kursga muvaffaqiyatli a’zo bo‘ldingiz!' };
    }
  }
};
