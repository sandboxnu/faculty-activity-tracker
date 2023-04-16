import InputContainer from '@/shared/components/InputContainer';
import TextInput from '@/shared/components/TextInput';
import React, { useState } from 'react';

interface UserInfoFormProps {
  initialName: string;
  submit: (firstName: string, lastName: string, preferredName?: string) => void;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({ initialName, submit }) => {
  const parsedName = initialName.split(' ');
  const [firstName, setFirstName] = useState(parsedName[0] || '');
  const [lastName, setLastName] = useState(parsedName[1] || '');
  const [preferredName, setPreferredName] = useState('');

  return (
    <div className="flex flex-col">
      <InputContainer
        label="First Name: "
        incomplete={!firstName}
        incompleteMessage="Enter a first name."
      >
        <TextInput
          value={firstName}
          change={(val) => setFirstName(val)}
          placeholder="First Name"
        />
      </InputContainer>
      <InputContainer
        label="Last Name: "
        incomplete={!lastName}
        incompleteMessage="Enter a last name."
      >
        <TextInput
          value={lastName}
          change={(val) => setLastName(val)}
          placeholder="Last Name"
        />
      </InputContainer>
      <InputContainer
        label="Preferred Name: "
        incomplete={false}
        incompleteMessage=""
      >
        <TextInput
          value={preferredName}
          change={(val) => setPreferredName(val)}
          placeholder="Preferred Name"
        />
      </InputContainer>
      <button
        className="bg-red disabled:bg-red-disabled text-white px-3 py-2 rounded-xl self-start"
        onClick={() => submit(firstName, lastName, preferredName)}
        disabled={!firstName || !lastName}
      >
        Submit
      </button>
    </div>
  );
};

export default UserInfoForm;
