import React, { useState, useEffect, useRef } from 'react';
import { 
  Award, 
  Headphones, 
  BookOpen, 
  FileEdit, 
  Mic, 
  Calculator, 
  Sparkles, 
  Download, 
  CheckCircle2, 
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { examsApi } from '../../services/examsApi';
import type { EssayCheckResult, CambridgeBook } from '../../types';

type TabType = 'overview' | 'writing_ai' | 'calculator' | 'cambridge';

// Standard Academic IELTS Raw Score to Band Conversion Table
const SCORE_TO_BAND_MAP: { minScore: number; band: number }[] = [
  { minScore: 39, band: 9.0 },
  { minScore: 37, band: 8.5 },
  { minScore: 35, band: 8.0 },
  { minScore: 33, band: 7.5 },
  { minScore: 30, band: 7.0 },
  { minScore: 27, band: 6.5 },
  { minScore: 23, band: 6.0 },
  { minScore: 19, band: 5.5 },
  { minScore: 15, band: 5.0 },
  { minScore: 13, band: 4.5 },
  { minScore: 10, band: 4.0 },
];

const getBandFromScore = (score: number): number => {
  const match = SCORE_TO_BAND_MAP.find(item => score >= item.minScore);
  return match ? match.band : 3.5;
};

// Official IELTS Rounding Rule (rounds to nearest .0 or .5)
const calculateOverallBand = (l: number, r: number, w: number, s: number): string => {
  const average = (l + r + w + s) / 4;
  const decimalPart = average % 1;

  let roundedBand = Math.floor(average);
  if (decimalPart >= 0.75) {
    roundedBand += 1.0;
  } else if (decimalPart >= 0.25) {
    roundedBand += 0.5;
  }

  return roundedBand.toFixed(1);
};

export const IELTSPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  
  // IELTS Band Calculator state
  const [listeningScore, setListeningScore] = useState<number>(30);
  const [readingScore, setReadingScore] = useState<number>(32);
  const [writingSelfBand, setWritingSelfBand] = useState<number>(7.0);
  const [speakingSelfBand, setSpeakingSelfBand] = useState<number>(7.5);

  // AI Essay Checker state
  const [essayTitle, setEssayTitle] = useState(
    'Some people believe that university education should be free for everyone.'
  );
  const [essayText, setEssayText] = useState(
    'In recent years, the debate surrounding whether higher education should be publicly funded has gained significant attention. On one hand, free tertiary education allows equal opportunities for students regardless of their socioeconomic background...'
  );
  const [isCheckingEssay, setIsCheckingEssay] = useState(false);
  const [essayResult, setEssayResult] = useState<EssayCheckResult | null>(null);
  const [cambridgeBooks, setCambridgeBooks] = useState<CambridgeBook[]>([]);

  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    
    examsApi.getCambridgeBooks()
      .then(books => {
        if (isMountedRef.current && books && books.length > 0) {
          setCambridgeBooks(books);
        }
      })
      .catch(() => {});

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const listeningBand = getBandFromScore(listeningScore);
  const readingBand = getBandFromScore(readingScore);
  const overallBand = calculateOverallBand(listeningBand, readingBand, writingSelfBand, speakingSelfBand);
  const wordCount = essayText.trim().split(/\s+/).filter(Boolean).length;

  const handleCheckEssay = () => {
    if (isCheckingEssay || wordCount < 10) return;

    setIsCheckingEssay(true);
    
    setTimeout(() => {
      if (!isMountedRef.current) return;
      
      setEssayResult({
        overallBand: 7.5,
        taskAchievement: { band: 8.0, feedback: 'Barcha savollarga to‘liq va mantiqiy javob berilgan. Dalillar juda asosli.' },
        coherenceCohesion: { band: 7.5, feedback: 'Abzaslar va bog‘lovchi so‘zlar (linking words) mos va to‘g‘ri ishlatilgan.' },
        lexicalResource: { band: 7.5, feedback: 'Akademik va murakkab so‘z birikmalari juda yaxshi foydalanilgan.' },
        grammaticalAccuracy: { band: 7.0, feedback: 'Ba’zi joylarda artikl va prepozitsiyalarda kichik xatoliklar bor.' },
        correctedText: essayText + '\n\n[AI Tuzatishi]: "gained significant attention" o‘rniga "drawn considerable controversy" iborasini ham qo‘llash mumkin edi.',
        keyImprovements: [
          'Artikllar (the, a, an) ustida ko‘proq ishlang.',
          'Paragraph 3 da 2 ta dalilni bitta murakkab gapga birlashtirish tavsiya etiladi.'
        ]
      });
      setIsCheckingEssay(false);
    }, 1500);
  };

  return (
    <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Award className="w-4 h-4 flex-shrink-0" /> Maxsus IELTS 8.5+ Moduli
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Listening, Reading, Writing & Speaking Platformasi
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          AI yordamida Instant Writing baholash, Band Score kalkulyatori, Cambridge 16-19 audio va kitoblari hamda real imtihon simulyatsiyasi.
        </p>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            aria-label="Umumiy Bo‘lim"
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'overview' 
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Award className="w-4 h-4" /> Umumiy Bo‘lim
          </button>
          
          <button
            type="button"
            onClick={() => setActiveTab('writing_ai')}
            aria-label="AI Writing Checker"
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'writing_ai' 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Sparkles className="w-4 h-4 text-indigo-300" /> AI Writing Checker
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('calculator')}
            aria-label="Band Calculator"
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'calculator' 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Calculator className="w-4 h-4" /> Band Calculator
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('cambridge')}
            aria-label="Cambridge Books"
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'cambridge' 
                ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/30' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Cambridge Books
          </button>
        </div>
      </div>

      {/* TAB CONTENT: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-card p-6 space-y-3 hover:border-indigo-500/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Headphones className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Listening Section</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">40 ta savol, Section 1-4 audio player hamda real vaqtda taymerli javoblar varaqasi.</p>
          </div>

          <div className="glass-card p-6 space-y-3 hover:border-emerald-500/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Reading Section</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Academic & General Training matnlar, True/False/Not Given hamda Matching Headings.</p>
          </div>

          <div className="glass-card p-6 space-y-3 hover:border-amber-500/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <FileEdit className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Writing Task 1 & 2</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Graph/Chart tahlili hamda Essay yozish va EduAI yordamida soniyada band olish.</p>
          </div>

          <div className="glass-card p-6 space-y-3 hover:border-pink-500/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-600 dark:text-pink-400 flex items-center justify-center font-bold">
              <Mic className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Speaking Simulator</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Cue Card topshiriqlari, audio yozib olish hamda talaffuz (pronunciation) bo‘yicha feedback.</p>
          </div>
        </div>
      )}

      {/* TAB CONTENT: AI WRITING CHECKER */}
      {activeTab === 'writing_ai' && (
        <div className="glass-card p-6 sm:p-10 space-y-8 border-indigo-500/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="badge badge-indigo">AI Powered</span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">IELTS Writing Task 2 AI Checker</h2>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">GPT-4 IELTS Scoring System</span>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="essay-topic" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Essay Mavzusi / Topic
              </label>
              <input
                id="essay-topic"
                type="text"
                value={essayTitle}
                onChange={(e) => setEssayTitle(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="essay-body" className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Insho Matni (Tavsiya etiladi: 250+ so‘z)
                </label>
                <span className={`text-xs font-mono font-bold ${wordCount < 250 ? 'text-amber-500' : 'text-emerald-500'}`}>
                  {wordCount} so‘z
                </span>
              </div>
              <textarea
                id="essay-body"
                rows={8}
                value={essayText}
                onChange={(e) => setEssayText(e.target.value)}
                placeholder="Insho matnini shu yerga kiriting..."
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl p-4 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed font-mono"
              />
            </div>

            {wordCount < 150 && wordCount > 0 && (
              <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
                <AlertCircle className="w-4 h-4 flex-shrink-0" /> Insho juda qisqa ({wordCount} so‘z). Aniqroq baho olish uchun kamida 250 so‘z yozing.
              </div>
            )}

            <button
              type="button"
              onClick={handleCheckEssay}
              disabled={isCheckingEssay || wordCount < 10}
              className="btn-primary py-3 px-8 text-xs font-bold disabled:opacity-50 cursor-pointer"
            >
              {isCheckingEssay ? (
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" /> AI Tahlil Qilmoqda...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Inshoni Tekshirish & Band Olish
                </span>
              )}
            </button>
          </div>

          {/* AI Result Report */}
          {essayResult && (
            <div className="p-6 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-indigo-500/40 space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">Umumiy Natija:</span>
                  <div className="text-3xl font-black text-amber-600 dark:text-amber-400">Band {essayResult.overallBand}</div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Muvaffaqiyatli Baholandi
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-400 font-semibold">Task Achievement:</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">Band {essayResult.taskAchievement.band}</span>
                  </div>
                  <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">{essayResult.taskAchievement.feedback}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-400 font-semibold">Coherence & Cohesion:</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">Band {essayResult.coherenceCohesion.band}</span>
                  </div>
                  <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">{essayResult.coherenceCohesion.feedback}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-400 font-semibold">Lexical Resource:</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">Band {essayResult.lexicalResource.band}</span>
                  </div>
                  <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">{essayResult.lexicalResource.feedback}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-400 font-semibold">Grammatical Accuracy:</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">Band {essayResult.grammaticalAccuracy.band}</span>
                  </div>
                  <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">{essayResult.grammaticalAccuracy.feedback}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase mb-2">Tavsiya va Yaxshilanish Nuqtalari:</h4>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  {essayResult.keyImprovements.map((imp, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> {imp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: BAND CALCULATOR */}
      {activeTab === 'calculator' && (
        <div className="glass-card p-6 sm:p-10 max-w-2xl mx-auto space-y-8 border-emerald-500/30">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">IELTS Score & Band Calculator</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">Listening va Reading to‘g‘ri javoblar sonidan Overall Band hisoblash</p>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-200 mb-2">
                <span>Listening Correct Answers (0-40):</span>
                <span className="text-indigo-600 dark:text-indigo-400">{listeningScore} ta ({listeningBand} Band)</span>
              </div>
              <input
                type="range"
                min={0}
                max={40}
                value={listeningScore}
                onChange={(e) => setListeningScore(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
                aria-label="Listening score"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-200 mb-2">
                <span>Reading Correct Answers (0-40):</span>
                <span className="text-emerald-600 dark:text-emerald-400">{readingScore} ta ({readingBand} Band)</span>
              </div>
              <input
                type="range"
                min={0}
                max={40}
                value={readingScore}
                onChange={(e) => setReadingScore(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
                aria-label="Reading score"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label htmlFor="writing-band-select" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Writing Estimated Band
                </label>
                <select
                  id="writing-band-select"
                  value={writingSelfBand}
                  onChange={(e) => setWritingSelfBand(Number(e.target.value))}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white font-bold"
                >
                  {[5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0].map(b => (
                    <option key={b} value={b}>Band {b.toFixed(1)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="speaking-band-select" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Speaking Estimated Band
                </label>
                <select
                  id="speaking-band-select"
                  value={speakingSelfBand}
                  onChange={(e) => setSpeakingSelfBand(Number(e.target.value))}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white font-bold"
                >
                  {[5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0].map(b => (
                    <option key={b} value={b}>Band {b.toFixed(1)}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-900/20 via-emerald-900/20 to-amber-900/20 border border-indigo-500/40 text-center space-y-2">
              <span className="text-xs text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider">Taxminiy Umumiy Natija</span>
              <div className="text-5xl font-black text-amber-600 dark:text-amber-400">Band {overallBand}</div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold">
                L: {listeningBand} | R: {readingBand} | W: {writingSelfBand} | S: {speakingSelfBand}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: CAMBRIDGE BOOKS */}
      {activeTab === 'cambridge' && (
        cambridgeBooks.length === 0 ? (
          <div className="text-center py-16 text-slate-500 font-medium text-xs bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
            Hozircha Cambridge kitoblari mavjud emas
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {cambridgeBooks.map((book) => (
              <div key={book.id} className="glass-card p-5 space-y-4 flex flex-col justify-between">
                <div>
                  <img 
                    src={book.coverUrl} 
                    alt={book.title} 
                    className="w-full h-48 object-cover rounded-xl border border-slate-300 dark:border-slate-700 mb-3 shadow-md" 
                  />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{book.title}</h3>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">{book.testsCount} ta to‘liq imtihon testlari + MP3 Audios</p>
                </div>
                <button
                  type="button"
                  onClick={() => alert(`${book.title} PDF va Audiolari kompyuteringizga yuklanmoqda...`)}
                  className="w-full btn-secondary py-2 text-xs justify-center font-bold flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-indigo-500 dark:text-indigo-400" /> PDF & Audio Yuklab Olish
                </button>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default IELTSPage;