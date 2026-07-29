export interface TeacherStudentItem {
  id: string;
  name: string;
  email: string;
  courseName: string;
  score: string;
}

export interface TeacherScheduleItem {
  id?: string;
  day: string;
  title: string;
  time: string;
}

export interface CreateTeacherQuizPayload {
  title: string;
  category: 'IELTS' | 'SAT' | 'CEFR' | 'General';
  durationMinutes: number;
}

export interface TeacherCourseStats {
  label: string;
  value: number | string;
}
