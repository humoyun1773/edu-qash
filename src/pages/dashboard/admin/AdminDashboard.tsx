import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Users, 
  BookOpen, 
  CreditCard, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Loader2,
  TrendingUp,
  Search,
  Activity,
  DollarSign
} from 'lucide-react';
import { useAdminUsers } from '../../../hooks/useAdminUsers';
import { useCourses } from '../../../hooks/useCourses';
import { Modal } from '../../../components/common/Modal';
import { DashboardSidebar } from '../common/DashboardSidebar';
import { DashboardSettings } from '../DashboardSettings';
import { getAdminTabs, type AdminTabType } from './adminTabs';
import type { UserRole, CourseCategory } from '../../../types';
import { useToast } from '../../../context/ToastContext';

export const AdminDashboard: React.FC = () => {
  const { toast, confirm } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const adminTab = (searchParams.get('tab') as AdminTabType) || 'users';
  const setAdminTab = (tab: AdminTabType) => setSearchParams({ tab });

  const { users: usersList, payments: paymentsList, createUser, deleteUser } = useAdminUsers();
  const { courses, createCourse, deleteCourse } = useCourses();

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New User Form State
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('student');

  // New Course Form State
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseCategory, setNewCourseCategory] = useState<CourseCategory>('IELTS');
  const [newCoursePrice, setNewCoursePrice] = useState<number>(450000);
  const [newCourseDesc, setNewCourseDesc] = useState('');

  // Reset Form Helpers
  const resetUserForm = () => {
    setNewUserName('');
    setNewUserEmail('');
    setNewUserRole('student');
  };

  const resetCourseForm = () => {
    setNewCourseTitle('');
    setNewCourseDesc('');
    setNewCourseCategory('IELTS');
    setNewCoursePrice(450000);
  };

  const handleCloseUserModal = () => {
    resetUserForm();
    setIsUserModalOpen(false);
  };

  const handleCloseCourseModal = () => {
    resetCourseForm();
    setIsCourseModalOpen(false);
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await createUser({
        name: newUserName.trim(),
        email: newUserEmail.trim(),
        role: newUserRole,
      });
      toast.success('Yangi foydalanuvchi muvaffaqiyatli qo‘shildi!');
      handleCloseUserModal();
    } catch (error) {
      console.error('Foydalanuvchi yaratishda xatolik:', error);
      toast.error('Foydalanuvchi yaratishda xatolik yuz berdi!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await createCourse({
        title: newCourseTitle.trim(),
        description: newCourseDesc.trim(),
        category: newCourseCategory,
        price: newCoursePrice,
        teacherName: 'Admin Created',
        teacherAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600',
        rating: 5.0,
        reviewsCount: 1,
        studentsCount: 0,
        type: 'online',
        level: 'All Levels',
        duration: '1 Month'
      });
      toast.success('Yangi kurs muvaffaqiyatli yaratildi!');
      handleCloseCourseModal();
    } catch (error) {
      console.error('Kurs yaratishda xatolik:', error);
      toast.error('Kurs yaratishda xatolik yuz berdi!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    confirm({
      title: 'Foydalanuvchini o‘chirish',
      message: 'Haqiqatan ham ushbu foydalanuvchini o‘chirmoqchimisiz?',
      type: 'danger',
      confirmText: 'O‘chirish',
      onConfirm: async () => {
        await deleteUser(id);
        toast.success('Foydalanuvchi muvaffaqiyatli o‘chirildi!');
      }
    });
  };

  const handleDeleteCourse = async (id: string) => {
    confirm({
      title: 'Kursni o‘chirish',
      message: 'Haqiqatan ham ushbu kursni o‘chirmoqchimisiz?',
      type: 'danger',
      confirmText: 'O‘chirish',
      onConfirm: async () => {
        await deleteCourse(id);
        toast.success('Kurs muvaffaqiyatli o‘chirildi!');
      }
    });
  };

  const adminTabs = getAdminTabs(usersList.length, paymentsList.length);

  // Filtered lists
  const filteredUsers = usersList.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = paymentsList.reduce((acc, curr) => acc + (curr.amount || 0), 0);

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-screen">
      {/* SIDEBAR */}
      <DashboardSidebar
        title="Admin Boshqaruvi"
        activeTab={adminTab}
        onSelectTab={setAdminTab}
        tabs={adminTabs}
        accentGradient="from-indigo-600 via-purple-600 to-pink-600"
      />

      {/* MAIN CONTENT PANEL */}
      <div className="flex-1 min-w-0 space-y-8">
        
        {/* TOP OVERVIEW CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div className="card-glowing-light card-shimmer relative overflow-hidden p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-xl hover:border-indigo-500/40 transition-all duration-300 group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Users className="w-20 h-20 text-indigo-500" />
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Jami Foydalanuvchilar</p>
                <h4 className="text-3xl font-black text-slate-900 dark:text-white font-display">{usersList.length}</h4>
              </div>
            </div>
            <div className="flex items-center text-xs text-emerald-600 dark:text-emerald-400 font-bold pt-3 border-t border-slate-100 dark:border-slate-800">
              <TrendingUp className="w-4 h-4 mr-1.5" />
              <span>Faol foydalanuvchilar o'smoqda</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card-glowing-light card-shimmer relative overflow-hidden p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-xl hover:border-emerald-500/40 transition-all duration-300 group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <BookOpen className="w-20 h-20 text-emerald-500" />
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Mavjud Kurslar</p>
                <h4 className="text-3xl font-black text-slate-900 dark:text-white font-display">{courses.length}</h4>
              </div>
            </div>
            <div className="flex items-center text-xs text-emerald-600 dark:text-emerald-400 font-bold pt-3 border-t border-slate-100 dark:border-slate-800">
              <Activity className="w-4 h-4 mr-1.5" />
              <span>Platformadagi barcha kurslar</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card-glowing-light card-shimmer relative overflow-hidden p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-xl hover:border-amber-500/40 transition-all duration-300 group sm:col-span-2 lg:col-span-1">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <CreditCard className="w-20 h-20 text-amber-500" />
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Umumiy Daromad</p>
                <h4 className="text-3xl font-black text-slate-900 dark:text-white font-display">{totalRevenue.toLocaleString()} <span className="text-sm font-normal text-slate-500">so'm</span></h4>
              </div>
            </div>
            <div className="flex items-center text-xs text-amber-600 dark:text-amber-400 font-bold pt-3 border-t border-slate-100 dark:border-slate-800">
              <CheckCircle2 className="w-4 h-4 mr-1.5" />
              <span>To'lovlar muvaffaqiyatli</span>
            </div>
          </div>
        </div>

        {/* SETTINGS TAB */}
        {adminTab === 'settings' && <DashboardSettings />}

        {/* USERS TAB */}
        {adminTab === 'users' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-2xl shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800">
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3 tracking-tight font-display">
                  <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                    <Users className="w-6 h-6" />
                  </div>
                  Foydalanuvchilar Boshqaruvi
                </h3>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Qidirish..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-100/80 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
                  />
                </div>
                <button 
                  onClick={() => setIsUserModalOpen(true)}
                  className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 active:scale-95 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Foydalanuvchi Qo‘shish
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
              <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                <thead className="bg-slate-100 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-4">Ism va Profil</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Rol</th>
                    <th className="p-4 text-right">Amallar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800/60">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-indigo-50/40 dark:hover:bg-slate-800/40 transition-colors group">
                        <td className="p-4 font-bold text-slate-900 dark:text-white flex items-center gap-3">
                          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-black text-sm shadow-md shadow-indigo-500/20">
                            {u.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors font-extrabold">{u.name}</span>
                        </td>
                        <td className="p-4 text-slate-600 dark:text-slate-400 font-mono font-medium">{u.email}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase border ${
                            u.role === 'admin' ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30' :
                            u.role === 'teacher' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' :
                            u.role === 'center_owner' ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30' :
                            'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30'
                          }`}>
                            {u.role.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => handleDeleteUser(u.id)} 
                            className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-2xl transition-all cursor-pointer" 
                            title="O'chirish"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-slate-500 font-semibold">
                        Foydalanuvchilar topilmadi.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PAYMENTS TAB */}
        {adminTab === 'payments' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-2xl shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800">
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3 tracking-tight font-display">
                  <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  Platforma To‘lovlari (Click, Payme, Uzum)
                </h3>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
              <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                <thead className="bg-slate-100 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-4">Invoys ID</th>
                    <th className="p-4">Foydalanuvchi</th>
                    <th className="p-4">Xizmat</th>
                    <th className="p-4">Summa</th>
                    <th className="p-4">Holat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800/60">
                  {paymentsList.map((p) => (
                    <tr key={p.id} className="hover:bg-indigo-50/40 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-mono text-indigo-600 dark:text-indigo-400 font-bold">{p.invoiceId}</td>
                      <td className="p-4 font-bold text-slate-900 dark:text-white">{p.userName}</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400 font-medium">{p.courseOrSubName}</td>
                      <td className="p-4 font-extrabold text-slate-900 dark:text-white font-display">{p.amount.toLocaleString()} so‘m</td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                          <CheckCircle2 className="w-3.5 h-3.5" /> {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* COURSES TAB */}
        {adminTab === 'courses' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-2xl shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800">
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3 tracking-tight font-display">
                  <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  Barcha Platformadagi Kurslar
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  Platformada mavjud barcha kurslarni ko‘rish va moderatsiyadan o‘tkazish paneli.
                </p>
              </div>
              <button 
                onClick={() => setIsCourseModalOpen(true)}
                className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-95 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Yangi Kurs Qo‘shish
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {courses.map((c) => (
                <div key={c.id} className="p-5 rounded-3xl bg-slate-50/70 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/40 transition-all flex items-start justify-between gap-4 group shadow-md hover:shadow-xl">
                  <div className="space-y-2">
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
                      {c.category}
                    </span>
                    <h4 className="text-base font-black text-slate-900 dark:text-white font-display group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{c.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 font-medium">{c.description}</p>
                    <p className="text-sm font-black text-emerald-600 dark:text-emerald-400 pt-1 font-display">{c.price.toLocaleString()} so'm</p>
                  </div>
                  <button 
                    onClick={() => handleDeleteCourse(c.id)} 
                    className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-2xl transition-all cursor-pointer shrink-0" 
                    title="O'chirish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEO & SECURITY TAB */}
        {adminTab === 'seo_security' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-2xl shadow-xl space-y-6">
            <div className="pb-6 border-b border-slate-200/80 dark:border-slate-800">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3 tracking-tight font-display">
                <div className="p-2.5 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                SEO & Xavfsizlik Sozlamalari
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                SSL, Rate limiting, CORS, Meta taglar va sitemap avtomatizatsiyasi.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-6 rounded-3xl bg-slate-50/70 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-slate-900 dark:text-white font-display">SSL & HTTPS Protection</span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-black bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">Faol</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Barcha trafik TLS/SSL protokoli orqali shifrlangan.</p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-50/70 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-slate-900 dark:text-white font-display">Rate Limiting</span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-black bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">100 req/min</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">DDoS hujumlaridan va avtomatik so'rovlardan himoya.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ADD USER MODAL */}
      <Modal isOpen={isUserModalOpen} onClose={handleCloseUserModal} title="Yangi Foydalanuvchi Qo'shish">
        <form onSubmit={handleAddUser} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">Foydalanuvchi Ismi</label>
            <input
              type="text"
              required
              placeholder="masalan: Shahzod Rashidov"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all shadow-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">Email Manzili</label>
            <input
              type="email"
              required
              placeholder="masalan: shahzod@eduqash.uz"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all shadow-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">Platforma Roli</label>
            <select
              value={newUserRole}
              onChange={(e) => setNewUserRole(e.target.value as UserRole)}
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 text-xs text-slate-900 dark:text-white font-bold cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all shadow-sm"
            >
              <option value="student">Talaba (Student)</option>
              <option value="teacher">O'qituvchi (Teacher)</option>
              <option value="center_owner">Markaz Rahbari (Center Owner)</option>
              <option value="moderator">Moderator</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={handleCloseUserModal}
              className="px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-2.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              <span>Foydalanuvchini Saqlash</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* ADD COURSE MODAL */}
      <Modal isOpen={isCourseModalOpen} onClose={handleCloseCourseModal} title="Yangi Kurs Qo'shish">
        <form onSubmit={handleAddCourse} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">Kurs Nomi</label>
            <input
              type="text"
              required
              placeholder="masalan: Digital SAT Math 1500+ Intensive"
              value={newCourseTitle}
              onChange={(e) => setNewCourseTitle(e.target.value)}
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all shadow-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">Kategoriya</label>
              <select
                value={newCourseCategory}
                onChange={(e) => setNewCourseCategory(e.target.value as CourseCategory)}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 text-xs text-slate-900 dark:text-white font-bold cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all shadow-sm"
              >
                <option value="IELTS">IELTS</option>
                <option value="SAT">SAT</option>
                <option value="CEFR">CEFR</option>
                <option value="IT">IT & Dasturlash</option>
                <option value="General">General English</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">Narxi (So'm)</label>
              <input
                type="number"
                min={0}
                value={newCoursePrice}
                onChange={(e) => setNewCoursePrice(Number(e.target.value))}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all shadow-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">Kurs Tavsifi</label>
            <textarea
              rows={3}
              placeholder="Kurs haqida qisqacha ma'lumot..."
              value={newCourseDesc}
              onChange={(e) => setNewCourseDesc(e.target.value)}
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all shadow-sm resize-none"
            />
          </div>
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={handleCloseCourseModal}
              className="px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-2.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/25 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              <span>Kursni Saqlash</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};