import React from 'react';
import { BookOpen, FileQuestion, Award, Settings } from 'lucide-react';
import type { SidebarTabItem } from '../common/DashboardSidebar';

export type StudentTabType = 'courses' | 'tests' | 'certificates' | 'settings';

export const getStudentTabs = (coursesCount: number = 0, certificatesCount: number = 0): SidebarTabItem<StudentTabType>[] => [
  { id: 'courses', label: "Mening Kurslarim", icon: <BookOpen className="w-4 h-4" />, badge: coursesCount },
  { id: 'tests', label: "Topshirilgan Testlar", icon: <FileQuestion className="w-4 h-4" /> },
  { id: 'certificates', label: "Sertifikatlarim", icon: <Award className="w-4 h-4" />, badge: certificatesCount },
  { id: 'settings', label: "Sozlamalar", icon: <Settings className="w-4 h-4" /> },
];
