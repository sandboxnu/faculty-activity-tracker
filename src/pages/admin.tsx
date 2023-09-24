// TODO: Admin page
import { useSession, getSession } from 'next-auth/react';
import Unauthorized from '@/shared/components/Unauthorized';
import React, { useState } from 'react';
import { CreateUserDto, UpdateUserDto, UserDto } from 'src/models/user.model';
import { User, Role } from '@prisma/client';
import { getAllUsers, getUserById, getUsersByQuery } from '@/services/user';
import { GetServerSideProps } from 'next';
import AdminTableRow from '../components/AdminPage/AdminTableRow';
import { deleteUser, createUser, updateUser } from '../client/users.client';
import { ResponseStatus } from '@/client/activities.client';
import {
  isAdminUser,
  SortDir,
  SortType,
  userSorter,
} from '@/shared/utils/user.util';
import Head from 'next/head';
import NewUserRow from '@/components/AdminPage/NewUserRow';
import { bigintToJSON } from '@/shared/utils/misc.util';
import Image from 'next/image';
import Button from '@/shared/components/Button';
import AppLayout from '@/shared/components/AppLayout';

interface AdminPageProps {
  users?: UserDto[];
  error?: string;
}

export const getServerSideProps: GetServerSideProps<AdminPageProps> = async (
  context,
) => {
  const session = await getSession(context);
  const userId = session?.user?.id;

  if (!userId) return { props: { error: 'User not found' } };

  // if (user && !isAdminUser(user)) return { props: { error: 'bad role' } };
  if (!session?.user?.admin) return { props: { error: 'bad role' } };

  //const users: User[] = await getAllUsers();
  const users = await getUsersByQuery({}, { dateModified: 'desc' });

  return { props: { users: bigintToJSON(users) } };
};

export const roles: Role[] = [
  Role.DEAN,
  Role.FACULTY,
  Role.MERIT_COMMITTEE_HEAD,
  Role.MERIT_COMMITTEE_MEMBER,
];

const AdminPage: React.FC<AdminPageProps> = ({
  users: initialUsers,
  error: initialError,
}) => {
  const { status } = useSession();
  const [users, setUsers] = useState<UserDto[]>(initialUsers || []);
  const [error, setError] = useState<string | null>(initialError || null);
  const [isAddingUser, toggleAddingUser] = useState<boolean>(false);
  const [sortType, setSortType] = useState<SortType | null>(null);
  const [sortDir, setSortDir] = useState<SortDir | null>(null);
  const sortedUsers =
    sortType && sortDir ? users.sort(userSorter[sortType][sortDir]) : users;

  const cancel = () => {
    toggleAddingUser(false);
  };

  const createNewUser = (newUser: CreateUserDto) => {
    createUser(newUser)
      .then((res) => {
        if (res === ResponseStatus.UnknownError) setError('Unknown error');
        else {
          toggleAddingUser(false);
          setUsers((users) => [res, ...users]);
        }
      })
      .catch((error: Error) => {
        console.log(error);
        setError(error.message || 'unknown error');
      });
  };

  const saveUser = (userId: number, updatedUser: UpdateUserDto) => {
    updateUser(userId, updatedUser)
      .then((res) => {
        if (res === ResponseStatus.UnknownError) setError('Unknown error');
        else {
          setUsers((users) => [res, ...users.filter((u) => u.id !== userId)]);
        }
      })
      .catch((e) => console.log(e));
  };

  const handleDeleteUser = (userId: number) => {
    if (confirm('Do you really want to delete this user?')) {
      deleteUser(userId)
        .then((res) => {
          if (res === ResponseStatus.Success) {
            setUsers((users) => users.filter((u) => u.id !== userId));
          }
        })
        .catch((e) => console.log(e));
    }
  };

  const toggleSort = (type: SortType) => {
    if (sortType === type) {
      setSortDir((dir) => (dir === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortType(type);
      setSortDir('asc');
    }
  };

  // make sure user is logged in and MC member
  if (status === 'unauthenticated' || error === 'User not found') {
    return <Unauthorized />;
  }

  if (error || !users) {
    return (
      <p className="text-red-500 w-full text-center mt-20">
        Error: {error || 'unknown error'}
      </p>
    );
  }

  const Header = () => (
    <div className="flex w-full items-center px-4">
      <div className="basis-15">
        <div className="flex items-end space-x-2">
          <p>First Name</p>
          <div
            className="cursor-pointer mb-0.5"
            onClick={() => toggleSort('first name')}
          >
            <Image
              src="/media/rightArrow.svg"
              width={8}
              height={8}
              className={`${
                sortType === 'first name'
                  ? sortDir === 'asc'
                    ? '-rotate-90'
                    : 'rotate-90'
                  : 'opacity-10 hover:opacity-25 -rotate-90'
              }`}
              alt="arrow"
            />
          </div>
        </div>
      </div>
      <div className="basis-20">
        <div className="flex items-end space-x-2">
          <p>Last Name</p>
          <div
            className="cursor-pointer mb-0.5"
            onClick={() => toggleSort('last name')}
          >
            <Image
              src="/media/rightArrow.svg"
              width={8}
              height={8}
              className={`${
                sortType === 'last name'
                  ? sortDir === 'asc'
                    ? '-rotate-90'
                    : 'rotate-90'
                  : 'opacity-10 hover:opacity-25 -rotate-90'
              }`}
              alt="arrow"
            />
          </div>
        </div>
      </div>
      <div className="basis-30">
        <div className="flex items-end space-x-2">
          <p>Email</p>
          <div
            className="cursor-pointer mb-0.5"
            onClick={() => toggleSort('email')}
          >
            <Image
              src="/media/rightArrow.svg"
              width={8}
              height={8}
              className={`${
                sortType === 'email'
                  ? sortDir === 'asc'
                    ? '-rotate-90'
                    : 'rotate-90'
                  : 'opacity-10 hover:opacity-25 -rotate-90'
              }`}
              alt="arrow"
            />
          </div>
        </div>
      </div>
      <div className="basis-30">
        <div className="flex items-end space-x-2">
          <p>Role</p>
          <div
            className="cursor-pointer mb-0.5"
            onClick={() => toggleSort('role')}
          >
            <Image
              src="/media/rightArrow.svg"
              width={8}
              height={8}
              className={`${
                sortType === 'role'
                  ? sortDir === 'asc'
                    ? '-rotate-90'
                    : 'rotate-90'
                  : 'opacity-10 hover:opacity-25 -rotate-90'
              }`}
              alt="arrow"
            />
          </div>
        </div>
      </div>
      <div className="basis-5">
        <div className="flex items-center space-x-2">
          <p>Actions</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <AppLayout>
        <div className="w-full relative">
          <div className="w-full flex justify-between">
            <h2>Users</h2>
            <div className="flex items-center space-x-2">
              <Button onClick={() => toggleAddingUser((b) => !b)}>
                {isAddingUser ? 'Cancel' : 'Add User'}
              </Button>
            </div>
          </div>
          <div className="flex flex-col w-full space-y-3 my-4">
            <Header />
            {isAddingUser && (
              <NewUserRow submit={createNewUser} cancel={cancel} />
            )}
            {sortedUsers.map((user) => (
              <AdminTableRow
                key={user.id}
                user={user}
                submit={(newUser) => saveUser(user.id, newUser)}
                delete={() => handleDeleteUser(user.id)}
              />
            ))}
          </div>
        </div>
      </AppLayout>
    </>
  );
};

export default AdminPage;
