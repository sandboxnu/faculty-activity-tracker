import { signOut } from 'next-auth/react';
import Button from '@/shared/components/Button';
import { useRouter } from 'next/router';

export default function SignOut() {
  const router = useRouter();
  return (
    <div className="flex w-full flex-grow items-center justify-center">
      <div className="flex-col items-center justify-center gap-3 rounded-lg bg-gray-100 px-10 py-7 shadow-lg">
        <div className="text-center text-heading-1">Sign out</div>
        <div className="py-4 text-center text-body">
          Are you sure you want to sign out?
        </div>
        <div className="flex justify-between gap-20 py-1">
          <Button
            variant="secondary"
            onClick={() => {
              router.back();
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            Yes, sign out
          </Button>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: { hideSidebars: true },
  };
}
