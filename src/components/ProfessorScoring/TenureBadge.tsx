interface TenureBadgeProps {
  isTenure: boolean;
}

const TenureBadge: React.FC<TenureBadgeProps> = ({ isTenure }) => {
  return (
    <div
      className={`inline-flex items-center gap-[10px] px-[10px] py-[4px] rounded-[15px] justify-center relative ${
        isTenure ? 'bg-[#c0d1f3]' : 'bg-[#E6C0F3]'
      }`}
    >
      <div className="text-small w-fit mt-[-1.00px] whitespace-nowrap relative">
        {isTenure && <>TT/T</>}
        {!isTenure && <>NT</>}
      </div>
    </div>
  );
};

export default TenureBadge;
