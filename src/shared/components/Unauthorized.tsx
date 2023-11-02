import React from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

const Unauthorized: React.FC = () => {
  return (
    <div className="mx-auto flex flex-col items-center">
      <div className="h-[20vh]" />
      <p>You must be logged in to view this page!</p>
      <button
        onClick={() => signIn('google', { callbackUrl: '/account-setup' })}
        className="button my-5 bg-red-500 text-white"
      >
        Login
      </button>
    </div>
  );
};

export default Unauthorized;
