import React, { useState, useEffect } from 'react';
import { User, Lock, Bell, Moon, Sun, Shield, Save, CheckCircle2, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

type SubTabType = 'profile' | 'security' | 'notifications' | 'preferences';

interface SubTabConfig {
  id: SubTabType;
  label: string;
  icon: React.ReactNode;
}

const SUB_TABS: SubTabConfig[] = [
  { id: 'profile', label: "Shaxsiy Ma'lumotlar", icon: <User className="w-3.5 h-3.5" /> },
  { id: 'security', label: 'Parol va Xavfsizlik', icon: <Lock className="w-3.5 h-3.5" /> },
  { id: 'notifications', label: 'Xabarnomalar', icon: <Bell className="w-3.5 h-3.5" /> },
  { id: 'preferences', label: "Tizim Ko'rinishi (Theme)", icon: <Shield className="w-3.5 h-3.5" /> },
];

export const DashboardSettings: React.FC = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [activeSubTab, setActiveSubTab] = useState<SubTabType>('profile');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Profile Form States
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '+998 90 123 45 67');

  // Security Form States
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

  // Notification Form States
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [telegramNotifications, setTelegramNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);

  // Sync state if user context updates asynchronously
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      if (user.phone) setPhone(user.phone);
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 600));

      setSavedSuccess(true);
      setOldPassword('');
      setNewPassword('');

      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (error) {
      console.error('Sozlamalarni saqlashda xatolik:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatRoleLabel = (roleName?: string) => {
    if (!roleName) return 'FOYDALANUVCHI';
    return roleName.replace(/_/g, ' ').toUpperCase();
  };

  return (
    <div className="glass-card p-6 sm:p-8 space-y-6 border-indigo-500/20 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <User className="w-5 h-5 text-indigo-500 dark:text-indigo-400" /> Tizim Sozlamalari & Shaxsiy Profil
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Profilingiz ma'lumotlari, xavfsizlik va xabarnomalar sozlamalarini boshqaring.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-600 dark:text-emerald-300 text-xs font-bold animate-pulse">
            <CheckCircle2 className="w-4 h-4" /> Sozlamalar Saqlandi!
          </div>
        )}
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {SUB_TABS.map((tab) => {
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSubTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* PROFILE TAB */}
        {activeSubTab === 'profile' && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name || 'User Avatar'}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500 shadow-md"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 text-indigo-500 font-black text-xl flex items-center justify-center border-2 border-indigo-500">
                  {name ? name.charAt(0).toUpperCase() : 'U'}
                </div>
              )}
              <div>
                <span className="block text-xs font-bold text-slate-900 dark:text-white">Profil Rasmi</span>
                <span className="block text-[11px] text-slate-500 dark:text-slate-400">PNG, JPG formatida max 2MB</span>
                <button type="button" className="mt-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                  Rasm almashtirish
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">To'liq F.I.SH</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Elektron Pochta</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Telefon Raqam</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Foydalanuvchi Roli</label>
                <input
                  type="text"
                  disabled
                  value={formatRoleLabel(user?.role)}
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl p-3 text-xs text-indigo-600 dark:text-indigo-400 font-bold opacity-80 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        )}

        {/* SECURITY TAB */}
        {activeSubTab === 'security' && (
          <div className="space-y-4 max-w-xl">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Joriy Parol</label>
              <input
                type="password"
                placeholder="••••••••"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Yangi Parol</label>
              <input
                type="password"
                placeholder="Kamida 8 ta belgi"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-slate-900 dark:text-white">2-Bosqichli SMS Tasdiqlash (2FA)</span>
                <span className="block text-[11px] text-slate-500 dark:text-slate-400">Har safar kirganda SMS kod so'rash</span>
              </div>
              <input
                type="checkbox"
                aria-label="2-Bosqichli SMS Tasdiqlash"
                checked={twoFactorAuth}
                onChange={(e) => setTwoFactorAuth(e.target.checked)}
                className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* NOTIFICATIONS TAB */}
        {activeSubTab === 'notifications' && (
          <div className="space-y-4 max-w-xl">
            <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-slate-900 dark:text-white">Email Xabarnomalar</span>
                <span className="block text-[11px] text-slate-500 dark:text-slate-400">Yangi kurslar va to'lov kvitansiyalari</span>
              </div>
              <input
                type="checkbox"
                aria-label="Email Xabarnomalar"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-slate-900 dark:text-white">Telegram Bot Integratsiyasi</span>
                <span className="block text-[11px] text-slate-500 dark:text-slate-400">Test natijalari va dars jadvali xabarlari</span>
              </div>
              <input
                type="checkbox"
                aria-label="Telegram Bot Integratsiyasi"
                checked={telegramNotifications}
                onChange={(e) => setTelegramNotifications(e.target.checked)}
                className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-slate-900 dark:text-white">SMS Xabarnomalar</span>
                <span className="block text-[11px] text-slate-500 dark:text-slate-400">Muhim eslatmalar va parollarni tiklash</span>
              </div>
              <input
                type="checkbox"
                aria-label="SMS Xabarnomalar"
                checked={smsNotifications}
                onChange={(e) => setSmsNotifications(e.target.checked)}
                className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* PREFERENCES (THEME) TAB */}
        {activeSubTab === 'preferences' && (
          <div className="space-y-4 max-w-xl">
            <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-slate-900 dark:text-white">Platforma Interfeys Mavzusi</span>
                <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                  Hozirgi rejim: {theme === 'dark' ? 'Qorong‘u (Dark Mode)' : 'Yorug‘ (Light Mode)'}
                </span>
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                className="btn-secondary text-xs py-2 px-4 flex items-center gap-2 font-bold"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-600" />}
                {theme === 'dark' ? "Light Rejimga O'tish" : "Dark Rejimga O'tish"}
              </button>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary py-3 px-8 text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-indigo-600/30 disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSubmitting ? 'Saqlanmoqda...' : 'Sozlamalarni Saqlash'}
          </button>
        </div>
      </form>
    </div>
  );
};