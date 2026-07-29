import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, LogOut, GraduationCap, ShieldCheck, Home, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { AdminDashboard } from './AdminDashboard';
import { CenterOwnerDashboard } from './CenterOwnerDashboard';
import { ModeratorDashboard } from './ModeratorDashboard';
import { TeacherDashboard } from './TeacherDashboard';
import { StudentDashboard } from './StudentDashboard';
import type { UserRole } from '../../types';

export const AdminDashboardPage: React.FC = () => {
  const { user, role, switchRole, isAuthenticated, openAuthModal, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleRoleChange = (newRole: UserRole) => {
    switchRole(newRole);
    if (newRole === 'guest') {
      navigate('/');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const formatRoleLabel = (roleName?: string) => {
    if (!roleName) return '';
    return roleName.replace(/_/g, ' ').toUpperCase();
  };

  // Switch statement for cleaner role-based dashboard rendering
  const renderDashboard = () => {
    switch (role) {
      case 'super_admin':
      case 'admin':
        return <AdminDashboard />;
      case 'center_owner':
        return <CenterOwnerDashboard />;
      case 'moderator':
        return <ModeratorDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      case 'student':
        return <StudentDashboard />;
      default:
        return <AdminDashboard />;
    }
  };

  if (!isAuthenticated || role === 'guest') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-center items-center px-4 py-20 text-center space-y-6 transition-colors duration-300">
        <div className="w-20 h-20 rounded-3xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
          <Lock className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">Dashboard Sahifasiga Kirish Cheklangan</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mx-auto">
          Tizimga kirmagansiz. Iltimos, tizimga kiring yoki platformadagi rolingizni tanlang.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <button onClick={() => openAuthModal('login')} className="btn-primary py-3 px-8 text-xs font-bold">
            Tizimga Kirish
          </button>
          <Link to="/" className="btn-secondary py-3 px-8 text-xs font-bold flex items-center gap-2">
            <Home className="w-4 h-4" /> Bosh Sahifaga O‘tish
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      {/* Sleek Standalone Admin Header */}
      <header className="bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-indigo-500/20 sticky top-0 z-40 backdrop-blur-xl">
        <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" title="Bosh sahifaga o‘tish" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-base font-black text-slate-900 dark:text-white tracking-wide group-hover:text-indigo-500 transition-colors">Eduqash</span>
              <span className="ml-2 px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-[10px] font-bold text-indigo-500 dark:text-indigo-300">
                Dashboard Portal ({formatRoleLabel(role)})
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* User Identity Pill in Header */}
            {user && (
              <div className="hidden md:flex items-center gap-2 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name || 'User'} className="w-6 h-6 rounded-lg object-cover border border-indigo-500/50" />
                ) : (
                  <div className="w-6 h-6 rounded-lg bg-indigo-600/30 text-indigo-400 flex items-center justify-center font-bold text-[10px]">
                    {user.name ? user.name.charAt(0) : 'U'}
                  </div>
                )}
                <span className="text-xs font-bold text-slate-800 dark:text-white">{user.name}</span>
                <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono bg-indigo-500/10 px-1.5 py-0.5 rounded uppercase font-bold">
                  {formatRoleLabel(user.role)}
                </span>
              </div>
            )}

            {/* Dark/Light Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white transition-all text-xs font-bold"
              aria-label="Toggle Theme"
              title={theme === 'dark' ? 'Light Rejimga o‘tish' : 'Dark Rejimga o‘tish'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            <Link 
              to="/" 
              className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white transition-all text-xs font-bold flex items-center gap-1.5" 
              title="Bosh sahifaga o‘tish"
            >
              <Home className="w-4 h-4 text-indigo-500" /> <span className="hidden lg:inline">Bosh Sahifa</span>
            </Link>

            {/* 7 Roles Selector Dropdown */}
            <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-2 sm:px-3 py-1.5 rounded-xl text-xs">
              <ShieldCheck className="w-4 h-4 text-indigo-500" />
              <span className="text-slate-500 dark:text-slate-400 font-bold hidden sm:inline">Rolni Sinash:</span>
              <select
                aria-label="Select User Role"
                value={role}
                onChange={(e) => handleRoleChange(e.target.value as UserRole)}
                className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none cursor-pointer text-xs"
              >
                <option value="super_admin">1. Super Admin Panel</option>
                <option value="admin">2. Admin Panel</option>
                <option value="moderator">3. Moderator Panel</option>
                <option value="teacher">4. Teacher Dashboard</option>
                <option value="center_owner">5. Center Owner Panel</option>
                <option value="student">6. Student Dashboard</option>
                <option value="guest">7. Guest (Chiqish)</option>
              </select>
            </div>

            <button 
              onClick={handleLogout} 
              className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 hover:bg-rose-500/20 transition-all text-xs font-bold flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Chiqish</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Container */}
      <main className="flex-1 max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {renderDashboard()}
      </main>
    </div>
  );
};

export default AdminDashboardPage;