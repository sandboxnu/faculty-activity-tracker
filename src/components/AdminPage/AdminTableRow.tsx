import React, { MouseEventHandler, useState } from 'react';
import { UpdateUserDto, UserDto } from '../../models/user.model';
import { Role } from '@prisma/client';
import { updateUser, deleteUser } from '../../client/users.client';
import { ResponseStatus } from '@/client/activities.client';
import Router, { useRouter } from 'next/router';

interface AdminTableRowProps {
  user: UserDto;
}

const AdminTableRow: React.FC<AdminTableRowProps> = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [role, setRole] = useState(user.role);
  const [preferredName, setPreferredName] = useState(user.preferredName);
  const [email, setEmail] = useState(user.email);
  const [isEditing, toggleEditing] = useState(false);
  const roles: Role[] = [
    Role.DEAN,
    Role.FACULTY,
    Role.MERIT_COMMITTEE_HEAD,
    Role.MERIT_COMMITTEE_MEMBER,
  ];
  const router = useRouter();

  const handleEditUser = () => {
    toggleEditing(!isEditing);
  };

  const handleSaveUser = () => {
    // toggleEditing(!isEditing);
    const updatedUser: UserDto = {
      id: user.id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      preferredName: preferredName,
      role: role,
    };

    updateUser(updatedUser)
      .then((res) => {
        if (res === ResponseStatus.Success) {
          toggleEditing(!isEditing);
          console.log(res);
        }
      })
      .catch((e) => console.log(e));
  };

  const handleDeleteUser: MouseEventHandler<HTMLButtonElement> = (event) => {
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
    <tr>
      {isEditing ? (
        <td className="border border-slate-700 px-1">
          <input
            className="pb-1 w-full"
            type="text"
            size={1}
            id="fname"
            name="fname"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          ></input>
        </td>
      ) : (
        <td className="border border-slate-700 px-1">{`${firstName}`}</td>
      )}
      {isEditing ? (
        <td className="border border-slate-700 px-1">
          <input
            className="pt-1 w-full"
            type="text"
            size={1}
            id="lname"
            name="lname"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          ></input>
        </td>
      ) : (
        <td className="border border-slate-700 px-1">{`${lastName}`}</td>
      )}
      {isEditing ? (
        <select
          name="roles"
          className="my-3 border border-slate-700 mx-1"
          onChange={(e) => setRole(e.target.value as Role)}
          value={role}
        >
          {roles.map((role) => (
            <option value={role}>{role}</option>
          ))}
        </select>
      ) : (
        <td className="border border-slate-700 px-1">{role}</td>
      )}
      {isEditing ? (
        <td className="border border-slate-700 px-1">
          <input
            className="w-full border border-slate-700 px-1"
            type="text"
            id="pname"
            size={1}
            name="pname"
            onChange={(e) => setPreferredName(e.target.value)}
            value={preferredName || ''}
            placeholder="N/A"
          ></input>
        </td>
      ) : (
        <td className="border border-slate-700 px-1">
          {preferredName || 'N/A'}
        </td>
      )}

      {isEditing ? (
        <td className="border border-slate-700 px-1">
          <input
            className="w-full"
            type="text"
            size={1}
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          ></input>
        </td>
      ) : (
        <td className="border border-slate-700 px-1">{email}</td>
      )}

      <td className="border border-slate-700 px-1">
        <button
          className="m-1"
          onClick={isEditing ? handleSaveUser : handleEditUser}
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button
          className="m-1 bg-ruby border-ruby-dark text-white"
          onClick={handleDeleteUser}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default AdminTableRow;
