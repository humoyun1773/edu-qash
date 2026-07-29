import { useState, useEffect, useCallback } from 'react';
import { studentService } from '../constants/student.service';
import type { StudentEnrolledCourse, StudentTestResultItem, UpdateStudentProfilePayload } from '../constants/student.type';
import type { CertificateItem } from '../constants/certificates.type';
import { getCached, setCached } from './useLocalCache';

const CACHE_KEY_COURSES = 'student_courses';
const CACHE_KEY_CERTS = 'student_certificates';
const CACHE_KEY_RESULTS = 'student_results';

export const useStudent = () => {
  const [courses, setCourses] = useState<StudentEnrolledCourse[]>(() => getCached<StudentEnrolledCourse[]>(CACHE_KEY_COURSES, []));
  const [certificates, setCertificates] = useState<CertificateItem[]>(() => getCached<CertificateItem[]>(CACHE_KEY_CERTS, []));
  const [results, setResults] = useState<StudentTestResultItem[]>(() => getCached<StudentTestResultItem[]>(CACHE_KEY_RESULTS, []));
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudentData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [cData, certData, rData] = await Promise.all([
        studentService.getMyCourses(),
        studentService.getMyCertificates(),
        studentService.getMyResults()
      ]);
      setCourses(cData);
      setCertificates(certData);
      setResults(rData);
      setCached(CACHE_KEY_COURSES, cData);
      setCached(CACHE_KEY_CERTS, certData);
      setCached(CACHE_KEY_RESULTS, rData);
    } catch (err: any) {
      setError(err.message || "Talaba ma'lumotlarini yuklashda xatolik");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudentData();
  }, [fetchStudentData]);

  const updateProfile = async (payload: UpdateStudentProfilePayload) => {
    try {
      return await studentService.updateProfile(payload);
    } catch (err: any) {
      setError(err.message || 'Profilni yangilashda xatolik');
      throw err;
    }
  };

  return {
    courses,
    certificates,
    results,
    loading,
    error,
    refetch: fetchStudentData,
    updateProfile
  };
};
