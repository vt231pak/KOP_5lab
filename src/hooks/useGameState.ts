import { useState, useCallback } from 'react';
import type { GameDifficulty, GameSettings } from '../types/game';

type PageType = 'start' | 'game' | 'results';

const calculateGridSize = (emojiCount: number): number => {
  // 4x4 = 16 (8 пар)
  // 4x5 = 20 (10 пар)
  // 4x6 = 24 (12 пар)
  // 5x6 = 30 (15 пар)
  // 6x6 = 36 (18 пар)
  // 6x8 = 48 (24 пар)
  
  if (emojiCount <= 8) return 16; // 4x4
  if (emojiCount <= 10) return 20; // 4x5
  if (emojiCount <= 12) return 24; // 4x6
  if (emojiCount <= 15) return 30; // 5x6
  if (emojiCount <= 18) return 36; // 6x6
  return 48; // 6x8
};

export const useGameState = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('start');
  const [difficulty, setDifficulty] = useState<GameDifficulty>({
    level: 'easy',
    gridSize: 16,
    emojiCount: 8,
  });
  const [gameResults, setGameResults] = useState({
    moves: 0,
    time: 0,
    difficulty: 'easy',
  });

  const selectDifficulty = useCallback(
    (level: 'easy' | 'medium' | 'hard', settings: GameSettings) => {
      const emojiCount = settings.difficulties[level];
      const gridSize = calculateGridSize(emojiCount);

      setDifficulty({
        level,
        gridSize,
        emojiCount,
      });
      setCurrentPage('game');
    },
    []
  );

  const goToResults = useCallback((moves: number, time: number) => {
    setGameResults({
      moves,
      time,
      difficulty: difficulty.level,
    });
    setCurrentPage('results');
  }, [difficulty]);

  const goToMenu = useCallback(() => {
    setCurrentPage('start');
  }, []);

  const startNewGame = useCallback(() => {
    setCurrentPage('game');
  }, []);

  const setPage = useCallback((page: PageType) => {
    setCurrentPage(page);
  }, []);

  return {
    currentPage,
    difficulty,
    gameResults,
    selectDifficulty,
    goToResults,
    goToMenu,
    startNewGame,
    setPage,
  };
};
