interface TenureBadgeProps {
  score: string;
}

const FinalScoreCard: React.FC<TenureBadgeProps> = ({ score }) => {
  return (
    <div className="inline-flex items-center px-[8px] py-[6px] rounded-lg justify-center relative bg-[#DDF8DD]">
      <div className="text-heading-1 whitespace-nowrap relative">{score}</div>
    </div>
  );
};

export default FinalScoreCard;
