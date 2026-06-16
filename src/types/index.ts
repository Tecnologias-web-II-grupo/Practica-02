export interface VocabularyItem {
  id: number;
  image: string;
  description: string;
  correctAnswer: string;
}

export interface UserAnswer {
  itemId: number;
  userText: string;
}