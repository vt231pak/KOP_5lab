interface DifficultyButtonProps {
  label?: string;
  description?: string;
  onClick?: () => void;
}

export const DifficultyButton: React.FC<DifficultyButtonProps> = ({
  label = 'Level',
  description = 'Description',
  onClick,
}) => {
  return (
    <button className="difficulty-btn" onClick={onClick}>
      <h3>{label}</h3>
      <p>{description}</p>
    </button>
  );
};
