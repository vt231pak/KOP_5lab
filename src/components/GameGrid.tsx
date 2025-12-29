import { Card } from './Card';

interface GameGridProps {
  cards?: Array<{
    id: number;
    emoji: string;
    isFlipped: boolean;
    isMatched: boolean;
  }>;
  onCardClick?: (cardId: number) => void;
  animationSpeed?: 'slow' | 'normal' | 'fast';
}

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
