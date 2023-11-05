import Image from 'next/image';
import React from 'react';
import { toTitleCase } from '../utils/misc.util';

export type TooltipPosition = 'bottom' | 'right';

interface InfoTooltipProps {
  text: string[];
  tooltipPosition?: TooltipPosition;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({
  text,
  tooltipPosition = 'bottom',
}) => {
  return (
    <div className={`infoTooltip infoTooltip${toTitleCase(tooltipPosition)}`}>
      <Image src="/media/infoIcon.svg" alt="i" width={16} height={16} />
      <span className="infoTooltipText space-y-2">
        {text.map((item) => {
          return (
            <p key={item} className="text-tooltip">
              {item}
            </p>
          );
        })}
      </span>
    </div>
  );
};

export default InfoTooltip;
