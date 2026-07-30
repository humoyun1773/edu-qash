import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  BrainCircuit, 
  Award, 
  UserCheck, 
  Loader2, 
  ArrowRight, 
  Sparkles, 
  GraduationCap, 
  CheckCircle2, 
  FileDown,
  BarChart2,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useStudent } from '../../../hooks/useStudent';
import { DashboardSidebar } from '../common/DashboardSidebar';
import { DashboardSettings } from '../DashboardSettings';
import { getStudentTabs, type StudentTabType } from './studentTabs';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [studentTab, setStudentTab] = useState<StudentTabType>('courses');
  const { courses, certificates, results, loading } = useStudent();

  const studentTabs = getStudentTabs(courses?.length || 0, certificates?.length || 0);

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 transition-colors duration-300 space-y-8 pb-12">
      
      {/* 1. TOP BANNER / WELCOME PROFILE CARD */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 p-6 sm:p-10 text-white shadow-2xl shadow-indigo-950/20 border border-indigo-500/10">
        {/* Glow Effects */}
        <div className="absolute -right-16 -bottom-16 w-72 h-72 bg-violet-500/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -top-16 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-amber-400 p-0.5 shadow-xl transition-transform duration-300 group-hover:scale-105">
                <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-2xl font-black text-indigo-300">
                  {user?.displayName ? user.displayName.charAt(0).toUpperCase() : <GraduationCap className="w-8 h-8 text-indigo-400" />}
                </div>
              </div>
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full shadow-md" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 backdrop-blur-md border border-indigo-400/20 text-xs font-semibold text-indigo-200 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span>Talaba Kabineti</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Xush kelibsiz, {user?.displayName || 'Talaba'}! 👋
              </h1>
              <p className="text-sm text-indigo-200/80 mt-1">
                Bugun yangi bilimlarni egallash uchun ajoyib kun.
              </p>
            </div>
          </div>

          {/* Quick Stats Banner Widgets */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 bg-white/5 backdrop-blur-xl p-3 sm:p-4 rounded-2xl border border-white/10 shadow-inner">
            <div className="text-center px-2 sm:px-4">
              <span className="block text-[11px] uppercase tracking-wider text-indigo-200/70 font-bold">Kurslar</span>
              <span className="text-xl sm:text-2xl font-black text-white">{courses?.length || 0}</span>
            </div>
            <div className="text-center px-2 sm:px-4 border-x border-white/10">
              <span className="block text-[11px] uppercase tracking-wider text-indigo-200/70 font-bold">Natijalar</span>
              <span className="text-xl sm:text-2xl font-black text-white">{results?.length || 0}</span>
            </div>
            <div className="text-center px-2 sm:px-4">
              <span className="block text-[11px] uppercase tracking-wider text-indigo-200/70 font-bold">Sertifikat</span>
              <span className="text-xl sm:text-2xl font-black text-white">{certificates?.length || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DASHBOARD BODY */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* COLLAPSIBLE SIDEBAR */}
        <div className="lg:w-72 shrink-0">
          <DashboardSidebar
            title="Talaba Kabineti"
            activeTab={studentTab}
            onSelectTab={setStudentTab}
            tabs={studentTabs}
            accentGradient="from-indigo-600 to-violet-600"
          />
        </div>

        {/* MAIN CONTENT PANEL */}
        <div className="flex-1 min-w-0 space-y-6">
          
          {/* SETTINGS TAB */}
          {studentTab === 'settings' && <DashboardSettings />}

          {/* COURSES TAB */}
          {studentTab === 'courses' && (
            <div className="bg-white dark:bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-5">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  Mening Aktiv Kurslarim
                </h3>
                {courses && courses.length > 0 && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
                    {courses.length} ta aktiv
                  </span>
                )}
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-3">
                  <Loader2 className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" />
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Kurslar yuklanmoqda...</span>
                </div>
              ) : !courses || courses.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-50 dark:bg-slate-800/60 flex items-center justify-center text-indigo-500 dark:text-indigo-400 border border-indigo-100 dark:border-slate-700">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-base font-bold text-slate-800 dark:text-slate-200">
                      Hozircha a'zo bo'lingan kurslar mavjud emas
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                      Katalogdan o'zingizga ma'qul kelgan kursni tanlang va o'rganishni boshlang.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {courses.map((c) => {
                    const progressValue = c.progressPercentage ?? 0;
                    return (
                      <div
                        key={c.id}
                        className="group relative p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 flex flex-col justify-between space-y-5"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="px-2.5 py-1 text-[10px] font-extrabold rounded-lg bg-indigo-100/70 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 uppercase tracking-wider border border-indigo-200/50 dark:border-indigo-800/50">
                              {c.category}
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                            {c.title}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                            <UserCheck className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                            <span>Ustoz: <strong className="text-slate-700 dark:text-slate-300">{c.teacherName}</strong></span>
                          </p>
                        </div>

                        <div className="space-y-4 pt-3 border-t border-slate-200/60 dark:border-slate-800">
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs font-semibold">
                              <span className="text-slate-500 dark:text-slate-400">O'zlashtirish</span>
                              <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{progressValue}%</span>
                            </div>
                            <div className="w-full bg-slate-200/80 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full rounded-full transition-all duration-500"
                                style={{ width: `${Math.min(100, Math.max(0, progressValue))}%` }}
                              />
                            </div>
                          </div>

                          <Link
                            to={`/courses/${c.id}`}
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20"
                          >
                            <span>Darsni Davom Ettirish</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TESTS & RESULTS TAB */}
          {studentTab === 'tests' && (
            <div className="bg-white dark:bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-5">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-500/20">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  Test Natijalarim & Band Scores
                </h3>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-3">
                  <Loader2 className="w-8 h-8 animate-spin text-purple-600 dark:text-purple-400" />
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Natijalar yuklanmoqda...</span>
                </div>
              ) : !results || results.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-50 dark:bg-slate-800/60 flex items-center justify-center text-purple-500 dark:text-purple-400 border border-purple-100 dark:border-slate-700">
                    <BarChart2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-base font-bold text-slate-800 dark:text-slate-200">
                      Hozircha topshirilgan testlar yo'q
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                      Test topshirganingizdan so'ng, barcha ball va natijalaringiz shu yerda ko'rinadi.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {results.map((res, index) => (
                    <div
                      key={res.id || index}
                      className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="space-y-2">
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">
                          {res.testTitle || 'IELTS Mock Exam'}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                          <span className="px-3 py-1 rounded-lg bg-slate-200/50 dark:bg-slate-800/80 border border-slate-300/40 dark:border-slate-700/50 font-medium">
                            Listening: <strong className="text-slate-900 dark:text-white">{res.listeningBand ?? '0'}</strong>
                          </span>
                          <span className="px-3 py-1 rounded-lg bg-slate-200/50 dark:bg-slate-800/80 border border-slate-300/40 dark:border-slate-700/50 font-medium">
                            Reading: <strong className="text-slate-900 dark:text-white">{res.readingBand ?? '0'}</strong>
                          </span>
                          <span className="px-3 py-1 rounded-lg bg-slate-200/50 dark:bg-slate-800/80 border border-slate-300/40 dark:border-slate-700/50 font-medium">
                            Writing: <strong className="text-slate-900 dark:text-white">{res.writingBand ?? '0'}</strong>
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-4 self-start sm:self-center">
                        <div className="text-right hidden sm:block">
                          <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">Umumiy Natija</span>
                          <span className="text-xs font-bold text-amber-600 dark:text-amber-400">Yuqori Ko'rsatkich</span>
                        </div>
                        <div className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black text-sm shadow-lg shadow-amber-500/20 border border-amber-400/30 flex items-center gap-1.5">
                          <span>Band {res.overallBand ?? 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* CERTIFICATES TAB */}
          {studentTab === 'certificates' && (
            <div className="bg-white dark:bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-5">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-500/20">
                    <Award className="w-5 h-5" />
                  </div>
                  Mening QR Sertifikatlarim
                </h3>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-3">
                  <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Sertifikatlar yuklanmoqda...</span>
                </div>
              ) : !certificates || certificates.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 dark:bg-slate-800/60 flex items-center justify-center text-amber-500 dark:text-amber-400 border border-amber-100 dark:border-slate-700">
                    <Award className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-base font-bold text-slate-800 dark:text-slate-200">
                      Hozircha sertifikatlar mavjud emas
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                      Kurslarni muvaffaqiyatli yakunlang va rasmiy tasdiqlangan QR sertifikatlarga ega bo'ling.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="group p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 transition-all duration-300 hover:shadow-xl space-y-5 text-center flex flex-col items-center justify-between"
                    >
                      <div className="relative p-3 bg-white rounded-2xl border border-slate-200/80 shadow-md group-hover:scale-105 transition-transform duration-300">
                        <img
                          src={cert.qrCodeUrl}
                          alt="QR Code"
                          className="w-28 h-28 object-contain rounded-lg"
                        />
                        <div className="absolute -bottom-2 -right-2 p-1.5 bg-emerald-500 text-white rounded-full shadow-lg border-2 border-white dark:border-slate-900">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      </div>

                      <div className="space-y-2 w-full">
                        <h4 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">
                          {cert.courseName}
                        </h4>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-200/50 dark:border-emerald-800/50">
                          <span>Daraja / Band:</span>
                          <span>{cert.gradeOrBand}</span>
                        </div>
                      </div>

                      <Link
                        to={`/verify/${cert.uniqueId}`}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 active:scale-[0.98] text-white text-xs font-bold transition-all shadow-md"
                      >
                        <FileDown className="w-4 h-4" />
                        <span>Sertifikatni Ko‘rish & PDF</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-70 ml-0.5" />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};