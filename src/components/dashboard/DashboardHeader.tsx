import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, Search, Bell, Sun, Moon, Home, LogOut, ChevronDown, X, Shield
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import type { UserRole } from '../../types';

interface DashboardHeaderProps {
  onSearch?: (query: string) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onSearch }) => {
  const { user, role, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setShowUserDropdown(false);
    logout();
    navigate('/');
  };

  // Rollarga qarab o'zbekcha nomlar va ranglar
  const getRoleMeta = (r?: UserRole | string): { label: string; badgeBg: string; textBg: string } => {
    switch (r) {
      case 'super_admin':
        return { label: 'Super Admin', badgeBg: 'bg-purple-500/20 border-purple-500/30', textBg: 'text-purple-600 dark:text-purple-300' };
      case 'admin':
        return { label: 'Admin', badgeBg: 'bg-indigo-500/20 border-indigo-500/30', textBg: 'text-indigo-600 dark:text-indigo-300' };
      case 'moderator':
        return { label: 'Moderator', badgeBg: 'bg-amber-500/20 border-amber-500/30', textBg: 'text-amber-600 dark:text-amber-300' };
      case 'teacher':
        return { label: "O'qituvchi", badgeBg: 'bg-emerald-500/20 border-emerald-500/30', textBg: 'text-emerald-600 dark:text-emerald-300' };
      case 'center_owner':
        return { label: 'Markaz Rahbari', badgeBg: 'bg-cyan-500/20 border-cyan-500/30', textBg: 'text-cyan-600 dark:text-cyan-300' };
      case 'student':
        return { label: 'Talaba', badgeBg: 'bg-blue-500/20 border-blue-500/30', textBg: 'text-blue-600 dark:text-blue-300' };
      default:
        return { label: 'Foydalanuvchi', badgeBg: 'bg-slate-500/20 border-slate-500/30', textBg: 'text-slate-600 dark:text-slate-300' };
    }
  };

  const roleMeta = getRoleMeta(user?.role || role);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <header className="bg-white/90 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-800/80 sticky top-0 z-40 backdrop-blur-2xl transition-colors duration-300 shadow-sm">
      <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-4">
        
        {/* LOGO & BRAND */}
        <Link to="/" title="Bosh sahifaga o‘tish" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-all ring-4 ring-indigo-500/10">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div className="hidden md:block">
            <div className="flex items-center gap-2">
              <span className="text-base font-black text-slate-900 dark:text-white tracking-wide group-hover:text-indigo-500 transition-colors">
                Eduqash
              </span>
              <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-black uppercase tracking-wider ${roleMeta.badgeBg} ${roleMeta.textBg}`}>
                {roleMeta.label}
              </span>
            </div>
          </div>
        </Link>

        {/* GLOBAL SEARCH BAR */}
        <div className="flex-1 max-w-md mx-1 sm:mx-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Qidirish (kurslar, foydalanuvchilar, testlar)..."
              className="w-full bg-slate-100/80 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 rounded-2xl pl-10 pr-10 py-2 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-inner"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => { setSearchQuery(''); onSearch?.(''); }}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <kbd className="hidden lg:inline-flex absolute right-3 top-2 items-center px-1.5 py-0.5 text-[9px] font-mono font-bold text-slate-400 bg-slate-200/80 dark:bg-slate-800/80 rounded border border-slate-300/60 dark:border-slate-700">
                ⌘K
              </kbd>
            )}
          </div>
        </div>

        {/* ACTION TOOLS & USER DROPDOWN */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Notifications Toggle Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2.5 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-xs font-bold relative active:scale-95"
              title="Bildirishnomalar"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
            </button>

            {/* Notifications Popup Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-4 shadow-2xl z-50 text-xs animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-indigo-500" />
                    <span className="font-bold text-slate-900 dark:text-white">Bildirishnomalar</span>
                  </div>
                  <span className="text-[10px] bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-extrabold px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                    2 ta yangi
                  </span>
                </div>
                <div className="space-y-2.5">
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 hover:bg-indigo-50/50 dark:hover:bg-slate-800 transition-colors">
                    <p className="font-bold text-slate-800 dark:text-slate-200">Tizim yangilanishi muvaffaqiyatli o'tdi</p>
                    <span className="text-[10px] text-slate-400 mt-1 block font-medium">10 daqiqa oldin</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 hover:bg-indigo-50/50 dark:hover:bg-slate-800 transition-colors">
                    <p className="font-bold text-slate-800 dark:text-slate-200">Yangi o'quvchi ro'yxatdan o'tdi</p>
                    <span className="text-[10px] text-slate-400 mt-1 block font-medium">1 soat oldin</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Dark/Light Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2.5 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-xs font-bold active:scale-95"
            title={theme === 'dark' ? 'Light Rejimga o‘tish' : 'Dark Rejimga o‘tish'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* Home Link */}
          <Link 
            to="/" 
            className="p-2.5 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-xs font-bold flex items-center gap-1.5 active:scale-95" 
            title="Bosh sahifaga o‘tish"
          >
            <Home className="w-4 h-4 text-indigo-500" /> 
            <span className="hidden xl:inline">Bosh Sahifa</span>
          </Link>

          {/* USER / ROLE BUTTON WITH DROPDOWN MENU */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-2.5 bg-slate-100/90 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/40 hover:bg-slate-200/80 dark:hover:bg-slate-800/80 px-3 py-1.5 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95 group"
            >
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name || roleMeta.label} 
                  className="w-7 h-7 rounded-xl object-cover border border-indigo-500/50 shrink-0 shadow-sm" 
                />
              ) : (
                <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-sm">
                  {user?.name ? user.name.charAt(0).toUpperCase() : <Shield className="w-3.5 h-3.5" />}
                </div>
              )}
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[120px] leading-tight">
                  {user?.name || roleMeta.label}
                </p>
                <span className={`text-[9px] font-black uppercase tracking-wider block ${roleMeta.textBg}`}>
                  {roleMeta.label}
                </span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white transition-transform duration-200 ${showUserDropdown ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu when User button is clicked */}
            {showUserDropdown && (
              <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-2.5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                
                {/* User Info Header inside Dropdown */}
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-100 dark:border-slate-800 mb-2">
                  <div className="flex items-center gap-2.5">
                    {user?.avatar ? (
                      <img src={user.avatar} alt="User" className="w-9 h-9 rounded-xl object-cover border border-indigo-500/40" />
                    ) : (
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center font-black text-sm">
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-xs font-black text-slate-900 dark:text-white truncate">
                        {user?.name || 'Foydalanuvchi'}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {user?.email || 'user@eduqash.uz'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-medium">Platforma roli:</span>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${roleMeta.badgeBg} ${roleMeta.textBg}`}>
                      {roleMeta.label}
                    </span>
                  </div>
                </div>

                {/* Logout Action Button */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full p-2.5 text-xs font-bold text-rose-500 hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl flex items-center gap-2.5 transition-all cursor-pointer text-left active:scale-95"
                >
                  <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-500">
                    <LogOut className="w-4 h-4" />
                  </div>
                  <span>Tizimdan chiqish</span>
                </button>

              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
