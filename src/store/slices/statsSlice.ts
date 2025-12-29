import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { GameStats } from '../../types/game';

export interface StatsState {
  stats: GameStats;
}

const initialState: StatsState = {
  stats: {
    moves: 0,
    matchedPairs: 0,
    totalPairs: 0,
    startTime: null,
    endTime: null,
  },
};

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    startGame: (state) => {
      state.stats.startTime = new Date();
      state.stats.endTime = null;
    },
    updateStats: (
      state,
      action: PayloadAction<{ moves: number; matchedPairs: number; totalPairs: number }>
    ) => {
      const { moves, matchedPairs, totalPairs } = action.payload;
      state.stats.moves = moves;
      state.stats.matchedPairs = matchedPairs;
      state.stats.totalPairs = totalPairs;
    },
    endGame: (state) => {
      state.stats.endTime = new Date();
    },
    resetStats: (state) => {
      state.stats = {
        moves: 0,
        matchedPairs: 0,
        totalPairs: 0,
        startTime: null,
        endTime: null,
      };
    },
  },
});

export const { startGame, updateStats, endGame, resetStats } = statsSlice.actions;

export default statsSlice.reducer;
