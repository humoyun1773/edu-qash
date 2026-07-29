import React from 'react';
import { Link } from 'react-router-dom';
import { Award, CheckCircle2, Sparkles, BookOpen, Download, BrainCircuit, ArrowRight } from 'lucide-react';

export const AITestingSection: React.FC = () => {
  return (
    <div className="space-y-10 my-10">
      {/* SPECIAL TEST PREP SPOTLIGHT (IELTS, SAT, CEFR) */}
      <section className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border border-indigo-500/30 p-8 sm:p-12 shadow-2xl">
          {/* Decorative Glowing Blur Orb */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
            {/* Left Content Column */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-300 text-xs font-black border border-amber-500/20">
                <Award className="w-4 h-4 text-amber-500" /> Xalqaro Imtihon Modullari
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                IELTS 8.5+, Digital SAT 1500+ hamda CEFR Sertifikati Maxsus Modul
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                Cambridge 16-19 kitoblari audiolar bilan, Listening va Reading mock testlari, AI yordamida Instant Writing Task 1 & 2 baholash hamda Band score calculator.
              </p>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold">
                <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-200">
                  <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-500">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  </div>
                  <span>Listening & Reading Timing</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-200">
                  <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-500">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  </div>
                  <span>AI Writing Band Evaluator</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-200">
                  <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-500">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  </div>
                  <span>Digital SAT Desmos Calculator</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-200">
                  <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-500">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  </div>
                  <span>Cambridge Books PDF Download</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/ielts"
                  className="py-3 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-extrabold text-xs shadow-lg shadow-indigo-500/25 active:scale-95 transition-all flex items-center gap-2"
                >
                  IELTS Moduliga O‘tish
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/sat"
                  className="py-3 px-6 rounded-2xl bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-extrabold text-xs border border-slate-300/80 dark:border-slate-700/80 active:scale-95 transition-all"
                >
                  Digital SAT Moduli
                </Link>
              </div>
            </div>

            {/* Visual Interactive Preview */}
            <div className="space-y-4">
              {/* AI Evaluator Preview Card */}
              <div className="p-5 rounded-2xl bg-slate-100/80 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-500" /> AI Essay Band Evaluator Preview
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-extrabold text-[11px] border border-amber-500/20">
                    Band 7.5
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 italic bg-white/60 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800/60 leading-relaxed font-serif">
                  "The rapid development of artificial intelligence has reshaped the modern job market..."
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 text-slate-700 dark:text-slate-300">
                    <span className="block text-slate-400 font-medium">Task Achievement:</span>
                    <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">8.0</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 text-slate-700 dark:text-slate-300">
                    <span className="block text-slate-400 font-medium">Coherence:</span>
                    <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">7.5</span>
                  </div>
                </div>
              </div>

              {/* Cambridge Book Card Preview */}
              <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-xs font-black text-slate-900 dark:text-white">Cambridge IELTS 19 Academic</span>
                    <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-medium">4 ta to‘liq mock test + Audio MP3</span>
                  </div>
                </div>
                <Link 
                  to="/ielts" 
                  className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all active:scale-95"
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
        <div className="relative overflow-hidden p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-950 to-slate-950 border border-indigo-500/40 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          
          {/* Background Glow */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2.5 text-center md:text-left z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
              <BrainCircuit className="w-4 h-4 text-indigo-400 animate-pulse" /> EduAI 2.0 Integratsiyasi
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Sun'iy Intellekt Sizning Shaxsiy Ustozingiz
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Insho va uy vazifalarini tekshirish, grammatika xatolarini tuzatish va siz uchun 30 kunlik shaxsiy o‘quv xaritasini (Roadmap) avtomatik tuzish.
            </p>
          </div>

          <Link 
            to="/ai-assistant" 
            className="z-10 py-3.5 px-8 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-extrabold text-xs sm:text-sm whitespace-nowrap shadow-xl shadow-indigo-500/30 active:scale-95 transition-all"
          >
            EduAI Bilan Sinab Ko‘rish
          </Link>
        </div>
      </section>
    </div>
  );
};