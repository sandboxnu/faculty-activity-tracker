import Image from 'next/image';
import React from 'react';

interface InfoTooltipProps {
  text: string[];
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ text }) => {
  return (
    <div className="infoTooltip">
      <Image src="/media/infoIcon.svg" alt="i" width={16} height={16} />
      <span className="infoTooltipText">
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
