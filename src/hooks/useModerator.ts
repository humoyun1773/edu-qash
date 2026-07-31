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

export const useModerator = () => {
  const [pendingContent, setPendingContent] = useState<PendingContentItem[]>(() => getCached<PendingContentItem[]>(CACHE_KEY_PENDING, []));
  const [reports, setReports] = useState<ContentReportItem[]>(() => getCached<ContentReportItem[]>(CACHE_KEY_REPORTS, []));
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchModeratorData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setPendingContent([]);
      setReports([]);
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

  const dismissReport = async (reportId: string) => {
    try {
      setReports(prev => {
        const updated = prev.filter(r => r.id !== reportId);
        setCached(CACHE_KEY_REPORTS, updated);
        return updated;
      });
    } catch (err: any) {
      setError(err.message || "Shikoyatni bekor qilishda xatolik");
      throw err;
    }
  };

  return {
    pendingContent,
    reports,
    loading,
    error,
    approveContent,
    rejectContent,
    dismissReport,
    refetch: fetchModeratorData
  };
};
