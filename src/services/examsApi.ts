import { api } from './api';
import type { CambridgeBook, CertificateItem } from '../types';

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
      return await api.post<EssayCheckResult>('/ai/check-essay/', { topic, text });
    } catch (err) {
      console.error('[examsApi] POST /ai/check-essay/ failed:', err);
      return null;
    }
  },

  getCambridgeBooks: async (): Promise<CambridgeBook[]> => {
    try {
      const data: any = await api.get('/exams/');
      const list = Array.isArray(data) ? data : (data?.results ?? []);
      return Array.isArray(list) ? list : [];
    } catch (err) {
      return [];
    }
  },

  verifyCertificate: async (uniqueId: string): Promise<CertificateItem | null> => {
    try {
      return await api.get<CertificateItem>(`/certificates/verify/${uniqueId}/`);
    } catch (err) {
      return null;
    }
  },

  getStudentCertificates: async (): Promise<CertificateItem[]> => {
    try {
      const data: any = await api.get('/certificates/');
      const list = Array.isArray(data) ? data : (data?.results ?? []);
      return Array.isArray(list) ? list : [];
    } catch (err) {
      return [];
    }
  }
};
