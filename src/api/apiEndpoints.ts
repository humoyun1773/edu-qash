// ==========================================
// Eduqash Platform - Centralized API Endpoints (Django Swagger Specs)
// ==========================================

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login/',
    REGISTER: '/auth/register/',
    PROFILE: '/auth/profile/',
    ME: '/auth/profile/',
    LOGOUT: '/auth/logout/',
    REFRESH: '/auth/token/refresh/',
    FORGOT_PASSWORD: '/auth/forgot-password/'
  },
  COURSES: {
    BASE: '/courses/',
    BY_ID: (id: string) => `/courses/${id}/`,
    ENROLL: '/courses/submissions/',
    LESSONS: '/courses/lessons/',
    HOMEWORKS: '/courses/homeworks/',
    SUBMISSIONS: '/courses/submissions/'
  },
  CENTERS: {
    BASE: '/centers/',
    BY_ID: (id: string) => `/centers/${id}/`
  },
  ADMIN: {
    USERS: '/auth/admin/pending-roles/',
    USER_BY_ID: (id: string) => `/auth/admin/approve-role/${id}/`,
    USER_BLOCK: (id: string) => `/auth/admin/approve-role/${id}/`,
    PAYMENTS: '/payments/',
    COURSES: '/courses/',
    ANALYTICS: '/analytics/overview/'
  },
  TEACHER: {
    STUDENTS: '/auth/profile/',
    QUIZZES: '/quizzes/',
    SCHEDULE: '/courses/lessons/',
    STATS: '/analytics/overview/'
  },
  QUIZZES: {
    BASE: '/quizzes/',
    BY_ID: (id: string) => `/quizzes/${id}/`,
    SUBMIT: (_id: string) => `/quizzes/attempts/`,
    ATTEMPTS: '/quizzes/attempts/',
    IMPORT_EXCEL: '/quizzes/import-excel/',
    LEADERBOARD: '/quizzes/leaderboard/'
  },
  EXAMS: {
    BASE: '/exams/',
    BY_ID: (id: string) => `/exams/${id}/`,
    CHECK_ESSAY: '/ai/check-essay/',
    CAMBRIDGE_BOOKS: '/exams/',
    START_ATTEMPT: (id: string) => `/exams/${id}/start_attempt/`,
    SUBMIT_ATTEMPT: (id: string) => `/exams/attempts/${id}/submit/`
  },
  AI: {
    CHECK_ESSAY: '/ai/check-essay/',
    CHECK_HOMEWORK: '/ai/check-homework/',
    GRAMMAR_FIX: '/ai/grammar-fix/',
    ROADMAP: '/ai/roadmap/'
  },
  CERTIFICATES: {
    BASE: '/certificates/',
    BY_ID: (id: string) => `/certificates/${id}/`,
    VERIFY: (uniqueId: string) => `/certificates/verify/${uniqueId}/`,
    MY: '/certificates/',
    ISSUE: '/certificates/issue/'
  },
  CHAT: {
    CONVERSATIONS: '/chat/conversations/',
    THREADS: '/chat/conversations/',
    MESSAGES: (_threadId: string) => `/chat/messages/`,
    VOICE: (_threadId: string) => `/chat/messages/`
  },
  PAYMENTS: {
    BASE: '/payments/',
    CREATE: '/payments/create/',
    VERIFY: '/payments/verify/',
    APPLY_PROMO: '/payments/apply-promo/'
  },
  ANALYTICS: {
    OVERVIEW: '/analytics/overview/',
    REVENUE: '/analytics/revenue/'
  },
  LEADERBOARD: {
    STUDENTS: '/quizzes/leaderboard/',
    TEACHERS: '/quizzes/leaderboard/',
    CENTERS: '/quizzes/leaderboard/',
    COURSES: '/quizzes/leaderboard/'
  },
  REVIEWS: {
    BASE: '/reviews/',
    LIKE: (id: string) => `/reviews/${id}/like/`,
    DISLIKE: (id: string) => `/reviews/${id}/dislike/`
  }
} as const;
