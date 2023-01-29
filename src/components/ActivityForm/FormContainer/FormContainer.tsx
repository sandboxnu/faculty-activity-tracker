import React from 'react';
import { useSelector } from 'react-redux';
import { FormStep, selectStep } from '../../../store/form.store';
import FormInstructions from '../FormInstructions/FormInstructions';
import './FormContainer.scss';

const FormContainer: React.FC<{children: JSX.Element}> = ({children}) => {
    const step: FormStep = useSelector(selectStep);
    const stepOne = step === "selection";
    return (
        <div className='form-container'>
            <div className='left-column'>
                <div className="progress-bar-container">
                    <div className='progress-bar'>
                        <div className={`progress-section progress-section-${stepOne ? 'half' : 'full'}`} />
                    </div>
                    <p>Page {stepOne ? '1' : '2'}/2</p>
                </div>
                {children}
            </div>
            <div className='right-column'>
                <FormInstructions showWeightGuidelines={step === "form"} />
            </div>
        </div>
    );
}

export default FormContainer;
