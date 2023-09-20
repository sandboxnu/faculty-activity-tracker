import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  numSteps: number;
}

const idempotentArray = (length: number): number[] =>
  Array.apply(null, Array(length)).map((_, idx) => idx);

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  numSteps,
}) => {
  return (
    <div className="flex items-center space-x-7">
      {idempotentArray(numSteps).map((idx) => (
        <div className="flex flex-col items-center space-y-1.5 px-4" key={idx}>
          <p
            className={`text-sm text-semibold ${
              idx < currentStep
                ? 'text-red/50'
                : idx === currentStep
                ? 'text-red'
                : 'text-black/40'
            }`}
          >
            {idx + 1}
          </p>
          <div
            className={`flex flex-grow w-11 h-1.5 rounded-full ${
              idx < currentStep
                ? 'bg-red/50'
                : idx === currentStep
                ? 'bg-red'
                : 'bg-black/40'
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
