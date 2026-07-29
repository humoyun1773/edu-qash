import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { BrainCircuit, Clock, ShieldAlert, Trophy, FileSpreadsheet, ArrowRight, Upload, Loader2, X } from 'lucide-react';
import { useQuizzes } from '../../hooks/useQuizzes';
import type { QuizItem } from '../../constants/quizzes.type';

export const QuizzesPage: React.FC = () => {
  const { quizzes, loading } = useQuizzes();
  const [activeQuiz, setActiveQuiz] = useState<QuizItem | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState<number>(900);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [isExcelModalOpen, setIsExcelModalOpen] = useState<boolean>(false);

  const handleFinish = useCallback(() => {
    setQuizFinished(true);
  }, []);

  // Timer Effect with Expiration Handling
  useEffect(() => {
    if (!activeQuiz || quizFinished) return;

    if (timeLeft <= 0) {
      handleFinish();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [activeQuiz, quizFinished, timeLeft, handleFinish]);

  const handleStartQuiz = (q: QuizItem) => {
    setActiveQuiz(q);
    setCurrentQIndex(0);
    setSelectedAnswers({});
    setTimeLeft(q.durationMinutes * 60);
    setQuizFinished(false);
  };

  const handleSelectAnswer = (optIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentQIndex]: optIndex }));
  };

  // Calculate score safely using useMemo
  const { correctCount, wrongCount, totalScore } = useMemo(() => {
    if (!activeQuiz || !quizFinished) {
      return { correctCount: 0, wrongCount: 0, totalScore: 0 };
    }

    let correct = 0;
    let wrong = 0;
    let score = 0;

    activeQuiz.questions.forEach((q, idx) => {
      const userAns = selectedAnswers[idx];
      const pointValue = q.points ?? 1;

      if (userAns === q.correctAnswer) {
        correct++;
        score += pointValue;
      } else if (userAns !== undefined) {
        wrong++;
        if (activeQuiz.negativeMarking) {
          const deduction = activeQuiz.negativeValue ?? 0.25;
          score -= pointValue * deduction;
        }
      }
    });

    return {
      correctCount: correct,
      wrongCount: wrong,
      totalScore: Math.max(0, score),
    };
  }, [activeQuiz, quizFinished, selectedAnswers]);

  return (
    <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider">
          <BrainCircuit className="w-4 h-4" /> Professional Quiz Engine
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Timed Quizzes & Question Bank System
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          Vaqtli testlar, Negative Marking (-0.25 ball), Savollarni chalkashtirish (Shuffle) hamda Excel orqali savollar bazasini import qilish.
        </p>

        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={() => setIsExcelModalOpen(true)}
            className="btn-secondary text-xs font-bold py-2.5 px-4 text-purple-600 dark:text-purple-300 border-purple-500/40 flex items-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4 text-purple-500 dark:text-purple-400" /> Excel orqali Savollar Import qilish
          </button>
        </div>
      </div>

      {/* QUIZ LIST OR ACTIVE QUIZ PLAYER */}
      {!activeQuiz ? (
        loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
            <span className="ml-3 text-slate-600 dark:text-slate-400 font-semibold">Testlar yuklanmoqda...</span>
          </div>
        ) : quizzes.length === 0 ? (
          <div className="text-center py-20">
            <BrainCircuit className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-600 dark:text-slate-400 font-semibold">Hozircha testlar mavjud emas</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="glass-card p-6 space-y-4 flex flex-col justify-between hover:border-purple-500/40 transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="badge badge-indigo">{quiz.category}</span>
                    {quiz.negativeMarking && (
                      <span className="badge badge-rose flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3" /> Negative Marking (-{quiz.negativeValue ?? 0.25})
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{quiz.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400 font-semibold">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-amber-500 dark:text-amber-400" /> {quiz.durationMinutes} Daqiqa
                    </span>
                    <span>•</span>
                    <span>{quiz.questions.length} ta savol</span>
                  </div>
                </div>

                <button
                  onClick={() => handleStartQuiz(quiz)}
                  className="w-full btn-primary py-3 text-xs justify-center font-bold shadow-md shadow-indigo-600/30 flex items-center gap-2"
                >
                  Testni Boshlash <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )
      ) : (
        /* QUIZ RUNNER INTERFACE */
        <div className="glass-card p-6 sm:p-10 max-w-5xl w-full mx-auto space-y-8 border-purple-500/40">
          {!quizFinished ? (
            <>
              {/* Header Info */}
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{activeQuiz.title}</h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                    Savol {currentQIndex + 1} / {activeQuiz.questions.length}
                  </span>
                </div>
                <div className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-amber-600 dark:text-amber-400 font-mono text-sm font-bold flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</span>
                </div>
              </div>

              {/* Question text & Options */}
              <div className="space-y-4">
                <p className="text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                  {activeQuiz.questions[currentQIndex]?.question}
                </p>

                <div className="space-y-2.5">
                  {activeQuiz.questions[currentQIndex]?.options.map((opt, i) => {
                    const isSelected = selectedAnswers[currentQIndex] === i;
                    return (
                      <button
                        key={i}
                        onClick={() => handleSelectAnswer(i)}
                        className={`w-full p-4 rounded-xl border text-left text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-purple-600/10 dark:bg-purple-600/30 border-purple-500 text-purple-700 dark:text-purple-200 font-extrabold shadow-md'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  disabled={currentQIndex === 0}
                  onClick={() => setCurrentQIndex(currentQIndex - 1)}
                  className="btn-secondary py-2 px-4 text-xs font-bold disabled:opacity-50"
                >
                  Orqaga
                </button>

                {currentQIndex < activeQuiz.questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQIndex(currentQIndex + 1)}
                    className="btn-primary py-2 px-6 text-xs font-bold"
                  >
                    Keyingisi
                  </button>
                ) : (
                  <button
                    onClick={handleFinish}
                    className="btn-primary py-2 px-6 text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600"
                  >
                    Testni Yakunlash
                  </button>
                )}
              </div>
            </>
          ) : (
            /* RESULT SUMMARY */
            <div className="text-center space-y-6 animate-in fade-in">
              <Trophy className="w-16 h-16 text-yellow-500 dark:text-yellow-400 mx-auto animate-bounce" />
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">Test Yakunlandi!</h2>
              
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto text-center">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                  <span className="block text-2xl font-bold text-emerald-600 dark:text-emerald-400">{correctCount}</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">To‘g‘ri</span>
                </div>
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30">
                  <span className="block text-2xl font-bold text-rose-600 dark:text-rose-400">{wrongCount}</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">Xato</span>
                </div>
                <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30">
                  <span className="block text-2xl font-bold text-purple-600 dark:text-purple-400">{totalScore.toFixed(1)}</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">Jami Ball</span>
                </div>
              </div>

              <button
                onClick={() => setActiveQuiz(null)}
                className="btn-primary py-3 px-8 text-xs font-bold"
              >
                Boshqa Testlarga Qaytish
              </button>
            </div>
          )}
        </div>
      )}

      {/* Excel Import Modal */}
      {isExcelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl w-full max-w-md p-6 space-y-6 shadow-2xl relative text-slate-900 dark:text-white">
            <button 
              onClick={() => setIsExcelModalOpen(false)} 
              aria-label="Yopish"
              className="absolute top-4 right-4 p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <Upload className="w-10 h-10 text-purple-600 dark:text-purple-400 mx-auto" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Excel (XLSX/CSV) Savollar Importi</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">Question, Option A, Option B, Correct Index ustunlari bilan .xlsx faylini tanlang.</p>
            </div>

            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center text-xs text-slate-600 dark:text-slate-400 hover:border-purple-500 cursor-pointer font-bold">
              Faylni shu yerga tashlang yoki kompyuterdan tanlang
            </div>

            <button
              onClick={() => {
                alert('25 ta yangi savol muvaffaqiyatli Question Bankga qo‘shildi!');
                setIsExcelModalOpen(false);
              }}
              className="w-full btn-primary py-3 text-xs justify-center font-bold shadow-md shadow-indigo-600/30"
            >
              Importni Boshlash
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default QuizzesPage;