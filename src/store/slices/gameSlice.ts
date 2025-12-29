import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Card, GameDifficulty } from '../../types/game';

export interface GameState {
  cards: Card[];
  flippedCards: number[];
  matchedPairs: number[];
  moves: number;
  currentPage: 'start' | 'game' | 'results';
  difficulty: GameDifficulty | null;
  gameResults: {
    moves: number;
    time: number;
    difficulty: string;
  };
}

const initialState: GameState = {
  cards: [],
  flippedCards: [],
  matchedPairs: [],
  moves: 0,
  currentPage: 'start',
  difficulty: null,
  gameResults: {
    moves: 0,
    time: 0,
    difficulty: '',
  },
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCards: (state, action: PayloadAction<Card[]>) => {
      state.cards = action.payload;
    },
    setFlippedCards: (state, action: PayloadAction<number[]>) => {
      state.flippedCards = action.payload;
    },
    setMatchedPairs: (state, action: PayloadAction<number[]>) => {
      state.matchedPairs = action.payload;
    },
    setMoves: (state, action: PayloadAction<number>) => {
      state.moves = action.payload;
    },
    incrementMoves: (state) => {
      state.moves += 1;
    },
    setCurrentPage: (state, action: PayloadAction<'start' | 'game' | 'results'>) => {
      state.currentPage = action.payload;
    },
    setDifficulty: (state, action: PayloadAction<GameDifficulty>) => {
      state.difficulty = action.payload;
    },
    setGameResults: (
      state,
      action: PayloadAction<{ moves: number; time: number; difficulty: string }>
    ) => {
      state.gameResults = action.payload;
    },
    resetGame: (state) => {
      state.cards = [];
      state.flippedCards = [];
      state.matchedPairs = [];
      state.moves = 0;
      state.gameResults = {
        moves: 0,
        time: 0,
        difficulty: '',
      };
    },
  },
});

export const {
  setCards,
  setFlippedCards,
  setMatchedPairs,
  setMoves,
  incrementMoves,
  setCurrentPage,
  setDifficulty,
  setGameResults,
  resetGame,
} = gameSlice.actions;

export default gameSlice.reducer;
