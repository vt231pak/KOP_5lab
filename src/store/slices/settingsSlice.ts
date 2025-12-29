import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { GameSettings } from '../../types/game';
import { DEFAULT_SETTINGS } from '../../types/game';

export interface SettingsState {
  settings: GameSettings;
  isLoaded: boolean;
}

const initialState: SettingsState = {
  settings: DEFAULT_SETTINGS,
  isLoaded: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<GameSettings>) => {
      state.settings = action.payload;
      state.isLoaded = true;
    },
    updateDifficulty: (
      state,
      action: PayloadAction<{ difficulty: 'easy' | 'medium' | 'hard'; cardCount: number }>
    ) => {
      const { difficulty, cardCount } = action.payload;
      const newDifficulties = { ...state.settings.difficulties };

      newDifficulties[difficulty] = cardCount;

      // Якщо змінили easy, оновлюємо medium і hard
      if (difficulty === 'easy') {
        newDifficulties.medium = Math.max(cardCount + 2, newDifficulties.medium);
        newDifficulties.hard = Math.max(cardCount + 4, newDifficulties.hard);
      }
      // Якщо змінили medium, оновлюємо hard
      else if (difficulty === 'medium') {
        newDifficulties.hard = Math.max(cardCount + 2, newDifficulties.hard);
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

      state.settings.difficulties = newDifficulties;
    },
    setAnimationSpeed: (state, action: PayloadAction<'slow' | 'normal' | 'fast'>) => {
      state.settings.animationSpeed = action.payload;
    },
    resetSettings: (state) => {
      state.settings = DEFAULT_SETTINGS;
    },
    setIsLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload;
    },
  },
});

export const {
  setSettings,
  updateDifficulty,
  setAnimationSpeed,
  resetSettings,
  setIsLoaded,
} = settingsSlice.actions;

export default settingsSlice.reducer;
