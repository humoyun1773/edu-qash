import type { CourseItem } from './courses.type';
import type { LearningCenterItem } from './centers.type';

export interface GuestFeaturedCourse extends CourseItem {}
export interface GuestFeaturedCenter extends LearningCenterItem {}

export interface ContactFormPayload {
  name: string;
  phone: string;
  message: string;
  courseCategory?: string;
}
