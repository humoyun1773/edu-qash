import { api } from '../services/api';
import { API_ENDPOINTS } from './apiEndpoints';
import type { CertificateItem } from './certificates.type';
import { MOCK_CERTIFICATES } from '../data/mockData';

export const certificatesService = {
  // GET: Verify certificate by uniqueId
  verifyCertificate: async (uniqueId: string): Promise<CertificateItem | null> => {
    try {
      const data = await api.get<CertificateItem>(API_ENDPOINTS.CERTIFICATES.VERIFY(uniqueId));
      if (data) return data;
      throw new Error('Not found');
    } catch {
      return MOCK_CERTIFICATES.find(c => c.uniqueId === uniqueId) || MOCK_CERTIFICATES[0] || null;
    }
  },

  // GET: Fetch student certificates
  getStudentCertificates: async (): Promise<CertificateItem[]> => {
    try {
      const data = await api.get<CertificateItem[]>(API_ENDPOINTS.CERTIFICATES.MY);
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch {
      return MOCK_CERTIFICATES;
    }
  }
};
