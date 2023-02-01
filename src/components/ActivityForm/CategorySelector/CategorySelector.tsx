import React, { ChangeEventHandler } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityCategory } from '../../../models/activity.model';
import { selectCategory, setCategory, setStep } from '../../../store/form.store';
import styles from './CategorySelector.module.scss'

const CategorySelector: React.FC = () => {
    const category: ActivityCategory | null = useSelector(selectCategory);
    const dispatch = useDispatch();

    const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
        const newCategory: ActivityCategory = event.target.value as ActivityCategory;
        if (newCategory) {
            dispatch(setCategory(newCategory));
        }
    };

    const submit = () => {
        if (category) {
            dispatch(setStep('form'));
        }
    }

    return (
    <div className={styles.categoryContainer}>
        <h1>Category</h1>
        <ol>
            <li>Teaching: Educational activities that benefit NU students.</li>
            <li>Creative Activity, Scholarship and Research/Professional Development.</li>
            <li>Service: Activities outside of NU community.</li>
        </ol>
        <label>
            <div>
                <select value={category || ""} onChange={handleChange}>
                    <option value="">Select a Category</option>
                    <option value="TEACHING">Teaching</option>
                    <option value="RESEARCH">Creative Activity, Scholarship and Research/Professional Development</option>
                    <option value="SERVICE">Service</option>
                </select>
            </div>
        </label>
        <button className="button button-red bottom-right" onClick={submit} disabled={category === null}>Next</button>
    </div>
    );
};

export default CategorySelector;
