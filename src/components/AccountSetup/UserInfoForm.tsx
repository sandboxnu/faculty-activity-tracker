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
import { Role, SabbaticalOption } from '@prisma/client';
import { createUser } from '@/client/users.client';
import {
  isErrorResponse,
  responseStatusMessage,
} from '@/shared/utils/misc.util';
import { CreateProfessorInfoDto } from '@/models/professorInfo.model';
import { updateProfessorInfoForUser } from '@/client/professorInfo.client';
import { useRouter } from 'next/router';

const UserInfoForm: React.FC = () => {
  const initialName = useSelector(selectName);
  const email = useSelector(selectEmail);
  const role = useSelector(selectRole);
  const parsedName = initialName.split(' ');
  const [firstName, setFirstName] = useState(parsedName[0] || '');
  const [lastName, setLastName] = useState(parsedName[1] || '');
  const [preferredName, setPreferredName] = useState('');
  const [pageError, setPageError] = useState<string | null>(null);
  const [firstNameError, setFirstNameError] = useState<string | undefined>(
    undefined,
  );
  const [lastNameError, setLastNameError] = useState<string | undefined>(
    undefined,
  );

  const router = useRouter();
  const dispatch = useDispatch();

  const createMeritUser = async (userInfo: CreateUserDto) => {
    const newUser = await createUser(userInfo);
    if (isErrorResponse(newUser))
      return setPageError(responseStatusMessage[newUser]);

    let newProfessorInfo: CreateProfessorInfoDto = {
      userId: newUser.id,
      position: '',
      teachingPercent: 0,
      researchPercent: 0,
      servicePercent: 0,
      sabbatical: SabbaticalOption.NO,
      teachingReleaseExplanation: null,
    };

    const res = await updateProfessorInfoForUser(newProfessorInfo);
    if (isErrorResponse(res)) return setPageError(responseStatusMessage[res]);
    router.push('/profile');
  };

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
    // onlf faculty members are presented with third screen
    if (role === Role.FACULTY) {
      dispatch(setUserInfo(newUser));
      dispatch(setStep('professor info'));
    } else {
      createMeritUser(newUser);
    }
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
    <div className="w-full flex flex-grow justify-center items-center">
      <StepWrapper
        title="Create your account"
        subtitle="Please provide your full name."
        hideProgressBar={role !== Role.FACULTY}
        currentStep={1}
        next={submit}
        back={() => dispatch(setStep('role'))}
      >
        <div className="flex flex-col w-full">
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
