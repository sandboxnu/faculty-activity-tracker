import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ProfileInformation,
  selectEditing,
  selectProfileCompletionStatus,
  setEditing,
  setProfileInfo,
  reset,
} from '@/store/profile.store';
import { updateProfessorInfoForUser } from '@/client/professorInfo.client';
import { ResponseStatus } from '@/client/activities.client';
import { useRouter } from 'next/router';
import AcademicInfo from './AcademicInfo';
import ContactInfo from './ContactInfo';
import BasicInfo from './BasicInfo';
import { separateProfileInformation } from '@/shared/utils/user.util';
import { updateUser } from '@/client/users.client';

interface ProfileContainerProps {
  userId: number;
  currentInfo: ProfileInformation;
}

const ProfileContainer: React.FC<ProfileContainerProps> = ({
  userId,
  currentInfo,
}) => {
  const editing = useSelector(selectEditing);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const completionStatus = useSelector(selectProfileCompletionStatus);
  const incomplete = typeof completionStatus === 'string';
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(setProfileInfo(currentInfo));
  }, [currentInfo, dispatch]);

  const startEditing = () => {
    dispatch(setProfileInfo(currentInfo));
    dispatch(setEditing(true));
  };

  const cancel = () => {
    dispatch(reset());
    dispatch(setProfileInfo(currentInfo));
    dispatch(setEditing(false));
  };

  const submit = async () => {
    if (typeof completionStatus === 'string') {
      setError(completionStatus);
      return;
    }
    const { userInfo, professorInfo } =
      separateProfileInformation(completionStatus);
    setLoading(true);
    let profRes = await updateProfessorInfoForUser(professorInfo);
    if (profRes === ResponseStatus.Unauthorized)
      return setError('Unauthorized.');
    else if (profRes === ResponseStatus.BadRequest)
      return setError('Bad request.');
    else if (profRes === ResponseStatus.UnknownError)
      return setError('Unknown error.');

    let userRes = await updateUser(userId, userInfo);
    if (userRes === ResponseStatus.UnknownError)
      return setError('Unknown error.');
    setEditing(false);
    setLoading(false);
    router.reload();
  };

  if (error)
    return (
      <p className="text-red-500 w-full text-center mt-20">
        Error: {error || 'unknown error.'}
      </p>
    );

  return (
    <div className="w-full pl-10 flex flex-col relative">
      <BasicInfo />
      <AcademicInfo />
      <ContactInfo />
      <div className="absolute top-0 right-0 space-x-4">
        {editing && (
          <button
            onClick={cancel}
            className="px-3 py-2 bg-gray-100 border border-gray-500 text-gray-500 rounded-xl"
          >
            Cancel
          </button>
        )}
        <button
          className="px-3 py-2 bg-red-500 text-white rounded-xl disabled:bg-red-300"
          onClick={editing ? submit : startEditing}
          disabled={loading || (editing && incomplete)}
        >
          {editing ? 'Save' : 'Edit'} Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileContainer;
