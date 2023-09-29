import React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const Header: React.FC = () => {
  const { status } = useSession();
  const signedIn = status === 'authenticated';

  return (
    <div className="flex items-baseline w-screen bg-black font-bold px-5 py-3">
      <Image src="/media/neuLogo.svg" alt="CAMD Logo" width={200} height={50} />
      {signedIn && (
        <Link
          href="/api/auth/signout"
          className="px-3 py-2 bg-red-500 text-white rounded-xl my-auto ml-auto mr-5"
        >
          Sign Out
        </Link>
      )}
    </div>
  );
};

export default Header;
