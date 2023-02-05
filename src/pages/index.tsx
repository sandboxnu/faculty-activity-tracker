import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Unauthorized from '@/shared/components/Unauthorized';

const Home: React.FC = () => {
  const { data: session, status } = useSession();
  const name = session?.user?.name;
  const email = session?.user?.email;
  console.log(email);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return <Unauthorized />;
  }

  return (
    <div>
      <h1>Home</h1>
      <p className="text-2xl text-ruby">Welcome, {name || 'User'}! </p>
    </div>
  );
};

export default Home;
