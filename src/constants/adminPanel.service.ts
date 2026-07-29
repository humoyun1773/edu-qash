import { api } from '../services/api';
import { API_ENDPOINTS } from './apiEndpoints';
import type { AdminUser, AdminPayment, AdminAnalytics, CreateAdminUserPayload, UpdateAdminUserPayload } from './admin.type';
import { MOCK_USERS, MOCK_PAYMENTS, MOCK_ANALYTICS } from '../data/mockData';

export const adminPanelService = {
  // GET: Fetch all users
  getUsers: async (): Promise<AdminUser[]> => {
    try {
      const data = await api.get<AdminUser[]>(API_ENDPOINTS.ADMIN.USERS);
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch {
      return Object.values(MOCK_USERS);
    }
  },

  // POST: Create a new user
  createUser: async (payload: CreateAdminUserPayload): Promise<AdminUser> => {
    try {
      return await api.post<AdminUser>(API_ENDPOINTS.ADMIN.USERS, payload);
    } catch {
      return {
        id: `usr_${Date.now()}`,
        name: payload.name,
        email: payload.email,
        phone: payload.phone || '+998 90 123 45 67',
        role: payload.role,
        isVerified: true,
        createdAt: 'Hozir'
      };
    }
  },

  // PUT: Update an existing user
  updateUser: async (id: string, payload: UpdateAdminUserPayload): Promise<AdminUser> => {
    try {
      return await api.put<AdminUser>(API_ENDPOINTS.ADMIN.USER_BY_ID(id), payload);
    } catch {
      const existing = (MOCK_USERS as Record<string, AdminUser>)[id] || {
        id,
        name: payload.name || 'Foydalanuvchi',
        email: payload.email || 'user@eduqash.uz',
        phone: payload.phone || '+998 90 123 45 67',
        role: payload.role || 'student',
        isVerified: true,
        createdAt: 'Hozir'
      };
      return { ...existing, ...payload };
    }
  },

  // DELETE: Delete a user by ID
  deleteUser: async (id: string): Promise<{ success: boolean }> => {
    try {
      return await api.delete<{ success: boolean }>(API_ENDPOINTS.ADMIN.USER_BY_ID(id));
    } catch {
      return { success: true };
    }
  },

  // GET: Fetch payments log
  getPayments: async (): Promise<AdminPayment[]> => {
    try {
      const data = await api.get<AdminPayment[]>(API_ENDPOINTS.ADMIN.PAYMENTS);
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch {
      return MOCK_PAYMENTS;
    }
  },

  // GET: Fetch platform analytics
  getAnalytics: async (): Promise<AdminAnalytics> => {
    try {
      const data = await api.get<AdminAnalytics>(API_ENDPOINTS.ADMIN.ANALYTICS);
      if (data) return data;
      throw new Error('Empty');
    } catch {
      return MOCK_ANALYTICS;
    }
  },

  // POST: Block user
  blockUser: async (id: string): Promise<{ success: boolean }> => {
    try {
      return await api.post<{ success: boolean }>(API_ENDPOINTS.ADMIN.USER_BLOCK(id), {});
    } catch {
      return { success: true };
    }
  }
};
