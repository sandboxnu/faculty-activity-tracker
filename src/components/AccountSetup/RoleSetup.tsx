import { obtainRoleForAccessCode } from '@/client/accessCodes.client';
import { ResponseStatus } from '@/client/activities.client';
import { Role } from '@prisma/client';
import React, { useState } from 'react';

import InputContainer from '@/shared/components/InputContainer';
import TextInput from '@/shared/components/TextInput';
import StepWrapper from './StepWrapper';

interface RoleSetupProps {
  confirmRole: (role: Role) => void;
}

const RoleSetup: React.FC<RoleSetupProps> = ({ confirmRole }) => {
  const [codeInput, setCodeInput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submitCode = () => {
    console.log(codeInput);
    if (!codeInput) return setError('Missing access code.');

    obtainRoleForAccessCode(codeInput).then((res) => {
      if (res === ResponseStatus.NotFound) setError('Incorrect access code.');
      else if (res === ResponseStatus.Unauthorized) setError('Unauthorized');
      else if (res === ResponseStatus.BadRequest) setError('Bad request');
      else if (res === ResponseStatus.UnknownError) setError('Unknown error');
      else {
        // store role in redux
        // set next step
        confirmRole(res);
      }
    });
  };

  return (
    <div className="w-full flex flex-grow justify-center items-center">
      <StepWrapper
        title="Welcome!"
        subtitle="Please enter your access code."
        currentStep={0}
        next={submitCode}
        back={() => {}}
      >
        <div className="w-[330px]">
          <InputContainer
            label="Provided Access Code"
            incomplete={codeInput === ''}
            incompleteMessage="Enter an access code."
            withMarginY={false}
          >
            <TextInput
              value={codeInput || ''}
              change={setCodeInput}
              placeholder=""
              fillContainer
            />
          </InputContainer>
        </div>
      </StepWrapper>
    </div>
  );
};

export default RoleSetup;
