import clsx from 'clsx';

interface ProfessorScoreItemProps {
  category: string;
  score: number;
  className?: string;
}

const ProfessorScoreItem: React.FC<ProfessorScoreItemProps> = ({
  category,
  score,
  className,
}) => {
  return (
    <div key={category} className={clsx(className, 'text-center')}>
      <p className="text-body">{category}</p>
      <p className="text-body-bold">{score}</p>
    </div>
  );
};

export default ProfessorScoreItem;
