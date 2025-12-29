import React from 'react';

interface CardProps {
  emoji?: string;
  isFlipped?: boolean;
  isMatched?: boolean;
  onClick?: () => void;
  animationSpeed?: 'slow' | 'normal' | 'fast';
}

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
