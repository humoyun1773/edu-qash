import React, { useState, useEffect } from 'react';
import { Trophy, Star, Loader2, Medal, GraduationCap, BookOpen, Users, Building2 } from 'lucide-react';
import { leaderboardApi } from '../../services/leaderboardApi';
import type { LeaderboardStudent } from '../../services/leaderboardApi';
import type { LearningCenter } from '../../types';

type TabType = 'students' | 'teachers' | 'centers' | 'courses';

const TABS: { id: TabType; label: string; icon: React.ReactNode }[] = [
  { id: 'students', label: 'Top Talabalar', icon: <GraduationCap className="w-4 h-4" /> },
  { id: 'teachers', label: 'Top Ustozlar', icon: <Users className="w-4 h-4" /> },
  { id: 'centers', label: 'Top Markazlar', icon: <Building2 className="w-4 h-4" /> },
  { id: 'courses', label: 'Top Kurslar', icon: <BookOpen className="w-4 h-4" /> },
];

// Medal component for top 3 ranks
const RankMedal: React.FC<{ rank: number }> = ({ rank }) => {
  if (rank === 1) {
    return (
      <div className="relative flex items-center justify-center w-10 h-10 shrink-0">
        <div className="absolute inset-0 rounded-full bg-amber-500/20 animate-pulse" />
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-500/40 border-2 border-amber-300">
          <Trophy className="w-5 h-5 text-white" />
        </div>
      </div>
    );
  }
  if (rank === 2) {
    return (
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center shadow-md border-2 border-slate-200 shrink-0">
        <Medal className="w-5 h-5 text-white" />
      </div>
    );
  }
  if (rank === 3) {
    return (
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center shadow-md border-2 border-amber-600 shrink-0">
        <Medal className="w-5 h-5 text-amber-100" />
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
      <span className="text-xs font-black text-slate-600 dark:text-slate-400">#{rank}</span>
    </div>
  );
};

// Row highlight for top 3
const getRowStyle = (rank: number): string => {
  if (rank === 1) return 'bg-gradient-to-r from-amber-50/70 to-yellow-50/40 dark:from-amber-900/20 dark:to-yellow-900/10 border-amber-300/60 dark:border-amber-700/40 shadow-amber-100/60 dark:shadow-none';
  if (rank === 2) return 'bg-gradient-to-r from-slate-50/80 to-slate-100/40 dark:from-slate-800/60 dark:to-slate-900/40 border-slate-300/60 dark:border-slate-600/40';
  if (rank === 3) return 'bg-gradient-to-r from-amber-50/40 to-orange-50/20 dark:from-amber-900/10 dark:to-orange-900/5 border-amber-200/40 dark:border-amber-800/30';
  return 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800';
};

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

  return (
    <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-4xl mx-auto animate-fade-up">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-amber-600 dark:text-yellow-400 text-xs font-bold uppercase tracking-wider">
          <Trophy className="w-4 h-4" /> Platforma Ommaviy Reytingi
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Top Talabalar, Ustozlar va O'quv Markazlar
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          Haftalik hamda oylik eng yuqori natija ko'rsatgan talabalar, eng ko'p ijobiy baholangan ustozlar va eng nufuzli tayyorlov markazlari.
        </p>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {TABS.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase transition-all flex items-center gap-1.5 ${
                tab === item.id
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30 font-extrabold'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {item.icon}
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
          <div className="space-y-3">
            {/* TOP STUDENTS TAB */}
            {tab === 'students' && (
              topStudents.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <GraduationCap className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600" />
                  <p className="text-slate-500 dark:text-slate-400 font-medium">
                    Hozircha ma'lumot mavjud emas
                  </p>
                </div>
              ) : (
                topStudents.map((st) => (
                  <div
                    key={st.rank}
                    className={`p-4 rounded-2xl border flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-200 ${getRowStyle(st.rank)}`}
                  >
                    <div className="flex items-center gap-4">
                      <RankMedal rank={st.rank} />
                      <img
                        src={st.avatar}
                        alt={`${st.name} rasmi`}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-sm"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{st.name}</h4>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{st.tests} ta test topshirgan</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="badge badge-amber font-black">{st.score} ball</span>
                    </div>
                  </div>
                ))
              )
            )}

            {/* TOP CENTERS TAB */}
            {tab === 'centers' && (
              topCenters.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <Building2 className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600" />
                  <p className="text-slate-500 dark:text-slate-400 font-medium">
                    Hozircha ma'lumot mavjud emas
                  </p>
                </div>
              ) : (
                topCenters.map((c, i) => {
                  const rank = i + 1;
                  return (
                    <div
                      key={c.id}
                      className={`p-4 rounded-2xl border flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-200 ${getRowStyle(rank)}`}
                    >
                      <div className="flex items-center gap-4">
                        <RankMedal rank={rank} />
                        <img
                          src={c.logo}
                          alt={`${c.name} logotipi`}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shadow-sm"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">{c.name}</h4>
                          <span className="text-xs text-slate-500 dark:text-slate-400">{c.city}</span>
                        </div>
                      </div>
                      <span className="badge badge-amber font-bold flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-500" /> {c.rating} ({c.reviewsCount})
                      </span>
                    </div>
                  );
                })
              )
            )}

            {/* TOP TEACHERS TAB (Coming soon) */}
            {tab === 'teachers' && (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center border border-indigo-500/20">
                  <Users className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-800 dark:text-slate-200">Ustozlar reytingi shakllanmoqda</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Tez orada mavjud bo'ladi</p>
                </div>
              </div>
            )}

            {/* TOP COURSES TAB (Coming soon) */}
            {tab === 'courses' && (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
                  <BookOpen className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-800 dark:text-slate-200">Kurslar reytingi shakllanmoqda</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Tez orada mavjud bo'ladi</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;