interface ProfessorScoreItemProps {
  category: string;
  score: number;
}

const ProfessorScoreItem: React.FC<ProfessorScoreItemProps> = ({
  category,
  score,
}) => {
  return (
    <div key={category} className="text-center">
      <p className="text-body">{category}</p>
      <p className="text-body-bold">{score}</p>
    </div>
  );
};

export default ProfessorScoreItem;
