import { obtainRoleForAccessCode } from '@/client/accessCodes.client';
import { ResponseStatus } from '@/client/activities.client';
import { Role } from '@prisma/client';
import React, { useState } from 'react';

interface RoleSetupProps {
  confirmRole: (role: Role) => void;
}

const RoleSetup: React.FC<RoleSetupProps> = ({ confirmRole }) => {
  const [codeInput, setCodeInput] = useState('');
  const inputBox = 'border border-black rounded-lg px-3 py-2 outline-none';
  const [error, setError] = useState<string | null>(null);

  const submitCode = () => {
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
    <div className="center">
      <div className="flex items-center space-x-2">
        <p>Enter your provided access code:</p>
        <input
          className={inputBox}
          value={codeInput}
          onChange={(e) => {
            setCodeInput(e.target.value);
            if (error) setError(null);
          }}
          placeholder="access code"
        />
        {error && <p className="text-red">{error}</p>}
      </div>
      <div className="flex justify-between items-center my-3">
        <div />
        <button
          className="bg-ruby disabled:bg-ruby-disabled text-white px-3 py-2 rounded-xl"
          onClick={submitCode}
          disabled={codeInput === ''}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default RoleSetup;
