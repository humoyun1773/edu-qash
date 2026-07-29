import React, { useState, useMemo } from 'react';
import { Users, Plus, Sparkles, Calendar, CheckCircle2, Settings, Loader2 } from 'lucide-react';
import { useTeacher } from '../../hooks/useTeacher';
import { Modal } from '../../components/common/Modal';
import { DashboardSidebar } from '../../components/dashboard/DashboardSidebar';
import type { SidebarTabItem } from '../../components/dashboard/DashboardSidebar';
import { API_BASE_URL } from '../../services/api';
import { DashboardSettings } from './DashboardSettings';

type TeacherTabType = 'students' | 'create_test' | 'homework' | 'schedule' | 'settings';
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

      // Clear toast/feedback message after 4 seconds
      setTimeout(() => setSubmitSuccess(null), 4000);
    } catch (error) {
      console.error('Test yaratishda xatolik yuz berdi:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dynamic tabs configuration memoized for optimized rendering
  const teacherTabs = useMemo<SidebarTabItem<TeacherTabType>[]>(
    () => [
      {
        id: 'students',
        label: 'O‘quvchilarim',
        icon: <Users className="w-4 h-4" />,
        badge: studentsList?.length || 0,
      },
      {
        id: 'create_test',
        label: 'Yangi Test Yaratish',
        icon: <Plus className="w-4 h-4" />,
      },
      {
        id: 'homework',
        label: 'AI Homework Checker',
        icon: <Sparkles className="w-4 h-4" />,
      },
      {
        id: 'schedule',
        label: 'Dars Jadvali',
        icon: <Calendar className="w-4 h-4" />,
        badge: scheduleList?.length || 0,
      },
      {
        id: 'settings',
        label: 'Sozlamalar',
        icon: <Settings className="w-4 h-4" />,
      },
    ],
    [studentsList?.length, scheduleList?.length]
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* COLLAPSIBLE SIDEBAR */}
      <DashboardSidebar
        title="O‘qituvchi Boshqaruvi"
        activeTab={teacherTab}
        onSelectTab={setTeacherTab}
        tabs={teacherTabs}
        accentGradient="from-indigo-600 to-violet-600"
      />

      {/* MAIN CONTENT PANEL */}
      <div className="flex-1 space-y-6">
        {/* SUCCESS NOTIFICATION TOAST */}
        {submitSuccess && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2 shadow-sm">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{submitSuccess}</span>
          </div>
        )}

        {/* SETTINGS TAB */}
        {teacherTab === 'settings' && <DashboardSettings />}

        {/* STUDENTS TAB */}
        {teacherTab === 'students' && (
          <div className="glass-card p-6 sm:p-8 space-y-6 border-indigo-500/20 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Mening O‘quvchilarim Ro‘yxati
                </h3>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                  REST API Target: {API_BASE_URL}/teacher/students
                </span>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
                <span className="ml-2 text-xs text-slate-500">O'quvchilar yuklanmoqda...</span>
              </div>
            ) : !studentsList || studentsList.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs font-medium">
                Hozircha biriktirilgan o‘quvchilar mavjud emas
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                  <thead className="bg-slate-100 dark:bg-slate-900/90 text-slate-700 dark:text-slate-400 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5 rounded-l-xl">O‘quvchi</th>
                      <th className="p-3.5">Email</th>
                      <th className="p-3.5">Kurs</th>
                      <th className="p-3.5 rounded-r-xl">O‘rtacha Ball</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80">
                    {studentsList.map((st) => (
                      <tr key={st.id} className="hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-colors">
                        <td className="p-3.5 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                            {st.name ? st.name.charAt(0).toUpperCase() : 'U'}
                          </div>
                          {st.name}
                        </td>
                        <td className="p-3.5 text-slate-600 dark:text-slate-300">{st.email}</td>
                        <td className="p-3.5 text-slate-600 dark:text-slate-300">{st.courseName}</td>
                        <td className="p-3.5 text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> {st.score ?? 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* CREATE TEST TAB */}
        {teacherTab === 'create_test' && (
          <div className="glass-card p-6 sm:p-8 space-y-6 border-indigo-500/20 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Yangi Test & Quiz Yaratuvchi (Builder)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Yangi test tayyorlab talabalaringizga biriktirish moduli.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsQuizModalOpen(true)}
                className="btn-primary py-2.5 px-4 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/30"
              >
                <Plus className="w-4 h-4" /> Modal O'ynada O'chish
              </button>
            </div>

            <form onSubmit={handleCreateQuiz} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Test Nomi
                </label>
                <input
                  type="text"
                  required
                  value={newQuizTitle}
                  onChange={(e) => setNewQuizTitle(e.target.value)}
                  placeholder="masalan: IELTS Writing Task 2 Mock Test"
                  className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Kategoriya
                  </label>
                  <select
                    value={newQuizCategory}
                    onChange={(e) => setNewQuizCategory(e.target.value as QuizCategory)}
                    className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 rounded-xl p-3 text-xs text-slate-900 dark:text-white font-bold cursor-pointer focus:border-indigo-500"
                  >
                    <option value="IELTS">IELTS</option>
                    <option value="SAT">SAT</option>
                    <option value="CEFR">CEFR</option>
                    <option value="General">General</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Davomiyligi (Daqiqa)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={newQuizDuration}
                    onChange={(e) => setNewQuizDuration(Number(e.target.value))}
                    className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary py-3 px-6 text-xs font-bold flex items-center gap-2 shadow-md shadow-indigo-600/30 disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                Testni Saqlash & Nashr Etish
              </button>
            </form>
          </div>
        )}

        {/* HOMEWORK TAB */}
        {teacherTab === 'homework' && (
          <div className="glass-card p-6 sm:p-8 space-y-6 border-indigo-500/20 shadow-2xl">
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-500 dark:text-indigo-400" /> AI Uy Vazifalar Checker & Grader
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Talabalarning topshirgan insho va topshiriqlarini avtomatik sun'iy intellekt orqali tekshirish moduli.
            </p>
          </div>
        )}

        {/* SCHEDULE TAB */}
        {teacherTab === 'schedule' && (
          <div className="glass-card p-6 sm:p-8 space-y-6 border-indigo-500/20 shadow-2xl">
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Haftalik Dars Jadvali
            </h3>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
                <span className="ml-2 text-xs text-slate-500">Jadval yuklanmoqda...</span>
              </div>
            ) : !scheduleList || scheduleList.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs font-medium">
                Hozircha dars jadvali shakllantirilmagan
              </div>
            ) : (
              <div className="space-y-3">
                {scheduleList.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm"
                  >
                    <div>
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{item.day}</span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h4>
                    </div>
                    <span className="text-xs text-slate-500 font-mono font-bold bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* CREATE QUIZ MODAL */}
      <Modal isOpen={isQuizModalOpen} onClose={() => setIsQuizModalOpen(false)} title="Yangi Test Yaratish">
        <form onSubmit={handleCreateQuiz} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Test Nomi
            </label>
            <input
              type="text"
              required
              value={newQuizTitle}
              onChange={(e) => setNewQuizTitle(e.target.value)}
              placeholder="masalan: IELTS Reading Mini Mock Test"
              className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Kategoriya
              </label>
              <select
                value={newQuizCategory}
                onChange={(e) => setNewQuizCategory(e.target.value as QuizCategory)}
                className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 rounded-xl p-3 text-xs text-slate-900 dark:text-white font-bold cursor-pointer focus:border-indigo-500"
              >
                <option value="IELTS">IELTS</option>
                <option value="SAT">SAT</option>
                <option value="CEFR">CEFR</option>
                <option value="General">General</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Vaqt (Daqiqa)
              </label>
              <input
                type="number"
                min={1}
                value={newQuizDuration}
                onChange={(e) => setNewQuizDuration(Number(e.target.value))}
                className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsQuizModalOpen(false)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary py-2.5 px-6 text-xs font-bold flex items-center gap-2 shadow-md shadow-indigo-600/30 disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Testni Saqlash
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};