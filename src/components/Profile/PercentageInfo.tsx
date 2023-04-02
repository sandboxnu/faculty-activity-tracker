import React from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectResearchPercent,
  selectServicePercent,
  selectTeachingPercent,
  setPercent,
} from '@/store/profile.store';

interface PercentageInfoProps {
  editing: boolean;
  teaching: number;
  research: number;
  service: number;
}

const PercentageInfo: React.FC<PercentageInfoProps> = ({
  editing,
  teaching,
  research,
  service,
}) => {
  const teachingInput = useSelector(selectTeachingPercent);
  const researchInput = useSelector(selectResearchPercent);
  const serviceInput = useSelector(selectServicePercent);
  const isBalanced = teachingInput + researchInput + serviceInput === 1;
  const dispatch = useDispatch();

  const labels: Record<string, number> = {
    Teaching: editing ? teachingInput : teaching,
    Creative: editing ? researchInput : research,
    Service: editing ? serviceInput : service,
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
                  dispatch(
                    setPercent({
                      type: field.toLowerCase(),
                      percent: parseFloat(e.target.value) / 100,
                    }),
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
      {editing && (
        <div className="flex items-center pb-2.5 self-end">
          <Image
            src={`/media/${
              isBalanced ? 'successCheckmark' : 'failureWarning'
            }.svg`}
            alt="Icon"
            width={16}
            height={16}
            className="mx-2"
          />
          {!isBalanced && (
            <p className="text-ruby inline">Percentages must sum to 100.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PercentageInfo;
