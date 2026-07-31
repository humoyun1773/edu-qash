import { Users, FileQuestion, BookOpen, Calendar, Settings, Bot } from 'lucide-react';
import type { SidebarTabItem } from '../common/DashboardSidebar';

export type TeacherTabType = 'students' | 'create_quiz' | 'quiz_builder' | 'homework' | 'ai_checker' | 'schedule' | 'settings';

export const getTeacherTabs = (studentsCount: number = 0, quizzesCount: number = 0): SidebarTabItem<TeacherTabType>[] => [
  { id: 'students', label: "O'quvchilarim", icon: <Users className="w-4 h-4" />, badge: studentsCount },
  { id: 'create_quiz', label: "Yangi Test Yaratish", icon: <FileQuestion className="w-4 h-4" />, badge: quizzesCount },
  { id: 'homework', label: "Uyga Vazifalar", icon: <BookOpen className="w-4 h-4" /> },
  { id: 'ai_checker', label: "AI Tekshiruvchi", icon: <Bot className="w-4 h-4" /> },
  { id: 'schedule', label: "Dars Jadvali", icon: <Calendar className="w-4 h-4" /> },
  { id: 'settings', label: "Sozlamalar", icon: <Settings className="w-4 h-4" /> },
];
