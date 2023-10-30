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
  const [firstNameError, setFirstNameError] = useState<string | undefined>(
    undefined,
  );
  const [lastNameError, setLastNameError] = useState<string | undefined>(
    undefined,
  );

  const dispatch = useDispatch();

  const submit = () => {
    if (!firstName || !lastName) {
      if (!firstName) setFirstNameError('Please enter a First Name.');
      if (!lastName) setLastNameError('Please enter a Last Name.');
      return;
    }
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

  const onFirstNameChange = (value: string) => {
    setFirstName(value);
    if (firstNameError) setFirstNameError(undefined);
  };

  const onLastNameChange = (value: string) => {
    setLastName(value);
    if (lastNameError) setLastNameError(undefined);
  };

  return (
    <div className="flex w-full flex-grow items-center justify-center">
      <StepWrapper
        title="Create your account"
        subtitle="Please provide your full name."
        currentStep={1}
        next={submit}
        back={() => dispatch(setStep('role'))}
      >
        <div className="flex w-full flex-col">
          <InputContainer
            label="First Name"
            labelClass="text-body"
            withMarginY
            incomplete={!!firstNameError}
            incompleteMessage={firstNameError}
            required
          >
            <TextInput
              value={firstName}
              change={onFirstNameChange}
              placeholder="First Name"
              fillContainer
            />
          </InputContainer>
          <InputContainer
            label="Preferred Name (optional)"
            labelClass="text-body"
            withMarginY
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
            incomplete={!!lastNameError}
            incompleteMessage={lastNameError}
            required
          >
            <TextInput
              value={lastName}
              change={onLastNameChange}
              placeholder="Last Name"
              fillContainer
            />
          </InputContainer>
        </div>
      </StepWrapper>
    </div>
  );
};

export default UserInfoForm;
