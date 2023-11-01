import { obtainRoleForAccessCode } from '@/client/accessCodes.client';
import { ResponseStatus } from '@/client/activities.client';
import React, { useState } from 'react';

import InputContainer from '@/shared/components/InputContainer';
import TextInput from '@/shared/components/TextInput';
import StepWrapper from './StepWrapper';
import { useDispatch } from 'react-redux';
import { setRole, setStep } from '@/store/accountSetup.store';
import {
  isErrorResponse,
  responseStatusMessage,
} from '@/shared/utils/misc.util';

interface RoleSetupProps {}

const RoleSetup: React.FC<RoleSetupProps> = () => {
  const [codeInput, setCodeInput] = useState<string | null>(null);
  const [accessCodeError, setAccessCodeError] = useState<string | undefined>(
    undefined,
  );
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const submitCode = async () => {
    if (!codeInput) return setAccessCodeError('Please enter your access code.');

    const res = await obtainRoleForAccessCode(codeInput);
    if (res === ResponseStatus.NotFound)
      setAccessCodeError('Incorrect access code.');
    else if (isErrorResponse(res)) return setError(responseStatusMessage[res]);
    else {
      dispatch(setRole(res));
      dispatch(setStep('user info'));
    }
  };

  const onChange = (value: string) => {
    setCodeInput(value);
    if (accessCodeError) setAccessCodeError(undefined);
  };

  return (
    <div className="w-full flex flex-grow justify-center items-center">
      <StepWrapper
        title="Welcome!"
        subtitle="Please enter your access code."
        hideProgressBar
        currentStep={0}
        next={submitCode}
        back={() => {}}
      >
        <div className="w-full">
          <InputContainer
            label="Provided Access Code"
            labelClass="text-body"
            incomplete={!!accessCodeError}
            incompleteMessage={accessCodeError}
            infoMessage="Your access code can be found in your Northeastern email. If not, please contact Mark Sivak."
            withMarginY={false}
            required
          >
            <TextInput
              value={codeInput || ''}
              change={onChange}
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
