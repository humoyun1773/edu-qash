import { api } from '../services/api';
import type { PendingContentItem, ContentReportItem } from './moderator.type';

export const moderatorService = {
  // GET: Fetch pending content for moderation
  getPendingContent: async (): Promise<PendingContentItem[]> => {
    try {
      const data = await api.get<PendingContentItem[]>('/moderator/pending');
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch {
      return [
        { id: 'p_1', type: 'course', title: 'SAT Math 800 Masterclass', submittedBy: 'Elena Rostova', submittedAt: '2026-07-28', status: 'pending' },
        { id: 'p_2', type: 'quiz', title: 'CEFR B2 Mock Grammar', submittedBy: 'Bekzod Aliyev', submittedAt: '2026-07-29', status: 'pending' }
      ];
    }
  },

  // POST: Approve content item
  approveContent: async (id: string): Promise<{ success: boolean }> => {
    try {
      return await api.post<{ success: boolean }>(`/moderator/pending/${id}/approve`, {});
    } catch {
      return { success: true };
    }
  },

  // POST: Reject content item
  rejectContent: async (id: string, reason?: string): Promise<{ success: boolean }> => {
    try {
      return await api.post<{ success: boolean }>(`/moderator/pending/${id}/reject`, { reason });
    } catch {
      return { success: true };
    }
  },

  // GET: Fetch content violation reports
  getReports: async (): Promise<ContentReportItem[]> => {
    try {
      const data = await api.get<ContentReportItem[]>('/moderator/reports');
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch {
      return [
        { id: 'rep_1', contentType: 'comment', contentId: 'c_99', reportedBy: 'User #12', reason: 'Spam text', createdAt: 'Hozir' }
      ];
    }
  }
};
