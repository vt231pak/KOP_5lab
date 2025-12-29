export interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameDifficulty {
  level: 'easy' | 'medium' | 'hard';
  gridSize: number;
  emojiCount: number;
}

export interface DifficultySettings {
  easy: number;
  medium: number;
  hard: number;
}

export interface GameSettings {
  difficulties: DifficultySettings;
  animationSpeed: 'slow' | 'normal' | 'fast';
}

export const DEFAULT_SETTINGS: GameSettings = {
  difficulties: {
    easy: 8,
    medium: 10,
    hard: 12,
  },
  animationSpeed: 'normal',
};

export interface GameStats {
  moves: number;
  matchedPairs: number;
  totalPairs: number;
  startTime: Date | null;
  endTime: Date | null;
}
