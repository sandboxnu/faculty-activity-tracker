import React from 'react';
import Unauthorized from '@/shared/components/Unauthorized';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import ErrorMessage from '@/shared/components/ErrorMessage';
import { GetServerSideProps } from 'next';
import ActivityHistogram, {
  mockNonTenureHistogramData,
  mockTenureHistogramData,
} from '@/components/Merit/ActivityHistogram';

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
          <ActivityHistogram
            label="Tenured/Tenure Track"
            data={mockTenureHistogramData}
          />
        </div>
        <div className="flex w-1/2 justify-center">
          <ActivityHistogram
            label="Non-Tenure"
            data={mockNonTenureHistogramData}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
