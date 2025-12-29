import { GameGrid, GameStatsDisplay, GameResultsModal } from '../components';
import { useGameSettings } from '../hooks';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

interface GamePageProps {
  moves: number;
  matchedPairs: number;
  totalPairs: number;
  cards: Array<{
    id: number;
    emoji: string;
    isFlipped: boolean;
    isMatched: boolean;
  }>;
  onCardClick: (cardId: number) => void;
  onBackToMenu: () => void;
  onNewGame: () => void;
  showResultsModal: boolean;
  onPlayAgain?: () => void;
}

export const GamePage: React.FC<GamePageProps> = ({
  moves,
  matchedPairs,
  totalPairs,
  cards,
  onCardClick,
  onBackToMenu,
  onNewGame,
  showResultsModal,
  onPlayAgain,
}) => {
  const { settings } = useGameSettings();
  const gameResults = useSelector((state: RootState) => state.game.gameResults);

  return (
    <div className="game-page">
      <h1>Game</h1>
      <GameStatsDisplay 
        moves={moves}
        matchedPairs={matchedPairs}
        totalPairs={totalPairs}
      />
      <GameGrid cards={cards} onCardClick={onCardClick} animationSpeed={settings.animationSpeed} />
      <button onClick={onBackToMenu}>Back to Menu</button>
      <button onClick={onNewGame}>New Game</button>

      {gameResults && (
        <GameResultsModal
          isOpen={showResultsModal}
          moves={gameResults.moves}
          time={gameResults.time}
          difficulty={gameResults.difficulty}
          onPlayAgain={onPlayAgain || onNewGame}
          onBackToMenu={onBackToMenu}
        />
      )}
    </div>
  );
};
