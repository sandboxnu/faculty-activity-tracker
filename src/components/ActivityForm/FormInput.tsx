import React, {
  ChangeEventHandler,
  FocusEventHandler,
  useEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectActivityId,
  selectCategory,
  selectDate,
  selectDescription,
  selectName,
  selectOtherDescription,
  selectSemester,
  selectWeight,
  selectYear,
  setDate,
  setDescription,
  setName,
  setOtherDescription,
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
import { Checkbox } from '../Checkbox';
import { useRouter } from 'next/router';

const categoryLabels: Record<ActivityCategory, string> = {
  TEACHING: 'Teaching',
  RESEARCH:
    'Creative Activity, Scholarship and Research/Professional Development',
  SERVICE: 'Service',
};

interface FormInputProps {
  editing: boolean;
}

const FormInput: React.FC<FormInputProps> = (props: FormInputProps) => {
  const { data: session } = useSession();
  const router = useRouter();

  const userId = session?.user.id;
  const activityId: number | null = useSelector(selectActivityId);
  const category: ActivityCategory | null = useSelector(selectCategory);
  const name: string | null = useSelector(selectName);
  const weight: ActivityWeight | null = useSelector(selectWeight);
  const semester: Semester[] | null = useSelector(selectSemester);
  const year: number | null = useSelector(selectYear);
  const date: string = useSelector(selectDate);
  const description: string = useSelector(selectDescription);
  const otherDescription: string | null = useSelector(selectOtherDescription);

  const [specifyDate, setSpecifyDate] = useState(false);
  const [checkFall, setCheckFall] = useState(false);
  const [checkSpring, setCheckSpring] = useState(false);
  const [checkSummer, setCheckSummer] = useState(false);
  const [checkOther, setCheckOther] = useState(false);
  const [isEditing, setEditingState] = useState(props.editing);

  const dispatch = useDispatch();

  const populateInitialSemesters: VoidFunction = () => {
    if (!semester) return;
    semester.forEach((sem: Semester) => {
      switch (sem) {
        case 'FALL':
          setCheckFall(true);
          break;
        case 'SPRING':
          setCheckSpring(true);
          break;
        case 'SUMMER':
          setCheckSummer(true);
          break;
        case 'OTHER':
          setCheckOther(true);
          break;
        default:
          break;
      }
    });
  };

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

  const handleAddSemester: ChangeEventHandler<Element> = (event) => {
    const newSemester: Semester = event.target.parentElement?.textContent
      ?.trim()
      .toLocaleUpperCase() as Semester;
    if (semester) {
      const added_semester = [...semester, newSemester];
      dispatch(setSemester(added_semester));
    } else {
      dispatch(setSemester([newSemester]));
    }
    console.log('added' + semester);
  };

  const handleRemoveSemester: ChangeEventHandler<Element> = (event) => {
    const newSemester: Semester = event.target.parentElement?.textContent
      ?.trim()
      .toLocaleUpperCase() as Semester;

    if (semester) {
      const removed_semester = semester.filter((item) => item !== newSemester);
      dispatch(setSemester(removed_semester));
    }
    console.log('removed' + semester);
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

  const handleOtherDescriptionChange: ChangeEventHandler<
    HTMLTextAreaElement
  > = (event) => {
    const newOtherDescription: string = event.target.value;
    dispatch(setOtherDescription(newOtherDescription));
  };

  const displayOtherDescription = () => {
    return (
      <div className={inputContainer}>
        <div className={inputWrapper}>
          <p className={'text-slate-600'}>
            If you checked Other, please explain in the below.
          </p>
          <div className={inputStatus + ' ml-auto'}></div>
        </div>
        <textarea
          value={otherDescription || ''}
          onChange={handleOtherDescriptionChange}
          rows={3}
          className={inputBox}
        />
      </div>
    );
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
      (!checkFall && !checkOther && !checkSpring && !checkSummer) ||
      (checkOther && !otherDescription) ||
      (specifyDate && !date)
    )
      return;
    const dateObject = createDateFromString(date);
    if (specifyDate && !dateObject) return;

    const newActivityDto: CreateActivityDto = {
      userId: userId || 1,
      semester: semester,
      year: year,
      //date : dateObject ? dateObject.getTime() : undefined,
      dateModified: BigInt(new Date().getTime()),
      name: name,
      description: description,
      category: category,
      significance: weight,
      isFavorite: false,
      semesterOtherDescription: otherDescription,
    };
    console.log(newActivityDto);
    dispatch(setStep('loading'));
    createActivity(newActivityDto).then((res) => {
      dispatch(setStep(res === ResponseStatus.Success ? 'success' : 'error'));
    });
  };

  if (category === null) return <div>Category must be selected</div>;

  // TODO: reduce redundancy of multiple inputs
  const label = 'text-base font-bold';
  const inputBox = 'border border-black rounded-lg px-3 py-2 outline-none';
  const inputContainer = 'flex flex-col my-2 space-y-1';
  const inputWrapper = 'flex items-center';
  const inputStatus = 'flex items-center py-3';

  useEffect(() => {
    populateInitialSemesters();
  }, []);

  return (
    <div className="flex flex-col">
      {isEditing ? (
        <h2>Edit Activity - {categoryLabels[category]}</h2>
      ) : (
        <h2>New Activity - {categoryLabels[category]}</h2>
      )}
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
            {!year && <p className="text-ruby inline">Enter year.</p>}
          </div>
        </div>
      </div>
      <div className="flex space-x-6">
        <div className={inputContainer}>
          <p className={label}>Semester: </p>
          {/* This could be a map but woo wee lazy, rip me at PR if you want it */}
          <Checkbox
            label="Fall"
            value={checkFall}
            onChange={(event) => {
              setCheckFall(!checkFall);
              checkFall
                ? handleRemoveSemester(event)
                : handleAddSemester(event);
            }}
          />
          <Checkbox
            label="Spring"
            value={checkSpring}
            onChange={(event) => {
              setCheckSpring(!checkSpring);
              checkSpring
                ? handleRemoveSemester(event)
                : handleAddSemester(event);
            }}
          />
          <Checkbox
            label="Summer"
            value={checkSummer}
            onChange={(event) => {
              setCheckSummer(!checkSummer);
              checkSummer
                ? handleRemoveSemester(event)
                : handleAddSemester(event);
            }}
          />
          <Checkbox
            label="Other"
            value={checkOther}
            onChange={(event) => {
              setCheckOther(!checkOther);
              checkOther
                ? handleRemoveSemester(event)
                : handleAddSemester(event);
            }}
          />
        </div>
        <div className={inputStatus}>
          <Image
            src={
              checkFall || checkSpring || checkOther || checkSummer
                ? '/media/successCheckmark.svg'
                : '/media/failureWarning.svg'
            }
            alt="Icon"
            width={16}
            height={16}
            className="mx-2"
          />
          {!checkFall && !checkSpring && !checkOther && !checkSummer && (
            <p className="text-ruby inline">Select semesters.</p>
          )}
        </div>
      </div>
      {checkOther ? displayOtherDescription() : ''}
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
        {isEditing ? (
          <button onClick={() => router.back()}>Back</button>
        ) : (
          <button onClick={() => dispatch(setStep('selection'))}>Back</button>
        )}

        <button
          className="bg-ruby border-ruby-dark text-white disabled:bg-ruby-disabled"
          disabled={
            weight === null ||
            date === null ||
            description === '' ||
            !semester ||
            !name ||
            (checkOther && !otherDescription)
          }
          onClick={submitActivity}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FormInput;
