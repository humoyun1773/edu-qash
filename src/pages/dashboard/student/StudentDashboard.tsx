import React, { useState } from 'react';
import { 
  BookOpen, 
  Award, 
  BrainCircuit, 
  Sparkles, 
  Loader2, 
  CheckCircle2, 
  FileDown,
  BarChart2,
  ExternalLink,
  UserCheck,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStudent } from '../../../hooks/useStudent';
import { DashboardSidebar } from '../common/DashboardSidebar';
import { DashboardSettings } from '../DashboardSettings';
import { getStudentTabs, type StudentTabType } from './studentTabs';
import { PageLoader } from '../../../components/common/PageLoader';

export const StudentDashboard: React.FC = () => {
  const [studentTab, setStudentTab] = useState<StudentTabType>('courses');
  const { courses, certificates, results, loading } = useStudent();

  const studentTabs = getStudentTabs(courses?.length || 0, certificates?.length || 0);

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-screen">
      {/* SIDEBAR */}
      <DashboardSidebar
        title="Talaba Kabineti"
        activeTab={studentTab}
        onSelectTab={setStudentTab}
        tabs={studentTabs}
        accentGradient="from-indigo-600 via-purple-600 to-pink-600"
      />

      {/* MAIN CONTENT PANEL */}
      <div className="flex-1 min-w-0 space-y-8">
        
        {/* TOP OVERVIEW CARDS (SUPER ADMIN STYLE) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div className="relative overflow-hidden p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-xl hover:border-indigo-500/40 transition-all duration-300 group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <BookOpen className="w-20 h-20 text-indigo-500" />
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Aktiv Kurslar</p>
                <h4 className="text-3xl font-black text-slate-900 dark:text-white font-display">{courses?.length || 0}</h4>
              </div>
            </div>
            <div className="flex items-center text-xs text-indigo-600 dark:text-indigo-400 font-bold pt-3 border-t border-slate-100 dark:border-slate-800">
              <TrendingUp className="w-4 h-4 mr-1.5" />
              <span>O'quv darsliklari</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative overflow-hidden p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-xl hover:border-purple-500/40 transition-all duration-300 group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <BrainCircuit className="w-20 h-20 text-purple-500" />
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Test Natijalari</p>
                <h4 className="text-3xl font-black text-slate-900 dark:text-white font-display">{results?.length || 0}</h4>
              </div>
            </div>
            <div className="flex items-center text-xs text-purple-600 dark:text-purple-400 font-bold pt-3 border-t border-slate-100 dark:border-slate-800">
              <Sparkles className="w-4 h-4 mr-1.5 text-amber-500" />
              <span>Exam va Mock ballar</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative overflow-hidden p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-xl hover:border-amber-500/40 transition-all duration-300 group sm:col-span-2 lg:col-span-1">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Award className="w-20 h-20 text-amber-500" />
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">QR Sertifikatlar</p>
                <h4 className="text-3xl font-black text-slate-900 dark:text-white font-display">{certificates?.length || 0}</h4>
              </div>
            </div>
            <div className="flex items-center text-xs text-amber-600 dark:text-amber-400 font-bold pt-3 border-t border-slate-100 dark:border-slate-800">
              <CheckCircle2 className="w-4 h-4 mr-1.5" />
              <span>Rasmiy tasdiqlangan</span>
            </div>
          </div>
        </div>

        {/* SETTINGS TAB */}
        {studentTab === 'settings' && <DashboardSettings />}

        {/* COURSES TAB */}
        {studentTab === 'courses' && (
          <div className="p-6 sm:p-10 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 space-y-8 shadow-xl transition-all">
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shadow-sm">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-display">
                    Mening Aktiv Kurslarim
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    O'rganishda davom eting va bilim darajangizni oshiring.
                  </p>
                </div>
              </div>

              {courses && courses.length > 0 && (
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  {courses.length} ta aktiv
                </span>
              )}
            </div>

            {loading ? (
              <PageLoader fullScreen={false} />
            ) : !courses || courses.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center border border-indigo-500/20 shadow-lg">
                  <BookOpen className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    Hozircha a'zo bo'lingan kurslar mavjud emas
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    Katalogdan o'zingizga ma'qul kelgan kursni tanlang va o'rganishni boshlang.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((c) => {
                  const progressValue = c.progressPercentage ?? 0;
                  return (
                    <div
                      key={c.id}
                      className="group p-6 rounded-3xl bg-slate-50/70 dark:bg-slate-950/40 hover:bg-white dark:hover:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 transition-all duration-300 hover:shadow-xl flex flex-col justify-between space-y-6"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 text-[10px] font-extrabold rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 uppercase tracking-wider border border-indigo-500/20">
                            {c.category}
                          </span>
                        </div>
                        <h4 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                          {c.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                          <UserCheck className="w-4 h-4 text-indigo-500 shrink-0" />
                          <span>Ustoz: <strong className="text-slate-700 dark:text-slate-300">{c.teacherName}</strong></span>
                        </p>
                      </div>

                      <div className="space-y-4 pt-3 border-t border-slate-200/60 dark:border-slate-800">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs font-semibold">
                            <span className="text-slate-500 dark:text-slate-400">O'zlashtirish</span>
                            <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{progressValue}%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full rounded-full transition-all duration-500"
                              style={{ width: `${Math.min(100, Math.max(0, progressValue))}%` }}
                            />
                          </div>
                        </div>

                        <Link
                          to={`/courses/${c.id}`}
                          className="btn-primary py-3 px-4 text-xs font-bold w-full flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 active:scale-[0.98]"
                        >
                          <span>Darsni Davom Ettirish</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TESTS TAB */}
        {studentTab === 'tests' && (
          <div className="p-6 sm:p-10 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 space-y-8 shadow-xl transition-all">
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 shadow-sm">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-display">
                    Test Natijalari va Imtihon Ballari
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    IELTS, CEFR va modul testlarining statistikasi.
                  </p>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-3">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600 dark:text-purple-400" />
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Natijalar yuklanmoqda...</span>
              </div>
            ) : !results || results.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-purple-500/10 text-purple-500 flex items-center justify-center border border-purple-500/20 shadow-lg">
                  <BarChart2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    Hozircha topshirilgan testlar yo'q
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    Test topshirganingizdan so'ng, barcha ball va natijalaringiz shu yerda ko'rinadi.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {results.map((res, index) => (
                  <div
                    key={res.id || index}
                    className="p-6 rounded-3xl bg-slate-50/70 dark:bg-slate-950/40 hover:bg-white dark:hover:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="space-y-3">
                      <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">
                        {res.testTitle || 'IELTS Mock Practice'}
                      </h4>
                      <div className="flex flex-wrap items-center gap-2.5 text-xs">
                        <span className="px-3 py-1 rounded-xl bg-slate-200/80 dark:bg-slate-800 border border-slate-300/60 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300">
                          Listening: <strong className="text-slate-900 dark:text-white">{res.listeningBand ?? '0'}</strong>
                        </span>
                        <span className="px-3 py-1 rounded-xl bg-slate-200/80 dark:bg-slate-800 border border-slate-300/60 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300">
                          Reading: <strong className="text-slate-900 dark:text-white">{res.readingBand ?? '0'}</strong>
                        </span>
                        <span className="px-3 py-1 rounded-xl bg-slate-200/80 dark:bg-slate-800 border border-slate-300/60 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300">
                          Writing: <strong className="text-slate-900 dark:text-white">{res.writingBand ?? '0'}</strong>
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-4 self-start sm:self-center">
                      <div className="text-right hidden sm:block">
                        <span className="block text-[10px] uppercase font-extrabold tracking-wider text-slate-400">Umumiy Natija</span>
                        <span className="text-xs font-bold text-amber-600 dark:text-amber-400">Muvaffaqiyatli</span>
                      </div>
                      <div className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black text-base shadow-lg shadow-amber-500/20 border border-amber-400/30 flex items-center gap-1.5">
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
          <div className="p-6 sm:p-10 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 space-y-8 shadow-xl transition-all">
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-sm">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-display">
                    Mening QR Sertifikatlarim
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Muvaffaqiyatli yakunlangan kurslar va rasmiy sertifikatlar.
                  </p>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-3">
                <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Sertifikatlar yuklanmoqda...</span>
              </div>
            ) : !certificates || certificates.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20 shadow-lg">
                  <Award className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    Hozircha sertifikatlar mavjud emas
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    Kurslarni muvaffaqiyatli yakunlang va rasmiy tasdiqlangan QR sertifikatlarga ega bo'ling.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="group p-6 rounded-3xl bg-slate-50/70 dark:bg-slate-950/40 hover:bg-white dark:hover:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 transition-all duration-300 hover:shadow-xl space-y-5 text-center flex flex-col items-center justify-between"
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
                      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
                        <span>Daraja / Band:</span>
                        <span>{cert.gradeOrBand}</span>
                      </div>
                    </div>

                    <Link
                      to={`/verify/${cert.uniqueId}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 active:scale-[0.98] text-white text-xs font-bold transition-all shadow-md"
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
  );
};