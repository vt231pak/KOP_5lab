import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface GameResultsModalProps {
  isOpen: boolean;
  moves: number;
  time: number;
  difficulty: string;
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const GameResultsModal: React.FC<GameResultsModalProps> = ({
  isOpen,
  moves,
  time,
  difficulty,
  onPlayAgain,
  onBackToMenu,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="modal-overlay">
      <div className="modal-content results-modal">
        <h2>Гру завершено!</h2>
        
        <div className="modal-stats">
          <div className="stat-item">
            <span className="stat-label">Складність:</span>
            <span className="stat-value">
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
          </div>
          
          <div className="stat-item">
            <span className="stat-label">Кількість ходів:</span>
            <span className="stat-value">{moves}</span>
          </div>
          
          <div className="stat-item">
            <span className="stat-label">Час:</span>
            <span className="stat-value">{formatTime(time)}</span>
          </div>
        </div>

        <div className="modal-buttons">
          <button 
            className="btn-primary" 
            onClick={onPlayAgain}
          >
            Грати ще раз
          </button>
          
          <button 
            className="btn-secondary" 
            onClick={onBackToMenu}
          >
            Повернутися в меню
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
