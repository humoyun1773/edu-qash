import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, UserRole } from '../types';
import { MOCK_USERS } from '../data/mockData';
import { authApi } from '../services/authApi';

// ─── LocalStorage Helpers ───────────────────────────────────────────────────
const LS = {
  USER: 'eduqash_user',
  ROLE: 'eduqash_role',
  IS_AUTH: 'eduqash_is_auth',
};

function saveSession(user: User, role: UserRole) {
  try {
    localStorage.setItem(LS.USER, JSON.stringify(user));
    localStorage.setItem(LS.ROLE, role);
    localStorage.setItem(LS.IS_AUTH, '1');
  } catch {}
}

function loadSession(): { user: User | null; role: UserRole | null; isAuth: boolean } {
  try {
    const userStr = localStorage.getItem(LS.USER);
    const roleStr = localStorage.getItem(LS.ROLE) as UserRole | null;
    const isAuthStr = localStorage.getItem(LS.IS_AUTH);
    return {
      user: userStr ? JSON.parse(userStr) : null,
      role: roleStr || null,
      isAuth: isAuthStr === '1',
    };
  } catch {
    return { user: null, role: null, isAuth: false };
  }
}

function clearSession() {
  try {
    [LS.USER, LS.ROLE, LS.IS_AUTH].forEach(k => localStorage.removeItem(k));
  } catch {}
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface AuthContextType {
  user: User;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  authError: string | null;

  // Asosiy metodlar
  loginWithPassword: (usernameOrEmail: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<{ message: string }>;
  logout: () => void;
  clearError: () => void;

  // Modal metodlar
  switchRole: (newRole: UserRole) => void;
  login: (email: string, role?: UserRole) => Promise<void>;
  verifySMS: (otpCode: string) => boolean;
  isAuthModalOpen: boolean;
  openAuthModal: (mode?: 'login' | 'register' | 'forgot' | 'sms') => void;
  closeAuthModal: () => void;
  authModalMode: 'login' | 'register' | 'forgot' | 'sms';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ─── Provider ────────────────────────────────────────────────────────────────
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const stored = loadSession();

  const [role, setRole] = useState<UserRole>(stored.role || 'guest');
  const [user, setUser] = useState<User>(stored.user || MOCK_USERS.guest);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(stored.isAuth);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'forgot' | 'sms'>('login');

  // State o'zgarganda localStorage ga saqlash
  useEffect(() => {
    if (isAuthenticated && role !== 'guest') {
      saveSession(user, role);
    } else {
      clearSession();
    }
  }, [user, role, isAuthenticated]);

  const clearError = () => setAuthError(null);

  // ─── HAQIQIY LOGIN (username/email + password) ───────────────────────────
  const loginWithPassword = async (usernameOrEmail: string, password: string) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const res = await authApi.loginWithPassword(usernameOrEmail, password);
      setUser(res.user);
      setRole(res.user.role);
      setIsAuthenticated(true);
      setIsAuthModalOpen(false);
    } catch (err: any) {
      // Backend xatoliklarini o'zbek tiliga tarjima qilamiz
      const rawMsg: string = err?.message || '';
      let friendlyMsg = "Kirish amalga oshmadi. Qayta urinib ko'ring.";

      if (rawMsg.includes('Invalid credentials') || rawMsg.includes('No active account')) {
        friendlyMsg = "Login yoki parol noto'g'ri. Qayta tekshiring.";
      } else if (rawMsg.includes('tasdiqlanmagan') || rawMsg.includes('pending')) {
        friendlyMsg = "Hisobingiz admin tomonidan hali tasdiqlanmagan. Kuting.";
      } else if (rawMsg.includes('not provided')) {
        friendlyMsg = "Login va parolni kiriting.";
      } else if (rawMsg) {
        friendlyMsg = rawMsg;
      }

      setAuthError(friendlyMsg);
      throw new Error(friendlyMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // ─── RO'YXATDAN O'TISH ─────────────────────────────────────────────────
  const register = async (name: string, email: string, password: string, newRole: UserRole) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const res = await authApi.register(name, email, password, newRole);
      return { message: res.message };
    } catch (err: any) {
      const rawMsg: string = err?.message || '';
      let friendlyMsg = "Ro'yxatdan o'tishda xatolik yuz berdi.";

      if (rawMsg.includes('already exists') || rawMsg.includes('username')) {
        friendlyMsg = "Bu username yoki email allaqachon ro'yxatda bor.";
      } else if (rawMsg.includes('rol')) {
        friendlyMsg = "Bu rol bilan ro'yxatdan o'tib bo'lmaydi. Student, o'qituvchi yoki markaz egasi tanlang.";
      } else if (rawMsg) {
        friendlyMsg = rawMsg;
      }

      setAuthError(friendlyMsg);
      throw new Error(friendlyMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // ─── DEMO LOGIN (rol o'zgartirish) ───────────────────────────────────────
  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'guest') {
      setIsAuthenticated(false);
      setUser(MOCK_USERS.guest);
    } else {
      setIsAuthenticated(true);
      const mockUser = MOCK_USERS[newRole];
      setUser(mockUser || { ...MOCK_USERS.student, role: newRole, name: `Demo (${newRole})` });
    }
  };

  // Eski login (mock fallback — demo rejim)
  const login = async (email: string, targetRole: UserRole = 'student') => {
    setIsLoading(true);
    try {
      await loginWithPassword(email, 'demo_password');
    } catch {
      // Demo fallback
      switchRole(targetRole);
      setIsAuthenticated(true);
      setIsAuthModalOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authApi.logout();
    clearSession();
    setRole('guest');
    setUser(MOCK_USERS.guest);
    setIsAuthenticated(false);
  };

  const verifySMS = (otpCode: string) => {
    if (otpCode.length >= 4) {
      setUser(prev => ({ ...prev, isVerified: true }));
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const openAuthModal = (mode: 'login' | 'register' | 'forgot' | 'sms' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
    setAuthError(null);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        isLoading,
        authError,
        loginWithPassword,
        register,
        logout,
        clearError,
        switchRole,
        login,
        verifySMS,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        authModalMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
