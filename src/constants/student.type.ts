import type { CourseItem } from './courses.type';

export interface StudentEnrolledCourse extends CourseItem {
  progressPercentage: number;
  lastStudiedAt: string;
}

export interface StudentTestResultItem {
  id: string;
  testTitle: string;
  listeningBand?: number;
  readingBand?: number;
  writingBand?: number;
  speakingBand?: number;
  overallBand: string;
  date: string;
}

export interface UpdateStudentProfilePayload {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
}
