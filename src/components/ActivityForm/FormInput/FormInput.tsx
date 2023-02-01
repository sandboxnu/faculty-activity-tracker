import React, { ChangeEventHandler, FocusEventHandler, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCategory, selectDate, selectDescription, selectName, selectSemester, selectWeight, selectYear, setDate, setDescription, setName, setSemester, setStep, setWeight, setYear } from "../../../store/form.store";
import { createDateFromString } from "../../../shared/utils/date.utils";
import { ActivityCategory, ActivityWeight, CreateActivityDto, Semester } from "../../../models/activity.model";
import Tooltip from "../../../shared/components/Tooltip/Tooltip";
import { createActivity, ResponseStatus } from "@/client/activities.client";
import styles from './FormInput.module.scss';
import Image from "next/image";

const categoryLabels: Record<ActivityCategory, string> = {
    TEACHING: "Teaching",
    RESEARCH: "Creative Activity, Scholarship and Research/Professional Development",
    SERVICE: "Service",
};

const FormInput: React.FC = () => {
    const category: ActivityCategory | null = useSelector(selectCategory);
    const name: string | null = useSelector(selectName);
    const weight: ActivityWeight | null = useSelector(selectWeight);
    const semester: Semester | null = useSelector(selectSemester);
    const year: number | null = useSelector(selectYear);
    const date: string = useSelector(selectDate);
    const description: string = useSelector(selectDescription);
    const [ specifyDate, setSpecifyDate ] = useState(false);

    const dispatch = useDispatch();

    const handleWeightChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
        const newWeight: ActivityWeight = event.target.value as ActivityWeight;
        if (newWeight) {
            dispatch(setWeight(newWeight));
        }
    };

    const handleDateChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const newDate: string = event.target.value;
        dispatch(setDate(newDate));
    };

    const handleDescriptionChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        const newDescription: string = event.target.value;
        dispatch(setDescription(newDescription));
    };

    const handleNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const newName: string = event.target.value;
        dispatch(setName(newName));
    };
    
    const handleSemesterChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
        const newSemester: Semester = event.target.value as Semester;
        if (newSemester) {
            dispatch(setSemester(newSemester));
        }
    };
    
    const handleYearChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        // delete entire input => reset year
        if (event.target.value === '') {
            dispatch(setYear(null));
        } else {
            const newYear: number = parseInt(event.target.value);
            if (!isNaN(newYear)) {
                dispatch(setYear(newYear));
            }
        }
    };

    const changeToDate: FocusEventHandler<HTMLInputElement> = (event) => {
        event.target.type="date";
    };

    const changeToText: FocusEventHandler<HTMLInputElement>  = (event) => {
        if(!event.target.value) {
            event.target.type="text"
        }
    };

    const submitActivity = () => {
        if (!description || !category || !weight || !name || !semester || !year || (specifyDate && !date)) return;
        const dateObject = createDateFromString(date);
        if (specifyDate && !dateObject) return;

        const newActivityDto: CreateActivityDto = {
            userId : 10,
            semester : semester,
            year : year,
            //date : dateObject ? dateObject.getTime() : undefined,
            dateModified: new Date().toJSON(),
            name : name,
            description : description,
            category : category,
            significance : weight,
            isFavorite : true
        };
        dispatch(setStep('loading'));
        createActivity(newActivityDto).then((res) => {
            dispatch(setStep(res === ResponseStatus.Success ? 'success' : 'error'));
        });
    };

    if (category === null) return (<div>Category must be selected</div>);
    return (
        <div className={styles.formInputContainer}>
            <h1>{categoryLabels[category]}</h1>
            <div className={styles.inputContainer}>
                <label>Name:</label>
                <div className={styles.inputWrapper}>
                    <input type={"text"} placeholder="Enter Activity Name" onChange={handleNameChange} value={name || ''}></input>
                    <div className="input-status">
                        <Image src={name ? "/media/successCheckmark.svg" : "/media/failureWarning.svg"} alt="Icon" width={16} height={16}/>
                        { !name && <p className="text-ruby inline">Enter an activity name.</p> }
                    </div>
                </div>
            </div>
            <div className={styles.inputContainer}>
                <label>Weight:</label>
                <div className={styles.tooltipContainer}>
                    <Image src="/media/infoIcon.svg" alt="Little information icon" width={22} height={22}/>
                    <Tooltip tooltipTitle="Weight Examples" text={[
                        'Major: New courses, significantly redesigned courses, large courses (more than 25 students), running a dialogue',
                        'Significant: Workshops, fieldtrips, collaborations, client projects, etc.',
                        'Minor: Directed study, guest critic, guest lecture, letter of recommendation, mentoring'
                    ]}/>
                </div>
                <div className={styles.inputWrapper}>
                    <select value={weight || ""} onChange={handleWeightChange}>
                        <option value="">Select Weight</option>
                        <option value="MAJOR">Major</option>
                        <option value="SIGNIFICANT">Significant</option>
                        <option value="MINOR">Minor</option>
                    </select>
                    <div className="input-status">
                        <Image src={weight ? "/media/successCheckmark.svg" : "/media/failureWarning.svg"} alt="Icon" width={16} height={16}/>
                        { !weight && <p className="text-ruby inline">Select a weight.</p> }
                    </div>
                </div>
            </div>
            <div className={styles.yearSemesterContainer}>
                <div className={styles.inputContainer}>
                    <label>Semester:</label>
                    <select value={semester || ""} onChange={handleSemesterChange}>
                        <option value="">Select Semester</option>
                        {["Fall", "Spring", "Summer 1", "Summer 2"].map(sem => (
                            <option value={sem.toUpperCase()} key={sem}>{sem}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.inputContainer}>
                    <label>Year:</label>
                    <input type={"text"} placeholder="Enter Year" onChange={handleYearChange} value={year || ''}></input>
                </div>
                <div className="input-status mt-auto">
                    <Image src={(semester && year) ? "/media/successCheckmark.svg" : "/media/failureWarning.svg"} alt="Icon" width={16} height={16}/>
                    { (!semester || !year) && <p className="text-ruby inline">Enter a semester and year.</p> }
                </div>
            </div>
            {
                specifyDate &&
                <div className={styles.inputContainer}>
                    <label>Date:</label>
                    <input className="date-input"
                        type='text'
                        placeholder="Enter Date" 
                        value={date} 
                        onChange={handleDateChange} 
                        onFocus={changeToDate}
                        onBlur={changeToText}
                    />
                </div>

            }
            <div className={styles.inputContainer}>
                <div className={styles.inputWrapper}>
                    <label>Description:</label>
                    <div className="input-status ml-auto">
                        <Image src={description ? "/media/successCheckmark.svg" : "/media/failureWarning.svg"} alt="Icon" width={16} height={16}/>
                        { !description && <p className="text-ruby inline">Enter a description.</p> }
                    </div>
                </div>
                <textarea
                    placeholder="Enter Description" 
                    value={description || ''} 
                    onChange={handleDescriptionChange}
                    rows={3} />
            </div>
            
            <div className={styles.buttonContainer}>
                <button onClick={() => dispatch(setStep('selection'))}>Back</button>
                <button className="button-red" disabled={weight === null || date === null || description === ''} onClick={submitActivity}>Submit</button> 
            </div>
        </div>
    );
};

export default FormInput;
