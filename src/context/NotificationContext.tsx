import React, { createContext, useContext, useState } from 'react';

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
  markAllAsRead: () => void;
  addNotification: (notif: Omit<AppNotification, 'id' | 'date' | 'read'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'n1',
      title: 'Telegram Bot Ulangan!',
      message: '@EduqashBot rasmiy boti bilan hisobingiz muvaffaqiyatli bog‘landi.',
      type: 'telegram',
      date: 'Bugun 10:15',
      read: false
    },
    {
      id: 'n2',
      title: 'IELTS Writing Natijasi',
      message: 'Writing Task 2 inshoingiz AI yordamida baholandi. Band: 7.5.',
      type: 'system',
      date: 'Kecha 18:30',
      read: false
    },
    {
      id: 'n3',
      title: 'SMS Kod Yuborildi',
      message: 'SMS verification code sent to +998 99 *** 65 43',
      type: 'sms',
      date: '2 kun oldin',
      read: true
    }
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
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
    <NotificationContext.Provider value={{ notifications, unreadCount, markAllAsRead, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotification must be used within NotificationProvider');
  return context;
};
