import InputContainer from '@/shared/components/InputContainer';
import TextInput from '@/shared/components/TextInput';
import {
  selectTeachingPercent,
  selectResearchPercent,
  selectServicePercent,
} from '@/store/profile.store';
import { SabbaticalOption } from '@prisma/client';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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

const ProfessorInfoForm: React.FC<ProfessorInfoFormProps> = ({
  submit,
  back,
}) => {
  const [position, setPosition] = useState('');
  const teachingPercent = useSelector(selectTeachingPercent);
  const researchPercent = useSelector(selectResearchPercent);
  const servicePercent = useSelector(selectServicePercent);
  const [sabbatical, setSabbatical] = useState<SabbaticalOption>(
    SabbaticalOption.NO,
  );

  return (
    <div className="flex flex-col">
      <InputContainer
        label="Position: "
        incomplete={!position}
        incompleteMessage="Enter a position."
      >
        <TextInput
          value={position}
          change={(val) => setPosition(val)}
          placeholder="Position"
        />
      </InputContainer>
      <PercentageInfo
        editing={true}
        teaching={teachingPercent}
        research={researchPercent}
        service={servicePercent}
      />
      <div className="flex justify-between items-center my-3">
        <button
          className="bg-medium-grey border border-g text-g px-3 py-2 rounded-xl"
          onClick={back}
        >
          Back
        </button>
        <button
          className="bg-ruby disabled:bg-ruby-disabled text-white px-3 py-2 rounded-xl"
          onClick={() =>
            submit(
              position,
              teachingPercent,
              researchPercent,
              servicePercent,
              sabbatical,
            )
          }
          disabled={!position}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ProfessorInfoForm;
