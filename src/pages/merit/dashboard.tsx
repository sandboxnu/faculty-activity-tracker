import React from 'react';
import Unauthorized from '@/shared/components/Unauthorized';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import ErrorMessage from '@/shared/components/ErrorMessage';
import GraphCard from '@/components/Merit/GraphCard';
import { GetServerSideProps } from 'next';

const tenureData = [
  { x: '0-5', y: 62 },
  { x: '5-10', y: 85 },
  { x: '10-15', y: 104 },
  { x: '15-20', y: 81 },
  { x: '20+', y: 18 },
];

const nonTenureData = [
  { x: '0-5', y: 61 },
  { x: '5-10', y: 83 },
  { x: '10-15', y: 76 },
  { x: '15-20', y: 22 },
  { x: '20+', y: 9 },
];

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      hideRightSidebar: true,
    },
  };
};

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
        <div className="flex w-1/2 justify-center">
          <GraphCard label="Tenured/Tenure Track" data={tenureData} />
        </div>
        <div className="flex w-1/2 justify-center">
          <GraphCard label="Non-Tenure" data={nonTenureData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
