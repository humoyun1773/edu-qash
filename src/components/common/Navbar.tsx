import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  BookOpen, 
  Building2, 
  Award, 
  BrainCircuit, 
  Bell, 
  Sun, 
  Moon, 
  LogOut, 
  Menu, 
  X, 
  Trophy,
  ShieldCheck,
  LayoutDashboard,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { getRoleDashboardPath } from '../../routes/AppRoutes';
import { useNotification } from '../../context/NotificationContext';
import { BrandLogo } from './BrandLogo';

export const Navbar: React.FC = () => {
  const { role, logout, openAuthModal } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const { unreadCount, notifications, markAllAsRead } = useNotification();
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  
  const notifRef = useRef<HTMLDivElement>(null);

  // Notification menyusidan tashqariga bosilganda uni yopish
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Havola aktiv ekanligini aniqlash funksiyasi
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/60 transition-all duration-200">
      <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <BrandLogo size="md" showSubtitle={true} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-900/60 p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-inner">
            <Link 
              to="/centers" 
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                isActive('/centers') 
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-white shadow-sm font-bold' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Building2 className="w-4 h-4 text-emerald-500" />
              Markazlar
            </Link>

            <Link 
              to="/courses" 
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                isActive('/courses') 
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-white shadow-sm font-bold' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <BookOpen className="w-4 h-4 text-indigo-500" />
              Kurslar
            </Link>

            <Link 
              to="/ielts" 
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                isActive('/ielts') 
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-white shadow-sm font-bold' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Award className="w-4 h-4 text-amber-500" />
              IELTS
            </Link>

            <Link 
              to="/sat" 
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                isActive('/sat') 
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-white shadow-sm font-bold' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-pink-500" />
              Digital SAT
            </Link>

            <Link 
              to="/cefr" 
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                isActive('/cefr') 
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-white shadow-sm font-bold' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-cyan-500" />
              CEFR
            </Link>

            <Link 
              to="/quizzes" 
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                isActive('/quizzes') 
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-white shadow-sm font-bold' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <BrainCircuit className="w-4 h-4 text-purple-500" />
              Testlar
            </Link>

            <Link 
              to="/leaderboard" 
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                isActive('/leaderboard') 
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-white shadow-sm font-bold' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              Reyting
            </Link>

            {/* AI Highlight Button */}
            <Link 
              to="/ai-assistant" 
              className="px-3 py-2 rounded-xl text-xs font-bold text-indigo-600 dark:text-indigo-300 hover:text-indigo-700 dark:hover:text-white transition-all flex items-center gap-1.5 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 hover:border-indigo-500/40 shadow-sm"
            >
              <BrainCircuit className="w-4 h-4 text-indigo-500 animate-pulse" />
              EduAI
            </Link>
          </nav>

          {/* Action Tools & Auth Controls */}
          <div className="flex items-center gap-2.5">
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm cursor-pointer"
              aria-label="Toggle Theme"
              title={theme === 'dark' ? 'Yorug‘ rejimga o‘tish' : 'Qorong‘u rejimga o‘tish'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* Notification Drawer Button & Popover */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => {
                  setIsNotifOpen(!isNotifOpen);
                  if (!isNotifOpen) markAllAsRead();
                }}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all relative active:scale-95 shadow-sm"
                aria-label="Bildirishnomalar"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[9px] font-bold text-white flex items-center justify-center ring-2 ring-white dark:ring-slate-950 animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popover Dropdown */}
              {isNotifOpen && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                  
                  {/* Neon Backdrop inside popover */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80 mb-3 relative z-10">
                    <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Bell className="w-4 h-4 text-indigo-500" /> Bildirishnomalar
                    </span>
                    <span className="text-[10px] bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 px-2 py-0.5 rounded-full font-bold">
                      {notifications.length} ta
                    </span>
                  </div>

                  <div className="space-y-2 max-h-72 overflow-y-auto relative z-10 pr-1">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-6">Bildirishnomalar mavjud emas</p>
                    ) : (
                      notifications.map((n) => (
                        <div key={n.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/60 text-xs transition-all hover:border-indigo-500/30">
                          <div className="flex items-center justify-between font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                            <span>{n.title}</span>
                            <span className="text-[9px] text-slate-400 font-normal">{n.date}</span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Auth Buttons */}
            {role !== 'guest' ? (
              <div className="flex items-center gap-2">
                <Link
                  to={getRoleDashboardPath(role)}
                  className="py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <LayoutDashboard className="w-4 h-4" /> 
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    toast.info("Tizimdan muvaffaqiyatli chiqdingiz");
                  }}
                  className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white transition-all active:scale-95 cursor-pointer"
                  title="Chiqish"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all active:scale-95"
              >
                Tizimga Kirish
              </button>
            )}

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all active:scale-95 cursor-pointer"
              aria-label="Menyu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium">
            
            <Link 
              to="/centers" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/80 text-slate-800 dark:text-slate-200 flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-emerald-500" /> 
                <span className="font-semibold">Markazlar</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link 
              to="/courses" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/80 text-slate-800 dark:text-slate-200 flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-indigo-500" /> 
                <span className="font-semibold">Kurslar</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link 
              to="/ielts" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/80 text-slate-800 dark:text-slate-200 flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-amber-500" /> 
                <span className="font-semibold">IELTS Tayyorgarlik</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link 
              to="/sat" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/80 text-slate-800 dark:text-slate-200 flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-pink-500" /> 
                <span className="font-semibold">Digital SAT</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link 
              to="/cefr" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/80 text-slate-800 dark:text-slate-200 flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-cyan-500" /> 
                <span className="font-semibold">CEFR Sertifikat</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link 
              to="/quizzes" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/80 text-slate-800 dark:text-slate-200 flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <BrainCircuit className="w-4 h-4 text-purple-500" /> 
                <span className="font-semibold">Testlar</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link 
              to="/leaderboard" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/80 text-slate-800 dark:text-slate-200 flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <Trophy className="w-4 h-4 text-amber-400" /> 
                <span className="font-semibold">Talabalar Reytingi</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link 
              to="/ai-assistant" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="p-3 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-300 flex items-center justify-between sm:col-span-2"
            >
              <div className="flex items-center gap-2.5">
                <BrainCircuit className="w-4 h-4 text-indigo-500 animate-pulse" /> 
                <span className="font-bold">EduAI Sun'iy Intellekt Yordamchisi</span>
              </div>
              <ChevronRight className="w-4 h-4 text-indigo-400" />
            </Link>

          </div>
        </div>
      )}
    </header>
  );
};