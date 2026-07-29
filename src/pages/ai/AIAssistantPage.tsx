import React, { useState } from 'react';
import { BrainCircuit, Sparkles, Wand2, RefreshCw } from 'lucide-react';

export const AIAssistantPage: React.FC = () => {
  const [mode, setMode] = useState<'essay' | 'grammar' | 'roadmap' | 'speaking'>('essay');
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiOutput, setAiOutput] = useState<string | null>(null);

  const handleGenerate = () => {
    setIsProcessing(true);
    setTimeout(() => {
      if (mode === 'essay') {
        setAiOutput('Writing Band: 7.5\n\nGrammar Fixes:\n- "gained significant attention" -> "drawn substantial interest"\n- "In one hand" -> "On one hand"\n\nTask Achievement: 8.0/9.0. Excellent argumentation!');
      } else if (mode === 'grammar') {
        setAiOutput('Tuzatilgan Matn:\n"If I had known earlier, I would have sent the homework before the deadline."\n\nXatolik turi: Third conditional strukturasi noto‘g‘ri qo‘llanilgan edi.');
      } else if (mode === 'roadmap') {
        setAiOutput('30 KUNLIK SHAXSIY TA\'LIM ROADMAPI (IELTS Band 8.0 Goal):\n- 1-7 kun: Cambridge 18-19 Listening 1-4 tests daily analysis\n- 8-15 kun: Writing Task 2 Cohesion and Vocabulary drilling\n- 16-23 kun: Speaking Part 3 Idioms & Fluency exercises\n- 24-30 kun: Full length timed Mock Exams');
      } else {
        setAiOutput('Speaking Feedback:\nFluency: 8.0 | Pronunciation: 7.5 | Lexical Resource: 7.5\nTavsiya: Pausalarni kamaytirib, "Well, from my perspective..." birikmalaridan unumli foydalaning.');
      }
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
          <BrainCircuit className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-pulse" /> GPT-4 powered EduAI Yordamchi
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Sun'iy Intellekt Bilan Ta'lim Samadorligini Oshiring
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          Essay tekshirish, Grammatika xatolarini tuzatish, Speaking feedback hamda 30 kunlik shaxsiy ta'lim roadmapini yaratish.
        </p>

        {/* Modes */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setMode('essay')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === 'essay' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Essay & Band Checker
          </button>
          <button
            onClick={() => setMode('grammar')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === 'grammar' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Grammar Fixer
          </button>
          <button
            onClick={() => setMode('roadmap')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === 'roadmap' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            30-Day Roadmap Generator
          </button>
          <button
            onClick={() => setMode('speaking')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === 'speaking' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Speaking Feedback
          </button>
        </div>
      </div>

      <div className="glass-card p-6 sm:p-10 max-w-6xl w-full mx-auto space-y-6 border-indigo-500/40">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
            {mode === 'essay' && 'Inshoingizni Shu Yerga Kiriting:'}
            {mode === 'grammar' && 'Tekshirmoqchi bo‘lgan jumlalaringizni kiriting:'}
            {mode === 'roadmap' && 'Maqsadingiz va Tayyorgarlik Vaqtingiz (masalan: 3 oyda IELTS 7.5):'}
            {mode === 'speaking' && 'Speaking javobingiz matni yoki audiosi:'}
          </label>
          <textarea
            rows={6}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Matn yoki maqsadingizni yozing..."
            className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl p-4 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-mono"
          ></textarea>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isProcessing}
          className="btn-primary py-3.5 px-8 text-xs font-bold justify-center w-full sm:w-auto shadow-md shadow-indigo-600/30"
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" /> EduAI Tahlil Qilmoqda...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Wand2 className="w-4 h-4" /> EduAI Yordamida Tahlil Qilish
            </span>
          )}
        </button>

        {aiOutput && (
          <div className="p-6 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-indigo-500/50 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4" /> EduAI Natijasi</span>
              <span>GPT-4 Verified</span>
            </div>
            <pre className="text-xs text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap leading-relaxed font-semibold">
              {aiOutput}
            </pre>
          </div>
        )}
      </div>

    </div>
  );
};

export default AIAssistantPage;
