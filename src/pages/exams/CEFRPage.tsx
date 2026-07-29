import React, { useState } from 'react';
import { ShieldCheck, Award, Loader2, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

interface LevelOption {
  level: CEFRLevel;
  title: string;
  desc: string;
}

const CEFR_LEVELS: LevelOption[] = [
  { level: 'A1', title: 'Beginner / Elementar', desc: 'Boshlang‘ich daraja. Oddiy iboralar va so‘zlarni tushunish.' },
  { level: 'A2', title: 'Elementary', desc: 'Kundalik suhbatlar va asosiy grammatik strukturalar.' },
  { level: 'B1', title: 'Intermediate (Milliy Sertifikat)', desc: 'O‘rta daraja. Ish va o‘qish muhitida silliq muloqot.' },
  { level: 'B2', title: 'Vantage / Upper-Intermediate', desc: 'OTM grantlari va magistratura uchun talab qilinadigan daraja.' },
  { level: 'C1', title: 'Effective Operational Proficiency', desc: 'Oliy darajadagi akademik bilimlarni namoyish etish.' },
];

export const CEFRPage: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel>('B2');
  const [examStarted, setExamStarted] = useState(false);
  const [examResult, setExamResult] = useState<string | null>(null);

  // Clear previous exam result when switching levels
  const handleLevelSelect = (level: CEFRLevel) => {
    if (examStarted) return;
    setSelectedLevel(level);
    setExamResult(null);
  };

  const handleStartExam = () => {
    if (examStarted) return;

    setExamStarted(true);
    setExamResult(null);

    // Simulate online exam evaluation (2 seconds)
    const timer = setTimeout(() => {
      setExamStarted(false);
      setExamResult(`Tabriklaymiz! Siz CEFR ${selectedLevel} imtihonidan muvaffaqiyatli o‘tdingiz (Daraja: Distinction - 88%)`);
    }, 2000);

    return () => clearTimeout(timer);
  };

  const handleResetExam = () => {
    setExamResult(null);
    setExamStarted(false);
  };

  return (
    <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Section */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 flex-shrink-0" /> CEFR Milliy Sertifikat Hubi
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          CEFR A1 - C1 Imtihon va Sertifikatlashtirish
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          Davlat xizmati va oliygohlarga kirish uchun CEFR darajangizni aniqlang va sertifikat oling.
        </p>
      </div>

      {/* CEFR Level Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {CEFR_LEVELS.map((item) => {
          const isSelected = selectedLevel === item.level;
          return (
            <button
              key={item.level}
              type="button"
              disabled={examStarted}
              onClick={() => handleLevelSelect(item.level)}
              aria-label={`CEFR Level ${item.level}`}
              className={`p-5 rounded-2xl border text-left space-y-2 transition-all ${
                isSelected
                  ? 'bg-cyan-600/10 dark:bg-cyan-600/30 border-cyan-500 text-slate-900 dark:text-white shadow-xl shadow-cyan-500/20 font-extrabold ring-1 ring-cyan-500/50'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
              } ${examStarted ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <span className="badge badge-cyan font-bold">{item.level} Level</span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">{item.title}</h3>
              <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">{item.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Online Exam Interactive Section */}
      <div className="glass-card p-6 sm:p-8 border-cyan-500/30 text-center space-y-6 max-w-5xl w-full mx-auto shadow-2xl">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          CEFR {selectedLevel} Onlayn Imtihon Testi
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Ushbu test 30 daqiqa davom etadi. Grammatika, Lug‘at hamda Matn o‘qib tushunish bo‘limlaridan iborat.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleStartExam}
            disabled={examStarted}
            className="btn-primary py-3.5 px-8 text-xs font-bold justify-center flex items-center gap-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50"
          >
            {examStarted ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" /> Imtihon Bajarilmoqda...
              </>
            ) : (
              `CEFR ${selectedLevel} Imtihonini Boshlash`
            )}
          </button>

          {examResult && (
            <button
              type="button"
              onClick={handleResetExam}
              className="py-3.5 px-6 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Qayta Topshirish
            </button>
          )}
        </div>

        {/* Result Card Banner */}
        {examResult && (
          <div className="p-6 rounded-2xl bg-cyan-500/10 dark:bg-cyan-950/60 border border-cyan-500 space-y-4 animate-in fade-in transition-all">
            <div className="text-sm sm:text-base font-bold text-cyan-700 dark:text-cyan-300">{examResult}</div>
            <Link
              to="/verify/EDUQ-2024-77419"
              className="btn-secondary py-2.5 px-6 text-xs inline-flex items-center gap-2 font-bold shadow-md"
            >
              <Award className="w-4 h-4 text-cyan-500 dark:text-cyan-400" /> Sertifikatni Ko‘rish & QR Yuklab Olish
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CEFRPage;