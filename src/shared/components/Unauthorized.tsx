import React from 'react';
import Link from 'next/link';

const Unauthorized: React.FC = () => {
  return (
    <div className="flex flex-col items-center mx-auto">
      <div className="h-[20vh]" />
      <p>You must be logged in to view this page!</p>
      <Link href="/api/auth/signin" className="my-5 button bg-ruby border-ruby-dark text-white">
        Login
      </Link>
    </div>
  );
};

export default Unauthorized;
