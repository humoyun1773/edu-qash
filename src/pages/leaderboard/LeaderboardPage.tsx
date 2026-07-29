import React, { useState, useEffect } from 'react';
import { Trophy, Star, Loader2, Medal } from 'lucide-react';
import { leaderboardApi } from '../../services/leaderboardApi';
import type { LeaderboardStudent } from '../../services/leaderboardApi';
import type { LearningCenter } from '../../types';

type TabType = 'students' | 'teachers' | 'centers' | 'courses';

const TABS: { id: TabType; label: string }[] = [
  { id: 'students', label: 'Top Talabalar' },
  { id: 'teachers', label: 'Top Ustozlar' },
  { id: 'centers', label: 'Top Markazlar' },
  { id: 'courses', label: 'Top Kurslar' },
];

export const LeaderboardPage: React.FC = () => {
  const [tab, setTab] = useState<TabType>('students');
  const [topStudents, setTopStudents] = useState<LeaderboardStudent[]>([]);
  const [topCenters, setTopCenters] = useState<LearningCenter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    Promise.all([
      leaderboardApi.getTopStudents(),
      leaderboardApi.getTopCenters()
    ])
      .then(([students, centers]) => {
        if (isMounted) {
          setTopStudents(students || []);
          setTopCenters(centers || []);
        }
      })
      .catch(() => {
        if (isMounted) {
          setTopStudents([]);
          setTopCenters([]);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const getRankBadgeStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20';
      case 2:
        return 'bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-white font-bold';
      case 3:
        return 'bg-amber-700/80 text-white font-bold';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold';
    }
  };

  return (
    <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header & Tab Selector */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-amber-600 dark:text-yellow-400 text-xs font-bold uppercase tracking-wider">
          <Trophy className="w-4 h-4" /> Platforma Ommaviy Reytingi
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Top Talabalar, Ustozlar va O‘quv Markazlar
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          Haftalik hamda oylik eng yuqori natija ko‘rsatgan talabalar, eng ko‘p ijobiy baholangan ustozlar va eng nufuzli tayyorlov markazlari.
        </p>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {TABS.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase transition-all ${
                tab === item.id
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30 font-extrabold'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard Card Container */}
      <div className="glass-card p-6 sm:p-8 max-w-5xl w-full mx-auto border-yellow-500/30">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
            <span className="ml-3 text-slate-600 dark:text-slate-400 font-semibold">
              Reyting yuklanmoqda...
            </span>
          </div>
        ) : (
          <div className="space-y-4">
            {/* TOP STUDENTS TAB */}
            {tab === 'students' && (
              topStudents.length === 0 ? (
                <p className="text-center py-12 text-slate-500 dark:text-slate-400 font-medium">
                  Hozircha ma'lumot mavjud emas
                </p>
              ) : (
                topStudents.map((st) => (
                  <div 
                    key={st.rank} 
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm hover:border-amber-500/30 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs ${getRankBadgeStyle(st.rank)}`}>
                        #{st.rank}
                      </div>
                      <img 
                        src={st.avatar} 
                        alt={`${st.name} rasmi`} 
                        className="w-10 h-10 rounded-full object-cover border border-slate-300 dark:border-slate-700" 
                      />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{st.name}</h4>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{st.tests} ta test topshirgan</span>
                      </div>
                    </div>
                    <span className="badge badge-amber font-bold">{st.score}</span>
                  </div>
                ))
              )
            )}

            {/* TOP CENTERS TAB */}
            {tab === 'centers' && (
              topCenters.length === 0 ? (
                <p className="text-center py-12 text-slate-500 dark:text-slate-400 font-medium">
                  Hozircha ma'lumot mavjud emas
                </p>
              ) : (
                topCenters.map((c, i) => {
                  const rank = i + 1;
                  return (
                    <div 
                      key={c.id} 
                      className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm hover:border-amber-500/30 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs ${getRankBadgeStyle(rank)}`}>
                          #{rank}
                        </div>
                        <img 
                          src={c.logo} 
                          alt={`${c.name} logotipi`} 
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700" 
                        />
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">{c.name}</h4>
                          <span className="text-xs text-slate-500 dark:text-slate-400">{c.city}</span>
                        </div>
                      </div>
                      <span className="text-xs text-amber-600 dark:text-yellow-400 font-bold flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-500 dark:fill-yellow-400" /> {c.rating} ({c.reviewsCount})
                      </span>
                    </div>
                  );
                })
              )
            )}

            {/* TOP TEACHERS TAB (Placeholder state) */}
            {tab === 'teachers' && (
              <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                <Medal className="w-10 h-10 mx-auto mb-2 text-slate-400 opacity-60" />
                <p className="font-semibold text-sm">Ustozlar reytingi shakllanmoqda</p>
              </div>
            )}

            {/* TOP COURSES TAB (Placeholder state) */}
            {tab === 'courses' && (
              <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                <Trophy className="w-10 h-10 mx-auto mb-2 text-slate-400 opacity-60" />
                <p className="font-semibold text-sm">Kurslar reytingi shakllanmoqda</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;