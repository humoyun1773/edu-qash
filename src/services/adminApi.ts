import { api } from './api';
import type { User, PaymentTransaction, Course, UserRole, PlatformAnalytics } from '../types';
import { API_ENDPOINTS } from '../api/apiEndpoints';

function mapUserFromBackend(u: any): User {
  if (!u) return {} as User;
  return {
    id: String(u.id || u.uuid || u.pk || `usr_${Math.random().toString(36).substring(2, 9)}`),
    name: u.name || u.full_name || [u.first_name, u.last_name].filter(Boolean).join(' ') || u.username || u.email || 'Foydalanuvchi',
    email: u.email || `${u.username || 'user'}@eduqash.uz`,
    phone: u.phone || u.phone_number || '+998 90 123 45 67',
    role: (u.role || u.requested_role || 'student') as UserRole,
    avatar: u.avatar || u.profile_image || null,
    isVerified: u.is_verified ?? u.is_approved ?? u.is_active ?? true,
    createdAt: u.created_at || u.date_joined || u.createdAt || 'Yaqinda'
  };
}

export const adminApi = {
  getUsers: async (): Promise<User[]> => {
    try {
      const res: any = await api.get(API_ENDPOINTS.ADMIN.USERS);
      // Django DRF paginated response: { count: N, results: [...] } or direct array [...]
      const rawList = Array.isArray(res) ? res : res?.results || res?.data || res?.users || [];
      if (Array.isArray(rawList)) {
        return rawList.map(mapUserFromBackend);
      }
      return [];
    } catch (err) {
      console.error('[adminApi] GET users error:', err);
      return [];
    }
  },

  createUser: async (user: { name: string; email: string; role: UserRole }): Promise<User> => {
    const res: any = await api.post(API_ENDPOINTS.ADMIN.USERS, user);
    return mapUserFromBackend(res.user || res);
  },

  updateUser: async (id: string, data: Partial<User>): Promise<User> => {
    const res: any = await api.patch(API_ENDPOINTS.ADMIN.USER_BY_ID(id), data);
    return mapUserFromBackend(res.user || res);
  },

  deleteUser: async (id: string): Promise<{ success: boolean }> => {
    await api.delete(API_ENDPOINTS.ADMIN.USER_BY_ID(id));
    return { success: true };
  },

  getPayments: async (): Promise<PaymentTransaction[]> => {
    try {
      const res: any = await api.get(API_ENDPOINTS.ADMIN.PAYMENTS);
      const rawList = Array.isArray(res) ? res : res?.results || res?.data || [];
      return Array.isArray(rawList) ? rawList : [];
    } catch (err) {
      console.error('[adminApi] GET payments error:', err);
      return [];
    }
  },

  getCourses: async (): Promise<Course[]> => {
    try {
      const res: any = await api.get(API_ENDPOINTS.ADMIN.COURSES);
      const rawList = Array.isArray(res) ? res : res?.results || res?.data || [];
      return Array.isArray(rawList) ? rawList : [];
    } catch (err) {
      console.error('[adminApi] GET courses error:', err);
      return [];
    }
  },

  getAnalytics: async (): Promise<PlatformAnalytics | null> => {
    try {
      const res: any = await api.get(API_ENDPOINTS.ADMIN.ANALYTICS);
      return res || null;
    } catch (err) {
      console.error('[adminApi] GET analytics error:', err);
      return null;
    }
  },

  blockUser: async (id: string): Promise<{ success: boolean }> => {
    await api.post(API_ENDPOINTS.ADMIN.USER_BLOCK(id), {});
    return { success: true };
  }
};
