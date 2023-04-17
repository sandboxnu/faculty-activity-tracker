import React, { useState } from 'react';
import { CreateUserDto } from '../../models/user.model';
import { Role } from '@prisma/client';
import Image from 'next/image';
import { roles, TextOrInput } from './AdminTableRow';

interface NewUserRowProps {
  submit: (newUser: CreateUserDto) => void;
  cancel: () => void;
}

const NewUserRow: React.FC<NewUserRowProps> = ({ submit, cancel }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [role, setRole] = useState<Role>(Role.MERIT_COMMITTEE_MEMBER);
  const [email, setEmail] = useState<string>('');

  const update = () => {
    if (!firstName || !lastName || !role || !email) return;
    submit({ firstName, lastName, role, email, preferredName: '' });
  };

  return (
    <div className="flex w-full items-center rounded-xl border border-er px-4 py-3 shadow my-2">
      <div className="basis-10">
        <TextOrInput
          value={firstName}
          change={(val) => setFirstName(val)}
          editing={true}
          placeholder="First Name"
        />
      </div>
      <div className="basis-20">
        <TextOrInput
          value={lastName}
          change={(val) => setLastName(val)}
          editing={true}
          placeholder="Last Name"
        />
      </div>
      <div className="basis-30 overflow-x-scroll">
        <TextOrInput
          value={email}
          change={(val) => setEmail(val)}
          editing={true}
          placeholder="name@northeastern.edu"
        />
      </div>
      <div className="basis-30">
        <select
          className="rounded border-[0.5px] border-g outline-none"
          onChange={(e) => setRole(e.target.value as Role)}
          value={role}
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>
      <div className="basis-10">
        <div className="flex items-center space-x-2">
          <div className="cursor-pointer" onClick={update}>
            <Image
              src="/media/saveIcon.svg"
              width={16}
              height={16}
              alt="save"
            />
          </div>
          <div className="cursor-pointer" onClick={cancel}>
            <Image
              src="/media/closeIcon.svg"
              width={16}
              height={16}
              alt="cancel"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUserRow;
