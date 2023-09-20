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
        confirmRole(res);
      }
    });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
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
  // return (
  //   <div className="center">
  //     <div className="flex items-center space-x-2">
  //       <p>Enter your provided access code:</p>
  // <input
  //   className={inputBox}
  //   value={codeInput}
  //   onChange={(e) => {
  //     setCodeInput(e.target.value);
  //     if (error) setError(null);
  //   }}
  //   placeholder="access code"
  // />
  //       {error && <p className="text-red">{error}</p>}
  //     </div>
  //     <div className="flex justify-between items-center my-3">
  //       <div />
  //       <button
  //         className="bg-ruby disabled:bg-ruby-disabled text-white px-3 py-2 rounded-xl"
  //         onClick={submitCode}
  //         disabled={codeInput === ''}
  //       >
  //         Submit
  //       </button>
  //     </div>
  //   </div>
  // );
};

export default RoleSetup;
