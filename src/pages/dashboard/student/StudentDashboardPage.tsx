import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { DashboardHeader } from '../common/DashboardHeader';
import { StudentDashboard } from './StudentDashboard';

export const StudentDashboardPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated && !user) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center p-4">
        <div className="glass-card p-8 max-w-md w-full text-center space-y-4 shadow-2xl border-rose-500/20">
          <div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold">
            🔒
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Talaba Kabinetiga Kirish Cheklangan</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Ushbu sahifani ko‘rish uchun avval talaba sifatida tizimga kiring.
          </p>
          <a
            href="/"
            className="btn-primary py-3 px-6 text-xs font-bold w-full inline-block"
          >
            Bosh Sahifaga Qaytish
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-300">
      <DashboardHeader />
      <main className="flex-1 max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        <StudentDashboard />
      </main>
    </div>
  );
};

export default StudentDashboardPage;
