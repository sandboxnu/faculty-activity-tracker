import React from 'react';
import StepIndicator from './StepIndicator';
import Button from '@/shared/components/Button';
import { useSelector } from 'react-redux';
import { selectFieldsIncomplete } from '@/store/accountSetup.store';

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
  const fieldsIncomplete = useSelector(selectFieldsIncomplete);

  return (
    <div className="flex flex-col w-full items-center rounded-lg bg-gray-100 shadow-lg pt-6 px-20 pb-11">
      <StepIndicator currentStep={currentStep} numSteps={numSteps} />
      <div className="my-8 flex flex-col items-center">
        <p className="text-2xl font-bold">{title}</p>
        <p className="text-sm font-medium">{subtitle}</p>
      </div>
      {children}
      <div className="flex justify-between mt-12 w-full" id="buttons">
        {currentStep > 0 && (
          <Button variant="secondary" onClick={back}>
            <p className="text-xs">Back</p>
          </Button>
        )}
        <Button
          addOnClass="only:mx-auto"
          onClick={next}
          disabled={fieldsIncomplete}
        >
          <p className="text-xs text-white font-bold">Next</p>
        </Button>
      </div>
    </div>
  );
};

export default StepWrapper;
