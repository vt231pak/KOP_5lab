import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { setCurrentPage } from '../store/slices/gameSlice';

interface ResultsPageProps {
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const ResultsPage: React.FC<ResultsPageProps> = ({
  onPlayAgain,
  onBackToMenu,
}) => {
  const dispatch = useDispatch();
  const gameResults = useSelector((state: RootState) => state.game.gameResults);

  const handlePlayAgain = () => {
    onPlayAgain();
  };

  const handleBackToMenu = () => {
    onBackToMenu();
    dispatch(setCurrentPage('start'));
  };

  return (
    <div className="results-page">
      <h1>Results</h1>
      <div className="results-stats">
        <p>Difficulty: {gameResults.difficulty.charAt(0).toUpperCase() + gameResults.difficulty.slice(1)}</p>
        <p>Moves: {gameResults.moves}</p>
        <p>Time: {formatTime(gameResults.time)}</p>
      </div>
      <div className="results-buttons">
        <button onClick={handlePlayAgain}>Play Again</button>
        <button onClick={handleBackToMenu}>Back to Menu</button>
      </div>
    </div>
  );
};
