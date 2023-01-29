import React from "react";
import './Tooltip.scss';

interface TooltipProps {
    tooltipTitle: string;
    text: string[];
  }

const Tooltip: React.FC<TooltipProps> = ({tooltipTitle, text}: TooltipProps) => {
    return (
        <div className="tooltip">{tooltipTitle}
            <span className="tooltip-text">
                {text.map((item) => {return (<p key={item}>{item}</p>)})}
            </span>
        </div>
    );
};

export default Tooltip;
