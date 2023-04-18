import DropdownInput, { Option } from '@/shared/components/DropdownInput';
import InputContainer from '@/shared/components/InputContainer';
import TextAreaInput from '@/shared/components/TextAreaInput';
import { SabbaticalOption } from '@prisma/client';
import React, { useState } from 'react';
import PercentageInfo from '../Profile/PercentageInfo';

interface ProfessorInfoFormProps {
  submit: (
    position: string,
    teachingPercent: number,
    researchPercent: number,
    servicePercent: number,
    sabbatical: SabbaticalOption,
    teachingReleaseExplanation?: string,
  ) => void;
  back: () => void;
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
  submit,
  back,
}) => {
  const [position, setPosition] = useState('');
  const [teachingPercent, setTeachingPercent] = useState(0);
  const [researchPercent, setResearchPercent] = useState(0);
  const [servicePercent, setServicePercent] = useState(0);
  const [sabbatical, setSabbatical] = useState<SabbaticalOption | undefined>(
    SabbaticalOption.NO,
  );
  const [teachingReleaseExplanation, setExplanation] = useState('');

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

    submit(
      position,
      teachingPercent,
      researchPercent,
      servicePercent,
      sabbatical,
      teachingReleaseExplanation,
    );
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
      <div className="flex justify-between items-center my-3">
        <button
          className="bg-medium-grey border border-g text-g px-3 py-2 rounded-xl"
          onClick={back}
        >
          Back
        </button>
        <button
          className="bg-ruby disabled:bg-ruby-disabled text-white px-3 py-2 rounded-xl"
          onClick={submitInfo}
          disabled={
            !position ||
            !sabbatical ||
            teachingPercent + researchPercent + servicePercent !== 1
          }
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ProfessorInfoForm;
