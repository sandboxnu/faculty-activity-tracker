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
        } ${className} relative z-10 border-none 
            focus:outline-none 
            focus:border-none cursor-pointer transition-all duration-[50ms]`}
        onClick={handleClick}
      >
        <div
          className={`w-[33px] left-0 top-0 h-[33px] rounded-[40.71px_40.71px_40.71px_3.57px] bg-red-400 absolute rotate-90`}
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
            <div className="absolute min-w-[123px] min-h-[86px] top-[2px] left-[2px] bg-white rounded-[9px]" />
            <p className="relative min-w-[110px] left-[10px] top-[8px] font-normal text-gray-500 text-[12px] tracking-[0] leading-[11.8px] select-none">
              {text}
            </p>
          </>
        )}
        {!expanded && (
          <div className="absolute w-[17px] h-[5px] top-[14px] left-[8px]">
            <div className="absolute w-[5px] h-[5px] top-0 left-0 bg-red-400 rounded-[2.35px/2.27px]" />
            <div className="absolute w-[5px] h-[5px] top-0 left-[6px] bg-red-400 rounded-[2.35px/2.27px]" />
            <div className="absolute w-[5px] h-[5px] top-0 left-[13px] bg-red-400 rounded-[2.35px/2.27px]" />
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
