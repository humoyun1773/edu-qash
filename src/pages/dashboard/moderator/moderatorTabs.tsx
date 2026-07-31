import { ShieldCheck, BookOpen, MessageSquare, Settings, ShieldAlert } from 'lucide-react';
import type { SidebarTabItem } from '../common/DashboardSidebar';

export type ModeratorTabType = 'content' | 'courses' | 'reviews' | 'reports' | 'settings';

export const getModeratorTabs = (): SidebarTabItem<ModeratorTabType>[] => [
  { id: 'content', label: "Kontent Moderatsiyasi", icon: <ShieldCheck className="w-4 h-4" /> },
  { id: 'courses', label: "Kurslar Ro'yxati", icon: <BookOpen className="w-4 h-4" /> },
  { id: 'reviews', label: "Izohlar va Sharhlar", icon: <MessageSquare className="w-4 h-4" /> },
  { id: 'reports', label: "Shikoyatlar", icon: <ShieldAlert className="w-4 h-4" /> },
  { id: 'settings', label: "Sozlamalar", icon: <Settings className="w-4 h-4" /> },
];
