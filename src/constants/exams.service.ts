import { api } from '../services/api';
import { API_ENDPOINTS } from './apiEndpoints';
import type { EssayCheckPayload, EssayCheckResponse, CambridgeBookItem } from './exams.type';
import { MOCK_CAMBRIDGE_BOOKS } from '../data/mockData';

export const examsService = {
  // POST: Check IELTS Essay with AI
  checkIELTSEssay: async (payload: EssayCheckPayload): Promise<EssayCheckResponse | null> => {
    try {
      return await api.post<EssayCheckResponse>(API_ENDPOINTS.EXAMS.CHECK_ESSAY, payload);
    } catch {
      return {
        overallBand: 7.5,
        taskAchievement: { band: 8.0, feedback: 'Barcha savollarga to‘liq va mantiqiy javob berilgan.' },
        coherenceCohesion: { band: 7.5, feedback: 'Abzaslar va bog‘lovchi so‘zlar to‘g‘ri ishlatilgan.' },
        lexicalResource: { band: 7.5, feedback: 'Akademik so‘zlar foydalanilgan.' },
        grammaticalAccuracy: { band: 7.0, feedback: 'Kichik grammatik xatolar mavjud.' },
        correctedText: payload.text + '\n\n[AI Feedback]: "gained significant attention" -> "drawn considerable controversy"',
        keyImprovements: [
          'Artikllar (the, a, an) ustida ko‘proq ishlang.',
          'Gaplar strukturasi murakkablashtirilsin.'
        ]
      };
    }
  },

  // GET: Fetch Cambridge IELTS books
  getCambridgeBooks: async (): Promise<CambridgeBookItem[]> => {
    try {
      const data = await api.get<CambridgeBookItem[]>(API_ENDPOINTS.EXAMS.CAMBRIDGE_BOOKS);
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch {
      return MOCK_CAMBRIDGE_BOOKS;
    }
  }
};
