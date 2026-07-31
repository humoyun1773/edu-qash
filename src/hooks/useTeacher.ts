import { useState, useEffect, useCallback, useRef } from 'react';
import type { Quiz, TeacherScheduleItem, StudentProgress } from '../types';
import { getCached, setCached } from './useLocalCache';
import { teacherApi } from '../services/teacherApi';

export interface TeacherStudentItem {
  id: string;
  name: string;
  email?: string;
  courseName?: string;
  score?: string;
  course?: string;
  progress?: number;
}

export interface CreateTeacherQuizPayload {
  title: string;
  category: 'IELTS' | 'SAT' | 'CEFR' | 'General';
  passScore?: number;
  durationMinutes?: number;
}

export interface TeacherCourseStats {
  courseName: string;
  studentsCount: number;
  avgRating: number;
}

const CACHE_KEY_STUDENTS = 'teacher_students';
const CACHE_KEY_QUIZZES = 'teacher_quizzes';
const CACHE_KEY_SCHEDULE = 'teacher_schedule';

export const useTeacher = () => {
  const [students, setStudents] = useState<TeacherStudentItem[]>(() => getCached<TeacherStudentItem[]>(CACHE_KEY_STUDENTS, []));
  const [quizzes, setQuizzes] = useState<Quiz[]>(() => getCached<Quiz[]>(CACHE_KEY_QUIZZES, []));
  const [schedule, setSchedule] = useState<TeacherScheduleItem[]>(() => getCached<TeacherScheduleItem[]>(CACHE_KEY_SCHEDULE, []));
  const [stats, setStats] = useState<TeacherCourseStats[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchedRef = useRef(false);

  const fetchTeacherData = useCallback(async (force = false) => {
    if (fetchedRef.current && !force) return;
    fetchedRef.current = true;
    setLoading(true);
    setError(null);
    try {
      const [stProgress, schData, statData] = await Promise.all([
        teacherApi.getStudents(),
        teacherApi.getSchedule(),
        teacherApi.getCourseStats()
      ]);
      const mappedStudents: TeacherStudentItem[] = stProgress.map((s: StudentProgress) => ({
        id: s.id,
        name: s.name,
        email: s.email,
        courseName: s.courseName,
        score: s.score,
        course: s.courseName,
        progress: 85
      }));
      setStudents(mappedStudents);
      setSchedule(schData);
      setStats(statData.map((st: any) => ({ courseName: st.label, studentsCount: typeof st.value === 'number' ? st.value : 0, avgRating: 5.0 })));
      setCached(CACHE_KEY_STUDENTS, mappedStudents);
      setCached(CACHE_KEY_SCHEDULE, schData);
    } catch (err: any) {
      setError(err.message || "Ustoz paneli ma'lumotlarini yuklashda xatolik");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeacherData();
  }, [fetchTeacherData]);

  const createQuiz = async (payload: CreateTeacherQuizPayload) => {
    try {
      const created: Quiz = {
        id: `q_${Date.now()}`,
        title: payload.title,
        category: payload.category,
        durationMinutes: payload.durationMinutes || 30,
        negativeMarking: false,
        shuffleQuestions: true,
        passScore: payload.passScore ?? 70,
        questions: []
      };
      setQuizzes(prev => {
        const updated = [created, ...prev];
        setCached(CACHE_KEY_QUIZZES, updated);
        return updated;
      });
      return created;
    } catch (err: any) {
      setError(err.message || 'Test yaratishda xatolik');
      throw err;
    }
  };

  return {
    students,
    quizzes,
    schedule,
    stats,
    loading,
    error,
    refetch: () => fetchTeacherData(true),
    createQuiz
  };
};
