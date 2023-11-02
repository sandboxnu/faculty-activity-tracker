interface TenureBadgeProps {
  score: string;
}

const FinalScoreCard: React.FC<TenureBadgeProps> = ({ score }) => {
  return (
    <div className="relative inline-flex items-center justify-center rounded-lg bg-[#DDF8DD] px-[8px] py-[6px]">
      <div className="relative whitespace-nowrap text-heading-1">{score}</div>
    </div>
  );
};

export default FinalScoreCard;
