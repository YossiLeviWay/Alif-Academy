export type Screen = 'onboarding' | 'home' | 'letters' | 'profile' | 'lesson' | 'quiz' | 'review' | 'dashboard' | 'practice' | 'login';

export interface WordExample {
  word: string;
  transliteration: string;
  meaning: string;
  image: string;
  position: 'isolated' | 'initial' | 'medial' | 'final';
  highlightedIndex: number; // Index of the letter in the word string
}

export interface Letter {
  id: string;
  char: string;
  name: string;
  pronunciation: string;
  forms: {
    isolated: string;
    initial: string;
    medial: string;
    final: string;
  };
  examples: WordExample[];
}

export interface UserProfile {
  uid?: string;
  name: string;
  avatar: string;
  notificationHour: number | null; // 0-23, null if disabled
  dailyGoal: number; // number of letters/words
  weeklyGoal: number;
}

export interface UserProgress {
  xp: number;
  streak: number;
  completedLessons: string[];
  masteredLetters: string[];
  masteredWords: string[];
  lastActiveDate: string;
}

export interface Unit {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  type: 'letter' | 'quiz' | 'treasure' | 'review';
  letterId?: string;
}
