import { useState, useEffect, useCallback } from 'react';
import { quizzesApi } from '../services/quizzesApi';
import type { Quiz } from '../types';

export const useQuizzes = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuizzes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await quizzesApi.getQuizzes();
      setQuizzes(data);
    } catch (err: any) {
      setError(err.message || 'Testlarni yuklashda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  const submitQuiz = async (quizId: string, answers: Record<number, number>) => {
    return await quizzesApi.submitQuizResult(quizId, answers);
  };

  return {
    quizzes,
    loading,
    error,
    refetch: fetchQuizzes,
    submitQuiz
  };
};
