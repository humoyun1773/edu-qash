import { useState, useEffect, useCallback } from 'react';
import { examsApi } from '../services/examsApi';
import type { CertificateItem } from '../types';

export const useCertificates = () => {
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCertificates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await examsApi.getStudentCertificates();
      setCertificates(data);
    } catch (err: any) {
      setError(err.message || 'Sertifikatlarni yuklashda xatolik');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCertificates();
  }, [fetchCertificates]);

  const verifyCertificate = async (uniqueId: string) => {
    return await examsApi.verifyCertificate(uniqueId);
  };

  return {
    certificates,
    loading,
    error,
    refetch: fetchCertificates,
    verifyCertificate
  };
};
