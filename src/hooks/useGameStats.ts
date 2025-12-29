import { useState, useCallback } from 'react';
import type { GameStats } from '../types/game';

export const useGameStats = () => {
  const [stats, setStats] = useState<GameStats>({
    moves: 0,
    matchedPairs: 0,
    totalPairs: 0,
    startTime: null,
    endTime: null,
  });

  const startGame = useCallback(() => {
    setStats(prev => ({
      ...prev,
      startTime: new Date(),
      endTime: null,
    }));
  }, []);

  const updateStats = useCallback((moves: number, matchedPairs: number, totalPairs: number) => {
    setStats(prev => ({
      ...prev,
      moves,
      matchedPairs,
      totalPairs,
    }));
  }, []);

  const endGame = useCallback(() => {
    setStats(prev => ({
      ...prev,
      endTime: new Date(),
    }));
  }, []);

  const getElapsedTime = (): number => {
    if (!stats.startTime) return 0;
    const end = stats.endTime || new Date();
    return Math.floor((end.getTime() - stats.startTime.getTime()) / 1000);
  };

  const resetStats = useCallback(() => {
    setStats({
      moves: 0,
      matchedPairs: 0,
      totalPairs: 0,
      startTime: null,
      endTime: null,
    });
  }, []);

  return {
    stats,
    startGame,
    updateStats,
    endGame,
    getElapsedTime,
    resetStats,
  };
};
