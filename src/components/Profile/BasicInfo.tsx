import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import {
  selectEditing,
  selectFirstName,
  selectLastName,
  selectPosition,
  selectTitle,
} from '@/store/profile.store';
import Avatar from './Avatar';

const BasicInfo: React.FC = () => {
  const defaultIcon = true;
  const editing = useSelector(selectEditing);
  const firstName = useSelector(selectFirstName);
  const lastName = useSelector(selectLastName);
  const title = useSelector(selectTitle);
  const position = useSelector(selectPosition);
  const dispatch = useDispatch();

  return (
    <div
      className="flex items-center w-full mb-10 pt-4"
      key="basic-profile-info"
    >
      {!defaultIcon && firstName && lastName ? (
        <Avatar
          initials={`${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`}
        />
      ) : (
        <Image
          src="/media/profileDefaultIcon.svg"
          alt="icon"
          width="175"
          height="175"
        />
      )}
      <div className="ml-9">
        <h2>{`${firstName} ${lastName}`}</h2>
        <p>{title || <>&nbsp;</>}</p>
      </div>
    </div>
  );
};

export default BasicInfo;
