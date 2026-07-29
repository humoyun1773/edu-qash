import React from 'react';
import { Search, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ searchQuery, setSearchQuery }) => {
  const { openAuthModal } = useAuth();

  return (
    <section className="relative pt-12 lg:pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-[1536px] w-full mx-auto overflow-hidden">
      {/* Background Glow Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/20 dark:bg-indigo-600/25 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-pink-500/15 dark:bg-pink-500/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 text-center space-y-6 max-w-4xl mx-auto">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/30 text-indigo-600 dark:text-indigo-300 text-xs font-black uppercase tracking-wider animate-bounce shadow-sm">
          <Sparkles className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
          O‘zbekistondagi №1 Ekotizim va LMS Platformasi
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] text-slate-900 dark:text-white">
          Bilim Oling, O‘quv Markazlarni Toping va{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Xalqaro Sertifikatlarga
          </span>{' '}
          Ega Bo‘ling
        </h1>

        {/* Description */}
        <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium">
          IELTS, Digital SAT, CEFR hamda zamonaviy IT kasblari. AI yordamida insho va speakingni baholash, real-time testlar hamda rasmiy QR-kodli sertifikatlar.
        </p>

        {/* Global Search Bar */}
        <div className="max-w-2xl mx-auto pt-4">
          <div className="p-2 flex flex-col sm:flex-row items-center gap-2 bg-white/80 dark:bg-slate-900/70 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-2xl focus-within:border-indigo-500/50 transition-all">
            <div className="relative w-full flex items-center">
              <Search className="w-5 h-5 text-slate-400 dark:text-indigo-400 absolute left-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Kurslar, O‘quv markazlar, Ustozlar..."
                className="w-full bg-transparent pl-12 pr-4 py-3 text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
              />
            </div>
            <button 
              onClick={() => openAuthModal('register')}
              className="w-full sm:w-auto py-3.5 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm whitespace-nowrap shadow-lg shadow-indigo-600/30 active:scale-95 transition-all"
            >
              Qidirish
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 text-center">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">40+</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">Nufuzli O‘quv Markazlar</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 text-center">
            <div className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400">12,500+</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">Faol Talabalar</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 text-center">
            <div className="text-2xl sm:text-3xl font-black text-amber-500 dark:text-amber-400">8.0+</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">O‘rtacha IELTS Natija</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 text-center">
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">100%</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">QR Verification</div>
          </div>
        </div>
      </div>
    </section>
  );
};