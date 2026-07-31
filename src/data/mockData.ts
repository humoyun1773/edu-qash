import type {
  User,
  LearningCenter,
  Course,
  CambridgeBook,
  Quiz,
  CertificateItem,
  PaymentTransaction,
  ChatThread,
  PlatformAnalytics
} from '../types';

export const MOCK_USERS: Record<string, User> = {
  guest: {
    id: 'usr_guest',
    name: 'Mehmon',
    email: 'guest@eduqash.uz',
    phone: '+998000000000',
    role: 'guest',
    isVerified: false,
    createdAt: '2026-01-01'
  }
};

export const MOCK_CENTERS: LearningCenter[] = [];
export const MOCK_COURSES: Course[] = [];
export const MOCK_CAMBRIDGE_BOOKS: CambridgeBook[] = [];
export const MOCK_QUIZZES: Quiz[] = [];
export const MOCK_CERTIFICATES: CertificateItem[] = [];
export const MOCK_PAYMENTS: PaymentTransaction[] = [];
export const MOCK_RESULTS: any[] = [];
export const MOCK_CHATS: ChatThread[] = [];
export const MOCK_ANALYTICS: PlatformAnalytics = {
  dailyVisitors: [],
  weeklyRevenue: [],
  monthlyConversion: 0,
  totalStudents: 0,
  totalTeachers: 0,
  totalCenters: 0,
  totalCourses: 0,
  totalRevenue: 0
};
