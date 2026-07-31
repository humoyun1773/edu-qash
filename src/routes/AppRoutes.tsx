import React, { Suspense, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import type { UserRole } from '../types';

import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { PageLoader } from '../components/common/PageLoader';
import { PageTransition } from '../components/common/PageTransition';

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

export const getRoleDashboardPath = (role?: UserRole | string): string => {
  switch (role) {
    case 'student':      return '/dashboard/student';
    case 'teacher':      return '/dashboard/teacher';
    case 'moderator':    return '/dashboard/moderator';
    case 'center_owner': return '/dashboard/center-owner';
    case 'admin':
    case 'super_admin':  return '/dashboard/admin';
    default:             return '/dashboard/admin';
  }
};

interface RoleProtectedRouteProps {
  allowedRoles: (UserRole | string)[];
  children: React.ReactNode;
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({ allowedRoles, children }) => {
  const auth = useContext(AuthContext);
  const role = auth?.role || 'guest';
  const isAuthenticated = auth?.isAuthenticated;

  if (!isAuthenticated || role === 'guest') {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(role)) {
    const rolePath = getRoleDashboardPath(role);
    return <Navigate to={rolePath} replace />;
  }

  return <>{children}</>;
};

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white">
    <Navbar />
    <main className="flex-1">
      <PageTransition>{children}</PageTransition>
    </main>
    <Footer />
  </div>
);

export const AppRoutes: React.FC = () => {
  const auth = useContext(AuthContext);
  const currentRole = auth?.role;

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Dynamic Role-Based Dashboard Routes with Strict Protection */}
        <Route
          path="/dashboard"
          element={<Navigate to={getRoleDashboardPath(currentRole)} replace />}
        />
        <Route
          path="/dashboard/student"
          element={
            <RoleProtectedRoute allowedRoles={['student']}>
              <PageTransition><StudentDashboardPage /></PageTransition>
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/dashboard/teacher"
          element={
            <RoleProtectedRoute allowedRoles={['teacher']}>
              <PageTransition><TeacherDashboardPage /></PageTransition>
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/dashboard/moderator"
          element={
            <RoleProtectedRoute allowedRoles={['moderator']}>
              <PageTransition><ModeratorDashboardPage /></PageTransition>
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/dashboard/center-owner"
          element={
            <RoleProtectedRoute allowedRoles={['center_owner']}>
              <PageTransition><CenterOwnerDashboardPage /></PageTransition>
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/dashboard/admin"
          element={
            <RoleProtectedRoute allowedRoles={['admin', 'super_admin']}>
              <PageTransition><AdminDashboardPage /></PageTransition>
            </RoleProtectedRoute>
          }
        />

        {/* Public Pages */}
        <Route path="/"            element={<PublicLayout><LandingPage /></PublicLayout>} />
        <Route path="/centers"     element={<PublicLayout><CentersPage /></PublicLayout>} />
        <Route path="/courses"     element={<PublicLayout><CoursesPage /></PublicLayout>} />
        <Route path="/ielts"       element={<PublicLayout><IELTSPage /></PublicLayout>} />
        <Route path="/sat"         element={<PublicLayout><SATPage /></PublicLayout>} />
        <Route path="/cefr"        element={<PublicLayout><CEFRPage /></PublicLayout>} />
        <Route path="/quizzes"     element={<PublicLayout><QuizzesPage /></PublicLayout>} />
        <Route path="/ai-assistant" element={<PublicLayout><AIAssistantPage /></PublicLayout>} />
        <Route path="/leaderboard" element={<PublicLayout><LeaderboardPage /></PublicLayout>} />
        <Route path="/verify/:id"  element={<PublicLayout><CertificateVerifyPage /></PublicLayout>} />
        <Route path="/verify"      element={<PublicLayout><CertificateVerifyPage /></PublicLayout>} />
        <Route path="/chat"        element={<PublicLayout><ChatPage /></PublicLayout>} />
        <Route path="*"            element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};
