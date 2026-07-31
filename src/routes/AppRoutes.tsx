import React, { Suspense, useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

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

const DashboardRedirector: React.FC = () => {
  const auth = useContext(AuthContext);
  const role = auth?.role;
  switch (role) {
    case 'student':      return <Navigate to="/dashboard/student" replace />;
    case 'teacher':      return <Navigate to="/dashboard/teacher" replace />;
    case 'moderator':    return <Navigate to="/dashboard/moderator" replace />;
    case 'center_owner': return <Navigate to="/dashboard/center-owner" replace />;
    case 'admin':
    case 'super_admin':  return <Navigate to="/dashboard/admin" replace />;
    default:             return <Navigate to="/dashboard/admin" replace />;
  }
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
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => setIsNavigating(false), 400);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (isNavigating) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center">
        <PageLoader fullScreen={true} />
      </div>
    );
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Dynamic Role-Based Dashboard Routes */}
        <Route path="/dashboard" element={
          <PageTransition><DashboardRedirector /></PageTransition>
        } />
        <Route path="/dashboard/student" element={
          <PageTransition><StudentDashboardPage /></PageTransition>
        } />
        <Route path="/dashboard/teacher" element={
          <PageTransition><TeacherDashboardPage /></PageTransition>
        } />
        <Route path="/dashboard/moderator" element={
          <PageTransition><ModeratorDashboardPage /></PageTransition>
        } />
        <Route path="/dashboard/center-owner" element={
          <PageTransition><CenterOwnerDashboardPage /></PageTransition>
        } />
        <Route path="/dashboard/admin" element={
          <PageTransition><AdminDashboardPage /></PageTransition>
        } />

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
