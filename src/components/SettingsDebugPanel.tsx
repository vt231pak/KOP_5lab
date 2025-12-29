import React from 'react';
import { useAppSelector } from '../hooks/useRedux';
import type { RootState } from '../store';

export const SettingsDebugPanel: React.FC = () => {
  const game = useAppSelector((state: RootState) => state.game);

  return (
    <div className="settings-debug-panel">
      <h3>Redux State - Гра</h3>
      <div className="state-info">
        <p><strong>Поточна сторінка:</strong> {game.currentPage}</p>
        <p><strong>Результати гри:</strong></p>
        <ul style={{ marginLeft: '20px', fontSize: '12px' }}>
          <li>Ходів: {game.gameResults.moves}</li>
          <li>Час: {game.gameResults.time} сек</li>
          <li>Складність: {game.gameResults.difficulty}</li>
        </ul>
      </div>
    </div>
  );
};
