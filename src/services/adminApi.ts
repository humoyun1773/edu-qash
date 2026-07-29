import { api } from './api';
import type { User, PaymentTransaction, Course, UserRole, PlatformAnalytics } from '../types';
import { MOCK_USERS, MOCK_PAYMENTS, MOCK_COURSES, MOCK_ANALYTICS } from '../data/mockData';
import { API_ENDPOINTS } from '../api/apiEndpoints';

export const adminApi = {
  getUsers: async (): Promise<User[]> => {
    try {
      const data = await api.get<User[]>(API_ENDPOINTS.ADMIN.USERS);
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch (err) {
      console.info('[adminApi] GET users fallback.');
      return Object.values(MOCK_USERS);
    }
  },

  createUser: async (user: { name: string; email: string; role: UserRole }): Promise<User> => {
    try {
      return await api.post<User>(API_ENDPOINTS.ADMIN.USERS, user);
    } catch {
      return {
        id: `usr_${Date.now()}`,
        name: user.name,
        email: user.email,
        phone: '+998 90 123 45 67',
        role: user.role,
        isVerified: true,
        createdAt: 'Hozir'
      };
    }
  },

  updateUser: async (id: string, data: Partial<User>): Promise<User> => {
    try {
      return await api.put<User>(API_ENDPOINTS.ADMIN.USER_BY_ID(id), data);
    } catch {
      const existing = MOCK_USERS[id] || Object.values(MOCK_USERS)[0];
      return { ...existing, ...data };
    }
  },

  deleteUser: async (id: string): Promise<{ success: boolean }> => {
    try {
      return await api.delete<{ success: boolean }>(API_ENDPOINTS.ADMIN.USER_BY_ID(id));
    } catch (err) {
      return { success: true };
    }
  },

  getPayments: async (): Promise<PaymentTransaction[]> => {
    try {
      const data = await api.get<PaymentTransaction[]>(API_ENDPOINTS.ADMIN.PAYMENTS);
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch (err) {
      console.info('[adminApi] GET payments fallback.');
      return MOCK_PAYMENTS;
    }
  },

  getCourses: async (): Promise<Course[]> => {
    try {
      const data = await api.get<Course[]>(API_ENDPOINTS.ADMIN.COURSES);
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch (err) {
      console.info('[adminApi] GET courses fallback.');
      return MOCK_COURSES;
    }
  },

  getAnalytics: async (): Promise<PlatformAnalytics | null> => {
    try {
      const data = await api.get<PlatformAnalytics>(API_ENDPOINTS.ADMIN.ANALYTICS);
      if (data) return data;
      throw new Error('Empty');
    } catch (err) {
      console.info('[adminApi] GET analytics fallback.');
      return MOCK_ANALYTICS;
    }
  },

  blockUser: async (id: string): Promise<{ success: boolean }> => {
    try {
      return await api.post<{ success: boolean }>(API_ENDPOINTS.ADMIN.USER_BLOCK(id), {});
    } catch (err) {
      return { success: true };
    }
  }
};
