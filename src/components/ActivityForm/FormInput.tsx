import React, { useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  addSemester,
  removeSemester,
  selectActivityId,
  selectCategory,
  selectCheckedSemesters,
  selectDescription,
  selectActivityFormData,
  selectLastDateModified,
  selectName,
  selectOtherDescription,
  selectWeight,
  setDescription,
  setName,
  setOtherDescription,
  setStep,
  setWeight,
  selectYear,
  ActivityFormData,
  selectSemesters,
} from '../../store/form.store';
import {
  ActivityCategory,
  ActivityWeight,
  CreateActivityDto,
  formatCategory,
  Semester,
  UpdateActivityDto,
} from '../../models/activity.model';
import {
  createActivity,
  ResponseStatus,
  updateActivityClient,
} from '@/client/activities.client';
import { useSession } from 'next-auth/react';
import { Checkbox } from '@/shared/components/Checkbox';
import { ErrorBanner } from '../ErrorBanner';
import { useRouter } from 'next/router';
import DropdownInput, { Option } from '@/shared/components/DropdownInput';
import InputContainer from '@/shared/components/InputContainer';
import TextInput from '@/shared/components/TextInput';
import TextAreaInput from '@/shared/components/TextAreaInput';
import Button from '@/shared/components/Button';

const weightOptions: Option<ActivityWeight>[] = [
  { label: 'Major', value: 'MAJOR' },
  { label: 'Significant', value: 'SIGNIFICANT' },
  { label: 'Minor', value: 'MINOR' },
];

interface FormInputProps {
  isEditing: boolean;
}

