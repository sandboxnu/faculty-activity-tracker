import React from 'react';
import Unauthorized from '@/shared/components/Unauthorized';
import { useSession } from 'next-auth/react';
import Head from 'next/head';

import { Card, BarChart } from '@tremor/react';

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

  const chartdata = [
    { x: '0-5', y: 10 },
    { x: '5-10', y: 20 },
    { x: '10-15', y: 7 },
    { x: '15+', y: 45 },
  ];

  const chartdata2 = [
    { x: '0-5', y: 5 },
    { x: '5-10', y: 15 },
    { x: '10-15', y: 14 },
    { x: '15+', y: 3 },
  ];

  return (
    <div className="flex w-full flex-col">
      <Head>
        <title>Dashboard</title>
      </Head>
      <h1>Dashboard</h1>
      <p className="my-4 text-lg text-red-500">Welcome, {name || 'User'}! </p>

      <div className="flex gap-4">
        <Card className="bg-gray-100">
          <span className="text-heading-3">Tenured/Tenure Track</span>
          <BarChart
            className="mt-6"
            data={chartdata}
            index="x"
            categories={['y']}
            colors={['red']}
            yAxisWidth={48}
          />
        </Card>
        <Card>
          <BarChart
            className="mt-6"
            data={chartdata2}
            index="x"
            categories={['y']}
            colors={['red']}
            yAxisWidth={48}
          />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
