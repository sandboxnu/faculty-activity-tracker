import React from 'react';

const StaticScoreBubble: React.FC<{
  category: string;
  score: number;
}> = ({ category, score }) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <p className="text-body-bold">{category}</p>
      <div className="flex h-[44px] w-[44px] w-full items-center justify-center rounded-lg bg-gray-200 shadow-inner shadow-gray-300">
        <div className="flex text-heading-1">{score}</div>
      </div>
    </div>
  );
};

export default StaticScoreBubble;
