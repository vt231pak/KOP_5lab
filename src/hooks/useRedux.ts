import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { 
  setCurrentPage, 
  setGameResults, 
  setDifficulty,
  resetGame 
} from '../store/slices/gameSlice';
import { 
  startGame,
  updateStats,
  endGame,
  resetStats
} from '../store/slices/statsSlice';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector;

export const useGamePage = () => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state: RootState) => state.game.currentPage);
  const gameResults = useAppSelector((state: RootState) => state.game.gameResults);
  const difficulty = useAppSelector((state: RootState) => state.game.difficulty);

  return {
    currentPage,
    gameResults,
    difficulty,
    setCurrentPage: (page: 'start' | 'game' | 'results') => dispatch(setCurrentPage(page)),
    setGameResults: (results: { moves: number; time: number; difficulty: string }) => 
      dispatch(setGameResults(results)),
    setDifficulty: (diff: any) => dispatch(setDifficulty(diff)),
    resetGame: () => dispatch(resetGame()),
  };
};

export const useStatsRedux = () => {
  const dispatch = useAppDispatch();
  const stats = useAppSelector((state: RootState) => state.stats.stats);

  return {
    stats,
    startGame: () => dispatch(startGame()),
    updateStats: (moves: number, matchedPairs: number, totalPairs: number) =>
      dispatch(updateStats({ moves, matchedPairs, totalPairs })),
    endGame: () => dispatch(endGame()),
    resetStats: () => dispatch(resetStats()),
  };
};
