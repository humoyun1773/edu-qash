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
  Clock, 
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

  const ownerTabs = getCenterOwnerTabs(teachers?.length || 0);

  const renderTabContent = () => {
    switch (ownerTab) {
      case 'settings':
        return <DashboardSettings />;

      case 'profile_edit':
        return (
          <div className="p-6 sm:p-10 rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-800/80 space-y-8 shadow-2xl shadow-indigo-500/5 transition-all">
            <div className="flex items-center gap-3 border-b border-slate-200/80 dark:border-slate-800/80 pb-5">
              <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shadow-sm">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  O‘quv Markazi Profilini Tahrirlash
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Markazingiz hajidagi asosiy ma'lumotlar va aloqa kanallarini yangilang.
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
                    className="w-full bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-sm"
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
                    className="w-full bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-sm"
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
                    className="w-full bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-indigo-500" /> Manzil
                  </label>
                  <input
                    type="text"
                    value={centerData.address}
                    onChange={(e) => setCenterData({ ...centerData, address: e.target.value })}
                    placeholder="Yunusobod t., 4-mavze"
                    className="w-full bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-indigo-500" /> Ish Vaqti
                  </label>
                  <input
                    type="text"
                    value={centerData.workingHours}
                    onChange={(e) => setCenterData({ ...centerData, workingHours: e.target.value })}
                    placeholder="08:00 - 20:00"
                    className="w-full bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-sm"
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
                    placeholder="https://t.me/centername"
                    className="w-full bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-sm"
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
                    placeholder="https://instagram.com/centername"
                    className="w-full bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-emerald-500" /> Veb-sayt
                  </label>
                  <input
                    type="text"
                    value={centerData.website}
                    onChange={(e) => setCenterData({ ...centerData, website: e.target.value })}
                    placeholder="https://centername.uz"
                    className="w-full bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-sm"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Tavsif (Description)
                </label>
                <textarea
                  rows={4}
                  value={centerData.description}
                  onChange={(e) => setCenterData({ ...centerData, description: e.target.value })}
                  placeholder="Markazingiz va qulayliklar haqida qisqacha..."
                  className="w-full bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-sm resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex justify-end">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white py-3.5 px-8 rounded-2xl text-xs font-bold transition-all shadow-lg shadow-indigo-500/25 active:scale-[0.98] disabled:opacity-50 flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  {isSubmitting ? 'Saqlanmoqda...' : 'Ma’lumotlarni Saqlash'}
                </button>
              </div>
            </form>
          </div>
        );

      case 'teachers':
        return (
          <div className="p-6 sm:p-10 rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-800/80 space-y-8 shadow-2xl shadow-indigo-500/5 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 pb-6 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shadow-sm">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                    O‘qituvchilar Shtati
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Markazda faoliyat yurituvchi mutaxassislar ro‘yxati va biriktirilgan fanlar.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsTeacherModalOpen(true)}
                className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white py-3 px-5 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-500/25 active:scale-[0.98] transition-all self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" /> O‘qituvchi Qo‘shish
              </button>
            </div>

            {teachers.length === 0 ? (
              <div className="text-center py-16 border-2 border-dashed border-slate-200/80 dark:border-slate-800 rounded-3xl bg-slate-50/50 dark:bg-slate-950/30">
                <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 w-16 h-16 mx-auto mb-3 flex items-center justify-center text-slate-400">
                  <Users className="w-8 h-8 opacity-60" />
                </div>
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">O'qituvchilar mavjud emas</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Yangi o'qituvchi qo'shish uchun yuqoridagi tugmani bosing.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teachers.map((t) => (
                  <div
                    key={t.id}
                    className="p-5 rounded-2xl bg-white/80 dark:bg-slate-950/60 backdrop-blur-md border border-slate-200/70 dark:border-slate-800/80 flex items-center justify-between shadow-lg shadow-slate-500/5 hover:border-indigo-500/40 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={t.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                          alt={t.name}
                          className="w-12 h-12 rounded-2xl object-cover border-2 border-white dark:border-slate-800 shadow-md"
                        />
                        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{t.name}</h4>
                        <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold mt-0.5">{t.subject}</p>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-1">
                          <Phone className="w-3 h-3" /> {t.phone}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeTeacher(t.id)}
                      className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"
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
          <div className="p-6 sm:p-10 rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-800/80 space-y-8 shadow-2xl shadow-indigo-500/5 transition-all">
            <div className="flex items-center gap-3 border-b border-slate-200/80 dark:border-slate-800/80 pb-5">
              <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-sm">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  Filial Daromadlari va Analitika
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Markazning moliya va oylik daromad tushum statistikalari.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-transparent border border-indigo-500/20 shadow-lg shadow-indigo-500/5 space-y-2">
                <div className="flex items-center justify-between text-indigo-600 dark:text-indigo-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Joriy Oy Tushumi</span>
                  <TrendingUp className="w-4 h-4" />
                </div>
                <p className="text-2xl font-black text-slate-900 dark:text-white">
                  {revenue?.monthlyRevenue ? revenue.monthlyRevenue.toLocaleString() : '48,500,000'} <span className="text-sm font-normal text-slate-500">so‘m</span>
                </p>
                <div className="flex items-center gap-1 text-[11px] text-emerald-500 font-bold">
                  <span>+12.5%</span> <span className="text-slate-400 font-normal">o'tgan oyga nisbatan</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 shadow-lg shadow-emerald-500/5 space-y-2">
                <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Faol Talabalar</span>
                  <Users className="w-4 h-4" />
                </div>
                <p className="text-2xl font-black text-slate-900 dark:text-white">
                  248 <span className="text-sm font-normal text-slate-500">nafar</span>
                </p>
                <div className="flex items-center gap-1 text-[11px] text-emerald-500 font-bold">
                  <span>+18 ta</span> <span className="text-slate-400 font-normal">yangi a'zo</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 shadow-lg shadow-amber-500/5 space-y-2">
                <div className="flex items-center justify-between text-amber-600 dark:text-amber-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Kutilayotgan To'lovlar</span>
                  <DollarSign className="w-4 h-4" />
                </div>
                <p className="text-2xl font-black text-slate-900 dark:text-white">
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
        title="Markaz Rahbari Menyusi"
        activeTab={ownerTab}
        onSelectTab={setOwnerTab}
        tabs={ownerTabs}
        accentGradient="from-indigo-600 to-violet-600"
      />

      {/* MAIN CONTENT PANEL */}
      <div className="flex-1 min-w-0 space-y-6">
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
              className="w-full bg-white/70 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-sm"
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
              className="w-full bg-white/70 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-sm"
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
              className="w-full bg-white/70 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-sm"
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
              className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white py-3 px-6 rounded-2xl text-xs font-bold shadow-lg shadow-indigo-500/25 active:scale-[0.98] disabled:opacity-50 transition-all"
            >
              {isSubmitting ? 'Saqlanmoqda...' : "O'qituvchini Saqlash"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};