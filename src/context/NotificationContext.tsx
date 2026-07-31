import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { notificationsApi } from '../services/notificationsApi';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'telegram' | 'email' | 'sms' | 'system';
  date: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  loading: boolean;
  markAllAsRead: () => Promise<void>;
  addNotification: (notif: Omit<AppNotification, 'id' | 'date' | 'read'>) => void;
  refetch: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const data = await notificationsApi.getNotifications();
      setNotifications(data);
    } catch {
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    await notificationsApi.markAllAsRead();
  };

  const addNotification = (notif: Omit<AppNotification, 'id' | 'date' | 'read'>) => {
    const newN: AppNotification = {
      ...notif,
      id: `n_${Date.now()}`,
      date: 'Hozir',
      read: false
    };
    setNotifications((prev) => [newN, ...prev]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, loading, markAllAsRead, addNotification, refetch: fetchNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotification must be used within NotificationProvider');
  return context;
};
