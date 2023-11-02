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
} from '@/store/profile.store';
import PercentageInfo from './PercentageInfo';
import { UpdateProfessorInfoDto } from '@/models/professorInfo.model';
import { updateProfessorInfoForUser } from '@/client/professorInfo.client';
import { ResponseStatus } from '@/client/activities.client';
import { useRouter } from 'next/router';
import Avatar from './Avatar';
import InputContainer from '@/shared/components/InputContainer';
import Button from '@/shared/components/Button';

export interface ProfileInformation {
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  teachingPercent: number;
  researchPercent: number;
  servicePercent: number;
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
}) => {
  const defaultIcon = true;
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const teachingInput = useSelector(selectTeachingPercent);
  const researchInput = useSelector(selectResearchPercent);
  const serviceInput = useSelector(selectServicePercent);
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
          <p>{position}</p>
        </div>
      </div>
      <div key="activity-info">
        <div className="mb-6 flex w-full items-center pr-5">
          <p className="mr-2 text-base font-bold">Activity Distribution</p>
          <div className="h-[1.5px] flex-grow bg-gray-200" />
        </div>
        <InputContainer
          label=""
          incomplete={
            editing && teachingInput + researchInput + serviceInput !== 1
          }
          incompleteMessage="Percentages must sum to 100."
        >
          <div className="mb-6">
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
      <div key="contact-info">
        <div className="mt-10 flex w-full items-center pr-5">
          <p className="mr-2 text-base font-bold">Contact Information</p>
          <div className="h-[1.5px] flex-grow bg-gray-200" />
        </div>
        <div className="mb-6 mt-5">
          <div className="flex flex-col">
            <p className="mb-2">Email</p>
            <p className="w-max min-w-[250px] rounded-xl border-[0.5px] border-gray-500 px-4 py-1.5">
              {email}
            </p>
          </div>
        </div>
      </div>
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
