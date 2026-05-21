import { Card } from './Card';

/**
 * Card object structure for the grid
 * @interface CardObject
 * @property {number} id - Unique identifier for the card
 * @property {string} emoji - The emoji displayed on the card
 * @property {boolean} isFlipped - Whether the card is flipped/revealed
 * @property {boolean} isMatched - Whether the card has been matched
 */
interface CardObject {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

/**
 * Props for the GameGrid component
 * @interface GameGridProps
 * @property {CardObject[]} [cards=[]] - Array of card objects to render
 * @property {Function} [onCardClick] - Callback fired when a card is clicked
 * @property {'slow' | 'normal' | 'fast'} [animationSpeed='normal'] - Card animation speed
 */
interface GameGridProps {
  cards?: CardObject[];
  onCardClick?: (cardId: number) => void;
  animationSpeed?: 'slow' | 'normal' | 'fast';
}

/**
 * GameGrid Component - Responsive grid of game cards
 *
 * Renders a responsive grid that automatically calculates the optimal number
 * of columns based on the number of cards. Prefers square layouts when possible,
 * otherwise creates a balanced horizontal layout. Each card can be clicked to
 * trigger game logic.
 *
 * @component
 * @param {GameGridProps} props - Component props
 * @returns {React.ReactElement} The game grid element
 *
 * @example
 * // Easy game (8 cards in 2x4 grid)
 * <GameGrid cards={easyCards} onCardClick={handleCardClick} />
 *
 * @example
 * // Hard game (12 cards in 3x4 grid)
 * <GameGrid cards={hardCards} animationSpeed="fast" />
 */
export const GameGrid: React.FC<GameGridProps> = ({
  cards = [],
  onCardClick,
  animationSpeed = 'normal',
}) => {
  // Функція для визначення кількості стовпців (квадрат якщо можна, інакше горизонтально)
  const getGridColumns = (cardCount: number): number => {
    if (cardCount === 0) return 4;
    
    // Спочатку шукаємо точний квадрат
    for (let cols = 1; cols <= cardCount; cols++) {
      if (cardCount % cols === 0) {
        const rows = cardCount / cols;
        // Якщо точний квадрат - беремо його
        if (cols === rows) {
          return cols;
        }
      }
    }
    
    // Якщо квадрата нема, шукаємо горизонтальний макет
    // Переконуємось що карти заповнюють рядок повністю (без остатку)
    let bestCols = 2;
    let bestDifference = cardCount;
    
    for (let cols = Math.min(8, cardCount); cols >= 2; cols--) {
      if (cardCount % cols === 0) {
        const rows = cardCount / cols;
        const difference = Math.abs(cols - rows);
        
        // Беремо варіант де немає остатку рядків і який найближче до горизонталі
        if (difference < bestDifference) {
          bestDifference = difference;
          bestCols = cols;
        }
      }
    }
    
    return bestCols;
  };

  const gridColumns = getGridColumns(cards.length);

  return (
    <div 
      className="game-grid"
      style={{
        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
      }}
    >
      {cards.length === 0 ? (
        <p>Game grid placeholder</p>
      ) : (
        cards.map((card) => (
          <Card
            key={card.id}
            emoji={card.emoji}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            onClick={() => onCardClick?.(card.id)}
            animationSpeed={animationSpeed}
          />
        ))
      )}
    </div>
  );
};
