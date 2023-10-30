interface TenureBadgeProps {
  isTenure: boolean;
}

const TenureBadge: React.FC<TenureBadgeProps> = ({ isTenure }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center gap-[10px] rounded-[15px] px-[10px] py-[4px] ${
        isTenure ? 'bg-[#c0d1f3]' : 'bg-[#E6C0F3]'
      }`}
    >
      <div className="relative mt-[-1.00px] w-fit whitespace-nowrap text-small">
        {isTenure && <>TT/T</>}
        {!isTenure && <>NT</>}
      </div>
    </div>
  );
};

export default TenureBadge;
