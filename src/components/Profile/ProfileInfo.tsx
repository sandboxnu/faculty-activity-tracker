import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import {
  setResearchPercent,
  setServicePercent,
  setTeachingPercent,
  reset,
  selectTeachingPercent,
  selectResearchPercent,
  selectServicePercent,
  setPercent,
  selectPosition,
  selectPhoneNumber,
  selectOfficeLocation,
  setPosition,
} from '@/store/profile.store';
import PercentageInfo from './PercentageInfo';
import {
  UpdateProfessorInfoDto,
  professorPositionLabel,
  professorPositionOptions,
} from '@/models/professorInfo.model';
import { updateProfessorInfoForUser } from '@/client/professorInfo.client';
import { ResponseStatus } from '@/client/activities.client';
import { useRouter } from 'next/router';
import Avatar from './Avatar';
import InputContainer from '@/shared/components/InputContainer';
import Button from '@/shared/components/Button';
import { ProfessorPosition } from '@prisma/client';
import ProfileInfoSection from './ProfileInfoSection';
import DropdownInput from '@/shared/components/DropdownInput';

export interface ProfileInformation {
  firstName: string;
  lastName: string;
  email: string;
  position: ProfessorPosition;
  teachingPercent: number;
  researchPercent: number;
  servicePercent: number;
  phoneNumber: string | null;
  officeLocation: string | null;
}

type ProfileInfoProps = ProfileInformation;

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  firstName,
  lastName,
  email,
  position,
  teachingPercent,
  researchPercent,
  servicePercent,
  phoneNumber,
  officeLocation,
}) => {
  const defaultIcon = true;
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const teachingInput = useSelector(selectTeachingPercent);
  const researchInput = useSelector(selectResearchPercent);
  const serviceInput = useSelector(selectServicePercent);
  const positionInput = useSelector(selectPosition);
  const phoneNumberInput = useSelector(selectPhoneNumber);
  const officeLocationInput = useSelector(selectOfficeLocation);
  const dispatch = useDispatch();
  const router = useRouter();

  const startEditing = () => {
    // configure store with current values
    dispatch(setTeachingPercent(teachingPercent));
    dispatch(setResearchPercent(researchPercent));
    dispatch(setServicePercent(servicePercent));
    setEditing(true);
  };

  const cancel = () => {
    dispatch(reset());
    dispatch(setTeachingPercent(teachingPercent));
    dispatch(setResearchPercent(researchPercent));
    dispatch(setServicePercent(servicePercent));
    setEditing(false);
  };

  const submit = () => {
    if (teachingInput + researchInput + serviceInput !== 1) return;
    const updateInfo: UpdateProfessorInfoDto = {
      teachingPercent: teachingInput,
      researchPercent: researchInput,
      servicePercent: serviceInput,
    };
    updateProfessorInfoForUser(updateInfo).then((res) => {
      if (res === ResponseStatus.Unauthorized) setError('Unauthorized.');
      else if (res === ResponseStatus.BadRequest) setError('Bad request.');
      else if (res === ResponseStatus.UnknownError) setError('Unknown error.');
      else {
        setEditing(false);
        router.reload();
      }
    });
  };

  if (error)
    return (
      <p className="mt-20 w-full text-center text-red-500">
        Error: {error || 'unknown error.'}
      </p>
    );

  return (
    <div className="relative flex w-full flex-col pl-10">
      <div className="mb-10 flex w-full items-center pt-4" key="image+info">
        {defaultIcon ? (
          <Image
            src="/media/profileDefaultIcon.svg"
            alt="icon"
            width="175"
            height="175"
          />
        ) : (
          <Avatar
            initials={`${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`}
          />
        )}
        <div className="ml-9">
          <h2>{`${firstName} ${lastName}`}</h2>
          <p>{professorPositionLabel[position]}</p>
        </div>
      </div>
      <ProfileInfoSection
        label="Academic Information"
        key="academic-profile-info"
      >
        <div className="flex flex-col">
          <div className="flex">
            <InputContainer
              label="Track"
              labelClass="text-sm font-normal"
              incomplete={editing && positionInput === null}
              incompleteMessage="Must specify track."
              hideIcon={!editing}
            >
              <div className="w-[256px]">
                <DropdownInput<ProfessorPosition>
                  options={professorPositionOptions}
                  placeholder={'Select a Track'}
                  initialValue={professorPositionOptions.find(
                    (p) => p.value === position,
                  )}
                  selectValue={(p) => p && dispatch(setPosition(p))}
                  fillContainer
                />
              </div>
            </InputContainer>
          </div>
          <InputContainer
            label="Activity Distribution"
            labelClass="text-sm font-normal"
            incomplete={
              editing && teachingInput + researchInput + serviceInput !== 1
            }
            incompleteMessage="Percentages must sum to 100."
            statusPosition="top"
            hideIcon={!editing}
          >
            <div className="mt-">
              <PercentageInfo
                editing={editing}
                teaching={editing ? teachingInput : teachingPercent}
                research={editing ? researchInput : researchPercent}
                service={editing ? serviceInput : servicePercent}
                setPercent={(type, percent) =>
                  dispatch(setPercent({ type, percent }))
                }
              />
            </div>
          </InputContainer>
        </div>
      </ProfileInfoSection>
      <ProfileInfoSection
        label="Contact Information"
        key="contact-profile-info"
      >
        <div className="mb-6 mt-5">
          <div className="flex flex-col">
            <p className="mb-2">Email</p>
            <p className="w-max min-w-[250px] rounded-xl border-[0.5px] border-gray-500 px-4 py-1.5">
              {email}
            </p>
          </div>
        </div>
      </ProfileInfoSection>
      <div className="absolute right-0 top-0 flex items-center space-x-4">
        {editing && (
          <Button onClick={cancel} variant="secondary">
            Cancel
          </Button>
        )}
        <Button
          onClick={editing ? submit : startEditing}
          disabled={
            editing && teachingInput + researchInput + serviceInput !== 1
          }
        >
          {editing ? 'Save' : 'Edit'} Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfileInfo;
