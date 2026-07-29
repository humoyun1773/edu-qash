import { useState, useEffect, useCallback } from 'react';
import { moderatorService } from '../constants/moderator.service';
import type { PendingContentItem, ContentReportItem } from '../constants/moderator.type';
import { getCached, setCached } from './useLocalCache';

const CACHE_KEY_PENDING = 'moderator_pending';
const CACHE_KEY_REPORTS = 'moderator_reports';

export const useModerator = () => {
  const [pendingContent, setPendingContent] = useState<PendingContentItem[]>(() => getCached<PendingContentItem[]>(CACHE_KEY_PENDING, []));
  const [reports, setReports] = useState<ContentReportItem[]>(() => getCached<ContentReportItem[]>(CACHE_KEY_REPORTS, []));
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchModeratorData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [pData, rData] = await Promise.all([
        moderatorService.getPendingContent(),
        moderatorService.getReports()
      ]);
      setPendingContent(pData);
      setReports(rData);
      setCached(CACHE_KEY_PENDING, pData);
      setCached(CACHE_KEY_REPORTS, rData);
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
      await moderatorService.approveContent(id);
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

  const rejectContent = async (id: string, reason?: string) => {
    try {
      await moderatorService.rejectContent(id, reason);
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
