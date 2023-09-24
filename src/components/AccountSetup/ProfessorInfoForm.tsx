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
import { useSelector } from 'react-redux';
import { selectUserInfo } from '@/store/accountsetup.store';

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
  { label: 'No', value: SabbaticalOption.NO },
  { label: 'Year', value: SabbaticalOption.YEAR },
  { label: 'Semester', value: SabbaticalOption.SEMESTER },
];

const ProfessorInfoForm: React.FC<ProfessorInfoFormProps> = ({
  // submit,
  // back,
}) => {
  const userInfo = useSelector(selectUserInfo);
  const [position, setPosition] = useState('');
  const [teachingPercent, setTeachingPercent] = useState(0);
  const [researchPercent, setResearchPercent] = useState(0);
  const [servicePercent, setServicePercent] = useState(0);
  const [sabbatical, setSabbatical] = useState<SabbaticalOption | undefined>(
    SabbaticalOption.NO,
  );
  const [teachingReleaseExplanation, setExplanation] = useState('');
  const [pageError, setPageError] = useState<string | null>(null);
  const router = useRouter();

  const percentSetters: Record<string, (percent: number) => void> = {
    teaching: (percent) => setTeachingPercent(percent),
    creative: (percent) => setResearchPercent(percent),
    serice: (percent) => setServicePercent(percent),
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
  };

  const setPercent = (type: string, percent: number) =>
    percentSetters[type](percent);

  const submitInfo = () => {
    if (
      !position ||
      !sabbatical ||
      teachingPercent + researchPercent + servicePercent !== 1
    )
      return;

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
    <div className="flex flex-col">
      <InputContainer
        label="Position: "
        incomplete={!position}
        incompleteMessage="Select a position."
      >
        <DropdownInput
          options={positionOptions}
          placeholder="Select a Position"
          selectValue={(value) => selectPosition(value?.toString() || '')}
        />
      </InputContainer>
      <InputContainer
        label="Activity Distribution: "
        incomplete={teachingPercent + researchPercent + servicePercent !== 1}
        incompleteMessage="Percentages must sum to 100."
      >
        <PercentageInfo
          editing={true}
          teaching={teachingPercent}
          research={researchPercent}
          service={servicePercent}
          setPercent={setPercent}
        />
      </InputContainer>
      <InputContainer
        label="Sabbatical: "
        incomplete={!sabbatical}
        incompleteMessage="Select a sabbatical option."
      >
        <DropdownInput<SabbaticalOption>
          options={sabbaticalOptions}
          initialValue={sabbaticalOptions.find((o) => o.value === sabbatical)}
          placeholder="Select a Sabbatical"
          selectValue={(value) => setSabbatical(value as SabbaticalOption)}
        />
      </InputContainer>
      <InputContainer
        label="Teaching Release Explanation: "
        incomplete={false}
        incompleteMessage=""
      >
        <TextAreaInput
          value={teachingReleaseExplanation}
          change={(val) => setExplanation(val)}
          placeholder="Teaching release explanation (optional)."
          addOnClass="w-full"
        />
      </InputContainer>
    </div>
  );
};

export default ProfessorInfoForm;
