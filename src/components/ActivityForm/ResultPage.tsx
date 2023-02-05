import React from 'react';
import { useDispatch } from 'react-redux';
import { setStep } from '../../store/form.store';
import Link from 'next/link';
import Image from 'next/image';

const ResultPage: React.FC<{ success: boolean }> = ({ success }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col items-center mt-[20vh]">
      <Image
        src={
          success ? '/media/successCheckmark.svg' : '/media/failureWarning.svg'
        }
        alt="Icon"
        width={150}
        height={150}
      />
      {success ? (
        <>
          <h1>Your activity was submitted!</h1>
          <span>
            If you'd like to view or edit previous submissions, navigate to{' '}
            <Link href="/submissions" className="text-ruby">
              Submissions
            </Link>
          </span>
        </>
      ) : (
        <>
          <h1>There was an error with your submission.</h1>
          <p>Please try again.</p>
          <button
            className="button button-red"
            onClick={() => dispatch(setStep('form'))}
          >
            Back
          </button>
        </>
      )}
    </div>
  );
};

export default ResultPage;
