import { api } from '../services/api';
import { API_ENDPOINTS } from './apiEndpoints';
import type { LearningCenterItem } from './centers.type';
import type { CenterTeacherItem, BranchRevenueData, UpdateCenterProfilePayload, AddCenterTeacherPayload } from './centerOwner.type';
import { MOCK_CENTERS } from '../data/mockData';

export const centerOwnerService = {
  // GET: Fetch center owner profile
  getProfile: async (centerId?: string): Promise<LearningCenterItem> => {
    const id = centerId || 'center_1';
    try {
      const data = await api.get<LearningCenterItem>(API_ENDPOINTS.CENTERS.BY_ID(id));
      if (data) return data;
      throw new Error('Empty');
    } catch {
      return MOCK_CENTERS[0];
    }
  },

  updateProfile: async (centerId: string, payload: UpdateCenterProfilePayload): Promise<LearningCenterItem> => {
    try {
      return await api.put<LearningCenterItem>(API_ENDPOINTS.CENTERS.BY_ID(centerId), payload);
    } catch {
      const defaultCenter: LearningCenterItem = {
        id: centerId,
        name: 'Eduqash Center',
        logo: '',
        cover: '',
        description: '',
        rating: 5.0,
        reviewsCount: 0,
        phone: '',
        telegram: '',
        instagram: '',
        website: '',
        address: '',
        city: 'Toshkent',
        mapCoords: { lat: 41.2995, lng: 69.2401 },
        workingHours: '09:00 - 20:00',
        coursesCount: 0,
        teachersCount: 0,
        verified: true
      };
      return { ...(MOCK_CENTERS[0] || defaultCenter), ...payload };
    }
  },

  // GET: Fetch center staff teachers
  getTeachers: async (centerId?: string): Promise<CenterTeacherItem[]> => {
    const id = centerId || 'center_1';
    try {
      const data = await api.get<CenterTeacherItem[]>(`/centers/${id}/teachers`);
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch {
      return [
        { id: 't_1', name: 'Mr. John Smith', subject: 'IELTS Lead Specialist', rating: 4.9, studentsCount: 180, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' },
        { id: 't_2', name: 'Elena Rostova', subject: 'Digital SAT Trainer', rating: 4.85, studentsCount: 140, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200' }
      ];
    }
  },

  // POST: Add new teacher to center
  addTeacher: async (centerId: string, payload: AddCenterTeacherPayload): Promise<CenterTeacherItem> => {
    try {
      return await api.post<CenterTeacherItem>(`/centers/${centerId}/teachers`, payload);
    } catch {
      return {
        id: `t_${Date.now()}`,
        name: payload.name,
        subject: payload.subject,
        rating: 5.0,
        studentsCount: 0,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
      };
    }
  },

  // DELETE: Remove teacher from center
  removeTeacher: async (centerId: string, teacherId: string): Promise<{ success: boolean }> => {
    try {
      return await api.delete<{ success: boolean }>(`/centers/${centerId}/teachers/${teacherId}`);
    } catch {
      return { success: true };
    }
  },

  // GET: Fetch revenue analytics
  getRevenueData: async (centerId?: string): Promise<BranchRevenueData> => {
    const id = centerId || 'center_1';
    try {
      const data = await api.get<BranchRevenueData>(`/centers/${id}/revenue`);
      if (data) return data;
      throw new Error('Empty');
    } catch {
      return {
        monthlyRevenue: 48500000,
        activeStudents: 320,
        totalCourses: 12,
        growthPercentage: 18.5
      };
    }
  }
};
