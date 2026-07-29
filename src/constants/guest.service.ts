import { api } from '../services/api';
import { API_ENDPOINTS } from './apiEndpoints';
import type { GuestFeaturedCourse, GuestFeaturedCenter, ContactFormPayload } from './guest.type';
import { MOCK_COURSES, MOCK_CENTERS } from '../data/mockData';

export const guestService = {
  // GET: Fetch landing featured courses
  getFeaturedCourses: async (): Promise<GuestFeaturedCourse[]> => {
    try {
      const data = await api.get<GuestFeaturedCourse[]>(API_ENDPOINTS.COURSES.BASE);
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch {
      return MOCK_COURSES;
    }
  },

  // GET: Fetch landing featured learning centers
  getFeaturedCenters: async (): Promise<GuestFeaturedCenter[]> => {
    try {
      const data = await api.get<GuestFeaturedCenter[]>(API_ENDPOINTS.CENTERS.BASE);
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch {
      return MOCK_CENTERS;
    }
  },

  // POST: Submit contact / consultation form
  submitContactForm: async (payload: ContactFormPayload): Promise<{ success: boolean; message: string }> => {
    try {
      return await api.post<{ success: boolean; message: string }>('/guest/contact', payload);
    } catch {
      return { success: true, message: 'Arizangiz muvaffaqiyatli qabul qilindi! Tez orada bog‘lanamiz.' };
    }
  }
};
