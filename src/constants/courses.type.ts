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

export interface CourseItem {
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
}

export interface CreateCoursePayload {
  title: string;
  description: string;
  category: CourseCategory;
  type: CourseType;
  price: number;
  thumbnail?: string;
}

export interface UpdateCoursePayload {
  title?: string;
  description?: string;
  price?: number;
  category?: CourseCategory;
  type?: CourseType;
  thumbnail?: string;
}

export interface EnrollCoursePayload {
  courseId: string;
  paymentMethod: string;
  promoCode?: string;
}
