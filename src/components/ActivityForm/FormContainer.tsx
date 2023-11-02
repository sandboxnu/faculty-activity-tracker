import React from 'react';
import { useSelector } from 'react-redux';
import { FormStep, selectStep } from '../../store/form.store';
import FormInstructions from './FormInstructions';

const FormContainer: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const step: FormStep = useSelector(selectStep);
  return (
    <div className="flex h-full w-full">
      <div className="w-full pb-20">{children}</div>
    </div>
  );
};

export default FormContainer;
