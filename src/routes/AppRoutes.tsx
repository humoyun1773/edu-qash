import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';

import { LandingPage } from '../pages/landing/LandingPage';
import { AdminDashboardPage } from '../pages/dashboard/AdminDashboardPage';
import { TeacherDashboardPage } from '../pages/dashboard/TeacherDashboardPage';
import { StudentDashboardPage } from '../pages/dashboard/student/StudentDashboardPage';
import { ModeratorDashboardPage } from '../pages/dashboard/moderator/ModeratorDashboardPage';
import { CenterOwnerDashboardPage } from '../pages/dashboard/centerOwner/CenterOwnerDashboardPage';

import { CentersPage } from '../pages/centers/CentersPage';
import { CoursesPage } from '../pages/courses/CoursesPage';
import { IELTSPage } from '../pages/exams/IELTSPage';
import { SATPage } from '../pages/exams/SATPage';
import { CEFRPage } from '../pages/exams/CEFRPage';
import { QuizzesPage } from '../pages/quizzes/QuizzesPage';
import { AIAssistantPage } from '../pages/ai/AIAssistantPage';
import { ChatPage } from '../pages/ai/ChatPage';
import { LeaderboardPage } from '../pages/leaderboard/LeaderboardPage';
import { CertificateVerifyPage } from '../pages/certificates/CertificateVerifyPage';

const DashboardRedirector: React.FC = () => {
  const { role } = useAuth();
  switch (role) {
    case 'student':
      return <StudentDashboardPage />;
    case 'teacher':
      return <TeacherDashboardPage />;
    case 'moderator':
      return <ModeratorDashboardPage />;
    case 'center_owner':
      return <CenterOwnerDashboardPage />;
    case 'admin':
    case 'super_admin':
    default:
      return <AdminDashboardPage />;
  }
};

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Dynamic Role-Based Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardRedirector />} />
      <Route path="/dashboard/student" element={<StudentDashboardPage />} />
      <Route path="/dashboard/teacher" element={<TeacherDashboardPage />} />
      <Route path="/dashboard/moderator" element={<ModeratorDashboardPage />} />
      <Route path="/dashboard/center-owner" element={<CenterOwnerDashboardPage />} />
      <Route path="/dashboard/admin" element={<AdminDashboardPage />} />

      {/* Public Landing Site Pages */}
      <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
      <Route path="/centers" element={<PublicLayout><CentersPage /></PublicLayout>} />
      <Route path="/courses" element={<PublicLayout><CoursesPage /></PublicLayout>} />
      <Route path="/ielts" element={<PublicLayout><IELTSPage /></PublicLayout>} />
      <Route path="/sat" element={<PublicLayout><SATPage /></PublicLayout>} />
      <Route path="/cefr" element={<PublicLayout><CEFRPage /></PublicLayout>} />
      <Route path="/quizzes" element={<PublicLayout><QuizzesPage /></PublicLayout>} />
      <Route path="/ai-assistant" element={<PublicLayout><AIAssistantPage /></PublicLayout>} />
      <Route path="/leaderboard" element={<PublicLayout><LeaderboardPage /></PublicLayout>} />
      <Route path="/verify/:id" element={<PublicLayout><CertificateVerifyPage /></PublicLayout>} />
      <Route path="/verify" element={<PublicLayout><CertificateVerifyPage /></PublicLayout>} />
      <Route path="/chat" element={<PublicLayout><ChatPage /></PublicLayout>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
