import { useState, useEffect, useCallback } from 'react';
import { centerOwnerService } from '../constants/centerOwner.service';
import type { LearningCenterItem } from '../constants/centers.type';
import type { CenterTeacherItem, BranchRevenueData, UpdateCenterProfilePayload, AddCenterTeacherPayload } from '../constants/centerOwner.type';
import { getCached, setCached } from './useLocalCache';

const CACHE_KEY_PROFILE = 'center_owner_profile';
const CACHE_KEY_TEACHERS = 'center_owner_teachers';
const CACHE_KEY_REVENUE = 'center_owner_revenue';

export const useCenterOwner = (centerId?: string) => {
  const [profile, setProfile] = useState<LearningCenterItem | null>(() => getCached<LearningCenterItem | null>(CACHE_KEY_PROFILE, null));
  const [teachers, setTeachers] = useState<CenterTeacherItem[]>(() => getCached<CenterTeacherItem[]>(CACHE_KEY_TEACHERS, []));
  const [revenue, setRevenue] = useState<BranchRevenueData | null>(() => getCached<BranchRevenueData | null>(CACHE_KEY_REVENUE, null));
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCenterOwnerData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [pData, tData, rData] = await Promise.all([
        centerOwnerService.getProfile(centerId),
        centerOwnerService.getTeachers(centerId),
        centerOwnerService.getRevenueData(centerId)
      ]);
      setProfile(pData);
      setTeachers(tData);
      setRevenue(rData);
      setCached(CACHE_KEY_PROFILE, pData);
      setCached(CACHE_KEY_TEACHERS, tData);
      setCached(CACHE_KEY_REVENUE, rData);
    } catch (err: any) {
      setError(err.message || "Markaz rahbari ma'lumotlarini yuklashda xatolik");
    } finally {
      setLoading(false);
    }
  }, [centerId]);

  useEffect(() => {
    fetchCenterOwnerData();
  }, [fetchCenterOwnerData]);

  const updateProfile = async (payload: UpdateCenterProfilePayload) => {
    try {
      const updated = await centerOwnerService.updateProfile(centerId || 'center_1', payload);
      setProfile(updated);
      setCached(CACHE_KEY_PROFILE, updated);
      return updated;
    } catch (err: any) {
      setError(err.message || 'Markaz profilini yangilashda xatolik');
      throw err;
    }
  };

  const addTeacher = async (payload: AddCenterTeacherPayload) => {
    try {
      const created = await centerOwnerService.addTeacher(centerId || 'center_1', payload);
      setTeachers(prev => {
        const updated = [created, ...prev];
        setCached(CACHE_KEY_TEACHERS, updated);
        return updated;
      });
      return created;
    } catch (err: any) {
      setError(err.message || "O'qituvchi qo'shishda xatolik");
      throw err;
    }
  };

  const removeTeacher = async (teacherId: string) => {
    try {
      await centerOwnerService.removeTeacher(centerId || 'center_1', teacherId);
      setTeachers(prev => {
        const updated = prev.filter(t => t.id !== teacherId);
        setCached(CACHE_KEY_TEACHERS, updated);
        return updated;
      });
    } catch (err: any) {
      setError(err.message || "O'qituvchini o'chirishda xatolik");
      throw err;
    }
  };

  return {
    profile,
    teachers,
    revenue,
    loading,
    error,
    refetch: fetchCenterOwnerData,
    updateProfile,
    addTeacher,
    removeTeacher
  };
};
