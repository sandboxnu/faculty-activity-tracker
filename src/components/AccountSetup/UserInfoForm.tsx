import InputContainer from '@/shared/components/InputContainer';
import TextInput from '@/shared/components/TextInput';
import React, { useState } from 'react';
import StepWrapper from './StepWrapper';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectEmail,
  selectName,
  selectRole,
  setUserInfo,
  setStep,
} from '@/store/accountSetup.store';
import { CreateUserDto } from '@/models/user.model';

interface UserInfoFormProps {
  // initialName: string;
  // initialPreferredName?: string;
  // submit: (firstName: string, lastName: string, preferredName?: string) => void;
  // back: () => void;
}

const UserInfoForm: React.FC<UserInfoFormProps> = (
  {
    // initialName,
    // initialPreferredName,
    // submit,
    // back,
  },
) => {
  const initialName = useSelector(selectName);
  const email = useSelector(selectEmail);
  const role = useSelector(selectRole);
  const parsedName = initialName.split(' ');
  const [firstName, setFirstName] = useState(parsedName[0] || '');
  const [lastName, setLastName] = useState(parsedName[1] || '');
  const [preferredName, setPreferredName] = useState('');

  const dispatch = useDispatch();

  const submit = () => {
    if (!email || !role) return;

    let newUser: CreateUserDto = {
      email,
      firstName,
      lastName,
      preferredName: preferredName || null,
      role,
      dateModified: BigInt(Date.now()),
    };
    dispatch(setUserInfo(newUser));
    dispatch(setStep('professor info'));
  };

  return (
    <StepWrapper
      title="Create your account"
      subtitle="Please provide your full name."
      currentStep={1}
      next={submit}
      back={() => dispatch(setStep('role'))}
    >
      <div className="flex flex-col w-full">
        <InputContainer
          label="First Name"
          labelClass="text-body"
          withMarginY
          incomplete={!firstName}
          incompleteMessage="Enter a first name."
          required
        >
          <TextInput
            value={firstName}
            change={(val) => setFirstName(val)}
            placeholder="First Name"
            fillContainer
          />
        </InputContainer>
        <InputContainer
          label="Preferred Name (optional)"
          labelClass="text-body"
          withMarginY
          incomplete={false}
          incompleteMessage=""
        >
          <TextInput
            value={preferredName}
            change={(val) => setPreferredName(val)}
            placeholder="Preferred Name"
            fillContainer
          />
        </InputContainer>
        <InputContainer
          label="Last Name"
          labelClass="text-body"
          withMarginY
          incomplete={!lastName}
          incompleteMessage="Enter a last name."
          required
        >
          <TextInput
            value={lastName}
            change={(val) => setLastName(val)}
            placeholder="Last Name"
            fillContainer
          />
        </InputContainer>
      </div>
    </StepWrapper>
  );
};

export default UserInfoForm;
