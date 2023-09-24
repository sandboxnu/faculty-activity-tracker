import React, { ChangeEventHandler, useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectActivityId,
  selectCategory,
  selectDate,
  selectDescription,
  selectLastDateModified,
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
import {
  ActivityCategory,
  ActivityWeight,
  CreateActivityDto,
  formatCategory,
  Semester,
  UpdateActivityDto,
} from '../../models/activity.model';
import Tooltip from '../../shared/components/Tooltip';
import {
  createActivity,
  ResponseStatus,
  updateActivityClient,
} from '@/client/activities.client';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Checkbox } from '../Checkbox';
import { ErrorBanner } from '../ErrorBanner';
import { useRouter } from 'next/router';
import DropdownInput from '@/shared/components/DropdownInput';
import InputContainer from '@/shared/components/InputContainer';
import TextInput from '@/shared/components/TextInput';
import TextAreaInput from '@/shared/components/TextAreaInput';

const weightOptions = [
  { label: 'Major', value: 'MAJOR' },
  { label: 'Significant', value: 'SIGNIFICANT' },
  { label: 'Minor', value: 'MINOR' },
];

const WeightInfo = () => (
  <div className="flex items-center space-x-2 text-gray-500">
    <Image
      src="/media/infoIcon.svg"
      alt="Little information icon"
      width={16}
      height={16}
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
);

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
  const lastDateModified: bigint | null = useSelector(selectLastDateModified);

  const [checkFall, setCheckFall] = useState(false);
  const [checkSpring, setCheckSpring] = useState(false);
  const [checkSummer, setCheckSummer] = useState(false);
  const [checkOther, setCheckOther] = useState(false);
  const [isEditing, setEditingState] = useState(props.editing);
  const [showEditingError, toggleEditingError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
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
  }, [semester]);

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

  const handleYearChange = (val: string) => {
    // delete entire input => reset year
    if (val === '') {
      dispatch(setYear(null));
    } else {
      const newYear: number = parseInt(val);
      if (!isNaN(newYear)) {
        dispatch(setYear(newYear));
      }
    }
  };

  const displayOtherDescription = () => {
    return (
      <div className={inputContainer}>
        <div className={inputWrapper}>
          <p className={'text-slate-600'}>
            If you checked Other, please explain in the area below.
          </p>
          <div className={inputStatus + ' ml-auto'}></div>
        </div>
        <TextAreaInput
          value={otherDescription || ''}
          change={(val) => dispatch(setOtherDescription(val))}
        />
      </div>
    );
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
      (checkOther && !otherDescription)
    )
      return;

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
      meritStatus: null,
    };
    console.log(newActivityDto);
    dispatch(setStep('loading'));
    createActivity(newActivityDto).then((res) => {
      dispatch(setStep(res === ResponseStatus.Success ? 'success' : 'error'));
    });
  };

  const updateActivity: VoidFunction = () => {
    if (
      !description ||
      !category ||
      !weight ||
      !name ||
      !semester ||
      !year ||
      (!checkFall && !checkOther && !checkSpring && !checkSummer) ||
      (checkOther && !otherDescription) ||
      !activityId
    )
      return;

    const updateActivityDto: UpdateActivityDto = {
      id: activityId,
      userId: userId,
      semester: semester,
      year: year,
      dateModified: BigInt(new Date().getTime()),
      name: name,
      description: description,
      category: category,
      significance: weight,
      isFavorite: true,
      semesterOtherDescription: otherDescription,
    };
    updateActivityClient(updateActivityDto).then((res) => {
      if (res === ResponseStatus.Success) {
        toggleEditingError(false);
        router.back();
      } else {
        toggleEditingError(true);
        setErrorText(
          'Unable to update activity, please verify your fields and try again!',
        );
      }
    });
  };

  if (category === null) return <div>Category must be selected</div>;

  const inputContainer = 'flex flex-col my-2 space-y-1';
  const inputWrapper = 'flex items-center';
  const inputStatus = 'flex items-center py-3';

  return (
    <div className="flex flex-col">
      <div>{showEditingError ? <ErrorBanner text={errorText} /> : ''}</div>
      {isEditing ? (
        <>
          <h2>Submitted Activity - {formatCategory(category)}</h2>
          <p className={'text-gray-400 italic drop-shadow-sm'}>
            Last Date Modified
            {` - ${moment(Number(lastDateModified)).format('MMM D, YYYY')}`}
          </p>
        </>
      ) : (
        <h2>New Activity - {formatCategory(category)}</h2>
      )}
      <InputContainer
        label="Name: "
        incomplete={!name}
        incompleteMessage="Enter an activity name."
      >
        <TextInput
          value={name || ''}
          change={(val) => dispatch(setName(val))}
          placeholder="Enter Activity Name"
        />
      </InputContainer>
      <WeightInfo />
      <InputContainer
        label="Weight: "
        incomplete={!weight}
        incompleteMessage="Select a weight."
      >
        <DropdownInput
          options={weightOptions}
          placeholder="Select Weight"
          addOnClass="w-[175px]"
          initialValue={weightOptions.find((o) => o.value === weight)}
          selectValue={(value) => dispatch(setWeight(value as ActivityWeight))}
        />
      </InputContainer>
      <InputContainer
        label="Year: "
        incomplete={!year}
        incompleteMessage="Enter a year."
      >
        <TextInput
          value={year || ''}
          change={(val) => handleYearChange(val)}
          placeholder="Enter Year"
        />
      </InputContainer>
      <InputContainer
        label="Semester: "
        incomplete={!checkFall && !checkSpring && !checkOther && !checkSummer}
        incompleteMessage="Select semesters."
      >
        <div className="flex flex-col space-y-2">
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
      </InputContainer>
      {checkOther ? displayOtherDescription() : ''}
      <InputContainer
        label="Description: "
        incomplete={!description}
        incompleteMessage="Enter a description."
      >
        <TextAreaInput
          value={description || ''}
          placeholder="Enter Description"
          change={(val) => dispatch(setDescription(val))}
          addOnClass="w-full"
        />
      </InputContainer>
      <div className="flex justify-between items-center cursor-pointer my-9">
        <button
          onClick={() =>
            isEditing ? router.back() : dispatch(setStep('selection'))
          }
        >
          Back
        </button>

        <button
          className="bg-red-500 text-white disabled:bg-red-300"
          disabled={
            weight === null ||
            date === null ||
            description === '' ||
            !semester ||
            !name ||
            (checkOther && !otherDescription)
          }
          onClick={isEditing ? updateActivity : submitActivity}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FormInput;
