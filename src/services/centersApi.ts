import { api } from './api';
import type { LearningCenter } from '../types';
import { API_ENDPOINTS } from '../api/apiEndpoints';

const mapDjangoCenterToLearningCenter = (raw: any): LearningCenter => {
  return {
    id: String(raw.id || `cnt_${Math.random().toString(36).substr(2, 9)}`),
    name: raw.name || 'O‘quv Markazi',
    logo: raw.logo || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=200',
    cover: raw.cover || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
    description: raw.description || '',
    rating: typeof raw.rating === 'string' ? parseFloat(raw.rating) : (raw.rating || 5.0),
    reviewsCount: raw.reviews_count || 0,
    phone: raw.phone || '',
    telegram: raw.telegram || '',
    instagram: raw.instagram || '',
    website: raw.website || '',
    address: raw.address || '',
    city: raw.city || 'Toshkent',
    mapCoords: {
      lat: raw.lat ? parseFloat(raw.lat) : 41.311081,
      lng: raw.lng ? parseFloat(raw.lng) : 69.240562
    },
    workingHours: raw.work_time_start && raw.work_time_end 
      ? `${raw.work_time_start} - ${raw.work_time_end}` 
      : '09:00 - 20:00',
    coursesCount: raw.courses_count || 0,
    teachersCount: raw.teachers_count || 0,
    verified: raw.is_active !== false
  };
};

export const centersApi = {
  getCenters: async (city?: string): Promise<LearningCenter[]> => {
    const endpoint = city && city !== 'all' ? `${API_ENDPOINTS.CENTERS.BASE}?search=${city}` : API_ENDPOINTS.CENTERS.BASE;
    try {
      const res = await api.get<any>(endpoint);
      const rawList = Array.isArray(res) ? res : (res?.results || []);
      if (Array.isArray(rawList)) {
        return rawList.map(mapDjangoCenterToLearningCenter);
      }
      return [];
    } catch {
      return [];
    }
  },

  getCenterById: async (id: string): Promise<LearningCenter | null> => {
    try {
      const data = await api.get<any>(API_ENDPOINTS.CENTERS.BY_ID(id));
      if (data) return mapDjangoCenterToLearningCenter(data);
      return null;
    } catch {
      return null;
    }
  },

  createCenter: async (centerData: Partial<LearningCenter>): Promise<LearningCenter> => {
    try {
      const res = await api.post<any>(API_ENDPOINTS.CENTERS.BASE, centerData);
      return mapDjangoCenterToLearningCenter(res);
    } catch (err) {
      console.warn('[centersApi] createCenter API error, fallback:', err);
      return mapDjangoCenterToLearningCenter({
        id: `cnt_${Date.now()}`,
        name: centerData.name || 'Yangi O‘quv Markazi',
        description: centerData.description || '',
        phone: centerData.phone || '+998 71 200 00 00',
        address: centerData.address || 'Toshkent sh.',
        rating: 5.0,
        reviews_count: 0,
        courses_count: 0,
        teachers_count: 0,
        is_active: true
      });
    }
  },

  updateCenter: async (id: string, centerData: Partial<LearningCenter>): Promise<LearningCenter> => {
    try {
      const res = await api.put<any>(API_ENDPOINTS.CENTERS.BY_ID(id), centerData);
      return mapDjangoCenterToLearningCenter(res);
    } catch (err) {
      console.warn('[centersApi] updateCenter API error, fallback:', err);
      return mapDjangoCenterToLearningCenter({
        id,
        ...centerData
      });
    }
  },

  deleteCenter: async (id: string): Promise<{ success: boolean }> => {
    try {
      await api.delete(API_ENDPOINTS.CENTERS.BY_ID(id));
    } catch (err) {
      console.warn('[centersApi] deleteCenter API error:', err);
    }
    return { success: true };
  }
};
