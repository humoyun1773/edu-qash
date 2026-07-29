import React, { useState, useEffect } from 'react';
import { Building2, Users, CreditCard, Settings, Plus, Trash2, CheckCircle } from 'lucide-react';
import { useCenterOwner } from '../../hooks/useCenterOwner';
import { Modal } from '../../components/common/Modal';
import { DashboardSidebar } from '../../components/dashboard/DashboardSidebar';
import type { SidebarTabItem } from '../../components/dashboard/DashboardSidebar';
import { DashboardSettings } from './DashboardSettings';

type CenterOwnerTabType = 'profile_edit' | 'teachers' | 'revenue' | 'settings';

export const CenterOwnerDashboard: React.FC = () => {
  const [ownerTab, setOwnerTab] = useState<CenterOwnerTabType>('profile_edit');
  const { profile, teachers, revenue, updateProfile, addTeacher, removeTeacher } = useCenterOwner();

  // Modal State
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teacherName, setTeacherName] = useState('');
  const [teacherSubject, setTeacherSubject] = useState('');
  const [teacherPhone, setTeacherPhone] = useState('');

  const [centerData, setCenterData] = useState({
    name: '',
    description: '',
    phone: '',
    telegram: '',
    instagram: '',
    website: '',
    address: '',
    workingHours: '',
    city: ''
  });

  useEffect(() => {
    if (profile) {
      setCenterData({
        name: profile.name || '',
        description: profile.description || '',
        phone: profile.phone || '',
        telegram: profile.telegram || '',
        instagram: profile.instagram || '',
        website: profile.website || '',
        address: profile.address || '',
        workingHours: profile.workingHours || '',
        city: profile.city || ''
      });
    }
  }, [profile]);

  const resetTeacherForm = () => {
    setTeacherName('');
    setTeacherSubject('');
    setTeacherPhone('');
  };

  const handleCloseTeacherModal = () => {
    resetTeacherForm();
    setIsTeacherModalOpen(false);
  };

  const handleSaveCenterProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await updateProfile(centerData);
      alert('O‘quv markazingiz ma’lumotlari muvaffaqiyatli yangilandi!');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherName || !teacherSubject) return;

    try {
      setIsSubmitting(true);
      await addTeacher({
        name: teacherName,
        subject: teacherSubject,
        phone: teacherPhone || '+998 90 123 45 67'
      });
      handleCloseTeacherModal();
      alert('Yangi o‘qituvchi muvaffaqiyatli qo‘shildi!');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const ownerTabs: SidebarTabItem<CenterOwnerTabType>[] = [
    { id: 'profile_edit', label: 'Markaz Profilini Tahrirlash', icon: <Building2 className="w-4 h-4" /> },
    { id: 'teachers', label: 'O‘qituvchilar Shtati', icon: <Users className="w-4 h-4" />, badge: teachers?.length || 0 },
    { id: 'revenue', label: 'Filial Daromadlari', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'settings', label: 'Sozlamalar', icon: <Settings className="w-4 h-4" /> }
  ];

  const renderTabContent = () => {
    switch (ownerTab) {
      case 'settings':
        return <DashboardSettings />;

      case 'profile_edit':
        return (
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl">
            <h3 className="text-xl font-black text-slate-900 dark:text-white">O‘quv Markazi Profilini Tahrirlash</h3>
            <form onSubmit={handleSaveCenterProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Markaz Nomi
                  </label>
                  <input
                    type="text"
                    value={centerData.name}
                    onChange={(e) => setCenterData({ ...centerData, name: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Telefon Raqami
                  </label>
                  <input
                    type="text"
                    value={centerData.phone}
                    onChange={(e) => setCenterData({ ...centerData, phone: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Tavsif (Description)
                </label>
                <textarea
                  rows={4}
                  value={centerData.description}
                  onChange={(e) => setCenterData({ ...centerData, description: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn-primary py-3 px-6 text-xs font-bold disabled:opacity-50 flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                {isSubmitting ? 'Saqlanmoqda...' : 'Ma’lumotlarni Saqlash'}
              </button>
            </form>
          </div>
        );

      case 'teachers':
        return (
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-500" /> O‘qituvchilar Shtati
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Markazda faoliyat yurituvchi o‘qituvchilar ro‘yxati va biriktirilgan guruhlar.
                </p>
              </div>
              <button
                onClick={() => setIsTeacherModalOpen(true)}
                className="btn-primary py-2.5 px-4 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/30 self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" /> O‘qituvchi Qo‘shish
              </button>
            </div>

            {teachers.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                <Users className="w-10 h-10 text-slate-400 mx-auto mb-2 opacity-50" />
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Hozircha o'qituvchilar mavjud emas.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {teachers.map((t) => (
                  <div
                    key={t.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={t.avatar || 'https://via.placeholder.com/150'}
                        alt={t.name}
                        className="w-10 h-10 rounded-full object-cover border border-indigo-500/30"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t.name}</h4>
                        <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">{t.subject}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeTeacher(t.id)}
                      className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-colors"
                      title="O'chirish"
                      aria-label={`O'chirish ${t.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'revenue':
        return (
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl">
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-amber-500" /> Filial Daromadlari va Analitika
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Joriy oy uchun tushum:{' '}
              <span className="text-emerald-500 font-bold text-sm">
                {revenue?.monthlyRevenue ? revenue.monthlyRevenue.toLocaleString() : '48,500,000'} so‘m
              </span>
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* COLLAPSIBLE SIDEBAR */}
      <DashboardSidebar
        title="Markaz Rahbari Menyusi"
        activeTab={ownerTab}
        onSelectTab={setOwnerTab}
        tabs={ownerTabs}
        accentGradient="from-indigo-600 to-violet-600"
      />

      {/* MAIN CONTENT PANEL */}
      <div className="flex-1 space-y-6">
        {renderTabContent()}
      </div>

      {/* ADD TEACHER MODAL */}
      <Modal isOpen={isTeacherModalOpen} onClose={handleCloseTeacherModal} title="Markazga Yangi O'qituvchi Qo'shish">
        <form onSubmit={handleAddTeacher} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              O'qituvchi Ism-Familiyasi
            </label>
            <input
              type="text"
              required
              placeholder="masalan: Mr. John Smith"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Dars Beradigan Fani / Yo'nalishi
            </label>
            <input
              type="text"
              required
              placeholder="masalan: IELTS Speaking & Writing Specialist"
              value={teacherSubject}
              onChange={(e) => setTeacherSubject(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Telefon Raqami</label>
            <input
              type="text"
              required
              placeholder="+998 90 123 45 67"
              value={teacherPhone}
              onChange={(e) => setTeacherPhone(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={handleCloseTeacherModal}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary py-2.5 px-6 text-xs font-bold shadow-md shadow-indigo-600/30 disabled:opacity-50"
            >
              {isSubmitting ? 'Saqlanmoqda...' : "O'qituvchini Saqlash"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};