// ==========================================
// Eduqash Platform - Complete TypeScript Types
// ==========================================

export type UserRole = 
  | 'super_admin' 
  | 'admin' 
  | 'moderator' 
  | 'teacher' 
  | 'center_owner' 
  | 'student' 
  | 'guest';

export interface UserStats {
  completedCourses?: number;
  certificatesEarned?: number;
  testsTaken?: number;
  averageBand?: number;
  totalSpent?: number;
}

export interface User {
  id: string;
  name: string;
  username?: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  isVerified: boolean;
  twoFactorEnabled?: boolean;
  centerId?: string;
  bio?: string;
  createdAt: string;
  stats?: UserStats;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export type CourseType = 'online' | 'offline' | 'hybrid';
export type CourseCategory = 'IELTS' | 'SAT' | 'CEFR' | 'General English' | 'IT & Coding' | 'Math';
export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
  pdfUrl?: string;
  isFreePreview?: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  lessons: CourseLesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: CourseCategory;
  type: CourseType;
  level: CourseLevel;
  thumbnail: string;
  promoVideoUrl?: string;
  pdfResourcesUrl?: string;
  price: number;
  originalPrice?: number;
  duration: string;
  teacherId: string;
  teacherName: string;
  teacherAvatar: string;
  centerId?: string;
  centerName?: string;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  modules: CourseModule[];
  hasCertificate: boolean;
  createdAt: string;
  progressPercentage?: number;
}

export interface MapCoordinates {
  lat: number;
  lng: number;
}

export interface LearningCenter {
  id: string;
  name: string;
  logo: string;
  cover: string;
  description: string;
  rating: number;
  reviewsCount: number;
  phone: string;
  telegram: string;
  instagram: string;
  website: string;
  address: string;
  city: string;
  mapCoords: MapCoordinates;
  workingHours: string;
  coursesCount: number;
  teachersCount: number;
  verified: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation?: string;
  points: number;
}

export interface Quiz {
  id: string;
  title: string;
  category: 'IELTS' | 'SAT' | 'CEFR' | 'General';
  durationMinutes: number;
  negativeMarking: boolean;
  negativeValue?: number; // e.g. -0.25
  shuffleQuestions: boolean;
  passScore: number;
  questions: QuizQuestion[];
}

export interface QuizResult {
  id: string;
  quizId: string;
  quizTitle: string;
  userId: string;
  userName: string;
  score: number;
  totalPoints: number;
  correctCount: number;
  wrongCount: number;
  percentage: number;
  timeSpentSeconds: number;
  passed: boolean;
  date: string;
  testTitle?: string;
  listeningBand?: number;
  readingBand?: number;
  writingBand?: number;
  overallBand?: number;
}

export interface CambridgeBook {
  id: string;
  title: string;
  bookNumber: number;
  coverUrl: string;
  pdfUrl: string;
  audioUrl?: string;
  testsCount: number;
}

export interface EssayCheckRequest {
  essayTitle: string;
  essayText: string;
  taskType: 'Task 1' | 'Task 2';
}

export interface EssayCriteriaResult {
  band: number;
  feedback: string;
}

export interface EssayCheckResult {
  overallBand: number;
  taskAchievement: EssayCriteriaResult;
  coherenceCohesion: EssayCriteriaResult;
  lexicalResource: EssayCriteriaResult;
  grammaticalAccuracy: EssayCriteriaResult;
  correctedText: string;
  keyImprovements: string[];
}

export type PaymentMethod = 'Payme' | 'Click' | 'Uzum Bank' | 'Visa' | 'MasterCard';
export type PaymentStatus = 'Completed' | 'Pending' | 'Failed' | 'Refunded';

export interface PaymentTransaction {
  id: string;
  userId: string;
  userName: string;
  courseOrSubName: string;
  amount: number;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  invoiceId: string;
  promoCodeUsed?: string;
  date: string;
}

export interface CertificateItem {
  id: string;
  uniqueId: string;
  studentId: string;
  studentName: string;
  courseName: string;
  category: 'IELTS' | 'SAT' | 'CEFR' | 'Course';
  gradeOrBand: string;
  issueDate: string;
  qrCodeUrl: string;
  verificationUrl: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  attachmentUrl?: string;
  attachmentType?: 'image' | 'pdf' | 'voice';
  timestamp: string;
  isMe: boolean;
}

export interface ChatThread {
  id: string;
  name: string;
  avatar: string;
  role: string;
  unreadCount: number;
  lastMessage: string;
  lastMessageTime: string;
  messages: ChatMessage[];
}

export interface PlatformAnalytics {
  dailyVisitors: number[];
  weeklyRevenue: number[];
  monthlyConversion: number;
  totalStudents: number;
  totalTeachers: number;
  totalCenters: number;
  totalCourses: number;
  totalRevenue: number;
}

export interface LeaderboardStudent {
  rank: number;
  name: string;
  score: string;
  tests: number;
  avatar: string;
}

export interface LeaderboardTeacher {
  rank: number;
  name: string;
  subject: string;
  rating: number;
  studentsCount: number;
  avatar: string;
}

export interface LeaderboardCourse {
  rank: number;
  title: string;
  category: string;
  studentsCount: number;
  rating: number;
  thumbnail: string;
}

export interface StudentProgress {
  id: string;
  name: string;
  email: string;
  courseName: string;
  score: string;
}

export interface TeacherScheduleItem {
  day: string;
  title: string;
  time: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}
