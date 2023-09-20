import React from 'react';
import StepIndicator from './StepIndicator';

interface StepWrapperProps {
  currentStep: number;
  numSteps?: number;
  title: string;
  subtitle: string;
  next: () => void;
  back: () => void;
  children: JSX.Element;
}

const StepWrapper: React.FC<StepWrapperProps> = ({
  currentStep,
  numSteps = 3,
  title,
  subtitle,
  next,
  back,
  children,
}) => {
  return (
    <div className="flex flex-col items-center rounded-lg bg-medium-grey shadow-lg pt-6 px-20 pb-11">
      <StepIndicator currentStep={currentStep} numSteps={numSteps} />
      <div className="my-8 flex flex-col items-center">
        <p className="text-2xl font-bold">{title}</p>
        <p className="text-sm font-medium">{subtitle}</p>
      </div>
      {children}
      <div className="flex justify-around mt-12" id="buttons">
        {currentStep > 0 && (
          <div
            className="flex justify-center rounded-lg bg-white border border-last-date-modified-grey cursor-pointer px-6 py-3"
            onClick={back}
          >
            <p className="text-xs">Back</p>
          </div>
        )}
        <div
          className="flex justify-center rounded-lg bg-red cursor-pointer px-6 py-3"
          onClick={next}
        >
          <p className="text-xs text-white">Next</p>
        </div>
      </div>
    </div>
  );
};

export default StepWrapper;
