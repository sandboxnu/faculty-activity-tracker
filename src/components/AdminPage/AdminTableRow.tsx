import React, { MouseEventHandler, useState } from 'react';
import { UpdateUserDto, UserDto } from '../../models/user.model';
import { Role } from '@prisma/client';
import { updateUser, deleteUser } from '../../client/users.client';
import { ResponseStatus } from '@/client/activities.client';
import Router, { useRouter } from 'next/router';
import Image from 'next/image';
import { formatRole } from '@/shared/utils/user.util';

interface AdminTableRowProps {
  user: UserDto;
}

export const TextOrInput: React.FC<{
  editing: boolean;
  value: string;
  change: (val: string) => void;
  placeholder?: string;
}> = ({ editing, value, change, placeholder }) =>
  editing ? (
    <input
      className="w-full outline-none"
      type="text"
      size={1}
      onChange={(e) => change(e.target.value)}
      value={value}
      placeholder={placeholder}
    />
  ) : (
    <p className="">{value}</p>
  );

export const roles: Role[] = [
  Role.DEAN,
  Role.FACULTY,
  Role.MERIT_COMMITTEE_HEAD,
  Role.MERIT_COMMITTEE_MEMBER,
];

const AdminTableRow: React.FC<AdminTableRowProps> = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [role, setRole] = useState(user.role);
  const [email, setEmail] = useState(user.email);
  const [isEditing, toggleEditing] = useState(false);

  const router = useRouter();

  const handleEditUser = () => {
    toggleEditing(!isEditing);
  };

  const cancel = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setRole(user.role);
    setEmail(user.email);
    toggleEditing(false);
  };

  const handleSaveUser = () => {
    const updatedUser: UpdateUserDto = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      role: role,
    };

    updateUser(user.id, updatedUser)
      .then((res) => {
        if (res === ResponseStatus.Success) {
          toggleEditing(!isEditing);
          console.log(res);
        }
      })
      .catch((e) => console.log(e));
  };

  const handleDeleteUser = () => {
    if (confirm('Do you really want to delete this user?')) {
      deleteUser(user.id)
        .then((res) => {
          if (res === ResponseStatus.Success) {
            router.reload();
          }
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <div
      key={`user-${user.id}`}
      className="flex w-full items-center rounded-xl border border-er px-4 py-3 shadow"
    >
      <div className="basis-10">
        <TextOrInput
          value={firstName}
          change={(val) => setFirstName(val)}
          editing={isEditing}
        />
      </div>
      <div className="basis-20">
        <TextOrInput
          value={lastName}
          change={(val) => setLastName(val)}
          editing={isEditing}
        />
      </div>
      <div className="basis-30 overflow-x-scroll">
        <TextOrInput
          value={email}
          change={(val) => setEmail(val)}
          editing={isEditing}
        />
      </div>
      <div className="basis-30">
        {isEditing ? (
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
        ) : (
          <p>{formatRole(user.role)}</p>
        )}
      </div>
      <div className="basis-10">
        {
          <div className="flex items-center space-x-2">
            <div
              className="cursor-pointer"
              onClick={isEditing ? handleSaveUser : handleEditUser}
            >
              <Image
                src={`/media/${isEditing ? 'save' : 'edit'}Icon.svg`}
                width={16}
                height={16}
                alt="edit"
              />
            </div>
            <div
              className="cursor-pointer"
              onClick={isEditing ? cancel : handleDeleteUser}
            >
              <Image
                src={`/media/${isEditing ? 'close' : 'trash'}Icon.svg`}
                width={16}
                height={16}
                alt="edit"
              />
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default AdminTableRow;
