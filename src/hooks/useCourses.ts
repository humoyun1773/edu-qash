import { useState, useEffect, useCallback } from 'react';
import { coursesService } from '../constants/courses.service';
import type { CourseItem, CreateCoursePayload, UpdateCoursePayload } from '../constants/courses.type';

export const useCourses = (category?: string) => {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await coursesService.getCourses(category);
      setCourses(data);
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
      const created = await coursesService.createCourse(payload);
      setCourses(prev => [created, ...prev]);
      return created;
    } catch (err: any) {
      setError(err.message || 'Kurs yaratishda xatolik');
      throw err;
    }
  };

  const updateCourse = async (id: string, payload: UpdateCoursePayload) => {
    try {
      const updated = await coursesService.updateCourse(id, payload);
      setCourses(prev => prev.map(c => c.id === id ? updated : c));
      return updated;
    } catch (err: any) {
      setError(err.message || 'Kursni yangilashda xatolik');
      throw err;
    }
  };

  const deleteCourse = async (id: string) => {
    try {
      await coursesService.deleteCourse(id);
      setCourses(prev => prev.filter(c => c.id !== id));
    } catch (err: any) {
      setError(err.message || 'Kursni o\'chirishda xatolik');
      throw err;
    }
  };

  const enrollCourse = async (courseId: string, paymentMethod: string, promoCode?: string) => {
    return await coursesService.enrollCourse({ courseId, paymentMethod, promoCode });
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
