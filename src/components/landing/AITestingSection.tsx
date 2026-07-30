import React from 'react';
import { Link } from 'react-router-dom';
import { Award, CheckCircle2, Sparkles, BookOpen, Download, BrainCircuit, ArrowRight, Zap } from 'lucide-react';

export const AITestingSection: React.FC = () => {
  return (
    <div className="space-y-12 my-12 animate-fade-up">
      {/* SPECIAL TEST PREP SPOTLIGHT (IELTS, SAT, CEFR) */}
      <section className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-2xl border border-indigo-500/30 p-8 sm:p-12 shadow-2xl transition-all duration-500 hover:border-indigo-500/60 hover:shadow-indigo-500/20">
          {/* Decorative Glowing Blur Orbs */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
          <div className="absolute -left-20 -top-20 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none animate-float" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
            {/* Left Content Column */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-300 text-xs font-black border border-amber-500/20 shadow-sm">
                <Award className="w-4 h-4 text-amber-500" /> Xalqaro Imtihon Modullari
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight font-display">
                IELTS 8.5+, Digital SAT 1500+ hamda CEFR Sertifikati Maxsus Modul
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                Cambridge 16-19 kitoblari audiolar bilan, Listening va Reading mock testlari, AI yordamida Instant Writing Task 1 & 2 baholash hamda Band score calculator.
              </p>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-bold">
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200 p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800/50 hover:border-emerald-500/40 hover:scale-102 transition-all">
                  <div className="p-1.5 rounded-xl bg-emerald-500/10 text-emerald-500">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  </div>
                  <span>Listening & Reading Timing</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200 p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800/50 hover:border-emerald-500/40 hover:scale-102 transition-all">
                  <div className="p-1.5 rounded-xl bg-emerald-500/10 text-emerald-500">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  </div>
                  <span>AI Writing Band Evaluator</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200 p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800/50 hover:border-emerald-500/40 hover:scale-102 transition-all">
                  <div className="p-1.5 rounded-xl bg-emerald-500/10 text-emerald-500">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  </div>
                  <span>Digital SAT Desmos Calculator</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200 p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800/50 hover:border-emerald-500/40 hover:scale-102 transition-all">
                  <div className="p-1.5 rounded-xl bg-emerald-500/10 text-emerald-500">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  </div>
                  <span>Cambridge Books PDF Download</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/ielts"
                  className="py-3.5 px-7 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-500/25 active:scale-95 transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <span>IELTS Moduliga O‘tish</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/sat"
                  className="py-3.5 px-7 rounded-2xl bg-slate-200/80 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-extrabold text-xs border border-slate-300/80 dark:border-slate-700/80 active:scale-95 transition-all cursor-pointer"
                >
                  Digital SAT Moduli
                </Link>
              </div>
            </div>

            {/* Visual Interactive Preview */}
            <div className="space-y-4">
              {/* AI Evaluator Preview Card */}
              <div className="p-6 rounded-3xl bg-slate-100/90 dark:bg-slate-950/90 border border-slate-200/90 dark:border-slate-800/90 shadow-2xl space-y-4 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-2 font-display">
                    <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" /> AI Essay Band Evaluator Preview
                  </span>
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400 font-black text-xs border border-amber-500/30">
                    Band 7.5
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 italic bg-white/80 dark:bg-slate-900/80 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 leading-relaxed font-serif shadow-inner">
                  "The rapid development of artificial intelligence has reshaped the modern job market..."
                </p>
                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-sm hover:border-emerald-500/40 transition-colors">
                    <span className="block text-slate-400 font-medium">Task Achievement:</span>
                    <span className="font-black text-emerald-600 dark:text-emerald-400 text-base font-display">8.0</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-sm hover:border-emerald-500/40 transition-colors">
                    <span className="block text-slate-400 font-medium">Coherence & Cohesion:</span>
                    <span className="font-black text-emerald-600 dark:text-emerald-400 text-base font-display">7.5</span>
                  </div>
                </div>
              </div>

              {/* Cambridge Book Card Preview */}
              <div className="p-4.5 rounded-3xl bg-slate-100/90 dark:bg-slate-950/90 border border-slate-200/90 dark:border-slate-800/90 flex items-center justify-between shadow-xl hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-xs font-black text-slate-900 dark:text-white font-display">Cambridge IELTS 19 Academic</span>
                    <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-medium">4 ta to‘liq mock test + Audio MP3</span>
                  </div>
                </div>
                <Link 
                  to="/ielts" 
                  className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all active:scale-95 shadow-sm"
                  title="Yuklab olish"
                >
                  <Download className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDUAI ASSISTANT BANNER */}
      <section className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-950 border border-indigo-500/40 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl hover:border-indigo-500/60 transition-all">
          
          {/* Background Glow */}
          <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-indigo-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

          <div className="space-y-3 text-center md:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
              <BrainCircuit className="w-4 h-4 text-indigo-400 animate-pulse" /> EduAI 2.0 Integratsiyasi
            </div>
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight font-display">
              Sun'iy Intellekt Sizning Shaxsiy Ustozingiz
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed font-medium">
              Insho va uy vazifalarini tekshirish, grammatika xatolarini tuzatish va siz uchun 30 kunlik shaxsiy o‘quv xaritasini (Roadmap) avtomatik tuzish.
            </p>
          </div>

          <Link 
            to="/ai-assistant" 
            className="z-10 py-4 px-8 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-extrabold text-xs sm:text-sm whitespace-nowrap shadow-xl shadow-indigo-500/30 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Zap className="w-4 h-4" />
            <span>EduAI Bilan Sinab Ko‘rish</span>
          </Link>
        </div>
      </section>
    </div>
  );
};