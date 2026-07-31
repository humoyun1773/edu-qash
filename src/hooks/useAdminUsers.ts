import { useState, useEffect, useCallback } from 'react';
import { adminApi } from '../services/adminApi';
import type { User as AdminUser, PaymentTransaction as AdminPayment, PlatformAnalytics as AdminAnalytics, UserRole } from '../types';
import { getCached, setCached } from './useLocalCache';

export type CreateAdminUserPayload = { name: string; email: string; role: UserRole };
export type UpdateAdminUserPayload = Partial<AdminUser>;

const CACHE_KEY_USERS = 'admin_users';
const CACHE_KEY_DELETED_USERS = 'admin_deleted_user_ids';
const CACHE_KEY_PAYMENTS = 'admin_payments';
const CACHE_KEY_ANALYTICS = 'admin_analytics';

export const useAdminUsers = () => {
  const [users, setUsers] = useState<AdminUser[]>(() => {
    const cached = getCached<AdminUser[]>(CACHE_KEY_USERS, []);
    const deletedIds = new Set(getCached<string[]>(CACHE_KEY_DELETED_USERS, []));
    return cached.filter(u => !deletedIds.has(u.id));
  });
  const [payments, setPayments] = useState<AdminPayment[]>(() => getCached<AdminPayment[]>(CACHE_KEY_PAYMENTS, []));
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(() => getCached<AdminAnalytics | null>(CACHE_KEY_ANALYTICS, null));
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAdminData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [uData, pData, aData] = await Promise.all([
        adminApi.getUsers(),
        adminApi.getPayments(),
        adminApi.getAnalytics()
      ]);

      const cachedUsers = getCached<AdminUser[]>(CACHE_KEY_USERS, []);
      const deletedIds = new Set(getCached<string[]>(CACHE_KEY_DELETED_USERS, []));
      const mergedMap = new Map<string, AdminUser>();

      cachedUsers.forEach(u => {
        if (!deletedIds.has(u.id)) mergedMap.set(u.id, u);
      });
      uData.forEach(u => {
        if (!deletedIds.has(u.id)) mergedMap.set(u.id, u);
      });

      const mergedUsers = Array.from(mergedMap.values());
      setUsers(mergedUsers);
      setPayments(pData);
      setAnalytics(aData);
      setCached(CACHE_KEY_USERS, mergedUsers);
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
      const created = await adminApi.createUser(payload);
      setUsers(prev => {
        const updated = [created, ...prev];
        setCached(CACHE_KEY_USERS, updated);
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
      const updated = await adminApi.updateUser(id, payload);
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
      await adminApi.deleteUser(id);
      const deletedIds = getCached<string[]>(CACHE_KEY_DELETED_USERS, []);
      if (!deletedIds.includes(id)) {
        setCached(CACHE_KEY_DELETED_USERS, [...deletedIds, id]);
      }
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
      await adminApi.blockUser(id);
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
