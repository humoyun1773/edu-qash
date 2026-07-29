import { useState, useEffect, useCallback } from 'react';
import { certificatesService } from '../constants/certificates.service';
import type { CertificateItem } from '../constants/certificates.type';

export const useCertificates = () => {
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCertificates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await certificatesService.getStudentCertificates();
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
    return await certificatesService.verifyCertificate(uniqueId);
  };

  return {
    certificates,
    loading,
    error,
    refetch: fetchCertificates,
    verifyCertificate
  };
};
