import React from 'react';
import { Users, BookOpen, CreditCard, ShieldCheck, Settings } from 'lucide-react';
import type { SidebarTabItem } from '../common/DashboardSidebar';

export type AdminTabType = 'users' | 'courses' | 'payments' | 'seo_security' | 'settings';

export const getAdminTabs = (usersCount: number = 0, paymentsCount: number = 0): SidebarTabItem<AdminTabType>[] => [
  { id: 'users', label: 'Foydalanuvchilar', icon: <Users className="w-4 h-4" />, badge: usersCount },
  { id: 'courses', label: 'Kurslar Moderatsiyasi', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'payments', label: "To'lovlar", icon: <CreditCard className="w-4 h-4" />, badge: paymentsCount },
  { id: 'seo_security', label: 'SEO & Security', icon: <ShieldCheck className="w-4 h-4" /> },
  { id: 'settings', label: 'Sozlamalar', icon: <Settings className="w-4 h-4" /> },
];
