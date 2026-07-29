import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

const STATS = [
  { value: '40+', label: 'Nufuzli O‘quv Markazlar', color: 'text-slate-900 dark:text-white' },
  { value: '12,500+', label: 'Faol Talabalar', color: 'text-indigo-600 dark:text-indigo-400' },
  { value: '8.0+', label: 'O‘rtacha IELTS Natija', color: 'text-amber-500 dark:text-amber-400' },
  { value: '100%', label: 'QR-Sertifikat Verification', color: 'text-emerald-600 dark:text-emerald-400' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery = '',
  setSearchQuery = () => {}
}) => {
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/courses');
    }
  };

  return (
    <section className="relative pt-12 lg:pt-20 px-4 sm:px-6 lg:px-8 max-w-[1536px] w-full mx-auto">
      {/* Background Decorative Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center space-y-6 max-w-4xl mx-auto relative z-10">
        {/* Hero Header Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider animate-bounce">
          <Sparkles className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
          O‘zbekistondagi №1 Ekotizim va LMS Platformasi
        </div>

        {/* Hero Main Headline */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none text-slate-900 dark:text-white">
          Bilim Oling, O‘quv Markazlarni Toping va <span className="text-gradient">Xalqaro Sertifikatlarga</span> Ega Bo‘ling
        </h1>

        {/* Hero Sub-headline */}
        <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          IELTS, Digital SAT, CEFR hamda zamonaviy IT kasblari. AI yordamida insho va speakingni baholash, real-time testlar hamda rasmiy QR-kodli sertifikatlar.
        </p>

        {/* Global Search Bar Form */}
        <div className="max-w-2xl mx-auto pt-4">
          <form 
            onSubmit={handleSearchSubmit}
            className="glass-card p-2 flex flex-col sm:flex-row items-center gap-2 border-indigo-500/30 shadow-2xl"
          >
            <div className="relative w-full flex items-center">
              <Search className="w-5 h-5 text-indigo-500 dark:text-indigo-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Kurslar, O‘quv markazlar, Ustozlar yoki AI testlarni qidiring..."
                aria-label="Qidirish sahifasi"
                className="w-full bg-transparent pl-12 pr-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
              />
            </div>
            <button 
              type="submit"
              className="w-full sm:w-auto btn-primary py-3 px-6 text-sm font-bold whitespace-nowrap flex items-center justify-center gap-2"
            >
              Qidirish
            </button>
          </form>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-slate-200 dark:border-slate-800/80">
          {STATS.map((stat, idx) => (
            <div 
              key={idx} 
              className="p-4 rounded-2xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-center shadow-sm"
            >
              <div className={`text-2xl sm:text-3xl font-extrabold ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;