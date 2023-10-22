import DropdownInput, { Option } from '@/shared/components/DropdownInput';
import InputContainer from '@/shared/components/InputContainer';
import TextAreaInput from '@/shared/components/TextAreaInput';
import { SabbaticalOption } from '@prisma/client';
import React, { useState } from 'react';
import PercentageInfo from '../Profile/PercentageInfo';
import { ResponseStatus } from '@/client/activities.client';
import { updateProfessorInfoForUser } from '@/client/professorInfo.client';
import { createUser } from '@/client/users.client';
import { CreateProfessorInfoDto } from '@/models/professorInfo.model';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo, setStep } from '@/store/accountSetup.store';
import StepWrapper from './StepWrapper';

interface ProfessorInfoFormProps {
  // submit: (
  //   position: string,
  //   teachingPercent: number,
  //   researchPercent: number,
  //   servicePercent: number,
  //   sabbatical: SabbaticalOption,
  //   teachingReleaseExplanation?: string,
  // ) => void;
  // back: () => void;
}

const positionOptions: Option[] = [
  { label: 'Non-Tenure Track', value: 'Non-Tenure Track' },
  { label: 'Tenure Track / Tenured', value: 'Tenure Track / Tenured' },
];

const sabbaticalOptions: Option<SabbaticalOption>[] = [
  { label: 'Not Sabbatical', value: SabbaticalOption.NO },
  { label: 'Sabbatical: Year', value: SabbaticalOption.YEAR },
  { label: 'Sabbatical: Semester', value: SabbaticalOption.SEMESTER },
];

const ProfessorInfoForm: React.FC<ProfessorInfoFormProps> = (
  {
    // submit,
    // back,
  },
) => {
  const userInfo = useSelector(selectUserInfo);
  const [position, setPosition] = useState('');
  const [teachingPercent, setTeachingPercent] = useState(0);
  const [researchPercent, setResearchPercent] = useState(0);
  const [servicePercent, setServicePercent] = useState(0);
  const [sabbatical, setSabbatical] = useState<SabbaticalOption | undefined>(
    undefined,
  );
  const [teachingReleaseExplanation, setExplanation] = useState('');
  const [pageError, setPageError] = useState<string | null>(null);
  const [positionError, setPositionError] = useState<string | undefined>(
    undefined,
  );
  const [distributionError, setDistributionError] = useState<
    string | undefined
  >(undefined);
  const [sabbaticalError, setSabbaticalError] = useState<string | undefined>(
    undefined,
  );
  const router = useRouter();
  const dispatch = useDispatch();

  const percentSetters: Record<string, (percent: number) => void> = {
    teaching: (percent) => setTeachingPercent(percent),
    creative: (percent) => setResearchPercent(percent),
    service: (percent) => setServicePercent(percent),
    default: (_) => {},
  };

  const selectPosition = (position: string) => {
    setPosition(position);
    if (position === 'Non-Tenure Track') {
      setTeachingPercent(0.8);
      setResearchPercent(0.1);
      setServicePercent(0.1);
    } else {
      setTeachingPercent(0.4);
      setResearchPercent(0.5);
      setServicePercent(0.1);
    }
    if (positionError) setPositionError(undefined);
    if (distributionError) setDistributionError(undefined);
  };

  const setPercent = (type: string, percent: number) => {
    percentSetters[type](percent);
    if (distributionError) setDistributionError(undefined);
  };

  const setSabbaticalOption = (option: SabbaticalOption) => {
    setSabbatical(option);
    if (sabbaticalError) setSabbaticalError(undefined);
  };

  const submitInfo = () => {
    if (
      !position ||
      !sabbatical ||
      teachingPercent + researchPercent + servicePercent !== 1
    ) {
      if (!position) setPositionError('Please select your position.');
      if (teachingPercent + researchPercent + servicePercent !== 1)
        setDistributionError('Percentages should add up to 100.');
      if (!sabbatical)
        setSabbaticalError('Please select your sabbatical status.');
      return;
    }

    createProfessorInfo(
      position,
      teachingPercent,
      researchPercent,
      servicePercent,
      sabbatical,
      teachingReleaseExplanation,
    );
  };

  const createProfessorInfo = async (
    position: string,
    teachingPercent: number,
    researchPercent: number,
    servicePercent: number,
    sabbatical: SabbaticalOption,
    teachingReleaseExplanation?: string,
  ) => {
    if (!userInfo) return;

    const newUser = await createUser(userInfo);

    if (newUser === ResponseStatus.UnknownError) setPageError('Unknown Error');
    else {
      let newProfessorInfo: CreateProfessorInfoDto = {
        userId: newUser.id,
        position,
        teachingPercent,
        researchPercent,
        servicePercent,
        sabbatical,
        teachingReleaseExplanation: teachingReleaseExplanation || null,
      };

      const res = await updateProfessorInfoForUser(newProfessorInfo);
      if (res === ResponseStatus.Unauthorized) setPageError('Unauthorized');
      else if (res === ResponseStatus.BadRequest) setPageError('Bad request');
      else if (res === ResponseStatus.UnknownError)
        setPageError('Unknown error');
      else {
        router.push('/profile');
      }
    }
  };

  return (
    <div className="w-full flex flex-grow justify-center items-center">
      <StepWrapper
        title="Basic Information"
        subtitle="Please provide the following information."
        currentStep={2}
        next={submitInfo}
        back={() => dispatch(setStep('user info'))}
      >
        <div className="flex flex-col w-full">
          <InputContainer
            label="Position"
            labelClass="text-body"
            withMarginY
            incompleteMessage={positionError}
            required
          >
            <DropdownInput
              options={positionOptions}
              placeholder="Select a Position"
              selectValue={(value) => selectPosition(value?.toString() || '')}
              fillContainer
            />
          </InputContainer>
          <InputContainer
            label="Activity Distribution"
            labelClass="text-body"
            withMarginY
            incompleteMessage={distributionError}
            required
          >
            <div className="w-full px-5">
              <PercentageInfo
                editing={true}
                teaching={teachingPercent}
                research={researchPercent}
                service={servicePercent}
                setPercent={setPercent}
                fillContainer
              />
            </div>
          </InputContainer>
          <InputContainer
            label="Sabbatical"
            labelClass="text-body"
            incompleteMessage={sabbaticalError}
            withMarginY
            required
          >
            <DropdownInput<SabbaticalOption>
              options={sabbaticalOptions}
              initialValue={sabbaticalOptions.find(
                (o) => o.value === sabbatical,
              )}
              placeholder="Select a Sabbatical"
              selectValue={(value) =>
                setSabbaticalOption(value as SabbaticalOption)
              }
              fillContainer
            />
          </InputContainer>
          <InputContainer
            label="Teaching Release Explanation"
            labelClass="text-body"
            withMarginY
          >
            <TextAreaInput
              value={teachingReleaseExplanation}
              change={(val) => setExplanation(val)}
              placeholder="Teaching release explanation (optional)."
              addOnClass="w-full"
            />
          </InputContainer>
        </div>
      </StepWrapper>
    </div>
  );
};

export default ProfessorInfoForm;
