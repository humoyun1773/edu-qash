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
