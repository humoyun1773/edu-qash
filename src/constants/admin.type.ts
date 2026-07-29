import type { UserRole } from '../types';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  isVerified: boolean;
  twoFactorEnabled?: boolean;
  createdAt: string;
}

export interface AdminPayment {
  id: string;
  userId: string;
  userName: string;
  courseOrSubName: string;
  amount: number;
  paymentMethod: 'Payme' | 'Click' | 'Uzum Bank' | 'Visa' | 'MasterCard';
  status: 'Completed' | 'Pending' | 'Failed' | 'Refunded';
  invoiceId: string;
  promoCodeUsed?: string;
  date: string;
}

export interface AdminAnalytics {
  dailyVisitors: number[];
  weeklyRevenue: number[];
  monthlyConversion: number;
  totalStudents: number;
  totalTeachers: number;
  totalCenters: number;
  totalCourses: number;
  totalRevenue: number;
}

export interface CreateAdminUserPayload {
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
}

export interface UpdateAdminUserPayload {
  name?: string;
  email?: string;
  role?: UserRole;
  isVerified?: boolean;
  phone?: string;
}
