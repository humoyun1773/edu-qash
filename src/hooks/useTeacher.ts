import { useState, useEffect, useCallback, useRef } from 'react';
import { teacherService } from '../constants/teacher.service';
import type { TeacherStudentItem, TeacherScheduleItem, CreateTeacherQuizPayload, TeacherCourseStats } from '../constants/teacher.type';
import type { QuizItem } from '../constants/quizzes.type';
import { getCached, setCached } from './useLocalCache';

const CACHE_KEY_STUDENTS = 'teacher_students';
const CACHE_KEY_QUIZZES = 'teacher_quizzes';
const CACHE_KEY_SCHEDULE = 'teacher_schedule';
const CACHE_KEY_STATS = 'teacher_stats';

export const useTeacher = () => {
  const [students, setStudents] = useState<TeacherStudentItem[]>(() => getCached<TeacherStudentItem[]>(CACHE_KEY_STUDENTS, []));
  const [quizzes, setQuizzes] = useState<QuizItem[]>(() => getCached<QuizItem[]>(CACHE_KEY_QUIZZES, []));
  const [schedule, setSchedule] = useState<TeacherScheduleItem[]>(() => getCached<TeacherScheduleItem[]>(CACHE_KEY_SCHEDULE, []));
  const [stats, setStats] = useState<TeacherCourseStats[]>(() => getCached<TeacherCourseStats[]>(CACHE_KEY_STATS, []));
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchedRef = useRef(false);

  const fetchTeacherData = useCallback(async (force = false) => {
    if (fetchedRef.current && !force) return;
    fetchedRef.current = true;
    setLoading(true);
    setError(null);
    try {
      const [stData, qData, schData, statData] = await Promise.all([
        teacherService.getStudents(),
        teacherService.getQuizzes(),
        teacherService.getSchedule(),
        teacherService.getStats()
      ]);
      setStudents(stData);
      setQuizzes(qData);
      setSchedule(schData);
      setStats(statData);
      setCached(CACHE_KEY_STUDENTS, stData);
      setCached(CACHE_KEY_QUIZZES, qData);
      setCached(CACHE_KEY_SCHEDULE, schData);
      setCached(CACHE_KEY_STATS, statData);
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
      const created = await teacherService.createQuiz(payload);
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
