import { useState, useEffect, useCallback } from 'react';
import { getCached, setCached } from './useLocalCache';

export interface PendingContentItem {
  id: string;
  title: string;
  author: string;
  authorName?: string;
  type?: string;
  description?: string;
  category: string;
  createdAt: string;
}

export interface ContentReportItem {
  id: string;
  targetId: string;
  targetTitle: string;
  details?: string;
  reason: string;
  reporter: string;
  createdAt: string;
}

const CACHE_KEY_PENDING = 'moderator_pending';
const CACHE_KEY_REPORTS = 'moderator_reports';

const MOCK_PENDING: PendingContentItem[] = [
  { id: 'p1', title: 'New IELTS Practice Test', author: 'Mr. Alex', authorName: 'Mr. Alex', type: 'Quiz', description: 'Comprehensive IELTS Practice', category: 'IELTS', createdAt: 'Bugun 11:30' }
];

const MOCK_REPORTS: ContentReportItem[] = [
  { id: 'r1', targetId: 'c101', targetTitle: 'Spam Comment in SAT Group', details: 'User reported inappropriate content', reason: 'Inappropriate language', reporter: 'Jahongir', createdAt: 'Kecha 16:20' }
];

export const useModerator = () => {
  const [pendingContent, setPendingContent] = useState<PendingContentItem[]>(() => getCached<PendingContentItem[]>(CACHE_KEY_PENDING, MOCK_PENDING));
  const [reports, setReports] = useState<ContentReportItem[]>(() => getCached<ContentReportItem[]>(CACHE_KEY_REPORTS, MOCK_REPORTS));
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchModeratorData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setPendingContent(MOCK_PENDING);
      setReports(MOCK_REPORTS);
    } catch (err: any) {
      setError(err.message || "Moderator ma'lumotlarini yuklashda xatolik");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchModeratorData();
  }, [fetchModeratorData]);

  const approveContent = async (id: string) => {
    try {
      setPendingContent(prev => {
        const updated = prev.filter(item => item.id !== id);
        setCached(CACHE_KEY_PENDING, updated);
        return updated;
      });
    } catch (err: any) {
      setError(err.message || 'Kontentni tasdiqlashda xatolik');
      throw err;
    }
  };

  const rejectContent = async (id: string, _reason?: string) => {
    try {
      setPendingContent(prev => {
        const updated = prev.filter(item => item.id !== id);
        setCached(CACHE_KEY_PENDING, updated);
        return updated;
      });
    } catch (err: any) {
      setError(err.message || 'Kontentni rad etishda xatolik');
      throw err;
    }
  };

  return {
    pendingContent,
    reports,
    loading,
    error,
    refetch: fetchModeratorData,
    approveContent,
    rejectContent
  };
};
