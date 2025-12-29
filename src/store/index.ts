import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './slices/gameSlice';
import statsReducer from './slices/statsSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    stats: statsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

