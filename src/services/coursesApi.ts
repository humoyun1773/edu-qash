import { api } from './api';
import type { Course } from '../types';
import { API_ENDPOINTS } from '../api/apiEndpoints';

const mapDjangoCourseToCourse = (raw: any): Course => {
  return {
    id: String(raw.id || `crs_${Math.random().toString(36).substr(2, 9)}`),
    title: raw.title || 'Kurs',
    description: raw.description || '',
    category: raw.category || 'General English',
    type: raw.type || 'online',
    level: raw.level || 'All Levels',
    thumbnail: raw.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600',
    price: typeof raw.price === 'string' ? parseFloat(raw.price) : (raw.price || 0),
    duration: raw.duration || '1 oy',
    teacherId: String(raw.teacher || raw.teacher_details?.id || 't_1'),
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
      if (Array.isArray(rawList)) {
        return rawList.map(mapDjangoCourseToCourse);
      }
      return [];
    } catch {
      return [];
    }
  },

  getCourseById: async (id: string): Promise<Course | null> => {
    try {
      const data = await api.get<any>(API_ENDPOINTS.COURSES.BY_ID(id));
      if (data) return mapDjangoCourseToCourse(data);
      return null;
    } catch {
      return null;
    }
  },

  createCourse: async (courseData: Partial<Course>): Promise<Course> => {
    const res = await api.post<any>(API_ENDPOINTS.COURSES.BASE, courseData);
    return mapDjangoCourseToCourse(res);
  },

  updateCourse: async (id: string, courseData: Partial<Course>): Promise<Course> => {
    const res = await api.put<any>(API_ENDPOINTS.COURSES.BY_ID(id), courseData);
    return mapDjangoCourseToCourse(res);
  },

  deleteCourse: async (id: string): Promise<{ success: boolean }> => {
    await api.delete(API_ENDPOINTS.COURSES.BY_ID(id));
    return { success: true };
  },

  enrollCourse: async (courseId: string, _paymentMethod?: string, _promoCode?: string): Promise<{ success: boolean; message: string }> => {
    const res = await api.post<any>(API_ENDPOINTS.COURSES.ENROLL, { courseId });
    return { success: true, message: res?.message || 'Azo bo\'lindi' };
  }
};
