import CategorySelector from '@/components/ActivityForm/CategorySelector';
import FormContainer from '@/components/ActivityForm/FormContainer';
import FormInput from '@/components/ActivityForm/FormInput';
import ResultPage from '@/components/ActivityForm/ResultPage';
import AppLayout from '@/shared/components/AppLayout';
import { FormStep, selectStep } from '@/store/form.store';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
//import './ActivityForm.css';

const StepComponent: Record<FormStep, JSX.Element> = {
  selection: (
    <FormContainer>
      <CategorySelector />
    </FormContainer>
  ), // TODO: Look into children
  form: (
    <FormContainer>
      <FormInput editing={false} />
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
      <AppLayout>{StepComponent[step]}</AppLayout>
    </>
  );
};

export default NewActivityForm;
