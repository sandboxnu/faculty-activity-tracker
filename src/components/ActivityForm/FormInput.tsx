import React, { ChangeEventHandler, FocusEventHandler, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCategory,
  selectDate,
  selectDescription,
  selectName,
  selectSemester,
  selectWeight,
  selectYear,
  setDate,
  setDescription,
  setName,
  setSemester,
  setStep,
  setWeight,
  setYear,
} from '../../store/form.store';
import { createDateFromString } from '../../shared/utils/date.utils';
import {
  ActivityCategory,
  ActivityWeight,
  CreateActivityDto,
  Semester,
} from '../../models/activity.model';
import Tooltip from '../../shared/components/Tooltip';
import { createActivity, ResponseStatus } from '@/client/activities.client';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

const categoryLabels: Record<ActivityCategory, string> = {
  TEACHING: 'Teaching',
  RESEARCH:
    'Creative Activity, Scholarship and Research/Professional Development',
  SERVICE: 'Service',
};

const FormInput: React.FC = () => {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const category: ActivityCategory | null = useSelector(selectCategory);
  const name: string | null = useSelector(selectName);
  const weight: ActivityWeight | null = useSelector(selectWeight);
  const semester: Semester | null = useSelector(selectSemester);
  const year: number | null = useSelector(selectYear);
  const date: string = useSelector(selectDate);
  const description: string = useSelector(selectDescription);
  const [specifyDate, setSpecifyDate] = useState(false);

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

  const handleDescriptionChange: ChangeEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    const newDescription: string = event.target.value;
    dispatch(setDescription(newDescription));
  };

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newName: string = event.target.value;
    dispatch(setName(newName));
  };

  const handleSemesterChange: ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
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
    event.target.type = 'date';
  };

  const changeToText: FocusEventHandler<HTMLInputElement> = (event) => {
    if (!event.target.value) {
      event.target.type = 'text';
    }
  };

  const submitActivity = () => {
    if (
      !description ||
      !category ||
      !weight ||
      !name ||
      !semester ||
      !year ||
      (specifyDate && !date)
    )
      return;
    const dateObject = createDateFromString(date);
    if (specifyDate && !dateObject) return;

    const newActivityDto: CreateActivityDto = {
      userId: userId || 1,
      semester: [semester],
      year: year,
      //date : dateObject ? dateObject.getTime() : undefined,
      dateModified: BigInt(new Date().getTime()),
      name: name,
      description: description,
      category: category,
      significance: weight,
      isFavorite: true,
    };
    console.log(newActivityDto);
    dispatch(setStep('loading'));
    createActivity(newActivityDto).then((res) => {
      dispatch(setStep(res === ResponseStatus.Success ? 'success' : 'error'));
    });
  };

  if (category === null) return <div>Category must be selected</div>;

  // TODO: reduce redundancy of multiple inputs
  const label = 'text-2xl font-bold';
  const inputBox = 'border border-black rounded-lg px-3 py-2 outline-none';
  const inputContainer = 'flex flex-col my-2 space-y-3';
  const inputWrapper = 'flex items-center';
  const inputStatus = 'flex items-center py-3';

  return (
    <div className="flex flex-col">
      <p className="text-3xl mb-3">{categoryLabels[category]}</p>
      <div className={inputContainer}>
        <p className={label}>Name: </p>
        <div className={inputWrapper}>
          <input
            type={'text'}
            placeholder="Enter Activity Name"
            onChange={handleNameChange}
            value={name || ''}
            className={inputBox}
          ></input>
          <div className={inputStatus}>
            <Image
              src={
                name
                  ? '/media/successCheckmark.svg'
                  : '/media/failureWarning.svg'
              }
              alt="Icon"
              width={16}
              height={16}
              className="mx-2"
            />
            {!name && (
              <p className="text-ruby inline">Enter an activity name.</p>
            )}
          </div>
        </div>
      </div>
      <div className={inputContainer}>
        <p className={label}>Weight: </p>
        <div className="flex items-center space-x-2">
          <Image
            src="/media/infoIcon.svg"
            alt="Little information icon"
            width={22}
            height={22}
          />
          <Tooltip
            tooltipTitle="Weight Examples"
            text={[
              'Major: New courses, significantly redesigned courses, large courses (more than 25 students), running a dialogue',
              'Significant: Workshops, fieldtrips, collaborations, client projects, etc.',
              'Minor: Directed study, guest critic, guest lecture, letter of recommendation, mentoring',
            ]}
          />
        </div>
        <div className={inputWrapper}>
          <select
            value={weight || ''}
            onChange={handleWeightChange}
            className={inputBox}
          >
            <option value="">Select Weight</option>
            <option value="MAJOR">Major</option>
            <option value="SIGNIFICANT">Significant</option>
            <option value="MINOR">Minor</option>
          </select>
          <div className={inputStatus}>
            <Image
              src={
                weight
                  ? '/media/successCheckmark.svg'
                  : '/media/failureWarning.svg'
              }
              alt="Icon"
              width={16}
              height={16}
              className="mx-2"
            />
            {!weight && <p className="text-ruby inline">Select a weight.</p>}
          </div>
        </div>
      </div>
      <div className={inputContainer}>
        <p className={label}>Year: </p>
        <div className={inputWrapper}>
          <input
            type={'text'}
            placeholder="Enter Year"
            onChange={handleYearChange}
            value={year || ''}
            className={inputBox}
          ></input>
          <div className={inputStatus}>
            <Image
              src={
                year
                  ? '/media/successCheckmark.svg'
                  : '/media/failureWarning.svg'
              }
              alt="Icon"
              width={16}
              height={16}
              className="mx-2"
            />
            {!year && <p className="text-ruby inline">Enter an year.</p>}
          </div>
        </div>
      </div>
      <div className="flex space-x-6">
        <div className={inputContainer}>
          <p className={label}>Semester: </p>
          <select
            value={semester || ''}
            onChange={handleSemesterChange}
            className={inputBox}
          >
            <option value="">Select Semester</option>
            {['Fall', 'Spring', 'Summer', 'Other'].map((sem) => (
              <option value={sem.toUpperCase()} key={sem}>
                {sem}
              </option>
            ))}
          </select>
        </div>
        <div className={inputStatus + ' mt-auto mb-2'}>
          <Image
            src={
              semester && year
                ? '/media/successCheckmark.svg'
                : '/media/failureWarning.svg'
            }
            alt="Icon"
            width={16}
            height={16}
            className="mx-2"
          />
          {(!semester || !year) && (
            <p className="text-ruby inline">Enter a semester and year.</p>
          )}
        </div>
      </div>
      {specifyDate && (
        <div className={inputContainer}>
          <p className={label}>Date: </p>
          <input
            className="date-input"
            type="text"
            placeholder="Enter Date"
            value={date}
            onChange={handleDateChange}
            onFocus={changeToDate}
            onBlur={changeToText}
          />
        </div>
      )}
      <div className={inputContainer}>
        <div className={inputWrapper}>
          <p className={label}>Description: </p>
          <div className={inputStatus + ' ml-auto'}>
            <Image
              src={
                description
                  ? '/media/successCheckmark.svg'
                  : '/media/failureWarning.svg'
              }
              alt="Icon"
              width={16}
              height={16}
              className="mx-2"
            />
            {!description && (
              <p className="text-ruby inline">Enter a description.</p>
            )}
          </div>
        </div>
        <textarea
          placeholder="Enter Description"
          value={description || ''}
          onChange={handleDescriptionChange}
          rows={3}
          className={inputBox}
        />
      </div>

      <div className="flex justify-between items-center cursor-pointer my-9">
        <button onClick={() => dispatch(setStep('selection'))}>Back</button>
        <button
          className="bg-ruby border-ruby-dark text-white disabled:bg-ruby-disabled"
          disabled={weight === null || date === null || description === ''}
          onClick={submitActivity}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FormInput;
