import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Users, 
  CreditCard, 
  Plus, 
  Trash2, 
  CheckCircle, 
  Phone, 
  MapPin, 
  Globe, 
  Send, 
  TrendingUp, 
  DollarSign,
  UserPlus,
  Sparkles
} from 'lucide-react';
import { useCenterOwner } from '../../../hooks/useCenterOwner';

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);
import { Modal } from '../../../components/common/Modal';
import { DashboardSidebar } from '../common/DashboardSidebar';
import { DashboardSettings } from '../DashboardSettings';
import { getCenterOwnerTabs, type CenterOwnerTabType } from './centerOwnerTabs';
import { useToast } from '../../../context/ToastContext';

export const CenterOwnerDashboard: React.FC = () => {
  const { toast, confirm } = useToast();
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
      toast.success('O‘quv markazingiz ma’lumotlari muvaffaqiyatli yangilandi!', 'Profil Yangilandi');
    } catch (err) {
      console.error(err);
      toast.error('Markaz ma’lumotlarini saqlashda xatolik yuz berdi!');
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
        phone: teacherPhone
      });
      toast.success('Yangi o‘qituvchi muvaffaqiyatli qo‘shildi!');
      resetTeacherForm();
      setIsTeacherModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('O‘qituvchi qo‘shishda xatolik yuz berdi!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveTeacher = async (id: string) => {
    confirm({
      title: 'O‘qituvchini o‘chirish',
      message: 'Haqiqatan ham ushbu o‘qituvchini markazdan o‘chirmoqchimisiz?',
      type: 'danger',
      confirmText: 'O‘chirish',
      onConfirm: async () => {
        await removeTeacher(id);
        toast.success('O‘qituvchi markazdan o‘chirildi!');
      }
    });
  };

  const ownerTabs = getCenterOwnerTabs(teachers?.length || 0);

  const renderTabContent = () => {
    switch (ownerTab) {
      case 'settings':
        return <DashboardSettings />;

      case 'profile_edit':
        return (
          <div className="p-6 sm:p-10 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 space-y-8 shadow-xl transition-all">
            <div className="flex items-center gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-5">
              <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shadow-sm">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-display">
                  O‘quv Markazi Profilini Tahrirlash
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Markazingiz haqidagi asosiy ma'lumotlar va aloqa kanallarini yangilang.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveCenterProfile} className="space-y-6">
              {/* Asosiy Ma'lumotlar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-indigo-500" /> Markaz Nomi
                  </label>
                  <input
                    type="text"
                    value={centerData.name}
                    onChange={(e) => setCenterData({ ...centerData, name: e.target.value })}
                    placeholder="Masalan: Cambridge Learning Center"
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-indigo-500" /> Telefon Raqami
                  </label>
                  <input
                    type="text"
                    value={centerData.phone}
                    onChange={(e) => setCenterData({ ...centerData, phone: e.target.value })}
                    placeholder="+998 71 200 00 00"
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-sm"
                  />
                </div>
              </div>

              {/* Manzil va Ish vaqti */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-indigo-500" /> Shahar
                  </label>
                  <input
                    type="text"
                    value={centerData.city}
                    onChange={(e) => setCenterData({ ...centerData, city: e.target.value })}
                    placeholder="Toshkent sh."
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-indigo-500" /> To'liq Manzil
                  </label>
                  <input
                    type="text"
                    value={centerData.address}
                    onChange={(e) => setCenterData({ ...centerData, address: e.target.value })}
                    placeholder="Yunusobod t., Amir Temur ko'chasi 108"
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-sm"
                  />
                </div>
              </div>

              {/* Ijtimoiy Tarmoqlar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5 text-sky-500" /> Telegram Link
                  </label>
                  <input
                    type="text"
                    value={centerData.telegram}
                    onChange={(e) => setCenterData({ ...centerData, telegram: e.target.value })}
                    placeholder="https://t.me/eduqash"
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                    <InstagramIcon className="w-3.5 h-3.5 text-pink-500" /> Instagram Link
                  </label>
                  <input
                    type="text"
                    value={centerData.instagram}
                    onChange={(e) => setCenterData({ ...centerData, instagram: e.target.value })}
                    placeholder="https://instagram.com/eduqash"
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-indigo-500" /> Veb-sayt
                  </label>
                  <input
                    type="text"
                    value={centerData.website}
                    onChange={(e) => setCenterData({ ...centerData, website: e.target.value })}
                    placeholder="https://eduqash.uz"
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-sm"
                  />
                </div>
              </div>

              {/* Tavsif */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Markaz Haqida Ma'lumot (Tavsif)
                </label>
                <textarea
                  rows={4}
                  value={centerData.description}
                  onChange={(e) => setCenterData({ ...centerData, description: e.target.value })}
                  placeholder="Markazingiz erishgan yutuqlari, o'qitish metodikasi va afzalliklari..."
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-sm resize-none"
                />
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-200/80 dark:border-slate-800">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary py-3.5 px-8 text-xs font-bold shadow-xl shadow-indigo-500/25 active:scale-[0.98]"
                >
                  {isSubmitting ? 'Saqlanmoqda...' : 'Ma’lumotlarni Saqlash'}
                </button>
              </div>
            </form>
          </div>
        );

      case 'teachers':
        return (
          <div className="p-6 sm:p-10 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 space-y-8 shadow-xl transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shadow-sm">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-display">
                    Markaz O‘qituvchilari Shtati
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    O'quv markazingizda faoliyat yurituvchi barcha ustozlar ro'yxati.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsTeacherModalOpen(true)}
                className="btn-primary py-3 px-5 text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25"
              >
                <Plus className="w-4 h-4" />
                <span>Yangi O'qituvchi Qo'shish</span>
              </button>
            </div>

            {teachers.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center border border-indigo-500/20 shadow-lg">
                  <Users className="w-8 h-8" />
                </div>
                <p className="text-base font-bold text-slate-800 dark:text-slate-200">
                  Hozircha o'qituvchilar biriktirilmagan
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {teachers.map((t) => (
                  <div
                    key={t.id}
                    className="p-6 rounded-3xl bg-slate-50/70 dark:bg-slate-950/40 hover:bg-white dark:hover:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 transition-all duration-300 hover:shadow-xl space-y-4 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                            {t.name}
                          </h4>
                          <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                            {t.subject}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveTeacher(t.id)}
                        className="p-2.5 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                        title="O'chirish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>Tel: <strong className="text-slate-700 dark:text-slate-300">{t.phone || '+998 90 000 00 00'}</strong></span>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                        Faol Ustoz
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'revenue':
        return (
          <div className="p-6 sm:p-10 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 space-y-8 shadow-xl transition-all">
            <div className="flex items-center gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-5">
              <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-sm">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-display">
                  Markaz Daromadlari va Moliya Analitikasi
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Barcha o'quvchilardan tushgan to'lovlar va oylik daromad dinamikasi.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-transparent border border-indigo-500/20 shadow-lg shadow-indigo-500/5 space-y-2">
                <div className="flex items-center justify-between text-indigo-600 dark:text-indigo-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Jami Daromad</span>
                  <TrendingUp className="w-4 h-4" />
                </div>
                <p className="text-2xl font-black text-slate-900 dark:text-white font-display">
                  {revenue?.totalMonthly ? revenue.totalMonthly.toLocaleString() : '12,500,000'} <span className="text-sm font-normal text-slate-500">so‘m</span>
                </p>
                <div className="flex items-center gap-1 text-[11px] text-emerald-500 font-bold">
                  <TrendingUp className="w-3.5 h-3.5" /> <span>+14% o'sish</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 shadow-lg shadow-emerald-500/5 space-y-2">
                <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Faol Talabalar</span>
                  <Users className="w-4 h-4" />
                </div>
                <p className="text-2xl font-black text-slate-900 dark:text-white font-display">
                  248 <span className="text-sm font-normal text-slate-500">nafar</span>
                </p>
                <div className="flex items-center gap-1 text-[11px] text-emerald-500 font-bold">
                  <span>+18 ta</span> <span className="text-slate-400 font-normal">yangi a'zo</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 shadow-lg shadow-amber-500/5 space-y-2">
                <div className="flex items-center justify-between text-amber-600 dark:text-amber-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Kutilayotgan To'lovlar</span>
                  <DollarSign className="w-4 h-4" />
                </div>
                <p className="text-2xl font-black text-slate-900 dark:text-white font-display">
                  6,200,000 <span className="text-sm font-normal text-slate-500">so‘m</span>
                </p>
                <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold">
                  <span>14 ta talaba</span> <span className="text-slate-400 font-normal">qarzdorlik</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-screen">
      {/* COLLAPSIBLE SIDEBAR */}
      <DashboardSidebar
        title="Markaz Rahbari"
        activeTab={ownerTab}
        onSelectTab={setOwnerTab}
        tabs={ownerTabs}
        accentGradient="from-indigo-600 via-purple-600 to-pink-600"
      />

      {/* MAIN CONTENT PANEL */}
      <div className="flex-1 min-w-0 space-y-8">
        {/* TOP OVERVIEW CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="relative overflow-hidden p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-xl hover:border-indigo-500/40 transition-all duration-300 group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Building2 className="w-20 h-20 text-indigo-500" />
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">O'quv Markaz</p>
                <h4 className="text-xl font-black text-slate-900 dark:text-white font-display line-clamp-1">{profile?.name || 'Eduqash Center'}</h4>
              </div>
            </div>
            <div className="flex items-center text-xs text-indigo-600 dark:text-indigo-400 font-bold pt-3 border-t border-slate-100 dark:border-slate-800">
              <MapPin className="w-4 h-4 mr-1.5 shrink-0" />
              <span className="truncate">{profile?.address || 'Toshkent sh.'}</span>
            </div>
          </div>

          <div className="relative overflow-hidden p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-xl hover:border-emerald-500/40 transition-all duration-300 group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Users className="w-20 h-20 text-emerald-500" />
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">O'qituvchilar Shtati</p>
                <h4 className="text-3xl font-black text-slate-900 dark:text-white font-display">{teachers.length}</h4>
              </div>
            </div>
            <div className="flex items-center text-xs text-emerald-600 dark:text-emerald-400 font-bold pt-3 border-t border-slate-100 dark:border-slate-800">
              <TrendingUp className="w-4 h-4 mr-1.5" />
              <span>Pedagoglar faol</span>
            </div>
          </div>

          <div className="relative overflow-hidden p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-xl hover:border-amber-500/40 transition-all duration-300 group sm:col-span-2 lg:col-span-1">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <CreditCard className="w-20 h-20 text-amber-500" />
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Oylik Tushum</p>
                <h4 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display">{revenue?.totalMonthly ? revenue.totalMonthly.toLocaleString() : '12,500,000'} <span className="text-xs font-normal text-slate-500">so'm</span></h4>
              </div>
            </div>
            <div className="flex items-center text-xs text-amber-600 dark:text-amber-400 font-bold pt-3 border-t border-slate-100 dark:border-slate-800">
              <CheckCircle className="w-4 h-4 mr-1.5" />
              <span>Tushum tahlili active</span>
            </div>
          </div>
        </div>

        {renderTabContent()}
      </div>

      {/* ADD TEACHER MODAL */}
      <Modal isOpen={isTeacherModalOpen} onClose={handleCloseTeacherModal} title="Markazga Yangi O'qituvchi Qo'shish">
        <form onSubmit={handleAddTeacher} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
              <UserPlus className="w-3.5 h-3.5 text-indigo-500" /> O'qituvchi Ism-Familiyasi
            </label>
            <input
              type="text"
              required
              placeholder="masalan: Mr. John Smith"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Dars Beradigan Fani / Yo'nalishi
            </label>
            <input
              type="text"
              required
              placeholder="masalan: IELTS Speaking & Writing Specialist"
              value={teacherSubject}
              onChange={(e) => setTeacherSubject(e.target.value)}
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-indigo-500" /> Telefon Raqami
            </label>
            <input
              type="text"
              required
              placeholder="+998 90 123 45 67"
              value={teacherPhone}
              onChange={(e) => setTeacherPhone(e.target.value)}
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-sm"
            />
          </div>
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200/80 dark:border-slate-800">
            <button
              type="button"
              onClick={handleCloseTeacherModal}
              className="px-5 py-3 rounded-2xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary py-3 px-6 text-xs font-bold shadow-lg shadow-indigo-500/25"
            >
              {isSubmitting ? 'Saqlanmoqda...' : "O'qituvchini Saqlash"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};