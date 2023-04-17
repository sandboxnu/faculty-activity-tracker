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
    if (codeInput === 'chungus') {
      confirmRole('MERIT_COMMITTEE_MEMBER');
    } else {
      setError('invalid code');
    }
  };

  return (
    <div className="center">
      <div className="flex items-center space-x-2">
        <p>Enter your provided access code:</p>
        <input
          className={inputBox}
          value={codeInput}
          onChange={(e) => setCodeInput(e.target.value)}
          placeholder="access code"
        />
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
      {error && <p className="text-red my-4">{error}</p>}
    </div>
  );
};

export default RoleSetup;
