// TODO: Admin page
import { useSession, getSession } from 'next-auth/react';
import Unauthorized from '@/shared/components/Unauthorized';
import React, { useState } from 'react';
import { UserDto } from 'src/models/user.model';
import { User } from '@prisma/client';
import { getAllUsers, getUserById } from '@/services/user';
import { GetServerSideProps } from 'next';

interface AdminPageProps {
  users?: UserDto[];
  error?: string;
}

const AdminPage: React.FunctionComponent = (props: AdminPageProps) => {
  const { data: session, status } = useSession();
  const name = session?.user?.name;
  const email = session?.user?.email;
  const users: User[] | undefined = props.users;
  const [userMap, setUserMap] = useState({});
  const headers = ['Name', 'Role', 'Preffered Name', 'Email', 'Actions'];

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

  const createUsersMap = (usersArray: User[]) => {};

  const handleAddUser: React.MouseEventHandler<HTMLButtonElement> = () => {
    //show modal with form to add users??? - might not need
  };

  const handleEditUser: React.MouseEventHandler<HTMLButtonElement> = () => {
    // have users edit input and then save, take in eited fields (on change) and user.id and map those in object
  };

  const handleDeleteUser: React.MouseEventHandler<HTMLButtonElement> = () => {
    // show confirmation modal -> y : delete || n : just close modal
  };

  // TODO: Add user button, Remove user button, Edit user button
  return (
    <>
      <div className="m-2">
        <div className="flex w-100">
          <button className="my-3" onClick={handleAddUser}>
            Add User
          </button>
        </div>
        <div className="flex justify-center w-100">
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
                return (
                  <tr>
                    <td className="border border-slate-700 px-1">
                      <input
                        className="pb-1"
                        type="text"
                        id="fname"
                        name="fname"
                        value={user.firstName}
                      ></input>
                      <input
                        className="pt-1"
                        type="text"
                        id="lname"
                        name="lname"
                        value={user.lastName}
                      ></input>
                    </td>
                    <td className="border border-slate-700 px-1">
                      {user.role}
                    </td>
                    <td className="border border-slate-700 px-1">
                      <input
                        className=""
                        type="text"
                        id="pname"
                        name="pname"
                        value={user.preferredName || 'N/A'}
                      ></input>
                    </td>
                    <td className="border border-slate-700 px-1">
                      <input
                        className=""
                        type="text"
                        id="email"
                        name="email"
                        value={user.email}
                      ></input>
                    </td>
                    <td className="border border-slate-700 px-1">
                      <button className="m-1" onClick={handleEditUser}>
                        Edit User
                      </button>
                      <button
                        className="m-1 bg-ruby border-ruby-dark text-white"
                        onClick={handleDeleteUser}
                      >
                        Delete User
                      </button>
                    </td>
                  </tr>
                );
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
