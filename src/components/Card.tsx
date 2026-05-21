import React from 'react';

/**
 * Props for the Card component
 * @interface CardProps
 * @property {string} [emoji='😊'] - The emoji to display on the card back
 * @property {boolean} [isFlipped=false] - Whether the card is currently flipped
 * @property {boolean} [isMatched=false] - Whether the card has been matched with its pair
 * @property {Function} [onClick] - Callback function triggered when card is clicked
 * @property {'slow' | 'normal' | 'fast'} [animationSpeed='normal'] - Speed of the flip animation
 */
interface CardProps {
  emoji?: string;
  isFlipped?: boolean;
  isMatched?: boolean;
  onClick?: () => void;
  animationSpeed?: 'slow' | 'normal' | 'fast';
}

/**
 * Card Component - A single memory game card
 *
 * Renders a flippable card that displays an emoji. The card can be clicked
 * to trigger the flip animation. Used as a basic building block in the GameGrid.
 *
 * @component
 * @param {CardProps} props - Component props
 * @returns {React.ReactElement} The card element
 *
 * @example
 * // Unflipped card
 * <Card emoji="🎮" isFlipped={false} onClick={handleClick} />
 *
 * @example
 * // Matched card (stays visible and grayed out)
 * <Card emoji="⭐" isMatched={true} isFlipped={true} />
 */
export const Card: React.FC<CardProps> = ({
  emoji = '😊',
  isFlipped = false,
  isMatched = false,
  onClick,
  animationSpeed = 'normal',
}) => {
  const speedMap: Record<string, number> = {
    slow: 0.9,
    normal: 0.6,
    fast: 0.3,
  };

  const duration = speedMap[animationSpeed] ?? 0.6;

  const style: React.CSSProperties = {
    ['--card-flip-duration' as any]: `${duration}s`,
  };

  return (
    <div
      className={`card ${isFlipped || isMatched ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
      onClick={onClick}
      style={style}
    >
      <div className="card-inner">
        <div className="card-face card-front">?</div>
        <div className="card-face card-back">{emoji}</div>
      </div>
    </div>
  );
};

export default Card;
