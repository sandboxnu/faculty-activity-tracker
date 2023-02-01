import React from 'react';
import { useDispatch } from 'react-redux';
import { setStep } from '../../../store/form.store';
import styles from './ResultPage.module.scss';
import Link from 'next/link';
import Image from 'next/image';

const ResultPage: React.FC<{success: boolean}> = ({success}) => {
    const dispatch = useDispatch();
    return (
        <div className={styles.resultPageContainer}>
            <Image src={success ? "/media/successCheckmark.svg" : "/media/failureWarning.svg"} alt="Icon" width={150} height={150}/>
            {
                success? 
                <>
                    <h1>Your activity was submitted!</h1>
                    <span>
                        If you'd like to view or edit previous submissions, navigate to <Link href='/submissions'>Submissions</Link>
                    </span>
                </> : 
                <>
                    <h1>There was an error with your submission.</h1>
                    <p>Please try again.</p>
                    <button className='button button-red' onClick={() => dispatch(setStep('form'))}>Back</button>
                </>
            }
        </div>
    )

};

export default ResultPage;