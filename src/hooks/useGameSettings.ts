import { useState, useEffect, useCallback } from 'react';
import type { GameSettings } from '../types/game';
import { DEFAULT_SETTINGS } from '../types/game';

const STORAGE_KEY = 'emoji-game-settings';

export const useGameSettings = () => {
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Загрузка налаштувань з localStorage при монтуванні
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to parse settings from localStorage:', error);
        setSettings(DEFAULT_SETTINGS);
      }
    } else {
      setSettings(DEFAULT_SETTINGS);
    }
    setIsLoaded(true);
  }, []);

  // Збереження налаштувань до localStorage
  const saveSettings = useCallback((newSettings: GameSettings) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      console.error('Failed to save settings to localStorage:', error);
    }
  }, []);

  // Оновлення налаштувань для конкретного режиму з автоматичним оновленням складніших
  const updateDifficultySetting = useCallback(
    (difficulty: 'easy' | 'medium' | 'hard', cardCount: number) => {
      const newDifficulties = { ...settings.difficulties };
      newDifficulties[difficulty] = cardCount;

      // Якщо змінили easy, оновлюємо medium і hard
      if (difficulty === 'easy') {
        newDifficulties.medium = Math.max(cardCount + 2, newDifficulties.medium);
        newDifficulties.hard = Math.max(cardCount + 4, newDifficulties.hard);
      }
      // Якщо змінили medium, оновлюємо hard
      else if (difficulty === 'medium') {
        newDifficulties.hard = Math.max(cardCount + 2, newDifficulties.hard);
        // Переконуємось що easy <= medium
        if (newDifficulties.easy > cardCount) {
          newDifficulties.easy = Math.max(4, cardCount - 2);
        }
      }
      // Якщо змінили hard, переконуємось дотримання послідовності
      else if (difficulty === 'hard') {
        if (newDifficulties.medium > cardCount) {
          newDifficulties.medium = Math.max(6, cardCount - 2);
          newDifficulties.easy = Math.max(4, newDifficulties.medium - 2);
        }
      }

      const newSettings: GameSettings = {
        ...settings,
        difficulties: newDifficulties,
      };

      saveSettings(newSettings);
    },
    [settings, saveSettings]
  );

  // Скидання на стандартні налаштування
  const resetSettings = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setSettings(DEFAULT_SETTINGS);
  }, []);

  return {
    settings,
    saveSettings,
    updateDifficultySetting,
    resetSettings,
    isLoaded,
  };
};
