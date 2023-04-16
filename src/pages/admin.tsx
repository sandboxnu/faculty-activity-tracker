// TODO: Admin page
import { useSession, getSession } from 'next-auth/react';
import Unauthorized from '@/shared/components/Unauthorized';
import React, { useState } from 'react';
import { CreateUserDto, UserDto } from 'src/models/user.model';
import { User, Role } from '@prisma/client';
import { getAllUsers, getUserById } from '@/services/user';
import { GetServerSideProps } from 'next';
import AdminTableRow from '../components/AdminPage/AdminTableRow';
import { deleteUser, addUser } from '../client/users.client';
import { useRouter } from 'next/router';
import { ResponseStatus } from '@/client/activities.client';

interface AdminPageProps {
  users?: UserDto[];
  error?: string;
}

const AdminPage: React.FunctionComponent = (props: AdminPageProps) => {
  const { data: session, status } = useSession();
  const name = session?.user?.name;
  const email = session?.user?.email;
  const users: User[] | undefined = props.users;
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [role, setRole] = useState<Role>(Role.MERIT_COMMITTEE_MEMBER);
  const [preferredName, setPreferredName] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');
  const [isAddingUser, toggleAddingUser] = useState<boolean>(false);

  const roles: Role[] = [
    Role.DEAN,
    Role.FACULTY,
    Role.MERIT_COMMITTEE_HEAD,
    Role.MERIT_COMMITTEE_MEMBER,
  ];
  const headers = [
    'First Name',
    'Last Name',
    'Role',
    'Preferred Name',
    'Email',
    'Actions',
  ];

  const router = useRouter();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  // make sure user is logged in and MC member
  if (status === 'unauthenticated' || props.error === 'User not found') {
    return <Unauthorized />;
  }
  if (props.error === 'bad role') {
    return (
      <p className="text-red w-full text-center mt-20">
        Error: {'You must be a merit committee member to view this page!'}
      </p>
    );
  }
  const handleAddUser: React.MouseEventHandler<HTMLButtonElement> = () => {
    toggleAddingUser(!isAddingUser);
  };

  const handleSaveUser: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!firstName || !lastName || !role || !email) return;
    const newUser: CreateUserDto = {
      firstName: firstName,
      lastName: lastName,
      role: role,
      preferredName: preferredName,
      email: newEmail,
    };
    addUser(newUser)
      .then((res) => {
        if (res === ResponseStatus.Success) {
          toggleAddingUser(!isAddingUser);
          setFirstName('');
          setLastName('');
          setNewEmail('');
          setRole(Role.MERIT_COMMITTEE_MEMBER);
          setPreferredName('');
          router.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // TODO: Add user button, Remove user button, Edit user button
  return (
    <>
      <div className="m-2 overflow-x-scroll">
        <div className="flex w-full">
          {isAddingUser ? (
            <button key="saveUser" className="my-3" onClick={handleSaveUser}>
              Save User
            </button>
          ) : (
            <button key="addUser" className="my-3" onClick={handleAddUser}>
              Add User
            </button>
          )}
        </div>
        {isAddingUser ? (
          <div className="flex space-x-3 pr-1 m-3">
            <input
              className=" border border-slate-700  px-1 w-1/6"
              type="text"
              size={1}
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              placeholder="First Name"
            ></input>
            <input
              className="border border-slate-700 px-1 w-1/6"
              type="text"
              size={1}
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              placeholder="Last Name"
            ></input>
            <select
              name="roles"
              className="px-1 border border-slate-700 mx-1"
              onChange={(e) => setRole(e.target.value as Role)}
              value={role}
            >
              {roles.map((role) => (
                <option value={role}>{role}</option>
              ))}
            </select>
            <input
              className="border border-slate-700 px-1 w-1/6"
              type="text"
              size={1}
              onChange={(e) => setPreferredName(e.target.value)}
              value={preferredName}
              placeholder="Preferred Name"
            ></input>
            <input
              className="border border-slate-700 px-1 w-1/6"
              type="email"
              pattern=".+@husky.neu.edu"
              size={1}
              onChange={(e) => setNewEmail(e.target.value)}
              value={newEmail}
              placeholder="Email"
              required
            ></input>
          </div>
        ) : (
          ''
        )}
        <div className="flex justify-center w-full">
          <table className="table-auto border-collapse border border-slate-500">
            <thead>
              <tr>
                {headers.map((header) => {
                  return (
                    <th className="border border-slate-600 px-1">{header}</th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => {
                return <AdminTableRow user={user} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

// This gets called on every request
export const getServerSideProps: GetServerSideProps<AdminPageProps> = async (
  context,
) => {
  const session = await getSession(context);
  const userId = session?.user?.id;

  if (!userId) return { props: { error: 'User not found' } };

  const user: User | 'not found' = await getUserById(userId);
  if (user === 'not found') return { props: { error: 'User not found' } };
  console.log(user.role);
  console.log(user);

  if (user && user.role === 'FACULTY') return { props: { error: 'bad role' } };

  // Fetch data from external API
  const users: User[] = await getAllUsers();

  return { props: { users } };
};

export default AdminPage;
