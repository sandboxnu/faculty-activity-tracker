import CategorySelector from '@/components/ActivityForm/CategorySelector';
import FormContainer from '@/components/ActivityForm/FormContainer';
import FormInput from '@/components/ActivityForm/FormInput';
import ResultPage from '@/components/ActivityForm/ResultPage';
import { FormStep, selectStep } from '@/store/form.store';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
//import './ActivityForm.css';

const StepComponent: Record<FormStep, JSX.Element> = {
    'selection': <FormContainer><CategorySelector/></FormContainer>, // TODO: Look into children
    'form': <FormContainer><FormInput/></FormContainer>,
    'success': <ResultPage success={true}/>,
    'loading': <div></div>,
    'error': <ResultPage success={false}/>
}

const NewActivityForm: React.FC = () => {
    const step: FormStep = useSelector(selectStep);

    useEffect(() => {
        window.onbeforeunload = () => {
            return 'Data will be lost if you leave the page, are you sure?';
        };
    }, []);
    
    return StepComponent[step];
};

export default NewActivityForm;
