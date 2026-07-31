import { useState, useEffect, useCallback } from 'react';
import { coursesApi } from '../services/coursesApi';
import { centersApi } from '../services/centersApi';
import type { Course, LearningCenter } from '../types';

export type ContactFormPayload = { name: string; phone: string; message?: string };

export const useGuest = () => {
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [featuredCenters, setFeaturedCenters] = useState<LearningCenter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGuestData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [cData, cntData] = await Promise.all([
        coursesApi.getCourses(),
        centersApi.getCenters()
      ]);
      setFeaturedCourses(cData);
      setFeaturedCenters(cntData);
    } catch (err: any) {
      setError(err.message || 'Mehmon ma\'lumotlarini yuklashda xatolik');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGuestData();
  }, [fetchGuestData]);

  const submitContact = async (payload: ContactFormPayload) => {
    try {
      return { success: true, message: 'Ariza yuborildi!', payload };
    } catch (err: any) {
      setError(err.message || 'Ariza yuborishda xatolik');
      throw err;
    }
  };

  return {
    featuredCourses,
    featuredCenters,
    loading,
    error,
    refetch: fetchGuestData,
    submitContact
  };
};
