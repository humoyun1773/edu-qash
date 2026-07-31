import { useState, useEffect, useCallback } from 'react';
import { centersApi } from '../services/centersApi';
import type { LearningCenter } from '../types';
import { getCached, setCached } from './useLocalCache';

export interface CenterTeacherItem {
  id: string;
  name: string;
  subject: string;
  phone?: string;
}

export interface BranchRevenueData {
  totalRevenue: number;
  monthlyRevenue: number;
  totalMonthly: number;
  activeStudents: number;
}

export type UpdateCenterProfilePayload = Partial<LearningCenter>;
export type AddCenterTeacherPayload = { name: string; subject: string; phone?: string };

const CACHE_KEY_PROFILE = 'center_owner_profile';
const CACHE_KEY_TEACHERS = 'center_owner_teachers';
const CACHE_KEY_REVENUE = 'center_owner_revenue';

export const useCenterOwner = (centerId?: string) => {
  const [profile, setProfile] = useState<LearningCenter | null>(() => getCached<LearningCenter | null>(CACHE_KEY_PROFILE, null));
  const [teachers, setTeachers] = useState<CenterTeacherItem[]>(() => getCached<CenterTeacherItem[]>(CACHE_KEY_TEACHERS, []));
  const [revenue] = useState<BranchRevenueData | null>(() => getCached<BranchRevenueData | null>(CACHE_KEY_REVENUE, null));
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCenterOwnerData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (centerId) {
        const pData = await centersApi.getCenterById(centerId);
        if (pData) {
          setProfile(pData);
          setCached(CACHE_KEY_PROFILE, pData);
        }
      }
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
    if (!profile?.id) return;
    try {
      const updated = await centersApi.updateCenter(profile.id, payload);
      setProfile(updated);
      setCached(CACHE_KEY_PROFILE, updated);
      return updated;
    } catch (err: any) {
      setError(err.message || 'Profilni yangilashda xatolik');
      throw err;
    }
  };

  const addTeacher = async (payload: AddCenterTeacherPayload) => {
    try {
      const newTeacher: CenterTeacherItem = {
        id: `t_${Date.now()}`,
        ...payload
      };
      setTeachers(prev => {
        const updated = [newTeacher, ...prev];
        setCached(CACHE_KEY_TEACHERS, updated);
        return updated;
      });
      return newTeacher;
    } catch (err: any) {
      setError(err.message || "O'qituvchi qo'shishda xatolik");
      throw err;
    }
  };

  const deleteTeacher = async (teacherId: string) => {
    try {
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
    updateProfile,
    addTeacher,
    deleteTeacher,
    removeTeacher: deleteTeacher,
    refetch: fetchCenterOwnerData
  };
};
