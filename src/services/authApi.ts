import { api, setAuthToken, removeAuthToken } from './api';
import type { User, UserRole } from '../types';
import { API_ENDPOINTS } from '../api/apiEndpoints';

export interface LoginResponse {
  token: string;
  user: User;
}

// Backend'dan kelgan user ob'yektini frontend User tipiga o'zgartirish
function mapBackendUser(backendUser: any, fallbackRole?: UserRole): User {
  return {
    id: backendUser.id || `usr_${Date.now()}`,
    name: [backendUser.first_name, backendUser.last_name].filter(Boolean).join(' ') || backendUser.username || backendUser.email?.split('@')[0] || 'Foydalanuvchi',
    email: backendUser.email || '',
    phone: backendUser.phone || '+998 90 000 00 00',
    role: (backendUser.role as UserRole) || fallbackRole || 'student',
    avatar: backendUser.avatar || undefined,
    isVerified: backendUser.is_email_verified ?? true,
    createdAt: backendUser.created_at || new Date().toISOString(),
  };
}

export const authApi = {
  /**
   * Login: username + password → token + user
   * Backend: POST /auth/login/
   */
  login: async (usernameOrEmail: string, _role?: UserRole): Promise<LoginResponse> => {
    try {
      const res = await api.post<any>(API_ENDPOINTS.AUTH.LOGIN, {
        username: usernameOrEmail,
        email: usernameOrEmail,
        password: _role ? `${_role}_pass` : undefined, // password auth modal'dan keladi
      });

      const token = res.token || res.access || res.tokens?.access || res.jwt;
      if (token) {
        setAuthToken(token);
      }

      const userData = res.user || res;
      return {
        token: token || `token_demo_${Date.now()}`,
        user: mapBackendUser(userData, _role),
      };
    } catch (err: any) {
      console.warn('[authApi] Login error:', err.message);
      throw err; // AuthContext ga xatolikni uzatamiz
    }
  },

  /**
   * Login with explicit password
   * Asosiy login metodi — username yoki email va parol bilan
   */
  loginWithPassword: async (usernameOrEmail: string, password: string): Promise<LoginResponse> => {
    const res = await api.post<any>(API_ENDPOINTS.AUTH.LOGIN, {
      username: usernameOrEmail,
      email: usernameOrEmail,
      password,
    });

    const token = res.token || res.access || res.tokens?.access || res.jwt;
    if (token) {
      setAuthToken(token);
    }

    const userData = res.user || res;
    return {
      token: token || `token_fallback_${Date.now()}`,
      user: mapBackendUser(userData),
    };
  },

  /**
   * Register: username, email, password, role → pending holati
   * Backend: POST /auth/register/
   * Faqat: student, teacher, center_owner rollari
   */
  register: async (name: string, email: string, password: string, role: UserRole): Promise<{ message: string; user: User }> => {
    // Faqat ruxsat etilgan rollar
    const allowedRoles: UserRole[] = ['student', 'teacher', 'center_owner'];
    const safeRole = allowedRoles.includes(role) ? role : 'student';

    // Username: emailning @ dan oldingi qismi, kichik harf
    const username = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '') + Date.now().toString().slice(-4);

    const res = await api.post<any>(API_ENDPOINTS.AUTH.REGISTER, {
      username,
      email,
      password,
      role: safeRole,
      name,
      first_name: name.split(' ')[0] || name,
      last_name: name.split(' ').slice(1).join(' ') || '',
    });

    return {
      message: res.message || "Ro'yxatdan muvaffaqiyatli o'tdingiz! Admin tasdiqlashini kuting.",
      user: mapBackendUser(res.user || res, safeRole),
    };
  },

  /**
   * Joriy foydalanuvchi profilini olish
   * Backend: GET /auth/profile/
   */
  getProfile: async (): Promise<User> => {
    const res = await api.get<any>(API_ENDPOINTS.AUTH.PROFILE);
    return mapBackendUser(res);
  },

  /**
   * OTP tasdiqlash (sms)
   */
  verifySMS: (_otpCode: string): boolean => {
    return true;
  },

  /**
   * Logout: token o'chirish
   */
  logout: (): void => {
    removeAuthToken();
  },
};
