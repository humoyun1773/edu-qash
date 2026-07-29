import { useState, useEffect, useCallback } from 'react';
import { adminPanelService } from '../constants/adminPanel.service';
import type { AdminUser, AdminPayment, AdminAnalytics, CreateAdminUserPayload, UpdateAdminUserPayload } from '../constants/admin.type';
import { getCached, setCached } from './useLocalCache';

// Cache kalitlari
const CACHE_KEY_USERS = 'admin_users';
const CACHE_KEY_PAYMENTS = 'admin_payments';
const CACHE_KEY_ANALYTICS = 'admin_analytics';

export const useAdminUsers = () => {
  const [users, setUsers] = useState<AdminUser[]>(() => getCached<AdminUser[]>(CACHE_KEY_USERS, []));
  const [payments, setPayments] = useState<AdminPayment[]>(() => getCached<AdminPayment[]>(CACHE_KEY_PAYMENTS, []));
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(() => getCached<AdminAnalytics | null>(CACHE_KEY_ANALYTICS, null));
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAdminData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [uData, pData, aData] = await Promise.all([
        adminPanelService.getUsers(),
        adminPanelService.getPayments(),
        adminPanelService.getAnalytics()
      ]);
      setUsers(uData);
      setPayments(pData);
      setAnalytics(aData);
      // API dan kelgan ma'lumotlarni cache ga saqlash
      setCached(CACHE_KEY_USERS, uData);
      setCached(CACHE_KEY_PAYMENTS, pData);
      setCached(CACHE_KEY_ANALYTICS, aData);
    } catch (err: any) {
      setError(err.message || "Admin paneli ma'lumotlarini yuklashda xatolik");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  const createUser = async (payload: CreateAdminUserPayload) => {
    try {
      const created = await adminPanelService.createUser(payload);
      setUsers(prev => {
        const updated = [created, ...prev];
        setCached(CACHE_KEY_USERS, updated); // Cache yangilash
        return updated;
      });
      return created;
    } catch (err: any) {
      setError(err.message || 'Foydalanuvchi yaratishda xatolik');
      throw err;
    }
  };

  const updateUser = async (id: string, payload: UpdateAdminUserPayload) => {
    try {
      const updated = await adminPanelService.updateUser(id, payload);
      setUsers(prev => {
        const newList = prev.map(u => u.id === id ? updated : u);
        setCached(CACHE_KEY_USERS, newList);
        return newList;
      });
      return updated;
    } catch (err: any) {
      setError(err.message || "Foydalanuvchini yangilashda xatolik");
      throw err;
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await adminPanelService.deleteUser(id);
      setUsers(prev => {
        const newList = prev.filter(u => u.id !== id);
        setCached(CACHE_KEY_USERS, newList);
        return newList;
      });
    } catch (err: any) {
      setError(err.message || "Foydalanuvchini o'chirishda xatolik");
      throw err;
    }
  };

  const blockUser = async (id: string) => {
    try {
      await adminPanelService.blockUser(id);
    } catch (err: any) {
      setError(err.message || 'Foydalanuvchini bloklashda xatolik');
      throw err;
    }
  };

  return {
    users,
    payments,
    analytics,
    loading,
    error,
    refetch: fetchAdminData,
    createUser,
    updateUser,
    deleteUser,
    blockUser
  };
};
