import InputContainer from '@/shared/components/InputContainer';
import TextInput from '@/shared/components/TextInput';
import React, { useState } from 'react';
import StepWrapper from './StepWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { selectEmail, selectName, selectRole, setUserInfo, setStep } from '@/store/accountsetup.store';
import { CreateUserDto } from '@/models/user.model';

interface UserInfoFormProps {
  // initialName: string;
  // initialPreferredName?: string;
  // submit: (firstName: string, lastName: string, preferredName?: string) => void;
  // back: () => void;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({
  // initialName,
  // initialPreferredName,
  // submit,
  // back,
}) => {
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
        subtitle = "Please provide your full name."
        currentStep={1}
        next={submit}
        back={() => dispatch(setStep('role'))}
        >

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
    </div>
    </StepWrapper>
  );
};

export default UserInfoForm;
