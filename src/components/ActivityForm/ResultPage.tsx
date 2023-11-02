import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory, setStep } from '../../store/form.store';
import Link from 'next/link';
import Image from 'next/image';
import { ActivityCategory } from '@/models/activity.model';
import Button from '@/shared/components/Button';

const ResultPage: React.FC<{ success: boolean }> = ({ success }) => {
  const category: ActivityCategory | null = useSelector(selectCategory);
  const dispatch = useDispatch();

  return (
    <div className="mt-[20vh] flex w-full flex-col items-center">
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
            If you&apos;d like to view or edit previous submissions, navigate to{' '}
            <Link
              href={`/submissions/${category?.toLowerCase()}`}
              className="text-red-500"
            >
              Submissions
            </Link>
          </span>
        </>
      ) : (
        <>
          <h1>There was an error with your submission.</h1>
          <p>Please try again.</p>
          <Button onClick={() => dispatch(setStep('form'))}>Back</Button>
        </>
      )}
    </div>
  );
};

export default ResultPage;
