import { useState, useEffect, useCallback } from 'react';
import { quizzesService } from '../constants/quizzes.service';
import type { QuizItem } from '../constants/quizzes.type';

export const useQuizzes = () => {
  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuizzes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await quizzesService.getQuizzes();
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
    return await quizzesService.submitQuizResult({ quizId, answers });
  };

  return {
    quizzes,
    loading,
    error,
    refetch: fetchQuizzes,
    submitQuiz
  };
};
