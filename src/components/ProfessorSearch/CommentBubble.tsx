import { useState } from 'react';

const CommentBubble: React.FC<{ className?: string; text?: string }> = ({
  className = '',
  text,
}) => {
  const [expanded, setExpanded] = useState(false);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const newState = !expanded;
    setExpanded(newState);
  };
  return (
    (text && (
      <div
        className={`${!expanded ? 'w-[33px]' : 'max-w-[127px]'} ${
          !expanded ? 'h-[32px]' : 'min-h-[86px]'
        } ${className} relative z-10 cursor-pointer 
            border-none 
            transition-all duration-[50ms] focus:border-none focus:outline-none`}
        onClick={handleClick}
      >
        <div
          className={`absolute left-0 top-0 h-[33px] w-[33px] rotate-90 rounded-[40.71px_40.71px_40.71px_3.57px] bg-red-400`}
        />
        <div
          className={`absolute ${!expanded ? 'w-[27px]' : 'w-[127px]'} ${
            !expanded ? 'left-[3px]' : 'left-0'
          } ${!expanded ? 'top-[3px]' : 'top-[0.1px]'} ${
            !expanded ? 'h-[26px]' : 'h-[90px]'
          } ${!expanded ? 'rounded-[13.29px/12.86px]' : 'rounded-[11px]'} ${
            !expanded ? 'bg-white' : 'bg-red-400'
          }`}
        />
        {expanded && (
          <>
            <div className="absolute left-[2px] top-[2px] min-h-[86px] min-w-[123px] rounded-[9px] bg-white" />
            <p className="relative left-[10px] top-[8px] min-w-[110px] select-none text-[12px] font-normal leading-[11.8px] tracking-[0] text-gray-500">
              {text}
            </p>
          </>
        )}
        {!expanded && (
          <div className="absolute left-[8px] top-[14px] h-[5px] w-[17px]">
            <div className="absolute left-0 top-0 h-[5px] w-[5px] rounded-[2.35px/2.27px] bg-red-400" />
            <div className="absolute left-[6px] top-0 h-[5px] w-[5px] rounded-[2.35px/2.27px] bg-red-400" />
            <div className="absolute left-[13px] top-0 h-[5px] w-[5px] rounded-[2.35px/2.27px] bg-red-400" />
          </div>
        )}
      </div>
    )) || <></>
  );
};

export default CommentBubble;

/*
   <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/60a70ac6-3e9d-4213-a7c6-47881e410573?apiKey=0b7e7ce73bb84718b8f234670789b846&"
        className="aspect-[1.03] object-contain object-center w-full overflow-hidden"
        alt="Image description"
      />
  */
