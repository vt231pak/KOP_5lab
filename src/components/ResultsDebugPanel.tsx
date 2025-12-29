import React from 'react';
import { useAppSelector } from '../hooks/useRedux';
import type { RootState } from '../store';

export const ResultsDebugPanel: React.FC = () => {
  const game = useAppSelector((state: RootState) => state.game);
  const stats = useAppSelector((state: RootState) => state.stats.stats);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="results-debug-panel">
      <h3>Redux State - Результати</h3>
      <div className="state-info">
        <h4>Game Results (з Redux):</h4>
        <ul style={{ marginLeft: '20px' }}>
          <li><strong>Ходів:</strong> {game.gameResults.moves}</li>
          <li><strong>Час:</strong> {formatTime(game.gameResults.time)}</li>
          <li><strong>Складність:</strong> {game.gameResults.difficulty}</li>
        </ul>

        <h4>Game Stats (з Redux):</h4>
        <ul style={{ marginLeft: '20px' }}>
          <li><strong>Ходів:</strong> {stats.moves}</li>
          <li><strong>Знайдено пар:</strong> {stats.matchedPairs}</li>
          <li><strong>Всього пар:</strong> {stats.totalPairs}</li>
          <li><strong>Час початку:</strong> {stats.startTime ? new Date(stats.startTime).toLocaleTimeString() : 'N/A'}</li>
          <li><strong>Час завершення:</strong> {stats.endTime ? new Date(stats.endTime).toLocaleTimeString() : 'N/A'}</li>
        </ul>
      </div>
    </div>
  );
};
