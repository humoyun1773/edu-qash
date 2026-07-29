import React, { useState } from 'react';
import { Sparkles, Calculator, CheckCircle2, XCircle } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

export const SATPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'math' | 'reading'>('math');
  const [desmosOpen, setDesmosOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});

  const mathQuestions: Question[] = [
    {
      id: 1,
      question: 'If 3x + 2y = 12 and x - y = 4, what is the value of x?',
      options: ['A) 2', 'B) 4', 'C) 6', 'D) 8'],
      answer: 'B) 4'
    },
    {
      id: 2,
      question: 'A line in the xy-plane passes through (0, 3) and (2, 7). What is its equation?',
      options: ['A) y = 2x + 3', 'B) y = 3x + 2', 'C) y = 4x + 3', 'D) y = 2x + 7'],
      answer: 'A) y = 2x + 3'
    }
  ];

  const readingQuestions: Question[] = [
    {
      id: 101,
      question: 'Which choice completes the text with the most logical and precise word or phrase?',
      options: ['A) augmented', 'B) diminished', 'C) standardized', 'D) obscured'],
      answer: 'A) augmented'
    }
  ];

  const currentQuestions = activeSection === 'math' ? mathQuestions : readingQuestions;

  const handleSelectOption = (questionId: number, option: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: option
    }));
  };

  // Calculate score dynamically based on user selections
  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = Object.entries(selectedAnswers).reduce((acc, [qId, selected]) => {
    const question = [...mathQuestions, ...readingQuestions].find((q) => q.id === Number(qId));
    return question && question.answer === selected ? acc + 1 : acc;
  }, 0);

  return (
    <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-600 dark:text-pink-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" /> Digital SAT 1500+ Platformasi
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Adaptive Digital SAT Practice & Desmos Shortcuts
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          Yangi Digital SAT 2026 formatidagi Math hamda Reading & Writing bo‘limlari simulyatori, Desmos kalkulyator tryuklari.
        </p>
      </div>

      <div className="glass-card p-6 sm:p-10 space-y-8 border-pink-500/30">
        {/* Navigation & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveSection('math')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeSection === 'math'
                  ? 'bg-pink-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              Math Section (Module 1 & 2)
            </button>
            <button
              onClick={() => setActiveSection('reading')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeSection === 'reading'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              Reading & Writing Section
            </button>
          </div>

          <button
            onClick={() => setDesmosOpen(!desmosOpen)}
            className="btn-secondary py-2 px-4 text-xs font-bold border-pink-500/40 text-pink-600 dark:text-pink-300 flex items-center gap-2"
          >
            <Calculator className="w-4 h-4 text-pink-500 dark:text-pink-400" />
            {desmosOpen ? 'Hide Desmos' : 'Desmos Graphing Calculator Sim'}
          </button>
        </div>

        {/* Embedded Desmos Calculator Panel */}
        {desmosOpen && (
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-pink-500/50 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between text-xs font-bold text-pink-600 dark:text-pink-400">
              <span>Desmos Graphing Calculator (Interactive)</span>
              <span>SAT Approved</span>
            </div>
            <div className="h-96 w-full rounded-xl overflow-hidden border border-slate-300 dark:border-slate-800">
              <iframe
                src="https://www.desmos.com/calculator"
                title="Desmos Graphing Calculator"
                className="w-full h-full border-0"
              />
            </div>
          </div>
        )}

        {/* Questions Section */}
        <div className="space-y-6">
          {currentQuestions.map((q) => {
            const userSelected = selectedAnswers[q.id];

            return (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 space-y-3 shadow-md"
              >
                <div className="flex items-center justify-between text-xs font-bold text-pink-600 dark:text-pink-400">
                  <span>
                    SAT {activeSection === 'math' ? 'Math' : 'Reading'} Question #{q.id}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">Hard Level</span>
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{q.question}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {q.options.map((opt) => {
                    const isSelected = userSelected === opt;
                    const isCorrect = opt === q.answer;

                    let buttonStyle =
                      'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200';

                    if (userSelected) {
                      if (isSelected) {
                        buttonStyle = isCorrect
                          ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold'
                          : 'bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400 font-bold';
                      } else if (isCorrect) {
                        buttonStyle =
                          'bg-emerald-500/5 border-emerald-500/40 text-emerald-600 dark:text-emerald-400';
                      }
                    }

                    return (
                      <button
                        key={opt}
                        onClick={() => handleSelectOption(q.id, opt)}
                        className={`p-3 rounded-xl border text-left transition-all font-medium flex items-center justify-between ${buttonStyle}`}
                      >
                        <span>{opt}</span>
                        {userSelected && isSelected && (
                          isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                          )
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Real-time score output */}
          {answeredCount > 0 && (
            <div className="p-6 rounded-2xl bg-pink-500/10 border border-pink-500/50 text-center space-y-2">
              <span className="text-xs text-pink-600 dark:text-pink-300 font-bold uppercase">
                Current Practice Accuracy
              </span>
              <div className="text-4xl font-black text-slate-900 dark:text-white">
                {correctCount} / {answeredCount} Correct
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-bold">
                Estimated Scaling: {Math.round(400 + (correctCount / answeredCount) * 1200)} / 1600
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SATPage;