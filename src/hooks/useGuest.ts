import { useState, useEffect, useCallback } from 'react';
import { guestService } from '../constants/guest.service';
import type { GuestFeaturedCourse, GuestFeaturedCenter, ContactFormPayload } from '../constants/guest.type';

export const useGuest = () => {
  const [featuredCourses, setFeaturedCourses] = useState<GuestFeaturedCourse[]>([]);
  const [featuredCenters, setFeaturedCenters] = useState<GuestFeaturedCenter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGuestData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [cData, cntData] = await Promise.all([
        guestService.getFeaturedCourses(),
        guestService.getFeaturedCenters()
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
      return await guestService.submitContactForm(payload);
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
