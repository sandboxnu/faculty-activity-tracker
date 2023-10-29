import React from 'react';
import Unauthorized from '@/shared/components/Unauthorized';
import { useSession } from 'next-auth/react';
import Head from 'next/head';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const name = session?.user?.name;
  const email = session?.user?.email;

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return <Unauthorized />;
  }

  return (
    <div className="flex flex-col w-full">
      <Head>
        <title>Dashboard</title>
      </Head>
      <h1>Dashboard</h1>
      <p className="text-lg text-ruby my-4">Welcome, {name || 'User'}! </p>
    </div>
  );
};

export default Dashboard;
