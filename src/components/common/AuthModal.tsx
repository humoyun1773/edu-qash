import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, Mail, Lock, Phone, KeyRound, ArrowRight, 
  CheckCircle2, ShieldCheck, Send, 
  Sparkles, ChevronDown, User, AlertCircle, Loader2, Eye, EyeOff
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import type { UserRole } from '../../types';
import { BrandLogo } from './BrandLogo';

// Ruxsat etilgan rollar (barcha 7 ta rol)
const ALLOWED_ROLES: { value: UserRole; label: string; desc: string; icon: string }[] = [
  { value: 'student', label: 'Talaba / Student', desc: 'Dars va interaktiv testlar', icon: '🎓' },
  { value: 'teacher', label: "O'qituvchi", desc: 'Topshiriq va dars berish', icon: '👨‍🏫' },
  { value: 'center_owner', label: "Markaz Rahbari", desc: 'Markazni boshqarish va tahlil', icon: '🏢' },
  { value: 'moderator', label: "Moderator", desc: 'Kontent va sharhlarni tekshirish', icon: '🛡️' },
  { value: 'admin', label: "Administrator", desc: 'Platforma admin paneli', icon: '⚡' },
  { value: 'super_admin', label: "Super Admin", desc: 'Bosh boshqaruv va tizim', icon: '👑' },
  { value: 'guest', label: "Mehmon / Guest", desc: 'Platforma bilan tanishish', icon: '👤' },
];

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    loginWithPassword,
    register,
    verifySMS,
    isLoading,
    authError,
    clearError,
  } = useAuth();
  const { toast } = useToast();

  // Body scroll lock when modal is open
  useEffect(() => {
    if (!isAuthModalOpen) return;
    const scrollY = window.scrollY;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    return () => {
      document.body.style.overflow = original;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  }, [isAuthModalOpen]);

  const navigate = useNavigate();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot' | 'sms'>(authModalMode || 'login');
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [otpCode, setOtpCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Telefon raqamni formatlash: faqat raqamlar, +998 o'chirilmaydi
  const handlePhoneChange = (val: string) => {
    let digits = val.replace(/\D/g, '');
    if (digits.startsWith('998')) {
      digits = digits.slice(3);
    }
    digits = digits.slice(0, 9); // ko'pi bilan 9 ta raqam

    let formatted = '+998';
    if (digits.length > 0) {
      formatted += ' ' + digits.slice(0, 2);
    } else {
      formatted += ' ';
    }
    if (digits.length > 2) {
      formatted += ' ' + digits.slice(2, 5);
    }
    if (digits.length > 5) {
      formatted += ' ' + digits.slice(5, 7);
    }
    if (digits.length > 7) {
      formatted += ' ' + digits.slice(7, 9);
    }
    setPhone(formatted);
  };

  // UI state
  const [localError, setLocalError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isOtpSuccess, setIsOtpSuccess] = useState(false);

  const error = authError || localError;

  const resetFormFields = () => {
    setName('');
    setEmail('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setPhone('+998 ');
    setOtpCode('');
    setLocalError(null);
    setSuccessMessage(null);
  };

  // Modal ochilganda va mode o'zgarganda inputlarni avtomatik tozalash
  useEffect(() => {
    if (isAuthModalOpen) {
      setMode(authModalMode || 'login');
      resetFormFields();
      clearError();
    }
  }, [isAuthModalOpen, authModalMode]);

  const handleModeSwitch = (newMode: 'login' | 'register') => {
    setMode(newMode);
    resetFormFields();
    clearError();
  };

  if (!isAuthModalOpen) return null;

  // ─── SUBMIT HANDLER ─────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setSuccessMessage(null);

    if (mode === 'login') {
      const cleanUsername = username.trim();
      if (!cleanUsername || !password.trim()) {
        setLocalError("Username va parolni kiriting.");
        return;
      }
      try {
        await loginWithPassword(cleanUsername, password.trim());
        // Muvaffaqiyatli kirish — modal yopilib, dashboardga yo'naltirish
        resetFormFields();
        closeAuthModal();
        toast.success("Tizimga muvaffaqiyatli kirdingiz!");
        navigate('/dashboard', { replace: true });
      } catch (err: any) {
        // Xato faqat modal banner (authError) orqali ko'rsatiladi — toast kerak emas
        // authError AuthContext da setAuthError orqali allaqachon o'rnatilgan
      }

    } else if (mode === 'register') {
      if (!name || !email || !password) {
        setLocalError("Barcha maydonlarni to'ldiring.");
        return;
      }
      if (password.length < 8) {
        setLocalError("Parol kamida 8 ta belgidan iborat bo'lishi kerak.");
        return;
      }
      if (confirmPassword && password !== confirmPassword) {
        setLocalError("Parollar mos kelmaydi.");
        return;
      }
      try {
        const res = await register(name, email, password, selectedRole);
        const msg = res.message || "Ro'yxatdan muvaffaqiyatli o'tdingiz! Endi kirish mumkin.";
        setSuccessMessage(msg);
        toast.success(msg);
        resetFormFields();
        setMode('login');
      } catch (err: any) {
        // Xato faqat modal banner (authError) orqali ko'rsatiladi
      }

    } else if (mode === 'sms') {
      const ok = verifySMS(otpCode);
      if (ok) {
        setIsOtpSuccess(true);
        toast.success("SMS kod muvaffaqiyatli tasdiqlandi!");
        setTimeout(() => {
          setIsOtpSuccess(false);
          closeAuthModal();
          navigate('/dashboard', { replace: true });
        }, 1000);
      } else {
        setLocalError("Noto'g'ri kod. Qayta kiriting.");
      }

    } else if (mode === 'forgot') {
      if (!email) {
        setLocalError("Email manzilingizni kiriting.");
        return;
      }
      const msg = `Parolni tiklash havolasi ${email} manziliga yuborildi!`;
      setSuccessMessage(msg);
      toast.info(msg);
      setTimeout(() => {
        setMode('login');
        setSuccessMessage(null);
      }, 2500);
    }
  };


  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overscroll-none"
      onClick={(e) => e.target === e.currentTarget && closeAuthModal()}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.preventDefault()}
      style={{ touchAction: 'none' }}
    >
      {/* Modal Card */}
      <div className={`relative w-full overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-2xl transition-all duration-300 text-slate-900 dark:text-white ${
        mode === 'register' ? 'max-w-xl sm:max-w-2xl' : 'max-w-md'
      }`}>
        
        {/* Ambient Glow */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-4 relative z-10">
          <BrandLogo size="lg" showSubtitle={true} />
        </div>

        {/* Mode Tabs */}
        {(mode === 'login' || mode === 'register') && (
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 rounded-2xl mb-6 relative z-10">
            <button
              type="button"
              onClick={() => handleModeSwitch('login')}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all duration-200 ${
                mode === 'login'
                  ? 'bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Kirish
            </button>
            <button
              type="button"
              onClick={() => handleModeSwitch('register')}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all duration-200 ${
                mode === 'register'
                  ? 'bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Ro'yxatdan o'tish
            </button>
          </div>
        )}

        {/* Title */}
        <div className="text-center mb-5 relative z-10">
          <h3 className="text-xl font-bold tracking-tight">
            {mode === 'login' && 'Platformaga Kirish'}
            {mode === 'register' && 'Yangi Hisob Yaratish'}
            {mode === 'sms' && 'SMS Kodni Tasdiqlash'}
            {mode === 'forgot' && 'Parolni Tiklash'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {mode === 'login' && 'Username va parolingizni kiriting'}
            {mode === 'register' && "Ma'lumotlaringizni to'ldiring — admin tasdiqlaydi"}
            {mode === 'sms' && `${phone} raqamiga kod yuborildi`}
            {mode === 'forgot' && 'Pochta manzilingizni kiriting'}
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-medium flex items-start gap-2.5 relative z-10">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Banner */}
        {successMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-start gap-2.5 relative z-10">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">

          {/* REGISTER MODE FIELDS (2-COLUMN FLEX/GRID) */}
          {mode === 'register' && (
            <div className="space-y-4">
              {/* Rol tanlash */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Platformadagi rolingizni tanlang
                </label>
                
                {/* Clean Dropdown Select */}
                <div className="relative">
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                    className="w-full appearance-none bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all cursor-pointer pr-10"
                  >
                    {ALLOWED_ROLES.map(r => (
                      <option key={r.value} value={r.value} className="bg-white dark:bg-slate-900">
                        {r.icon} {r.label} — {r.desc}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* 2-Column Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Ism va Familiya */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Ism va Familiya
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Abdullayev Jasur"
                      className="w-full bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>

                {/* Email manzil */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Email manzil
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      autoComplete="email"
                      className="w-full bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>

                {/* Telefon raqam */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Telefon raqam <span className="text-slate-400">(ixtiyoriy)</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-indigo-500 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      onKeyDown={(e) => {
                        const target = e.target as HTMLInputElement;
                        const selStart = target.selectionStart ?? 0;
                        const selEnd = target.selectionEnd ?? 0;
                        if (
                          (e.key === 'Backspace' || e.key === 'Delete') &&
                          selStart <= 5 &&
                          selEnd <= 5
                        ) {
                          e.preventDefault();
                        }
                      }}
                      placeholder="+998 90 123 45 67"
                      className="w-full bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all tracking-wide"
                    />
                  </div>
                </div>

                {/* Parol */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Parol</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Kamida 8 ta belgi"
                      autoComplete="new-password"
                      minLength={8}
                      className="w-full bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(v => !v)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Parolni tasdiqlash */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Parolni tasdiqlang
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Parolni qaytaring"
                      autoComplete="new-password"
                      className={`w-full bg-slate-50 dark:bg-slate-950/70 border rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${
                        confirmPassword && confirmPassword !== password
                          ? 'border-rose-400 focus:ring-rose-500/40'
                          : 'border-slate-200 dark:border-slate-800 focus:ring-indigo-500/40 focus:border-indigo-500'
                      }`}
                    />
                  </div>
                  {confirmPassword && confirmPassword !== password && (
                    <p className="text-[10px] text-rose-500 mt-1">Parollar mos kelmaydi</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* LOGIN MODE FIELDS */}
          {mode === 'login' && (
            <>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Username
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username kiriting (masalan: jasur_99)"
                    autoComplete="username"
                    className="w-full bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">Parol</label>
                  <button
                    type="button"
                    onClick={() => { setMode('forgot'); clearError(); setLocalError(null); }}
                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                  >
                    Parolni unutdingizmi?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="w-full bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* FORGOT MODE FIELDS */}
          {mode === 'forgot' && (
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Email manzil
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  autoComplete="email"
                  className="w-full bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>
          )}

          {/* SMS kod */}
          {mode === 'sms' && (
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5 text-center">
                4-Xonali Tasdiqlash Kodi
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-amber-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  maxLength={4}
                  required
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="1234"
                  className="w-full bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-center text-lg font-bold tracking-widest text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
                />
              </div>
              {isOtpSuccess && (
                <div className="mt-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Muvaffaqiyatli tasdiqlandi!
                </div>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 mt-2 group active:scale-[0.99]"
          >
            {isLoading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Yuklanmoqda...</>
            ) : (
              <>
                <span>
                  {mode === 'login' && 'Tizimga Kirish'}
                  {mode === 'register' && "Ariza Yuborish"}
                  {mode === 'sms' && 'Tasdiqlash'}
                  {mode === 'forgot' && 'Tiklash Havolasini Yuborish'}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Pending info banner for register */}
        {mode === 'register' && (
          <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-[10px] font-medium relative z-10">
            ⚠️ Ro'yxatdan o'tgandan so'ng, admin hisobingizni tasdiqlashi kerak. Tasdiqlanganidan so'ng login qila olasiz.
          </div>
        )}

        {/* OAuth (faqat login) */}
        {mode === 'login' && (
          <div className="relative z-10 mt-5">
            <div className="relative text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800" />
              </div>
              <span className="relative px-3 bg-white dark:bg-slate-900 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Yoki tezkor kirish
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <button
                type="button"
                onClick={() => {
                  closeAuthModal();
                  navigate('/dashboard', { replace: true });
                }}
                className="py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium flex items-center justify-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-[0.98]"
              >
                <ShieldCheck className="w-4 h-4 text-rose-500" /> Google
              </button>
              <button
                type="button"
                onClick={() => {
                  closeAuthModal();
                  navigate('/dashboard', { replace: true });
                }}
                className="py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium flex items-center justify-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-[0.98]"
              >
                <Send className="w-4 h-4 text-sky-500" /> Telegram
              </button>
            </div>
          </div>
        )}

        {/* Back to login (forgot va sms) */}
        {(mode === 'forgot' || mode === 'sms') && (
          <button
            type="button"
            onClick={() => { setMode('login'); setLocalError(null); clearError(); }}
            className="w-full mt-4 text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-center relative z-10"
          >
            ← Kirishga qaytish
          </button>
        )}
      </div>
    </div>
  );
};