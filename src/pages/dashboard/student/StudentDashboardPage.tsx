import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Sparkles } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { DashboardHeader } from '../common/DashboardHeader';
import { StudentDashboard } from './StudentDashboard';

export const StudentDashboardPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  // Foydalanuvchi tizimga kirmagan bo'lsa ko'rinadigan qulf ekrani
  if (!isAuthenticated && !user) {
    return (
      <div className="relative min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 overflow-hidden">
        {/* Orqa fon nur effekti (Glow background) */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 p-8 max-w-md w-full text-center space-y-6 rounded-3xl bg-slate-900/80 backdrop-blur-2xl border border-rose-500/20 shadow-2xl shadow-rose-950/30">
          
          {/* Ikonka konteyneri */}
          <div className="relative w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-600/10 border border-rose-500/30 flex items-center justify-center text-rose-500 shadow-lg shadow-rose-500/10">
            <ShieldAlert className="w-10 h-10 animate-bounce" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-semibold text-rose-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kirish Cheklangan</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Talaba Kabinetiga Kirish
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
              Ushbu sahifadagi darslar va ma'lumotlarni ko‘rish uchun avval talaba sifatida tizimga kiring.
            </p>
          </div>

          <Link
            to="/"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 active:scale-[0.98] text-white text-xs font-bold transition-all shadow-lg shadow-rose-600/25"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Bosh Sahifaga Qaytish</span>
          </Link>
        </div>
      </div>
    );
  }

  // Tizimga kirgan talaba uchun asosiy sahifa
  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-300">
      {/* Yuqori Header */}
      <DashboardHeader />

      {/* Asosiy Ishchi Maydon */}
      <main className="flex-1 max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        <StudentDashboard />
      </main>
    </div>
  );
};

export default StudentDashboardPage;