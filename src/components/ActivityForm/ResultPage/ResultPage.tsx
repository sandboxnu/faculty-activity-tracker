import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setStep } from '../../../store/form.store';
import successCheckmark from '../../../media/successCheckmark.svg';
import failureWarning from '../../../media/failureWarning.svg';
import './ResultPage.scss';

const ResultPage: React.FC<{success: boolean}> = ({success}) => {
    const dispatch = useDispatch();
    return (
        <div className='result-page-container'>
            <img src={success ? successCheckmark : failureWarning} alt="Icon" width={150} height={150}/>
            {
                success? 
                <>
                    <h1>Your activity was submitted!</h1>
                    <span>
                        If you'd like to view or edit previous submissions, navigate to <NavLink to='/submissions'>Submissions</NavLink>
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