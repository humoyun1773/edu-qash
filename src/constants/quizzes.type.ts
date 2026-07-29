export interface QuizQuestionItem {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  points: number;
}

export interface QuizItem {
  id: string;
  title: string;
  category: 'IELTS' | 'SAT' | 'CEFR' | 'General';
  durationMinutes: number;
  negativeMarking: boolean;
  negativeValue?: number;
  shuffleQuestions: boolean;
  passScore: number;
  questions: QuizQuestionItem[];
}

export interface SubmitQuizPayload {
  quizId: string;
  answers: Record<number, number>;
}

export interface SubmitQuizResult {
  score: number;
  totalPoints: number;
}
