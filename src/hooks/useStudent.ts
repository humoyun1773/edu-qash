import { useState, useEffect, useCallback, useRef } from 'react';
import { coursesApi } from '../services/coursesApi';
import { examsApi } from '../services/examsApi';
import type { Course, CertificateItem, QuizResult, User } from '../types';
import { getCached, setCached } from './useLocalCache';

export type StudentEnrolledCourse = Course;
export type StudentTestResultItem = QuizResult;
export type UpdateStudentProfilePayload = Partial<User>;

const CACHE_KEY_COURSES = 'student_courses';
const CACHE_KEY_CERTS = 'student_certificates';
const CACHE_KEY_RESULTS = 'student_results';

export const useStudent = () => {
  const [courses, setCourses] = useState<StudentEnrolledCourse[]>(() => getCached<StudentEnrolledCourse[]>(CACHE_KEY_COURSES, []));
  const [certificates, setCertificates] = useState<CertificateItem[]>(() => getCached<CertificateItem[]>(CACHE_KEY_CERTS, []));
  const [results, setResults] = useState<StudentTestResultItem[]>(() => getCached<StudentTestResultItem[]>(CACHE_KEY_RESULTS, []));
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchedRef = useRef(false);

  const fetchStudentData = useCallback(async (force = false) => {
    if (fetchedRef.current && !force) return;
    fetchedRef.current = true;
    setLoading(true);
    setError(null);
    try {
      const [cData, certData] = await Promise.all([
        coursesApi.getCourses(),
        examsApi.getStudentCertificates()
      ]);
      setCourses(cData);
      setCertificates(certData);
      setResults([]);
      setCached(CACHE_KEY_COURSES, cData);
      setCached(CACHE_KEY_CERTS, certData);
      setCached(CACHE_KEY_RESULTS, []);
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
      return { success: true, payload };
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
    updateProfile,
    refetch: () => fetchStudentData(true)
  };
};
