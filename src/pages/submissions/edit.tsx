import FormContainer from '@/components/ActivityForm/FormContainer';
import FormInput from '@/components/ActivityForm/FormInput';
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
      <FormContainer>
        <FormInput editing={true} />
      </FormContainer>
    </>
  );
};

export default EditActivityForm;
