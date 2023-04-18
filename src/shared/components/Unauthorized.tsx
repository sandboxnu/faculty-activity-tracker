import React from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

const Unauthorized: React.FC = () => {
  return (
    <div className="flex flex-col items-center mx-auto">
      <div className="h-[20vh]" />
      <p>You must be logged in to view this page!</p>
      <button
        onClick={() => signIn('google', { callbackUrl: '/account-setup' })}
        className="my-5 button bg-ruby border-ruby-dark text-white"
      >
        Login
      </button>
    </div>
  );
};

export default Unauthorized;
