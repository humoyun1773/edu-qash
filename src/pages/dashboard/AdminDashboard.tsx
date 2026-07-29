import React, { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  CreditCard, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Settings,
  Loader2 
} from 'lucide-react';
import { API_BASE_URL } from '../../services/api';
import { useAdminUsers } from '../../hooks/useAdminUsers';
import { useCourses } from '../../hooks/useCourses';
import { Modal } from '../../components/common/Modal';
import { DashboardSidebar } from '../../components/dashboard/DashboardSidebar';
import type { SidebarTabItem } from '../../components/dashboard/DashboardSidebar';
import { DashboardSettings } from './DashboardSettings';
import type { UserRole, CourseCategory } from '../../types';

type AdminTabType = 'users' | 'courses' | 'payments' | 'seo_security' | 'settings';

export const AdminDashboard: React.FC = () => {
  const [adminTab, setAdminTab] = useState<AdminTabType>('users');
  const { users: usersList, payments: paymentsList, loading: _loading, createUser, deleteUser } = useAdminUsers();
  const { courses, createCourse, deleteCourse } = useCourses();

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
      handleCloseUserModal();
    } catch (error) {
      console.error('Foydalanuvchi yaratishda xatolik:', error);
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
        description: newCourseDesc.trim() || 'Kurs tavsifi',
        category: newCourseCategory,
        price: newCoursePrice,
        type: 'online',
      });
      handleCloseCourseModal();
    } catch (error) {
      console.error('Kurs yaratishda xatolik:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (window.confirm('Haqiqatan ham ushbu foydalanuvchini o‘chirmoqchimisiz?')) {
      await deleteUser(id);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (window.confirm('Haqiqatan ham ushbu kursni o‘chirmoqchimisiz?')) {
      await deleteCourse(id);
    }
  };

  const adminTabs: SidebarTabItem<AdminTabType>[] = [
    { id: 'users', label: 'Foydalanuvchilar (CRUD)', icon: <Users className="w-4 h-4" />, badge: usersList.length },
    { id: 'courses', label: 'Barcha Kurslar', icon: <BookOpen className="w-4 h-4" />, badge: courses.length },
    { id: 'payments', label: 'To‘lovlar & Invoyslar', icon: <CreditCard className="w-4 h-4" />, badge: paymentsList.length },
    { id: 'seo_security', label: 'SEO & Security', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'settings', label: 'Sozlamalar', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* SIDEBAR */}
      <DashboardSidebar
        title="Admin Boshqaruvi"
        activeTab={adminTab}
        onSelectTab={setAdminTab}
        tabs={adminTabs}
        accentGradient="from-indigo-600 to-violet-600"
      />

      {/* MAIN CONTENT PANEL */}
      <div className="flex-1 space-y-6">
        {adminTab === 'settings' && <DashboardSettings />}

        {adminTab === 'users' && (
          <div className="glass-card p-6 sm:p-8 space-y-6 border-indigo-500/20 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Foydalanuvchilar Boshqaruvi (User CRUD)
                </h3>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                  REST API Target: {API_BASE_URL}/admin/users
                </span>
              </div>

              <button 
                onClick={() => setIsUserModalOpen(true)}
                className="btn-primary py-2.5 px-4 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/30"
              >
                <Plus className="w-4 h-4" /> Foydalanuvchi Qo‘shish
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                <thead className="bg-slate-100 dark:bg-slate-900/90 text-slate-700 dark:text-slate-400 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5 rounded-l-xl">Ism</th>
                    <th className="p-3.5">Email</th>
                    <th className="p-3.5">Rol</th>
                    <th className="p-3.5 text-right rounded-r-xl">Amallar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80">
                  {usersList.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                          {u.name.charAt(0)}
                        </div>
                        {u.name}
                      </td>
                      <td className="p-3.5 text-slate-600 dark:text-slate-300">{u.email}</td>
                      <td className="p-3.5">
                        <span className="badge badge-indigo capitalize">{u.role.replace('_', ' ')}</span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button 
                          onClick={() => handleDeleteUser(u.id)} 
                          className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all" 
                          title="O'chirish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {adminTab === 'payments' && (
          <div className="glass-card p-6 sm:p-8 space-y-6 border-indigo-500/20 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-500 dark:text-amber-400" /> Platforma To‘lovlari (Click, Payme, Uzum)
              </h3>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                REST API Target: {API_BASE_URL}/admin/payments
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                <thead className="bg-slate-100 dark:bg-slate-900/90 text-slate-700 dark:text-slate-400 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5 rounded-l-xl">Invoys ID</th>
                    <th className="p-3.5">Foydalanuvchi</th>
                    <th className="p-3.5">Xizmat</th>
                    <th className="p-3.5">Summa</th>
                    <th className="p-3.5 rounded-r-xl">Holat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80">
                  {paymentsList.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-colors">
                      <td className="p-3.5 font-mono text-indigo-600 dark:text-indigo-400 font-bold">{p.invoiceId}</td>
                      <td className="p-3.5 font-bold text-slate-900 dark:text-white">{p.userName}</td>
                      <td className="p-3.5 text-slate-600 dark:text-slate-300">{p.courseOrSubName}</td>
                      <td className="p-3.5 font-bold text-slate-900 dark:text-white">{p.amount.toLocaleString()} so‘m</td>
                      <td className="p-3.5 text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {p.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {adminTab === 'courses' && (
          <div className="glass-card p-6 sm:p-8 space-y-6 border-indigo-500/20 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Barcha Platformadagi Kurslar
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Platformada mavjud barcha kurslarni ko‘rish va moderatsiyadan o‘tkazish paneli.
                </p>
              </div>
              <button 
                onClick={() => setIsCourseModalOpen(true)}
                className="btn-primary py-2.5 px-4 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/30"
              >
                <Plus className="w-4 h-4" /> Yangi Kurs Qo‘shish
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {courses.map((c) => (
                <div key={c.id} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="badge badge-emerald">{c.category}</span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">{c.title}</h4>
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{c.price.toLocaleString()} so'm</p>
                  </div>
                  <button onClick={() => handleDeleteCourse(c.id)} className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-xl" title="O'chirish">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {adminTab === 'seo_security' && (
          <div className="glass-card p-6 sm:p-8 space-y-6 border-indigo-500/20 shadow-2xl">
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-rose-500 dark:text-rose-400" /> SEO & Xavfsizlik Sozlamalari
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">SSL, Rate limiting, CORS, Meta taglar va sitemap avtomatizatsiyasi.</p>
          </div>
        )}
      </div>

      {/* ADD USER MODAL */}
      <Modal isOpen={isUserModalOpen} onClose={handleCloseUserModal} title="Yangi Foydalanuvchi Qo'shish">
        <form onSubmit={handleAddUser} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Foydalanuvchi Ismi</label>
            <input
              type="text"
              required
              placeholder="masalan: Shahzod Rashidov"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email Manzili</label>
            <input
              type="email"
              required
              placeholder="masalan: user@gmail.com"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Foydalanuvchi Roli</label>
            <select
              value={newUserRole}
              onChange={(e) => setNewUserRole(e.target.value as UserRole)}
              className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 rounded-xl p-3 text-xs text-slate-900 dark:text-white font-bold cursor-pointer"
            >
              <option value="student">Student (Talaba)</option>
              <option value="teacher">Teacher (O'qituvchi)</option>
              <option value="center_owner">Center Owner (Markaz Rahbari)</option>
              <option value="admin">Admin (Administrator)</option>
            </select>
          </div>
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={handleCloseUserModal}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary py-2.5 px-6 text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Saqlash
            </button>
          </div>
        </form>
      </Modal>

      {/* ADD COURSE MODAL */}
      <Modal isOpen={isCourseModalOpen} onClose={handleCloseCourseModal} title="Yangi Kurs Qo'shish">
        <form onSubmit={handleAddCourse} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Kurs Nomi</label>
            <input
              type="text"
              required
              placeholder="masalan: IELTS Band 8.5 Intensive"
              value={newCourseTitle}
              onChange={(e) => setNewCourseTitle(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Kategoriya</label>
              <select
                value={newCourseCategory}
                onChange={(e) => setNewCourseCategory(e.target.value as CourseCategory)}
                className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 rounded-xl p-3 text-xs text-slate-900 dark:text-white font-bold cursor-pointer"
              >
                <option value="IELTS">IELTS</option>
                <option value="SAT">SAT</option>
                <option value="CEFR">CEFR</option>
                <option value="General English">General English</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Narxi (So'm)</label>
              <input
                type="number"
                value={newCoursePrice}
                onChange={(e) => setNewCoursePrice(Number(e.target.value))}
                className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Tavsifi</label>
            <textarea
              rows={3}
              placeholder="Kurs haqida qisqacha tavsif..."
              value={newCourseDesc}
              onChange={(e) => setNewCourseDesc(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={handleCloseCourseModal}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary py-2.5 px-6 text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Kursni Yaratish
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};