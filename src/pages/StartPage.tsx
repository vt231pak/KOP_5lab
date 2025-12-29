import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DifficultyButton, SettingsForm } from '../components';
import { useGameSettings } from '../hooks';
import { setCurrentPage, setDifficulty } from '../store/slices/gameSlice';

interface StartPageProps {
  onSelectDifficulty: (level: 'easy' | 'medium' | 'hard') => void;
}

export const StartPage: React.FC<StartPageProps> = ({
  onSelectDifficulty,
}) => {
  const dispatch = useDispatch();
  const { settings, updateDifficultySetting } = useGameSettings();
  const [showSettings, setShowSettings] = useState(false);

  const handleDifficultySelect = (level: 'easy' | 'medium' | 'hard') => {
    // Оновлюємо Redux store
    const emojiCount = settings.difficulties[level];
    dispatch(setDifficulty({
      level,
      emojiCount,
      gridSize: 16,
    } as any));
    dispatch(setCurrentPage('game'));
    // Викликаємо зовнішній callback для інших обновлень
    onSelectDifficulty(level);
  };

  return (
    <div className="start-page">
      <h1>Emojis Match Game</h1>
      <p>Select difficulty</p>
      <div className="difficulty-buttons">
        <DifficultyButton 
          label="Easy" 
          description={`${settings.difficulties.easy} пар`}
          onClick={() => handleDifficultySelect('easy')}
        />
        <DifficultyButton 
          label="Medium" 
          description={`${settings.difficulties.medium} пар`}
          onClick={() => handleDifficultySelect('medium')}
        />
        <DifficultyButton 
          label="Hard" 
          description={`${settings.difficulties.hard} пар`}
          onClick={() => handleDifficultySelect('hard')}
        />
      </div>

      <button 
        className="settings-btn"
        onClick={() => setShowSettings(!showSettings)}
      >
        {showSettings ? 'Закрити налаштування' : 'Налаштування'}
      </button>

      {showSettings && (
        <div className="settings-container">
          <SettingsForm
            initialSettings={settings}
            onSave={() => setShowSettings(false)}
            onClose={() => setShowSettings(false)}
            onUpdateDifficulty={updateDifficultySetting}
          />
        </div>
      )}
    </div>
  );
};
