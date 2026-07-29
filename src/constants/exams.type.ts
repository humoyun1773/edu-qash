export interface EssayCheckPayload {
  topic: string;
  text: string;
}

export interface EssayCriteria {
  band: number;
  feedback: string;
}

export interface EssayCheckResponse {
  overallBand: number;
  taskAchievement: EssayCriteria;
  coherenceCohesion: EssayCriteria;
  lexicalResource: EssayCriteria;
  grammaticalAccuracy: EssayCriteria;
  correctedText: string;
  keyImprovements: string[];
}

export interface CambridgeBookItem {
  id: string;
  title: string;
  bookNumber: number;
  coverUrl: string;
  pdfUrl: string;
  audioUrl?: string;
  testsCount: number;
}
