import { useState, useEffect, useCallback } from 'react';
import { centersApi } from '../services/centersApi';
import type { LearningCenter } from '../types';

export type CreateCenterPayload = Partial<LearningCenter>;
export type UpdateCenterPayload = Partial<LearningCenter>;

export const useCenters = (city?: string) => {
  const [centers, setCenters] = useState<LearningCenter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCenters = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await centersApi.getCenters(city);
      setCenters(data);
    } catch (err: any) {
      setError(err.message || 'Markazlarni yuklashda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  }, [city]);

  useEffect(() => {
    fetchCenters();
  }, [fetchCenters]);

  const createCenter = async (payload: CreateCenterPayload) => {
    try {
      const created = await centersApi.createCenter(payload);
      setCenters(prev => [created, ...prev]);
      return created;
    } catch (err: any) {
      setError(err.message || 'Markaz yaratishda xatolik');
      throw err;
    }
  };

  const updateCenter = async (id: string, payload: UpdateCenterPayload) => {
    try {
      const updated = await centersApi.updateCenter(id, payload);
      setCenters(prev => prev.map(c => c.id === id ? updated : c));
      return updated;
    } catch (err: any) {
      setError(err.message || 'Markazni yangilashda xatolik');
      throw err;
    }
  };

  const deleteCenter = async (id: string) => {
    try {
      setCenters(prev => prev.filter(c => c.id !== id));
    } catch (err: any) {
      setError(err.message || "Markazni o'chirishda xatolik");
      throw err;
    }
  };

  return {
    centers,
    loading,
    error,
    refetch: fetchCenters,
    createCenter,
    updateCenter,
    deleteCenter
  };
};
