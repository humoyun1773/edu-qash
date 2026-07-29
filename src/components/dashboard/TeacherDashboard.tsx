import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Sparkles, 
  Calendar, 
  Globe, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Send,
  Loader2
} from 'lucide-react';
import { useTeacher } from '../../hooks/useTeacher';
import { API_BASE_URL } from '../../services/api';
import { DashboardSidebar, type SidebarTabItem } from './DashboardSidebar';

export const TeacherDashboard: React.FC = () => {
  const [teacherTab, setTeacherTab] = useState<'students' | 'create_test' | 'homework' | 'schedule'>('students');

  // Hook - ustoz ma'lumotlarini yuklaydi (API + fallback mock)
  const { students: studentsList, schedule: scheduleList, loading, createQuiz } = useTeacher();

  // Teacher Quiz Builder State
  const [newQuizTitle, setNewQuizTitle] = useState('');
  const [newQuizCategory, setNewQuizCategory] = useState<'IELTS' | 'SAT' | 'CEFR' | 'General'>('IELTS');
  const [newQuizDuration, setNewQuizDuration] = useState(20);
  const [isSubmittingQuiz, setIsSubmittingQuiz] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const handleCreateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuizTitle.trim()) return;

    setIsSubmittingQuiz(true);
    try {
      await createQuiz({
        title: newQuizTitle,
        category: newQuizCategory,
        durationMinutes: newQuizDuration
      });
      setSubmitSuccess(`"${newQuizTitle}" nomli yangi test muvaffaqiyatli yaratildi!`);
      setNewQuizTitle('');
      setTimeout(() => setSubmitSuccess(null), 4000);
    } catch (err) {
      console.error('Test yaratishda xatolik:', err);
    } finally {
      setIsSubmittingQuiz(false);
    }
  };

  // Universal Sidebar Navigatsiya Tablari
  const teacherSidebarTabs: SidebarTabItem<'students' | 'create_test' | 'homework' | 'schedule'>[] = [
    {
      id: 'students',
      label: "O'quvchilarim",
      icon: <Users className="w-4 h-4" />,
      badge: studentsList.length > 0 ? studentsList.length : undefined
    },
    {
      id: 'create_test',
      label: 'Yangi Test Yaratish',
      icon: <Plus className="w-4 h-4" />
    },
    {
      id: 'homework',
      label: 'AI Homework Checker',
      icon: <Sparkles className="w-4 h-4" />
    },
    {
      id: 'schedule',
      label: 'Dars Jadvali',
      icon: <Calendar className="w-4 h-4" />,
      badge: scheduleList?.length || 0
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 text-slate-900 dark:text-white">
      
      {/* SIDEBAR NAVIGATION */}
      <DashboardSidebar
        title="O‘qituvchi Menyusi"
        activeTab={teacherTab}
        onSelectTab={setTeacherTab}
        tabs={teacherSidebarTabs}
        accentGradient="from-indigo-600 to-violet-600"
      />

      {/* MAIN CONTENT AREA */}
      <div className="lg:col-span-3 space-y-6">
        
        {/* SUCCESS TOAST */}
        {submitSuccess && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{submitSuccess}</span>
          </div>
        )}
        {/* TAB 1: O'QUVCHILARIM RO'YXATI */}
        {teacherTab === 'students' && (
          <div className="relative overflow-hidden rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-5">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
                  <div className="p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
                    <Users className="w-5 h-5" />
                  </div>
                  Mening O‘quvchilarim Ro‘yxati
                </h3>
                <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                  REST API Target: {API_BASE_URL}/teacher/students
                </span>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-emerald-600 dark:text-emerald-400 font-mono bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 self-start sm:self-auto">
                <Globe className="w-3.5 h-3.5 animate-pulse" /> API Active
              </div>
            </div>

            {/* Students Table */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-3">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
                <span className="text-xs text-slate-400 font-medium">O'quvchilar ro'yxati yuklanmoqda...</span>
              </div>
            ) : studentsList.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                  <Users className="w-6 h-6" />
                </div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Hozircha biriktirilgan o'quvchilar topilmadi.</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-slate-800/80">
                <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                  <thead className="bg-slate-100/80 dark:bg-slate-950/80 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-4">O‘quvchi</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Kurs</th>
                      <th className="p-4">O‘rtacha Ball</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60 bg-white/40 dark:bg-slate-900/40">
                    {studentsList.map((st) => (
                      <tr key={st.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="p-4 font-bold text-slate-900 dark:text-white flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-extrabold text-xs">
                            {st.name.charAt(0)}
                          </div>
                          <span>{st.name}</span>
                        </td>
                        <td className="p-4 text-slate-500 dark:text-slate-400 font-medium">{st.email}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-[11px] border border-indigo-500/20">
                            {st.courseName}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1.5 font-black text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                            <CheckCircle2 className="w-3.5 h-3.5" /> {st.score}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: YANGI TEST YARATISH */}
        {teacherTab === 'create_test' && (
          <div className="relative overflow-hidden rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-200/80 dark:border-slate-800/80 pb-5">
              <div className="p-2 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Yangi Test & Quiz Yaratuvchi (Builder)</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">O'quvchilar bilomini sinash uchun test sinovlarini shakllantiring</p>
              </div>
            </div>

            <form onSubmit={handleCreateQuiz} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Test Nomi
                </label>
                <input
                  type="text"
                  required
                  value={newQuizTitle}
                  onChange={(e) => setNewQuizTitle(e.target.value)}
                  placeholder="masalan: IELTS Writing Task 2 Mock Test"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Kategoriya
                  </label>
                  <select
                    value={newQuizCategory}
                    onChange={(e) => setNewQuizCategory(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-xs font-bold text-slate-900 dark:text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                  >
                    <option value="IELTS">IELTS</option>
                    <option value="SAT">SAT</option>
                    <option value="CEFR">CEFR</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Davomiyligi (Daqiqa)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      value={newQuizDuration}
                      onChange={(e) => setNewQuizDuration(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                    />
                    <Clock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={isSubmittingQuiz}
                  className="py-3 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                >
                  {isSubmittingQuiz ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Yaratilmoqda...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Testni Saqlash & Nashr Etish
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: AI HOMEWORK CHECKER */}
        {teacherTab === 'homework' && (
          <div className="relative overflow-hidden rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-200/80 dark:border-slate-800/80 pb-5">
              <div className="p-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">AI Uy Vazifalari Checker & Grader</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Sun'iy intellekt yordamida o'quvchilar topshiriqlarini baholash va tekshirish</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-3 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-2xl shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">Avtomatik Baholash Tizimi Aktiv</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Talabalarning topshirgan insho va uy vazifalari avtomatik ravishda AI tomonidan tekshirilib, grammatika va lug'at xatolari tahlil qilinadi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DARS JADVALI */}
        {teacherTab === 'schedule' && (
          <div className="relative overflow-hidden rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-200/80 dark:border-slate-800/80 pb-5">
              <div className="p-2 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded-xl">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Haftalik Dars Jadvali</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Sizga biriktirilgan mashg'ulotlar va Jonli dars vaqtlari</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                    Dushanba - Chorshanba - Juma
                  </span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-500" /> 14:00
                  </span>
                </div>
                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-cyan-500" /> IELTS Intensive Group
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Xona: 204-Online / Zoom</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                    SeshDynamic - Paychanba - Shanba
                  </span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-purple-500" /> 16:30
                  </span>
                </div>
                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-purple-500" /> CEFR Grammar Booster
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Xona: 101-Main Hall</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};