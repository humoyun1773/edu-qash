import React from 'react';
import { Building2, Users, CreditCard, Settings } from 'lucide-react';
import type { SidebarTabItem } from '../common/DashboardSidebar';

export type CenterOwnerTabType = 'profile_edit' | 'teachers' | 'revenue' | 'settings';

export const getCenterOwnerTabs = (teachersCount: number = 0): SidebarTabItem<CenterOwnerTabType>[] => [
  { id: 'profile_edit', label: "Markaz Profili", icon: <Building2 className="w-4 h-4" /> },
  { id: 'teachers', label: "O'qituvchilar", icon: <Users className="w-4 h-4" />, badge: teachersCount },
  { id: 'revenue', label: "Daromad va Statistika", icon: <CreditCard className="w-4 h-4" /> },
  { id: 'settings', label: "Sozlamalar", icon: <Settings className="w-4 h-4" /> },
];
