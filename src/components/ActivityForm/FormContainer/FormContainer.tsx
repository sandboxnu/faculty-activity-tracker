import React from 'react';
import { useSelector } from 'react-redux';
import { FormStep, selectStep } from '../../../store/form.store';
import FormInstructions from '../FormInstructions/FormInstructions';
import styles from './FormContainer.module.scss';

const FormContainer: React.FC<{children: JSX.Element}> = ({children}) => {
    const step: FormStep = useSelector(selectStep);
    const stepOne = step === "selection";
    return (
        <div className={styles.formContainer}>
            <div className={styles.leftColumn}>
                <div className={styles.progressBarContainer}>
                    <div className={styles.progressBar}>
                        <div className={styles.progressSection + ` ${stepOne ? styles.progressSectionHalf : styles.progressSectionFull}`} />
                    </div>
                    <p>Page {stepOne ? '1' : '2'}/2</p>
                </div>
                {children}
            </div>
            <div className={styles.rightColumn}>
                <FormInstructions showWeightGuidelines={step === "form"} />
            </div>
        </div>
    );
}

export default FormContainer;
