import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  BrainCircuit, 
  Award, 
  UserCheck, 
  Loader2, 
  ArrowRight, 
  Mail, 
  Phone, 
  User, 
  FileCheck2,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStudent } from '../../hooks/useStudent';
import { DashboardSidebar, type SidebarTabItem } from './DashboardSidebar';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [studentTab, setStudentTab] = useState<'courses' | 'tests' | 'certificates' | 'profile'>('courses');

  // Hook - talaba ma'lumotlarini yuklaydi (API + fallback mock)
  const { courses, certificates, loading } = useStudent();

  // Universal Sidebar Navigatsiya Tablari
  const studentSidebarTabs: SidebarTabItem<'courses' | 'tests' | 'certificates' | 'profile'>[] = [
    {
      id: 'courses',
      label: 'Mening Kurslarim',
      icon: <BookOpen className="w-4 h-4" />,
      badge: courses.length > 0 ? courses.length : undefined
    },
    {
      id: 'tests',
      label: 'Testlar & Natijalar',
      icon: <BrainCircuit className="w-4 h-4" />
    },
    {
      id: 'certificates',
      label: 'QR Sertifikatlarim',
      icon: <Award className="w-4 h-4" />,
      badge: certificates.length > 0 ? certificates.length : undefined
    },
    {
      id: 'profile',
      label: 'Shaxsiy Profil',
      icon: <UserCheck className="w-4 h-4" />
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 text-slate-900 dark:text-white">
      
      {/* SIDEBAR NAVIGATION */}
      <DashboardSidebar
        title="Talaba Kabineti"
        activeTab={studentTab}
        onSelectTab={setStudentTab}
        tabs={studentSidebarTabs}
        accentGradient="from-indigo-600 to-violet-600"
      />

      {/* MAIN CONTENT AREA */}
      <div className="lg:col-span-3 space-y-6">
        
        {/* TAB 1: MENING KURSLARIM */}
        {studentTab === 'courses' && (
          <div className="relative overflow-hidden rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-5">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
                  <div className="p-2 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  Mening Aktiv Kurslarim
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Siz a'zo bo'lgan va o'rganayotgan barcha ta'lim yo'nalishlari</p>
              </div>

              <span className="self-start sm:self-auto text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20">
                Aktiv: {courses.length} ta
              </span>
            </div>

            {/* Courses List Grid */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-3">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                <span className="text-xs text-slate-400 font-medium">Kurslar yuklanmoqda...</span>
              </div>
            ) : courses.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                  <BookOpen className="w-6 h-6" />
                </div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Hozircha sizda aktiv kurslar mavjud emas.</p>
                <Link to="/courses" className="inline-block text-xs font-bold text-indigo-500 hover:underline">
                  Katalogdan yangi kurslarni tanlang →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {courses.map((c) => (
                  <div 
                    key={c.id} 
                    className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 space-y-4 hover:border-indigo-500/30 transition-all group flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                          {c.category}
                        </span>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">Aktiv</span>
                      </div>
                      <h4 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors line-clamp-1">{c.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Ustoz: <strong className="text-slate-700 dark:text-slate-300">{c.teacherName}</strong></p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 font-medium">O'zlashtirish progressi</span>
                        <span className="font-extrabold text-indigo-600 dark:text-indigo-400">75%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden p-0.5">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500 w-[75%]" />
                      </div>

                      <div className="pt-2 flex justify-end">
                        <Link 
                          to="/courses" 
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                        >
                          Darsni Davom Ettirish <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: TESTLAR & NATIJALAR */}
        {studentTab === 'tests' && (
          <div className="relative overflow-hidden rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-200/80 dark:border-slate-800/80 pb-5">
              <div className="p-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Test Natijalari & Band Scores</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Topshirilgan sinov va Imtihonlar natijasi</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-slate-900 dark:text-white">IELTS Mock Exam</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Muvaffaqiyatli</span>
                  </div>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">
                    Listening: <strong className="text-slate-700 dark:text-slate-200">8.0</strong> | Reading: <strong className="text-slate-700 dark:text-slate-200">7.5</strong> | Writing: <strong className="text-slate-700 dark:text-slate-200">7.0</strong>
                  </span>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <span className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-black text-sm flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Overall Band 7.5
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: QR SERTIFIKATLARIM */}
        {studentTab === 'certificates' && (
          <div className="relative overflow-hidden rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-200/80 dark:border-slate-800/80 pb-5">
              <div className="p-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Mening QR Sertifikatlarim</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Platforma tomonidan berilgan tasdiqlangan va tekshiriluvchi sertifikatlar</p>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-3">
                <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
                <span className="text-xs text-slate-400 font-medium">Sertifikatlar yuklanmoqda...</span>
              </div>
            ) : certificates.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                  <Award className="w-6 h-6" />
                </div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Hozircha sizda olishingiz mumkin bo'lgan sertifikatlar mavjud emas.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {certificates.map((cert) => (
                  <div 
                    key={cert.id} 
                    className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 space-y-4 text-center hover:border-amber-500/30 transition-all group"
                  >
                    <div className="p-3 bg-white rounded-2xl w-fit mx-auto shadow-md border border-slate-100">
                      <img src={cert.qrCodeUrl} alt="QR Code" className="w-24 h-24 object-contain" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 dark:text-white">{cert.courseName}</h4>
                      <span className="inline-block mt-2 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        {cert.gradeOrBand}
                      </span>
                    </div>

                    <Link 
                      to={`/verify/${cert.uniqueId}`} 
                      className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                      <FileCheck2 className="w-4 h-4" /> Sertifikatni Ko‘rish <ExternalLink className="w-3 h-3 opacity-70" />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: SHAXSIY PROFIL */}
        {studentTab === 'profile' && (
          <div className="relative overflow-hidden rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-200/80 dark:border-slate-800/80 pb-5">
              <div className="p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Shaxsiy Profil Ma’lumotlari</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Hisob qaydnomangizga tegishli shaxsiy ma'lumotlar</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <User className="w-4 h-4 text-indigo-500" /> F.I.SH:
                </span>
                <span className="font-extrabold text-xs text-slate-900 dark:text-white">{user?.name || "Kiritilmagan"}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-500" /> Email Manzil:
                </span>
                <span className="font-extrabold text-xs text-slate-900 dark:text-white">{user?.email || "Kiritilmagan"}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-500" /> Telefon Raqam:
                </span>
                <span className="font-extrabold text-xs text-slate-900 dark:text-white">{user?.phone || '+998 90 123 45 67'}</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};