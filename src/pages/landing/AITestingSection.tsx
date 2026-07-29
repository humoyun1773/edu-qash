import React from 'react';
import { Link } from 'react-router-dom';
import { Award, CheckCircle2, Sparkles, BookOpen, Download, BrainCircuit } from 'lucide-react';

export const AITestingSection: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* SPECIAL TEST PREP SPOTLIGHT (IELTS, SAT, CEFR) */}
      <section className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 sm:p-12 relative overflow-hidden border-indigo-500/30">
          {/* Decorative Background Glow */}
          <div 
            className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" 
            aria-hidden="true" 
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
            {/* Main Content Column */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-300 text-xs font-bold border border-amber-500/30">
                <Award className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0" /> 
                Xalqaro Imtihon Modullari
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                IELTS 8.5+, Digital SAT 1500+ hamda CEFR Sertifikati Maxsus Modul
              </h2>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Cambridge 16-19 kitoblari audiolar bilan, Listening va Reading mock testlari, AI yordamida Instant Writing Task 1 & 2 baholash hamda Band score calculator.
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs font-semibold">
                <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" /> Listening & Reading Timing
                </div>
                <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" /> AI Writing Band Evaluator
                </div>
                <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" /> Digital SAT Desmos Calculator
                </div>
                <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" /> Cambridge Books PDF Download
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/ielts" className="btn-primary text-xs font-bold py-3 px-6">
                  IELTS Moduliga O‘tish
                </Link>
                <Link to="/sat" className="btn-secondary text-xs font-bold py-3 px-6">
                  Digital SAT Moduli
                </Link>
              </div>
            </div>

            {/* Visual Interactive Preview Column */}
            <div className="space-y-4">
              {/* AI Evaluator Interactive Card */}
              <div className="p-5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" /> 
                    AI Essay Band Evaluator Preview
                  </span>
                  <span className="badge badge-amber">Band 7.5</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 italic bg-slate-100 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                  "The rapid development of artificial intelligence has reshaped the modern job market..."
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    <span className="block text-slate-500 dark:text-slate-500">Task Achievement:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">8.0</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    <span className="block text-slate-500 dark:text-slate-500">Coherence:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">7.5</span>
                  </div>
                </div>
              </div>

              {/* Cambridge Book Download Card Preview */}
              <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 flex items-center justify-between shadow-xl">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-8 h-8 text-amber-500 dark:text-amber-400 shrink-0" />
                  <div>
                    <span className="block text-xs font-bold text-slate-900 dark:text-white">
                      Cambridge IELTS 19 Academic
                    </span>
                    <span className="block text-[10px] text-slate-500 dark:text-slate-400">
                      4 ta to‘liq mock test + Audio MP3
                    </span>
                  </div>
                </div>
                <Link 
                  to="/ielts" 
                  aria-label="Download Cambridge IELTS 19"
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all"
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
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 border border-indigo-500/40 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold">
              <BrainCircuit className="w-4 h-4 text-indigo-400 animate-spin shrink-0" /> 
              EduAI 2.0 Integratsiyasi
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Sun'iy Intellekt Sizning Shaxsiy Ustozingiz
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Insho va uy vazifalarini tekshirish, gramatika xatolarini tuzatish va siz uchun 30 kunlik shaxsiy o‘quv xaritasini (Roadmap) avtomatik tuzish.
            </p>
          </div>

          <Link 
            to="/ai-assistant" 
            className="btn-primary py-3.5 px-8 text-sm font-extrabold whitespace-nowrap shadow-lg shadow-indigo-500/40"
          >
            EduAI Bilan Sinab Ko‘rish
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AITestingSection;