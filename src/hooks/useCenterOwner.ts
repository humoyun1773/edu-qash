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

const MOCK_TEACHERS: CenterTeacherItem[] = [
  { id: 't1', name: 'Sardorbek Rahimov', subject: 'IELTS Lead Instructor', phone: '+998 90 123 45 67' },
  { id: 't2', name: 'Malika Sharipova', subject: 'SAT Math Specialist', phone: '+998 93 987 65 43' }
];

const MOCK_REVENUE: BranchRevenueData = {
  totalRevenue: 145000000,
  monthlyRevenue: 28500000,
  totalMonthly: 28500000,
  activeStudents: 340
};

export const useCenterOwner = (centerId?: string) => {
  const [profile, setProfile] = useState<LearningCenter | null>(() => getCached<LearningCenter | null>(CACHE_KEY_PROFILE, null));
  const [teachers, setTeachers] = useState<CenterTeacherItem[]>(() => getCached<CenterTeacherItem[]>(CACHE_KEY_TEACHERS, MOCK_TEACHERS));
  const [revenue, setRevenue] = useState<BranchRevenueData | null>(() => getCached<BranchRevenueData | null>(CACHE_KEY_REVENUE, MOCK_REVENUE));
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCenterOwnerData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const pData = await centersApi.getCenterById(centerId || 'center_1');
      if (pData) {
        setProfile(pData);
        setCached(CACHE_KEY_PROFILE, pData);
      }
      setRevenue(MOCK_REVENUE);
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
      const updated = await centersApi.updateCenter(centerId || 'center_1', payload);
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
      const created: CenterTeacherItem = {
        id: `t_${Date.now()}`,
        name: payload.name,
        subject: payload.subject,
        phone: payload.phone
      };
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
