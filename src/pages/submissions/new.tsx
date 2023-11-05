import CategorySelector from '@/components/ActivityForm/CategorySelector';
import FormContainer from '@/components/ActivityForm/FormContainer';
import FormInput from '@/components/ActivityForm/FormInput';
import ResultPage from '@/components/ActivityForm/ResultPage';
import { FormStep, selectStep } from '@/store/form.store';
import Head from 'next/head';
import React from 'react';
import { useSelector } from 'react-redux';

const StepComponent: Record<FormStep, JSX.Element> = {
  selection: (
    <FormContainer>
      <CategorySelector />
    </FormContainer>
  ),
  form: (
    <FormContainer>
      <FormInput isEditing={false} />
    </FormContainer>
  ),
  success: <ResultPage success={true} />,
  loading: <div></div>,
  error: <ResultPage success={false} />,
};

const NewActivityForm: React.FC = () => {
  const step: FormStep = useSelector(selectStep);

  return (
    <>
      <Head>
        <title>New Submission</title>
      </Head>
      {StepComponent[step]}
    </>
  );
};

export default NewActivityForm;
