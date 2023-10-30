import React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Button from './Button';

const Header: React.FC = () => {
  const { status } = useSession();
  const router = useRouter();
  const signedIn = status === 'authenticated';

  return (
    <div className="flex w-screen items-baseline bg-black px-5 py-3 font-bold">
      <Image
        src="/media/newLogo.svg"
        alt="Faculty Activity Tracker Logo"
        width={250}
        height={70}
      />
      {signedIn && (
        <Button
          onClick={() => router.push('/api/auth/signout')}
          addOnClass="ml-auto my-auto mr-5"
        >
          Sign Out
        </Button>
      )}
    </div>
  );
};

export default Header;
