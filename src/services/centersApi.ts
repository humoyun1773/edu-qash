import { api } from './api';
import type { LearningCenter } from '../types';
import { MOCK_CENTERS } from '../data/mockData';
import { API_ENDPOINTS } from '../api/apiEndpoints';

const mapDjangoCenterToLearningCenter = (raw: any): LearningCenter => {
  return {
    id: raw.id,
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
      if (rawList && rawList.length > 0) {
        return rawList.map(mapDjangoCenterToLearningCenter);
      }
      if (Array.isArray(rawList)) {
        return rawList.map(mapDjangoCenterToLearningCenter);
      }
      return MOCK_CENTERS;
    } catch {
      console.info(`[centersApi] GET ${endpoint} fallback.`);
      if (city && city !== 'all') {
        return MOCK_CENTERS.filter(c => c.city.toLowerCase() === city.toLowerCase());
      }
      return MOCK_CENTERS;
    }
  },

  getCenterById: async (id: string): Promise<LearningCenter | null> => {
    try {
      const data = await api.get<any>(API_ENDPOINTS.CENTERS.BY_ID(id));
      if (data) return mapDjangoCenterToLearningCenter(data);
      throw new Error('Not found');
    } catch {
      return MOCK_CENTERS.find(c => c.id === id) || MOCK_CENTERS[0] || null;
    }
  },

  createCenter: async (centerData: Partial<LearningCenter>): Promise<LearningCenter> => {
    try {
      const res = await api.post<any>(API_ENDPOINTS.CENTERS.BASE, centerData);
      return mapDjangoCenterToLearningCenter(res);
    } catch {
      const fallback: LearningCenter = {
        id: `center_${Date.now()}`,
        name: centerData.name || 'Yangi Markaz',
        logo: centerData.logo || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=200',
        cover: centerData.cover || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
        description: centerData.description || 'Markaz tavsifi',
        rating: 5.0,
        reviewsCount: 1,
        phone: centerData.phone || '+998 71 200 00 00',
        telegram: centerData.telegram || 'https://t.me/eduqash',
        instagram: centerData.instagram || 'https://instagram.com/eduqash',
        website: centerData.website || 'https://eduqash.uz',
        address: centerData.address || 'Toshkent sh.',
        city: centerData.city || 'Toshkent',
        mapCoords: { lat: 41.311081, lng: 69.240562 },
        workingHours: centerData.workingHours || '09:00 - 20:00',
        coursesCount: 1,
        teachersCount: 1,
        verified: true
      };
      return fallback;
    }
  },

  updateCenter: async (id: string, centerData: Partial<LearningCenter>): Promise<LearningCenter> => {
    try {
      const res = await api.put<any>(API_ENDPOINTS.CENTERS.BY_ID(id), centerData);
      return mapDjangoCenterToLearningCenter(res);
    } catch {
      const existing = MOCK_CENTERS.find(c => c.id === id) || MOCK_CENTERS[0];
      return { ...existing, ...centerData };
    }
  }
};