const FormInput: React.FC<FormInputProps> = ({ isEditing }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const userId = session?.user.id;
  const activityId: number | null = useSelector(selectActivityId);
  const category: ActivityCategory | null = useSelector(selectCategory);
  const name: string | null = useSelector(selectName);
  const weight: ActivityWeight | null = useSelector(selectWeight);
  const semesters: Semester[] | null = useSelector(selectSemesters);
  const checkedSemesters: Record<Semester, boolean> = useSelector(selectCheckedSemesters);
  const otherChecked = checkedSemesters['OTHER'];
  const year: number | null = useSelector(selectYear);
  const description: string | null = useSelector(selectDescription);
  const otherDescription: string | null = useSelector(selectOtherDescription);
  const lastDateModified: bigint | null = useSelector(selectLastDateModified);
  const formData = useSelector(selectActivityFormData);

  // TODO: replace with toast error
  const [showEditingError, toggleEditingError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const [nameError, setNameError] = useState<string | undefined>(undefined);
  const [weightError, setWeightError] = useState<string | undefined>(undefined);
  const [semesterError, setSemesterError] = useState<string | undefined>(undefined);
  const [descriptionError, setDescriptionError] = useState<string | undefined>(undefined);
  const [otherDescriptionError, setOtherDescriptionError] = useState<string | undefined>(undefined);

  const semesterOptions: Option<Semester>[] = [
    { label: `Fall ${year}`, value: 'FALL' },
    { label: `Spring ${year}`, value: 'SPRING' },
    { label: `Summer ${year}`, value: 'SUMMER' },
    { label: 'Other', value: 'OTHER' },
  ];

  const dispatch = useDispatch();

  const onNameChange = (val: string) => {
    dispatch(setName(val));
    if (nameError) setNameError(undefined);
  };

  const onWeightChange = (val: ActivityWeight | undefined) => {
    dispatch(setWeight(val as ActivityWeight));
    if (weightError) setWeightError(undefined);
  };

  const onSemesterToggle = (semester: Semester) => {
    dispatch(
      checkedSemesters[semester!] ?
      removeSemester(semester!) :
      addSemester(semester!)
    );
    if (semesterError) setSemesterError(undefined);
  };

  const onOtherDescriptionChange = (val: string) => {
    dispatch(setOtherDescription(val));
    if (otherDescriptionError) setOtherDescriptionError(undefined);
  }

  const onDescriptionChange = (val: string) => {
    dispatch(setDescription(val));
    if (descriptionError) setDescriptionError(undefined);
  }

  const displayOtherDescription = () => {
    return (
      <InputContainer
        label="If you checked Other, please explain in the area below."
        labelClass='text-slate-600'
        incomplete={!!otherDescriptionError}
        incompleteMessage={otherDescriptionError}
        withMarginY
      >
        <TextAreaInput
          value={otherDescription || ''}
          fillContainer
          change={onOtherDescriptionChange}
        />
      </InputContainer>
    )
  };

  const validateFormData = (): ActivityFormData | undefined => {
    if (formData) return formData;
    if (!name) {
      setNameError("Enter an activity name.");
    }
    if (!weight) {
      setWeightError("Select a weight.");
    }
    if (!semesters) {
      setSemesterError("Select semesters.");
    }
    if (otherChecked && !otherDescription) {
      setOtherDescriptionError("Enter 'Other' semester explanation.");
    }
    if (!description) {
      setDescriptionError("Enter a description.");
    }
  };

  const submitActivity = () => {
    const activityFormData = validateFormData();
    if (!activityFormData || !userId) return;

    const newActivityDto: CreateActivityDto = {
      ...activityFormData,
      userId,
      dateModified: BigInt(new Date().getTime()),
      isFavorite: false,
      meritStatus: null,
    };
    dispatch(setStep('loading'));
    createActivity(newActivityDto).then((res) => {
      dispatch(setStep(res === ResponseStatus.Success ? 'success' : 'error'));
    });
  };

  const updateActivity: VoidFunction = () => {
    const activityFormData = validateFormData();
    if (!activityFormData || !activityId) return;

    const updateActivityDto: UpdateActivityDto = {
      ...activityFormData,
      id: activityId,
      userId,
      dateModified: BigInt(new Date().getTime()),
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

  return (
    <div className="flex flex-col">
      <div>{showEditingError ? <ErrorBanner text={errorText} /> : ''}</div>
      {isEditing ? (
        <>
          <h2>Submitted Activity - {formatCategory(category)}</h2>
          <p className={'italic text-gray-400 drop-shadow-sm'}>
            Last Date Modified
            {` - ${moment(Number(lastDateModified)).format('MMM D, YYYY')}`}
          </p>
        </>
      ) : (
        <h2>New Activity - {formatCategory(category)}</h2>
      )}
      <InputContainer
        label="Name: "
        incomplete={!!nameError}
        incompleteMessage={nameError}
        withMarginY
      >
        <TextInput
          value={name || ''}
          change={onNameChange}
          placeholder="Enter Activity Name"
        />
      </InputContainer>
      <InputContainer
        label="Weight: "
        incomplete={!!weightError}
        incompleteMessage={weightError}
        tooltipMessage={[
          'Major: New courses, significantly redesigned courses, large courses (more than 25 students), running a dialogue',
          'Significant: Workshops, fieldtrips, collaborations, client projects, etc.',
          'Minor: Directed study, guest critic, guest lecture, letter of recommendation, mentoring',
        ]}
        tooltipPosition="right"
        withMarginY
      >
        <DropdownInput
          options={weightOptions}
          placeholder="Select Weight"
          addOnClass="w-[175px]"
          initialValue={weightOptions.find((o) => o.value === weight)}
          selectValue={onWeightChange}
        />
      </InputContainer>
      <InputContainer
        label="Semester: "
        incomplete={!!semesterError}
        incompleteMessage={semesterError}
        withMarginY
      >
        <div className="flex flex-col space-y-2">
          {semesterOptions.map(({ label, value: semester }) => (
              <Checkbox
                label={label}
                key={`checkbox-${semester}`}
                value={checkedSemesters[semester!]}
                onChange={() => onSemesterToggle(semester!)}
            />
          ))}
        </div>
      </InputContainer>
      {otherChecked ? displayOtherDescription() : ''}
      <InputContainer
        label="Description: "
        incomplete={!!descriptionError}
        incompleteMessage={descriptionError}
        withMarginY
      >
        <TextAreaInput
          value={description || ''}
          placeholder="Enter Description"
          change={onDescriptionChange}
          addOnClass="w-full"
        />
      </InputContainer>
      <div className="my-9 flex cursor-pointer items-center justify-between">
        <Button
          onClick={() =>
            isEditing ? router.back() : dispatch(setStep('selection'))
          }
          variant="secondary"
        >
          Back
        </Button>
        <Button onClick={isEditing ? updateActivity : submitActivity}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default FormInput;
