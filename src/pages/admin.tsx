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
import { isAdminUser } from '@/shared/utils/user.util';
import Head from 'next/head';
import Image from 'next/image';
import NewUserRow from '@/components/AdminPage/NewUserRow';

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

  // const user: User | 'not found' = await getUserById(userId);
  // if (user === 'not found') return { props: { error: 'User not found' } };

  // if (user && !isAdminUser(user)) return { props: { error: 'bad role' } };
  if (!session?.user?.admin) return { props: { error: 'bad role' } };

  const users: User[] = await getAllUsers();

  return { props: { users } };
};

const Header = () => (
  <div className="flex w-full items-center px-4">
    <div className="basis-10">
      <p>First Name</p>
    </div>
    <div className="basis-20">
      <p>Last Name</p>
    </div>
    <div className="basis-30">
      <p>Email</p>
    </div>
    <div className="basis-30">
      <p>Role</p>
    </div>
    <div className="basis-10">
      <p>Actions</p>
    </div>
  </div>
);

const AdminPage: React.FC<AdminPageProps> = ({ users, error }) => {
  const { data: session, status } = useSession();
  const name = session?.user?.name;
  const email = session?.user?.email;
  const [isAddingUser, toggleAddingUser] = useState<boolean>(false);

  const router = useRouter();

  const cancel = () => {
    toggleAddingUser(false);
  };

  const handleAddUser: React.MouseEventHandler<HTMLButtonElement> = () => {
    toggleAddingUser(!isAddingUser);
  };

  const createNewUser = (newUser: CreateUserDto) => {
    addUser(newUser)
      .then((res) => {
        if (res === ResponseStatus.Success) {
          toggleAddingUser(!isAddingUser);
          router.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // make sure user is logged in and MC member
  if (status === 'unauthenticated' || error === 'User not found') {
    return <Unauthorized />;
  }

  if (error || !users) {
    return (
      <p className="text-red w-full text-center mt-20">
        Error: {error || 'unknown error'}
      </p>
    );
  }

  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <div className="w-full relative">
        <div className="w-full flex justify-between">
          <h2>Users</h2>
          <div className="flex items-center space-x-2">
            <button onClick={isAddingUser ? cancel : handleAddUser}>
              {isAddingUser ? 'Cancel' : 'Add User'}
            </button>
          </div>
        </div>
        <div className="flex flex-col w-full space-y-3 my-4">
          <Header />
          {isAddingUser && (
            <NewUserRow submit={createNewUser} cancel={cancel} />
          )}
          {users.map((user) => (
            <AdminTableRow key={user.id} user={user} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
