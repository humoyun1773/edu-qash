import { useState, useEffect, useCallback } from 'react';
import { coursesApi } from '../services/coursesApi';
import type { Course } from '../types';
import { getCached, setCached } from './useLocalCache';

export type CreateCoursePayload = Partial<Course>;
export type UpdateCoursePayload = Partial<Course>;

const CACHE_KEY_COURSES = 'eduqash_courses_list';
const CACHE_KEY_DELETED_COURSES = 'eduqash_deleted_course_ids';

export const useCourses = (category?: string) => {
  const [courses, setCourses] = useState<Course[]>(() => {
    const cached = getCached<Course[]>(CACHE_KEY_COURSES, []);
    const deletedIds = new Set(getCached<string[]>(CACHE_KEY_DELETED_COURSES, []));
    return cached.filter(c => !deletedIds.has(c.id));
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await coursesApi.getCourses(category);
      const cached = getCached<Course[]>(CACHE_KEY_COURSES, []);
      const deletedIds = new Set(getCached<string[]>(CACHE_KEY_DELETED_COURSES, []));
      const mergedMap = new Map<string, Course>();

      cached.forEach(c => {
        if (!deletedIds.has(c.id)) mergedMap.set(c.id, c);
      });
      data.forEach(c => {
        if (!deletedIds.has(c.id)) mergedMap.set(c.id, c);
      });

      const mergedCourses = Array.from(mergedMap.values());
      setCourses(mergedCourses);
      setCached(CACHE_KEY_COURSES, mergedCourses);
    } catch (err: any) {
      setError(err.message || 'Kurslarni yuklashda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const createCourse = async (payload: CreateCoursePayload) => {
    try {
      const created = await coursesApi.createCourse(payload);
      setCourses(prev => {
        const updated = [created, ...prev];
        setCached(CACHE_KEY_COURSES, updated);
        return updated;
      });
      return created;
    } catch (err: any) {
      setError(err.message || 'Kurs yaratishda xatolik');
      throw err;
    }
  };

  const updateCourse = async (id: string, payload: UpdateCoursePayload) => {
    try {
      const updated = await coursesApi.updateCourse(id, payload);
      setCourses(prev => prev.map(c => c.id === id ? updated : c));
      return updated;
    } catch (err: any) {
      setError(err.message || 'Kursni yangilashda xatolik');
      throw err;
    }
  };

  const deleteCourse = async (id: string) => {
    try {
      await coursesApi.deleteCourse(id);
      const deletedIds = getCached<string[]>(CACHE_KEY_DELETED_COURSES, []);
      if (!deletedIds.includes(id)) {
        setCached(CACHE_KEY_DELETED_COURSES, [...deletedIds, id]);
      }
      setCourses(prev => {
        const newList = prev.filter(c => c.id !== id);
        setCached(CACHE_KEY_COURSES, newList);
        return newList;
      });
    } catch (err: any) {
      setError(err.message || "Kursni o'chirishda xatolik");
      throw err;
    }
  };

  const enrollCourse = async (courseId: string, paymentMethod: string, promoCode?: string) => {
    return await coursesApi.enrollCourse(courseId, paymentMethod, promoCode);
  };

  return {
    courses,
    loading,
    error,
    refetch: fetchCourses,
    createCourse,
    updateCourse,
    deleteCourse,
    enrollCourse
  };
};
