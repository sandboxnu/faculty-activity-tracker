import React from 'react';

interface TooltipProps {
  tooltipTitle: string;
  text: string[];
}

const Tooltip: React.FC<TooltipProps> = ({
  tooltipTitle,
  text,
}: TooltipProps) => {
  return (
    <div className="tooltip">
      {tooltipTitle}
      <span className="tooltipText">
        {text.map((item) => {
          return <p key={item}>{item}</p>;
        })}
      </span>
    </div>
  );
};

export default Tooltip;
