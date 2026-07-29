import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, BrainCircuit, Award, UserCheck, Settings, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStudent } from '../../hooks/useStudent';
import { DashboardSidebar } from '../../components/dashboard/DashboardSidebar';
import type { SidebarTabItem } from '../../components/dashboard/DashboardSidebar';
import { DashboardSettings } from './DashboardSettings';

type StudentTabType = 'courses' | 'tests' | 'certificates' | 'profile' | 'settings';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [studentTab, setStudentTab] = useState<StudentTabType>('courses');
  const { courses, certificates, results, loading } = useStudent();

  // Dynamic tabs configuration memoized to optimize re-renders
  const studentTabs = useMemo<SidebarTabItem<StudentTabType>[]>(
    () => [
      {
        id: 'courses',
        label: 'Mening Kurslarim',
        icon: <BookOpen className="w-4 h-4" />,
        badge: courses?.length || 0,
      },
      {
        id: 'tests',
        label: 'Testlar & Natijalar',
        icon: <BrainCircuit className="w-4 h-4" />,
        badge: results?.length || 0,
      },
      {
        id: 'certificates',
        label: 'QR Sertifikatlarim',
        icon: <Award className="w-4 h-4" />,
        badge: certificates?.length || 0,
      },
      {
        id: 'profile',
        label: 'Shaxsiy Profil',
        icon: <UserCheck className="w-4 h-4" />,
      },
      {
        id: 'settings',
        label: 'Sozlamalar',
        icon: <Settings className="w-4 h-4" />,
      },
    ],
    [courses?.length, results?.length, certificates?.length]
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* COLLAPSIBLE SIDEBAR */}
      <DashboardSidebar
        title="Talaba Kabineti"
        activeTab={studentTab}
        onSelectTab={setStudentTab}
        tabs={studentTabs}
        accentGradient="from-indigo-600 to-violet-600"
      />

      {/* MAIN CONTENT PANEL */}
      <div className="flex-1 space-y-6">
        {/* SETTINGS TAB */}
        {studentTab === 'settings' && <DashboardSettings />}

        {/* COURSES TAB */}
        {studentTab === 'courses' && (
          <div className="glass-card p-6 sm:p-8 space-y-6 border-indigo-500/20 shadow-2xl">
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Mening Aktiv Kurslarim
            </h3>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
                <span className="ml-2 text-xs text-slate-500">Kurslar yuklanmoqda...</span>
              </div>
            ) : !courses || courses.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs font-medium">
                Hozircha a'zo bo'lingan kurslar mavjud emas
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map((c) => {
                  const progressValue = c.progressPercentage ?? 0;
                  return (
                    <div
                      key={c.id}
                      className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-md flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <span className="badge badge-indigo">{c.category}</span>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">{c.title}</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Ustoz: {c.teacherName}</p>
                      </div>

                      <div className="space-y-2 pt-2">
                        <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-indigo-500 h-full transition-all duration-300"
                            style={{ width: `${Math.min(100, Math.max(0, progressValue))}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400">
                          <span>Progress: {progressValue}%</span>
                          <Link
                            to={`/courses/${c.id}`}
                            className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                          >
                            Darsni Davom Ettirish →
                          </Link>
                        </div>
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
          <div className="glass-card p-6 sm:p-8 space-y-6 border-indigo-500/20 shadow-2xl">
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-purple-600 dark:text-purple-400" /> Test Natijalarim & Band Scores
            </h3>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
                <span className="ml-2 text-xs text-slate-500">Natijalar yuklanmoqda...</span>
              </div>
            ) : !results || results.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs font-medium">
                Hozircha topshirilgan testlar yo'q
              </div>
            ) : (
              <div className="space-y-3">
                {results.map((res, index) => (
                  <div
                    key={res.id || index}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md"
                  >
                    <div>
                      <span className="block text-sm font-bold text-slate-900 dark:text-white">{res.testTitle || 'IELTS Mock Exam'}</span>
                      <span className="block text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                        Listening: {res.listeningBand ?? '0'} | Reading: {res.readingBand ?? '0'} | Writing: {res.writingBand ?? '0'}
                      </span>
                    </div>
                    <span className="badge badge-amber font-extrabold text-sm self-start sm:self-center">
                      Overall Band {res.overallBand ?? 'N/A'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CERTIFICATES TAB */}
        {studentTab === 'certificates' && (
          <div className="glass-card p-6 sm:p-8 space-y-6 border-indigo-500/20 shadow-2xl">
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500 dark:text-amber-400" /> Mening QR Sertifikatlarim
            </h3>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
                <span className="ml-2 text-xs text-slate-500">Sertifikatlar yuklanmoqda...</span>
              </div>
            ) : !certificates || certificates.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs font-medium">
                Hozircha sertifikatlar mavjud emas
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 text-center shadow-md flex flex-col items-center justify-between"
                  >
                    <img
                      src={cert.qrCodeUrl}
                      alt="QR Code"
                      className="w-24 h-24 mx-auto bg-white p-2 rounded-xl border border-slate-200 object-contain"
                    />
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{cert.courseName}</h4>
                      <span className="badge badge-emerald">{cert.gradeOrBand}</span>
                    </div>
                    <Link
                      to={`/verify/${cert.uniqueId}`}
                      className="w-full btn-primary py-2 text-xs justify-center font-bold"
                    >
                      Sertifikatni Ko‘rish & PDF
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PROFILE TAB */}
        {studentTab === 'profile' && (
          <div className="glass-card p-6 sm:p-8 space-y-6 border-indigo-500/20 shadow-2xl">
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Shaxsiy Profil Ma’lumotlari
            </h3>
            <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
                <span className="text-slate-500 dark:text-slate-400">F.I.SH:</span>
                <span className="font-bold text-slate-900 dark:text-white">{user?.name || 'Kiritilmagan'}</span>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
                <span className="text-slate-500 dark:text-slate-400">Email:</span>
                <span className="font-bold text-slate-900 dark:text-white">{user?.email || 'Kiritilmagan'}</span>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
                <span className="text-slate-500 dark:text-slate-400">Telefon:</span>
                <span className="font-bold text-slate-900 dark:text-white">{user?.phone || '+998 90 123 45 67'}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};