import FormContainer from '@/components/ActivityForm/FormContainer';
import FormInput from '@/components/ActivityForm/FormInput';
import AppLayout from '@/shared/components/AppLayout';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
//import './ActivityForm.css';

const EditActivityForm: React.FunctionComponent = (props) => {
  useEffect(() => {
    window.onbeforeunload = () => {
      return 'Data will be lost if you leave the page, are you sure?';
    };
  }, []);

  return (
    <>
      <Head>
        <title>Edit Submission</title>
      </Head>
      <AppLayout>
        <FormContainer>
          <FormInput editing={true} />
        </FormContainer>
      </AppLayout>
    </>
  );
};

export default EditActivityForm;
