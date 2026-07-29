export interface CenterTeacherItem {
  id: string;
  name: string;
  subject: string;
  rating: number;
  studentsCount: number;
  avatar: string;
}

export interface BranchRevenueData {
  monthlyRevenue: number;
  activeStudents: number;
  totalCourses: number;
  growthPercentage: number;
}

export interface UpdateCenterProfilePayload {
  name?: string;
  description?: string;
  phone?: string;
  telegram?: string;
  instagram?: string;
  website?: string;
  address?: string;
  city?: string;
  workingHours?: string;
}

export interface AddCenterTeacherPayload {
  name: string;
  subject: string;
  phone: string;
}
