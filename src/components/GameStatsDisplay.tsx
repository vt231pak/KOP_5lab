interface GameStatsDisplayProps {
  moves?: number;
  matchedPairs?: number;
  totalPairs?: number;
}

export const GameStatsDisplay: React.FC<GameStatsDisplayProps> = ({
  moves = 0,
  matchedPairs = 0,
  totalPairs = 8,
}) => {
  return (
    <div className="game-stats">
      <div>
        <span>Moves: {moves}</span>
      </div>
      <div>
        <span>Pairs: {matchedPairs} / {totalPairs}</span>
      </div>
    </div>
  );
};
