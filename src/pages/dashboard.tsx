import React from 'react';
import Unauthorized from '@/shared/components/Unauthorized';
import { useSession } from 'next-auth/react';

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

  return (
    <div className="flex flex-col w-full px-8">
      <h1>Dashboard</h1>
      <p className="text-2xl text-ruby">Welcome, {name || 'User'}! </p>
    </div>
  );
};

export default Dashboard;
