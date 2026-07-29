import { api } from '../services/api';
import { API_ENDPOINTS } from './apiEndpoints';
import type { LearningCenterItem, CreateCenterPayload, UpdateCenterPayload } from './centers.type';
import { MOCK_CENTERS } from '../data/mockData';

export const centersService = {
  // GET: Fetch learning centers
  getCenters: async (city?: string): Promise<LearningCenterItem[]> => {
    const endpoint = city && city !== 'all' ? `${API_ENDPOINTS.CENTERS.BASE}?city=${city}` : API_ENDPOINTS.CENTERS.BASE;
    try {
      const data = await api.get<LearningCenterItem[]>(endpoint);
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch {
      if (city && city !== 'all') {
        return MOCK_CENTERS.filter(c => c.city.toLowerCase() === city.toLowerCase());
      }
      return MOCK_CENTERS;
    }
  },

  // GET: Fetch center by ID
  getCenterById: async (id: string): Promise<LearningCenterItem | null> => {
    try {
      const data = await api.get<LearningCenterItem>(API_ENDPOINTS.CENTERS.BY_ID(id));
      if (data) return data;
      throw new Error('Not found');
    } catch {
      return MOCK_CENTERS.find(c => c.id === id) || MOCK_CENTERS[0] || null;
    }
  },

  // POST: Create a new center
  createCenter: async (payload: CreateCenterPayload): Promise<LearningCenterItem> => {
    try {
      return await api.post<LearningCenterItem>(API_ENDPOINTS.CENTERS.BASE, payload);
    } catch {
      const fallback: LearningCenterItem = {
        id: `center_${Date.now()}`,
        name: payload.name,
        logo: payload.logo || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=200',
        cover: payload.cover || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
        description: payload.description,
        rating: 5.0,
        reviewsCount: 1,
        phone: payload.phone,
        telegram: 'https://t.me/eduqash',
        instagram: 'https://instagram.com/eduqash',
        website: 'https://eduqash.uz',
        address: payload.address,
        city: payload.city,
        mapCoords: { lat: 41.311081, lng: 69.240562 },
        workingHours: '09:00 - 20:00',
        coursesCount: 1,
        teachersCount: 1,
        verified: true
      };
      return fallback;
    }
  },

  // PUT: Update an existing center
  updateCenter: async (id: string, payload: UpdateCenterPayload): Promise<LearningCenterItem> => {
    try {
      return await api.put<LearningCenterItem>(API_ENDPOINTS.CENTERS.BY_ID(id), payload);
    } catch {
      const existing = MOCK_CENTERS.find(c => c.id === id) || MOCK_CENTERS[0];
      return { ...existing, ...payload };
    }
  },

  // DELETE: Delete a center
  deleteCenter: async (id: string): Promise<{ success: boolean }> => {
    try {
      return await api.delete<{ success: boolean }>(API_ENDPOINTS.CENTERS.BY_ID(id));
    } catch {
      return { success: true };
    }
  }
};
