import React from 'react';
import { useSelector } from 'react-redux';
import { FormStep, selectStep } from '../../store/form.store';
import FormInstructions from './FormInstructions';

const FormContainer: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const step: FormStep = useSelector(selectStep);
  const stepOne = step === 'selection';
  return (
    <div className="flex h-full">
      <div className="w-3/5 px-8 pb-20">
        <div className="w-full mt-6">
          <div className="bg-neutral-300 w-full h-3 rounded">
            <div
              className={`bg-ruby h-full rounded ${
                stepOne ? 'w-1/2' : 'w-full'
              }`}
            />
          </div>
          <p className="mt-3 text-right">Page {stepOne ? '1' : '2'}/2</p>
        </div>
        {children}
      </div>
      <div className="w-2/5 p-16 pt-0">
        <FormInstructions showWeightGuidelines={step === 'form'} />
      </div>
    </div>
  );
};

export default FormContainer;
