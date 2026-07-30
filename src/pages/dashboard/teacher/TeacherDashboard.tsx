import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  Loader2, 
  BookOpenCheck, 
  Clock, 
  GraduationCap, 
  Search,
  Bot,
  ArrowUpRight,
  ChevronRight,
  LayoutDashboard
} from 'lucide-react';
import { useTeacher } from '../../../hooks/useTeacher';
import { Modal } from '../../../components/common/Modal';
import { DashboardSidebar } from '../common/DashboardSidebar';
import { DashboardSettings } from '../DashboardSettings';
import { getTeacherTabs, type TeacherTabType } from './teacherTabs';

type QuizCategory = 'IELTS' | 'SAT' | 'CEFR' | 'General';

export const TeacherDashboard: React.FC = () => {
  const [teacherTab, setTeacherTab] = useState<TeacherTabType>('students');
  const { students: studentsList, schedule: scheduleList, loading, createQuiz } = useTeacher();

  // Modal & Async Loading States
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  // Teacher Quiz Builder State
  const [newQuizTitle, setNewQuizTitle] = useState('');
  const [newQuizCategory, setNewQuizCategory] = useState<QuizCategory>('IELTS');
  const [newQuizDuration, setNewQuizDuration] = useState(20);

  const resetForm = () => {
    setNewQuizTitle('');
    setNewQuizCategory('IELTS');
    setNewQuizDuration(20);
  };

  const handleCreateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuizTitle.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await createQuiz({
        title: newQuizTitle,
        category: newQuizCategory,
        durationMinutes: newQuizDuration,
      });

      setSubmitSuccess(`"${newQuizTitle}" nomli yangi test muvaffaqiyatli yaratildi!`);
      resetForm();
      setIsQuizModalOpen(false);

      setTimeout(() => setSubmitSuccess(null), 4000);
    } catch (error) {
      console.error('Test yaratishda xatolik yuz berdi:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const teacherTabs = getTeacherTabs(studentsList?.length || 0, scheduleList?.length || 0);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50 transition-colors duration-300 space-y-8">
      {/* TOP BANNER / TEACHER PROFILE HEADER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-900 p-6 sm:p-8 text-white shadow-xl shadow-indigo-950/20">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-indigo-400 to-violet-400 p-1 shadow-lg">
                <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-2xl font-black text-indigo-300">
                  <GraduationCap className="w-9 h-9" />
                </div>
              </div>
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-indigo-200 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>O‘qituvchi Boshqaruv Paneli</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Xush kelibsiz, Ustoz! 👨‍🏫
              </h1>
              <p className="text-sm text-indigo-200/80 mt-1">
                O'quvchilar va test jarayonlarini samarali boshqaring.
              </p>
            </div>
          </div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-3 gap-3 bg-white/5 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/10">
            <div className="text-center px-2 sm:px-4">
              <span className="block text-xs text-indigo-200/70 font-medium">O'quvchilar</span>
              <span className="text-lg sm:text-xl font-black text-white">{studentsList?.length || 0}</span>
            </div>
            <div className="text-center px-2 sm:px-4 border-x border-white/10">
              <span className="block text-xs text-indigo-200/70 font-medium">Darslar</span>
              <span className="text-lg sm:text-xl font-black text-white">{scheduleList?.length || 0}</span>
            </div>
            <div className="text-center px-2 sm:px-4">
              <span className="block text-xs text-indigo-200/70 font-medium">Holat</span>
              <span className="text-xs sm:text-sm font-bold text-emerald-400 mt-1 block">Aktiv</span>
            </div>
          </div>
        </div>
      </div>

      {/* DASHBOARD BODY */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* COLLAPSIBLE SIDEBAR */}
        <div className="lg:w-80 shrink-0">
          <DashboardSidebar
            title="O‘qituvchi Boshqaruvi"
            activeTab={teacherTab}
            onSelectTab={setTeacherTab}
            tabs={teacherTabs}
            accentGradient="from-indigo-600 to-violet-600"
          />
        </div>

        {/* MAIN CONTENT PANEL */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* SUCCESS NOTIFICATION TOAST */}
          {submitSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-between shadow-lg shadow-emerald-500/5 animate-in fade-in duration-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-500" />
                <span>{submitSuccess}</span>
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {teacherTab === 'settings' && <DashboardSettings />}

          {/* STUDENTS TAB */}
          {teacherTab === 'students' && (
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                      <Users className="w-5 h-5" />
                    </div>
                    Mening O‘quvchilarim Ro‘yxati
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Guruhingizga biriktirilgan talabalar natijalari va faolligi.
                  </p>
                </div>

                {studentsList && studentsList.length > 0 && (
                  <span className="self-start sm:self-center text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50">
                    Jami: {studentsList.length} ta talaba
                  </span>
                )}
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-16 space-y-3">
                  <Loader2 className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" />
                  <span className="text-xs font-medium text-slate-500">O'quvchilar yuklanmoqda...</span>
                </div>
              ) : !studentsList || studentsList.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center text-slate-400">
                    <Users className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Hozircha biriktirilgan o‘quvchilar mavjud emas
                  </p>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Yangi talabalar guruhga qo'shilgach shu yerda namoyon bo'ladi.
                  </p>
                </div>
              ) : (
                <div className="overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                      <thead className="bg-slate-100/70 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                        <tr>
                          <th className="p-4">O‘quvchi</th>
                          <th className="p-4">Email</th>
                          <th className="p-4">Kurs</th>
                          <th className="p-4 text-right">O‘rtacha Ball</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white/50 dark:bg-slate-900/40">
                        {studentsList.map((st) => (
                          <tr key={st.id} className="hover:bg-indigo-50/40 dark:hover:bg-slate-800/40 transition-colors">
                            <td className="p-4 font-bold text-slate-900 dark:text-white flex items-center gap-3">
                              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 text-white flex items-center justify-center font-black text-xs shadow-md shadow-indigo-500/20">
                                {st.name ? st.name.charAt(0).toUpperCase() : 'U'}
                              </div>
                              <span className="text-sm">{st.name}</span>
                            </td>
                            <td className="p-4 text-slate-500 dark:text-slate-400 font-medium">{st.email}</td>
                            <td className="p-4">
                              <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-200/40 dark:border-indigo-800/40">
                                {st.courseName}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs border border-emerald-200/50 dark:border-emerald-800/50">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                {st.score ?? 'N/A'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CREATE TEST TAB */}
          {teacherTab === 'create_quiz' && (
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                      <Plus className="w-5 h-5" />
                    </div>
                    Yangi Test & Quiz Yaratuvchi (Builder)
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    O'quvchilar uchun yangi topshiriq va testlarni shakllantiring.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsQuizModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md active:scale-95 self-start sm:self-center"
                >
                  <Plus className="w-4 h-4" /> Modal Oynada Ochish
                </button>
              </div>

              <form onSubmit={handleCreateQuiz} className="space-y-5 max-w-2xl">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Test Nomi
                  </label>
                  <input
                    type="text"
                    required
                    value={newQuizTitle}
                    onChange={(e) => setNewQuizTitle(e.target.value)}
                    placeholder="masalan: IELTS Writing Task 2 Mock Test"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Kategoriya
                    </label>
                    <select
                      value={newQuizCategory}
                      onChange={(e) => setNewQuizCategory(e.target.value as QuizCategory)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-xs text-slate-900 dark:text-white font-bold cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    >
                      <option value="IELTS">IELTS</option>
                      <option value="SAT">SAT</option>
                      <option value="CEFR">CEFR</option>
                      <option value="General">General</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Davomiyligi (Daqiqa)
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={newQuizDuration}
                      onChange={(e) => setNewQuizDuration(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20 disabled:opacity-50 active:scale-95"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <BookOpenCheck className="w-4 h-4" />}
                  <span>Testni Saqlash & Nashr Etish</span>
                </button>
              </form>
            </div>
          )}

          {/* HOMEWORK TAB */}
          {teacherTab === 'homework' && (
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400">
                    <Bot className="w-5 h-5" />
                  </div>
                  AI Uy Vazifalar Checker & Grader
                </h3>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-500/5 via-violet-500/5 to-transparent border border-indigo-500/10 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Modul</span>
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  Sun'iy Intellekt Orqali Baholash
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                  Talabalarning topshirgan insho (essay) hamda boshqa yozma vazifalarini sun'iy intellekt yordamida tezkor tahlil qiling va grammatik, strukturaviy xatolar bo'yicha tavsiyalar oling.
                </p>
              </div>
            </div>
          )}

          {/* SCHEDULE TAB */}
          {teacherTab === 'schedule' && (
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    <Calendar className="w-5 h-5" />
                  </div>
                  Haftalik Dars Jadvali
                </h3>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-16 space-y-3">
                  <Loader2 className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" />
                  <span className="text-xs font-medium text-slate-500">Jadval yuklanmoqda...</span>
                </div>
              ) : !scheduleList || scheduleList.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center text-slate-400">
                    <Calendar className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Hozircha dars jadvali shakllantirilmagan
                  </p>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Yangi dars jadvali tayyorlangach shu bo'limda namoyon bo'ladi.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {scheduleList.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800 transition-all duration-300 hover:shadow-lg flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <span className="inline-block px-2.5 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 text-[10px] font-extrabold uppercase">
                          {item.day}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h4>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 font-mono font-bold bg-white dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700 shadow-sm shrink-0">
                        <Clock className="w-3.5 h-3.5 text-indigo-500" />
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* CREATE QUIZ MODAL */}
      <Modal isOpen={isQuizModalOpen} onClose={() => setIsQuizModalOpen(false)} title="Yangi Test Yaratish">
        <form onSubmit={handleCreateQuiz} className="space-y-5 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              Test Nomi
            </label>
            <input
              type="text"
              required
              value={newQuizTitle}
              onChange={(e) => setNewQuizTitle(e.target.value)}
              placeholder="masalan: IELTS Reading Mini Mock Test"
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Kategoriya
              </label>
              <select
                value={newQuizCategory}
                onChange={(e) => setNewQuizCategory(e.target.value as QuizCategory)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-xs text-slate-900 dark:text-white font-bold cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              >
                <option value="IELTS">IELTS</option>
                <option value="SAT">SAT</option>
                <option value="CEFR">CEFR</option>
                <option value="General">General</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Vaqt (Daqiqa)
              </label>
              <input
                type="number"
                min={1}
                value={newQuizDuration}
                onChange={(e) => setNewQuizDuration(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsQuizModalOpen(false)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20 disabled:opacity-50 active:scale-95"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              <span>Testni Saqlash</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};