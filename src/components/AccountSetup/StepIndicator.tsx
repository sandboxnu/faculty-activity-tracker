import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  numSteps: number;
}

type CompletionState = 'complete' | 'in progress' | 'incomplete';

const completionState = (idx: number, currStep: number): CompletionState =>
  idx < currStep ? 'complete' : idx === currStep ? 'in progress' : 'incomplete';

const textCompletionClass: Record<CompletionState, string> = {
  complete: `text-red-500/50`,
  'in progress': `text-red-500`,
  incomplete: `text-black/40`,
};

const bgCompletionClass: Record<CompletionState, string> = {
  complete: 'bg-red-500/50',
  'in progress': 'bg-red-500',
  incomplete: 'bg-[#C6C6C6]',
};

const widthCompletionClass: Record<CompletionState, string> = {
  complete: 'w-10',
  'in progress': 'w-[65px]',
  incomplete: 'w-10',
};

const StepBar: React.FC<{ state: CompletionState }> = ({ state }) => (
  <div
    className={`flex flex-grow ${widthCompletionClass[state]} h-1.5 rounded-full ${bgCompletionClass[state]}`}
  />
);

const StepLabel: React.FC<{ step: number; state: CompletionState }> = ({
  step,
  state,
}) => (
  <p className={`text-sm font-semibold ${textCompletionClass[state]}`}>
    {step}
  </p>
);

const idempotentArray = (length: number): number[] =>
  Array.apply(null, Array(length)).map((_, idx) => idx + 1);

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  numSteps,
}) => {
  return (
    <div className="flex items-center space-x-7">
      {idempotentArray(numSteps).map((idx) => (
        <div className="flex flex-col items-center space-y-1.5" key={idx}>
          <StepLabel step={idx} state={completionState(idx, currentStep)} />
          <StepBar state={completionState(idx, currentStep)} />
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
