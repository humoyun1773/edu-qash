import { api } from './api';
import type { AppNotification } from '../context/NotificationContext';

export interface BackendNotification {
  id: string;
  title: string;
  message?: string;
  body?: string;
  notification_type?: string;
  type?: string;
  is_read?: boolean;
  read?: boolean;
  created_at?: string;
  date?: string;
}

function mapNotification(n: BackendNotification): AppNotification {
  return {
    id: String(n.id || `n_${Math.random().toString(36).substring(2, 9)}`),
    title: n.title || 'Bildirishnoma',
    message: n.message || n.body || '',
    type: (n.notification_type || n.type || 'system') as any,
    date: n.created_at || n.date || 'Hozir',
    read: n.is_read ?? n.read ?? false
  };
}

export const notificationsApi = {
  getNotifications: async (): Promise<AppNotification[]> => {
    try {
      const res: any = await api.get('/notifications/');
      const rawList = Array.isArray(res) ? res : res?.results || res?.data || [];
      if (Array.isArray(rawList)) {
        return rawList.map(mapNotification);
      }
      return [];
    } catch (err) {
      console.error('[notificationsApi] GET error:', err);
      return [];
    }
  },

  markAllAsRead: async (): Promise<boolean> => {
    try {
      await api.post('/notifications/mark_all_read/', {});
      return true;
    } catch (err) {
      console.error('[notificationsApi] markAllAsRead error:', err);
      return false;
    }
  },

  markAsRead: async (id: string): Promise<boolean> => {
    try {
      await api.post(`/notifications/${id}/mark_as_read/`, {});
      return true;
    } catch (err) {
      console.error('[notificationsApi] markAsRead error:', err);
      return false;
    }
  }
};
