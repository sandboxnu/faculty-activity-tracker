import React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Button from './Button';
import Link from 'next/link';

const Header: React.FC = () => {
  const { status } = useSession();
  const router = useRouter();
  const signedIn = status === 'authenticated';
  const notSignOutPage = !(router.pathname === '/auth/signout');

  return (
    <div className="flex w-screen items-baseline bg-black px-5 py-3 font-bold">
      <Link href="/dashboard" passHref legacyBehavior>
        <a>
          <Image
            src="/media/newLogo.svg"
            alt="Faculty Activity Tracker Logo"
            width={250}
            height={70}
            className="cursor-pointer"
          />
        </a>
      </Link>
      {signedIn && notSignOutPage && (
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
