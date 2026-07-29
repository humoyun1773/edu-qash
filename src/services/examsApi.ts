import { api } from './api';
import type { CambridgeBook, CertificateItem } from '../types';
import { MOCK_CAMBRIDGE_BOOKS, MOCK_CERTIFICATES } from '../data/mockData';

export interface EssayCheckResult {
  overallBand: number;
  taskAchievement: { band: number; feedback: string };
  coherenceCohesion: { band: number; feedback: string };
  lexicalResource: { band: number; feedback: string };
  grammaticalAccuracy: { band: number; feedback: string };
  correctedText: string;
  keyImprovements: string[];
}

export const examsApi = {
  checkIELTSEssay: async (topic: string, text: string): Promise<EssayCheckResult | null> => {
    try {
      return await api.post<EssayCheckResult>('/exams/ielts/check-essay', { topic, text });
    } catch (err) {
      console.warn('[examsApi] POST /exams/ielts/check-essay failed.');
      return null;
    }
  },

  getCambridgeBooks: async (): Promise<CambridgeBook[]> => {
    try {
      const data = await api.get<CambridgeBook[]>('/exams/ielts/cambridge-books');
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch (err) {
      console.info('[examsApi] GET /exams/ielts/cambridge-books fallback.');
      return MOCK_CAMBRIDGE_BOOKS;
    }
  },

  verifyCertificate: async (uniqueId: string): Promise<CertificateItem | null> => {
    try {
      const data = await api.get<CertificateItem>(`/certificates/verify/${uniqueId}`);
      if (data) return data;
      throw new Error('Not found');
    } catch (err) {
      console.info(`[examsApi] GET /certificates/verify/${uniqueId} fallback.`);
      return MOCK_CERTIFICATES.find(c => c.uniqueId === uniqueId) || MOCK_CERTIFICATES[0] || null;
    }
  },

  getStudentCertificates: async (): Promise<CertificateItem[]> => {
    try {
      const data = await api.get<CertificateItem[]>('/certificates/my');
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch (err) {
      console.info('[examsApi] GET /certificates/my fallback.');
      return MOCK_CERTIFICATES;
    }
  }
};
