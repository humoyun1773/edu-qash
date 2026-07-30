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
  TrendingUp,
  UserCheck
} from 'lucide-react';
import { useTeacher } from '../../../hooks/useTeacher';
import { Modal } from '../../../components/common/Modal';
import { DashboardSidebar } from '../common/DashboardSidebar';
import { DashboardSettings } from '../DashboardSettings';
import { getTeacherTabs, type TeacherTabType } from './teacherTabs';

type QuizCategory = 'IELTS' | 'SAT' | 'CEFR' | 'General';

export const TeacherDashboard: React.FC = () => {
  const [teacherTab, setTeacherTab] = useState<TeacherTabType>('students');
  const { students: studentsList, schedule: scheduleList, quizzes: quizzesList, loading, createQuiz } = useTeacher();

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
    <div className="flex flex-col lg:flex-row gap-8 min-h-screen">
      {/* SIDEBAR */}
      <DashboardSidebar
        title="O‘qituvchi Boshqaruvi"
        activeTab={teacherTab}
        onSelectTab={setTeacherTab}
        tabs={teacherTabs}
        accentGradient="from-indigo-600 via-purple-600 to-pink-600"
      />

      {/* MAIN CONTENT PANEL */}
      <div className="flex-1 min-w-0 space-y-8">
        
        {/* TOP OVERVIEW CARDS (SUPER ADMIN STYLE) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div className="relative overflow-hidden p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-xl hover:border-indigo-500/40 transition-all duration-300 group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Users className="w-20 h-20 text-indigo-500" />
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Mening O'quvchilarim</p>
                <h4 className="text-3xl font-black text-slate-900 dark:text-white font-display">{studentsList?.length || 0}</h4>
              </div>
            </div>
            <div className="flex items-center text-xs text-emerald-600 dark:text-emerald-400 font-bold pt-3 border-t border-slate-100 dark:border-slate-800">
              <TrendingUp className="w-4 h-4 mr-1.5" />
              <span>O'quvchilar aktivligi yuqori</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative overflow-hidden p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-xl hover:border-emerald-500/40 transition-all duration-300 group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Calendar className="w-20 h-20 text-emerald-500" />
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Haftalik Darslar</p>
                <h4 className="text-3xl font-black text-slate-900 dark:text-white font-display">{scheduleList?.length || 0}</h4>
              </div>
            </div>
            <div className="flex items-center text-xs text-emerald-600 dark:text-emerald-400 font-bold pt-3 border-t border-slate-100 dark:border-slate-800">
              <Clock className="w-4 h-4 mr-1.5" />
              <span>Rejalashtirilgan jadvallar</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative overflow-hidden p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-xl hover:border-amber-500/40 transition-all duration-300 group sm:col-span-2 lg:col-span-1">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <BookOpenCheck className="w-20 h-20 text-amber-500" />
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
                <BookOpenCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Yaratilgan Testlar</p>
                <h4 className="text-3xl font-black text-slate-900 dark:text-white font-display">{quizzesList?.length || 0}</h4>
              </div>
            </div>
            <div className="flex items-center text-xs text-amber-600 dark:text-amber-400 font-bold pt-3 border-t border-slate-100 dark:border-slate-800">
              <CheckCircle2 className="w-4 h-4 mr-1.5" />
              <span>Quiz va Mock sinovlar</span>
            </div>
          </div>
        </div>

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
          <div className="p-6 sm:p-10 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 space-y-8 shadow-xl transition-all">
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shadow-sm">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-display">
                    Mening O‘quvchilarim Ro‘yxati
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    Sizning guruhlaringizda ta'lim olayotgan barcha o'quvchilar va ularning ballari.
                  </p>
                </div>
              </div>

              {studentsList && studentsList.length > 0 && (
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  {studentsList.length} nafar o'quvchi
                </span>
              )}
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-3">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">O'quvchilar yuklanmoqda...</span>
              </div>
            ) : !studentsList || studentsList.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center border border-indigo-500/20 shadow-lg">
                  <Users className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    Hozircha biriktirilgan o'quvchilar yo'q
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    Markaz ma'muri tomonidan sizga yangi o'quvchilar guruhlandi.
                  </p>
                </div>
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100/70 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 font-extrabold uppercase tracking-wider border-b border-slate-200/80 dark:border-slate-800">
                      <tr>
                        <th className="px-6 py-4">O'quvchi</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Kurs Nomi</th>
                        <th className="px-6 py-4">O'zlashtirish Balli</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800/60 font-medium">
                      {studentsList.map((st) => (
                        <tr key={st.id} className="hover:bg-indigo-50/40 dark:hover:bg-slate-800/40 transition-colors">
                          <td className="px-6 py-4 text-slate-900 dark:text-white font-bold flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-sm">
                              {st.name.charAt(0)}
                            </div>
                            <span>{st.name}</span>
                          </td>
                          <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{st.email}</td>
                          <td className="px-6 py-4 text-indigo-600 dark:text-indigo-400 font-semibold">{st.courseName}</td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold border border-emerald-500/20">
                              {st.score}
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

        {/* QUIZ BUILDER TAB */}
        {teacherTab === 'quiz_builder' && (
          <div className="p-6 sm:p-10 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 space-y-8 shadow-xl transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-sm">
                  <BookOpenCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-display">
                    Test va Quiz Yaratish Paneli
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    O'quvchilar uchun individual yoki guruh testlarini tuzing.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsQuizModalOpen(true)}
                className="btn-primary py-3 px-5 text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25"
              >
                <Plus className="w-4 h-4" />
                <span>Yangi Test Yaratish</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quizzesList?.map((q) => (
                <div
                  key={q.id}
                  className="p-6 rounded-3xl bg-slate-50/70 dark:bg-slate-950/40 hover:bg-white dark:hover:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 transition-all duration-300 hover:shadow-xl space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 text-[10px] font-extrabold rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 uppercase tracking-wider border border-amber-500/20">
                        {q.category}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {q.durationMinutes} daqiqa
                      </span>
                    </div>
                    <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">
                      {q.title}
                    </h4>
                  </div>

                  <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>O'tish bali: <strong className="text-slate-900 dark:text-white">{q.passScore || 70}%</strong></span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                      Faol Test
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI HOMEWORK CHECKER TAB */}
        {teacherTab === 'ai_checker' && (
          <div className="p-6 sm:p-10 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 space-y-8 shadow-xl transition-all">
            <div className="flex items-center gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-5">
              <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 shadow-sm">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-display">
                  AI Yordamida Uy Vazifalarini Tekshirish
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Insholar, yozma va grammatik topshiriqlarni sun'iy intellekt orqali tekshiring.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-500/20 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold shadow-xl shadow-indigo-600/30">
                <Bot className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-extrabold text-slate-900 dark:text-white font-display">
                  AI Assistent Foydalanishga Tayyor!
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  IELTS Writing va Essay insholarini bir necha soniyada avtomatik tekshirib, Band Score bashorat qiling.
                </p>
              </div>
              <a
                href="/ai-assistant"
                className="btn-primary py-3.5 px-8 text-xs font-bold inline-flex items-center gap-2 shadow-xl shadow-indigo-500/25"
              >
                <span>AI Tekshirgichga O'tish</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* SCHEDULE TAB */}
        {teacherTab === 'schedule' && (
          <div className="p-6 sm:p-10 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 space-y-8 shadow-xl transition-all">
            <div className="flex items-center gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-5">
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-sm">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-display">
                  Dars Jadvali va Vaqtlar
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Haftalik jonli darslar va mashg'ulotlar jadvali.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {scheduleList?.map((s, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold uppercase">
                      {s.day}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white pt-1">
                      {s.title}
                    </h4>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-indigo-600 dark:text-indigo-400 shadow-sm">
                    {s.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* CREATE QUIZ MODAL */}
      <Modal isOpen={isQuizModalOpen} onClose={() => setIsQuizModalOpen(false)} title="Yangi Test / Quiz Yaratish">
        <form onSubmit={handleCreateQuiz} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              Test Sarlavhasi / Nomi
            </label>
            <input
              type="text"
              required
              placeholder="masalan: IELTS Reading Academic Test #1"
              value={newQuizTitle}
              onChange={(e) => setNewQuizTitle(e.target.value)}
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
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
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
              >
                <option value="IELTS">IELTS</option>
                <option value="SAT">SAT</option>
                <option value="CEFR">CEFR</option>
                <option value="General">General English</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Vaqt Chegarasi (daqiqa)
              </label>
              <input
                type="number"
                required
                min={5}
                max={180}
                value={newQuizDuration}
                onChange={(e) => setNewQuizDuration(Number(e.target.value))}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200/80 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsQuizModalOpen(false)}
              className="px-5 py-3 rounded-2xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary py-3 px-6 text-xs font-bold shadow-lg shadow-indigo-500/25"
            >
              {isSubmitting ? 'Yaratilmoqda...' : "Testni Yaratish"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};