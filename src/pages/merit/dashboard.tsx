import React from 'react';
import Unauthorized from '@/shared/components/Unauthorized';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import ErrorMessage from '@/shared/components/ErrorMessage';
import GraphCard from '@/components/Merit/GraphCard';

const tenureData = [
  { x: '0-5', y: 10 },
  { x: '5-10', y: 20 },
  { x: '10-15', y: 7 },
  { x: '15+', y: 45 },
];

const nonTenureData = [
  { x: '0-5', y: 5 },
  { x: '5-10', y: 15 },
  { x: '10-15', y: 14 },
  { x: '15+', y: 3 },
];

const Dashboard: React.FC = () => {
  const { data: session, status } = useSession();
  const name = session?.user?.name;
  const email = session?.user?.email;

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return <Unauthorized />;
  }

  if (!session?.user.merit) {
    return <ErrorMessage message="You are not authorized to view this page." />;
  }

  return (
    <div className="flex w-full flex-col">
      <Head>
        <title>Dashboard</title>
      </Head>
      <h1>Dashboard</h1>
      <p className="my-4 text-lg text-red-500">Welcome, {name || 'User'}! </p>
      <div className="flex w-full items-center">
        <GraphCard label="Tenured/Tenure Track" data={tenureData} />
        <GraphCard label="Non-Tenure" data={nonTenureData} />
      </div>
    </div>
  );
};

export default Dashboard;
