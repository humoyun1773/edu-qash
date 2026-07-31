import React from 'react';
import { Search, Sparkles, ArrowRight, ShieldCheck, Award, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ searchQuery, setSearchQuery }) => {
  const { openAuthModal } = useAuth();

  return (
    <section className="relative pt-12 lg:pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1536px] w-full mx-auto overflow-hidden">
      {/* Dynamic Background Glow Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 dark:bg-indigo-600/30 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 right-5 w-80 h-80 bg-purple-500/20 dark:bg-purple-500/25 rounded-full blur-[120px] pointer-events-none animate-float" />
      <div className="absolute top-1/2 left-5 w-72 h-72 bg-pink-500/15 dark:bg-pink-500/20 rounded-full blur-[110px] pointer-events-none animate-float-reverse" />

      <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto">
        {/* Top Hero Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-300 text-xs font-black uppercase tracking-wider shadow-lg shadow-indigo-500/10 mb-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
          <span>Eduqash — O'zbekistondagi №1 Ta'lim va Imtihon Platformasi</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-slate-900 dark:text-white font-display animate-fade-up">
          Bilim Oling, O‘quv Markazlarni Toping va{' '}
          <span className="bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 dark:from-sky-300 dark:via-sky-200 dark:to-indigo-300 bg-clip-text text-transparent font-black drop-shadow-sm">
            Xalqaro Sertifikatlarga
          </span>{' '}
          Ega Bo‘ling
        </h1>

        {/* Description */}
        <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium animate-fade-up-delayed-1">
          IELTS, Digital SAT, CEFR hamda zamonaviy IT va til kurslari. Sun'iy intellekt (AI) yordamida insho va speakingni baholash, real-time testlar hamda rasmiy QR-kodli sertifikatlar.
        </p>

        {/* Global Search Bar */}
        <div className="max-w-2xl mx-auto pt-2 animate-fade-up-delayed-2">
          <div className="p-2.5 flex flex-col sm:flex-row items-center gap-2.5 bg-white/90 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-2xl focus-within:border-indigo-500/60 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all hover:border-indigo-500/40">
            <div className="relative w-full flex items-center">
              <Search className="w-5 h-5 text-indigo-500 dark:text-indigo-400 absolute left-4 pointer-events-none" />
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
              className="w-full sm:w-auto py-3.5 px-8 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-sm whitespace-nowrap shadow-lg shadow-indigo-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Qidirish</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Quick Stats Grid with Entrance & Glowing Light Animations */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-slate-200/80 dark:border-slate-800/80 animate-fade-up-delayed-3">
          <div className="card-glowing-light card-shimmer p-5 rounded-3xl bg-white/70 dark:bg-slate-900/50 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl hover:border-indigo-500/40 hover:scale-105 hover:-translate-y-2 transition-all duration-300 text-center group cursor-pointer">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-500 mx-auto flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display">40+</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">Nufuzli O‘quv Markazlar</div>
          </div>

          <div className="card-glowing-light card-shimmer p-5 rounded-3xl bg-white/70 dark:bg-slate-900/50 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl hover:border-purple-500/40 hover:scale-105 hover:-translate-y-2 transition-all duration-300 text-center group cursor-pointer">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-500 mx-auto flex items-center justify-center mb-3 group-hover:scale-110 group-hover:-rotate-6 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400 font-display">12,500+</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">Faol Talabalar</div>
          </div>

          <div className="card-glowing-light card-shimmer p-5 rounded-3xl bg-white/70 dark:bg-slate-900/50 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl hover:border-amber-500/40 hover:scale-105 hover:-translate-y-2 transition-all duration-300 text-center group cursor-pointer">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 mx-auto flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-500 dark:text-amber-400 font-display">8.0+</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">O‘rtacha IELTS Natija</div>
          </div>

          <div className="card-glowing-light card-shimmer p-5 rounded-3xl bg-white/70 dark:bg-slate-900/50 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl hover:border-emerald-500/40 hover:scale-105 hover:-translate-y-2 transition-all duration-300 text-center group cursor-pointer">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center mb-3 group-hover:scale-110 group-hover:-rotate-6 transition-transform">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-display">100%</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">QR Verification</div>
          </div>
        </div>
      </div>
    </section>
  );
};