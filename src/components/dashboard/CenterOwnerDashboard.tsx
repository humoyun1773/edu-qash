import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Users, 
  CreditCard, 
  ChevronRight, 
  Globe, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  Save, 
  CheckCircle2,
  Plus,
  TrendingUp,
  BookOpen,
  Loader2
} from 'lucide-react';
import { useCenterOwner } from '../../hooks/useCenterOwner';

export const CenterOwnerDashboard: React.FC = () => {
  const [ownerTab, setOwnerTab] = useState<'profile_edit' | 'teachers' | 'revenue' | 'courses'>('profile_edit');
  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hook - markaz rahbari ma'lumotlarini yuklaydi (API + fallback)
  const { profile, teachers, revenue, loading, updateProfile } = useCenterOwner();

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

  // Profil yuklanganda formani to'ldirish
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

  const handleSaveCenterProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await updateProfile(centerData);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs = [
    { id: 'profile_edit' as const, label: 'Markaz Profili', icon: <Building2 className="w-4 h-4" />, colorOff: 'bg-emerald-50 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400' },
    { id: 'teachers' as const, label: "O'qituvchilar Shtati", icon: <Users className="w-4 h-4" />, colorOff: 'bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400' },
    { id: 'revenue' as const, label: 'Filial Daromadlari', icon: <CreditCard className="w-4 h-4" />, colorOff: 'bg-amber-50 dark:bg-slate-800 text-amber-600 dark:text-amber-400' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 text-slate-900 dark:text-white">
      
      {/* SIDEBAR NAVIGATION */}
      <div className="lg:col-span-1 space-y-3">
        <div className="relative overflow-hidden rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 p-4 shadow-2xl space-y-2">
          
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="px-3 py-2 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-200/60 dark:border-slate-800/80 mb-3 flex items-center justify-between">
            <span>Markaz Rahbari Paneli</span>
            <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono font-bold flex items-center gap-1 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
              <Building2 className="w-3 h-3" /> Partner
            </span>
          </div>

          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setOwnerTab(tab.id)}
              className={`w-full p-3.5 rounded-2xl text-xs font-bold text-left flex items-center justify-between transition-all duration-300 relative overflow-hidden active:scale-[0.98] ${
                ownerTab === tab.id
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/30'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <span className="flex items-center gap-3">
                <div className={`p-2 rounded-xl transition-all ${ownerTab === tab.id ? 'bg-white/20 text-white' : tab.colorOff}`}>
                  {tab.icon}
                </div>
                {tab.label}
              </span>
              <ChevronRight className={`w-4 h-4 transition-transform ${ownerTab === tab.id ? 'translate-x-0.5 text-white' : 'text-slate-400'}`} />
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="lg:col-span-3">
        
        {/* TAB 1: PROFILE EDIT */}
        {ownerTab === 'profile_edit' && (
          <div className="relative overflow-hidden rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-2xl space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-5">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
                  <div className="p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
                    <Building2 className="w-5 h-5" />
                  </div>
                  O'quv Markazi Profili
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Platformada talabalarga ko'rinadigan markaziy ma'lumotlarni boshqarish</p>
              </div>

              {isSaved && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" /> Ma'lumotlar saqlandi!
                </div>
              )}
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
                <span className="ml-2 text-xs text-slate-500">Ma'lumotlar yuklanmoqda...</span>
              </div>
            ) : (
              <form onSubmit={handleSaveCenterProfile} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-indigo-500" /> Markaz Nomi
                    </label>
                    <input
                      type="text"
                      value={centerData.name}
                      onChange={(e) => setCenterData({ ...centerData, name: e.target.value })}
                      placeholder="Masalan: Najot Ta'lim"
                      className="w-full bg-slate-100/60 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl px-4 py-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-emerald-500" /> Telefon Raqami
                    </label>
                    <input
                      type="text"
                      value={centerData.phone}
                      onChange={(e) => setCenterData({ ...centerData, phone: e.target.value })}
                      placeholder="+998 90 123 45 67"
                      className="w-full bg-slate-100/60 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl px-4 py-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">Markaz haqida qisqacha tavsif</label>
                  <textarea
                    rows={3}
                    value={centerData.description}
                    onChange={(e) => setCenterData({ ...centerData, description: e.target.value })}
                    placeholder="Markazingizdagi qulayliklar va yo'nalishlar haqida yozing..."
                    className="w-full bg-slate-100/60 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" /> Shahar / Viloyat
                    </label>
                    <input type="text" value={centerData.city} onChange={(e) => setCenterData({ ...centerData, city: e.target.value })} placeholder="Toshkent sh."
                      className="w-full bg-slate-100/60 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl px-4 py-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-500" /> Manzil
                    </label>
                    <input type="text" value={centerData.address} onChange={(e) => setCenterData({ ...centerData, address: e.target.value })} placeholder="Chilonzor tumani, 19-mavze"
                      className="w-full bg-slate-100/60 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl px-4 py-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-sky-500" /> Ish Vaqti
                    </label>
                    <input type="text" value={centerData.workingHours} onChange={(e) => setCenterData({ ...centerData, workingHours: e.target.value })} placeholder="09:00 - 20:00"
                      className="w-full bg-slate-100/60 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl px-4 py-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all" />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 space-y-3">
                  <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Ijtimoiy Tarmoq va Havolalar</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="relative">
                      <Send className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-sky-500" />
                      <input type="text" value={centerData.telegram} onChange={(e) => setCenterData({ ...centerData, telegram: e.target.value })} placeholder="Telegram username"
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none" />
                    </div>
                    <div className="relative">
                      <Globe className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-pink-500" />
                      <input type="text" value={centerData.instagram} onChange={(e) => setCenterData({ ...centerData, instagram: e.target.value })} placeholder="Instagram username"
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none" />
                    </div>
                    <div className="relative">
                      <Globe className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-500" />
                      <input type="text" value={centerData.website} onChange={(e) => setCenterData({ ...centerData, website: e.target.value })} placeholder="Veb-sayt URL"
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button type="submit" disabled={isSubmitting}
                    className="py-3 px-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {isSubmitting ? 'Saqlanmoqda...' : "Ma'lumotlarni Saqlash"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* TAB 2: TEACHERS */}
        {ownerTab === 'teachers' && (
          <div className="relative overflow-hidden rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-5">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
                  <div className="p-2 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl">
                    <Users className="w-5 h-5" />
                  </div>
                  O'qituvchilar Shtati
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Markazda faoliyat olib borayotgan barcha ustozlar ro'yxati</p>
              </div>
              <button className="py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 active:scale-95">
                <Plus className="w-4 h-4" /> Yangi O'qituvchi
              </button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
                <span className="ml-2 text-xs text-slate-500">O'qituvchilar yuklanmoqda...</span>
              </div>
            ) : teachers.length === 0 ? (
              <p className="text-xs text-center py-8 text-slate-400">Hozircha o'qituvchilar mavjud emas.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {teachers.map((t) => (
                  <div key={t.id} className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-base shadow-md">
                      {t.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{t.name}</h4>
                      <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">{t.subject}</p>
                      <p className="text-[10px] text-slate-400 mt-1">{t.studentsCount} ta talaba</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: REVENUE */}
        {ownerTab === 'revenue' && (
          <div className="relative overflow-hidden rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-200/80 dark:border-slate-800/80 pb-5">
              <div className="p-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Filial Daromadlari va Analitika</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Moliyaviy ko'rsatkichlar va oylik tushumlar statistikasi</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 space-y-2">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-500" /> Joriy Oy Tushumi
                </span>
                <p className="text-2xl font-black text-slate-900 dark:text-white">
                  {revenue?.monthlyRevenue ? revenue.monthlyRevenue.toLocaleString() : '48,500,000'} <span className="text-xs text-indigo-500 font-normal">so'm</span>
                </p>
                {revenue?.growthPercentage !== undefined && (
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold">+{revenue.growthPercentage}% o'tgan oyga nisbatan</p>
                )}
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 space-y-2">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-500" /> Faol Talabalar Soni
                </span>
                <p className="text-2xl font-black text-slate-900 dark:text-white">
                  {revenue?.activeStudents || 110} <span className="text-xs text-amber-500 font-normal">ta</span>
                </p>
                <p className="text-[10px] text-slate-400 font-medium">Barcha guruhlar bo'yicha</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};