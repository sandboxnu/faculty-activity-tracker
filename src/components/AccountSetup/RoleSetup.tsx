import { obtainRoleForAccessCode } from '@/client/accessCodes.client';
import { ResponseStatus } from '@/client/activities.client';
import { Role } from '@prisma/client';
import React, { useState } from 'react';

import InputContainer from '@/shared/components/InputContainer';
import TextInput from '@/shared/components/TextInput';
import StepWrapper from './StepWrapper';
import { useDispatch } from 'react-redux';
import { setRole, setStep } from '@/store/accountSetup.store';

interface RoleSetupProps {}

const RoleSetup: React.FC<RoleSetupProps> = () => {
  const [codeInput, setCodeInput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const submitCode = () => {
    console.log(codeInput);
    if (!codeInput) return setError('Missing access code.');

    obtainRoleForAccessCode(codeInput).then((res) => {
      if (res === ResponseStatus.NotFound) setError('Incorrect access code.');
      else if (res === ResponseStatus.Unauthorized) setError('Unauthorized');
      else if (res === ResponseStatus.BadRequest) setError('Bad request');
      else if (res === ResponseStatus.UnknownError) setError('Unknown error');
      else {
        dispatch(setRole(res));
        dispatch(setStep('user info'));
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
        <div className="w-full">
          <InputContainer
            label="Provided Access Code"
            labelClass="text-body"
            incomplete={!codeInput}
            incompleteMessage="Enter a code."
            hideValidation={codeInput === null}
            withMarginY={false}
            required
          >
            <TextInput
              value={codeInput || ''}
              change={setCodeInput}
              placeholder=""
              fillContainer
              onSubmit={submitCode}
            />
          </InputContainer>
        </div>
      </StepWrapper>
    </div>
  );
};

export default RoleSetup;
