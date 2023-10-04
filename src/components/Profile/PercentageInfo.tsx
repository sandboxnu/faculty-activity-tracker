import clsx from 'clsx';
import React from 'react';

interface PercentageInfoProps {
  editing: boolean;
  teaching: number;
  research: number;
  service: number;
  setPercent: (type: string, percent: number) => void;
  fillContainer?: boolean;
}

const PercentageInfo: React.FC<PercentageInfoProps> = ({
  editing,
  teaching,
  research,
  service,
  setPercent,
  fillContainer = false,
}) => {
  const labels: Record<string, number> = {
    Teaching: teaching,
    Creative: research,
    Service: service,
  };

  return (
    <div className={clsx([
      "flex items-center",
      fillContainer ? "w-full justify-between" : "space-x-6"
    ])}>
      {Object.entries(labels).map(([field, percent]) => (
        <div className="flex flex-col" key={`percentage-${field}`}>
          <div className="flex items-center">
            {editing ? (
              <input
                type="number"
                min={0}
                max={100}
                step={1}
                value={percent * 100}
                onChange={(e) =>
                  setPercent(
                    field.toLowerCase(),
                    parseFloat(e.target.value) / 100,
                  )
                }
                className="w-12 py-2 border-[0.5px] border-gray-500 rounded-xl mr-1 text-center hide-steppers"
              />
            ) : (
              <p className="w-12 py-2 border-[0.5px] border-gray-500 rounded-xl mr-1 text-center">
                {percent * 100}
              </p>
            )}
            <p>%</p>
          </div>
          <p className="my-2">{field}</p>
        </div>
      ))}
    </div>
  );
};

export default PercentageInfo;
