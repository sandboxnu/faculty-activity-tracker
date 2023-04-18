import React from 'react';

interface PercentageInfoProps {
  editing: boolean;
  teaching: number;
  research: number;
  service: number;
  setPercent: (type: string, percent: number) => void;
}

const PercentageInfo: React.FC<PercentageInfoProps> = ({
  editing,
  teaching,
  research,
  service,
  setPercent,
}) => {
  const labels: Record<string, number> = {
    Teaching: teaching,
    Creative: research,
    Service: service,
  };

  return (
    <div className="flex items-center space-x-6">
      {Object.entries(labels).map(([field, percent]) => (
        <div className="flex flex-col" key={`percentage-${field}`}>
          <p className="mb-2">{field}</p>
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
                className="px-4 py-1.5 border-[0.5px] border-g rounded-xl mr-2"
              />
            ) : (
              <p className="px-4 py-1.5 border-[0.5px] border-g rounded-xl mr-2">
                {percent * 100}
              </p>
            )}
            <p>%</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PercentageInfo;
