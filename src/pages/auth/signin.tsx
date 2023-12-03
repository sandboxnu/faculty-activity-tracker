import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { getProviders, signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import Button from '@/shared/components/Button';
import Image from 'next/image';

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex w-full flex-grow items-center justify-center">
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <div className="flex-col items-center justify-center gap-3 rounded-lg bg-gray-100 px-14 py-10 shadow-lg">
            <div className="text-center text-heading-1">
              Create your account
            </div>
            <div className="mb-8 text-center text-body">
              Sign in with your Google account to get started.
            </div>

            <Button
              variant="signIn"
              fillContainer
              onClick={() => signIn(provider.id)}
            >
              <div className="flex items-center justify-center">
                <Image
                  className="mr-4 inline"
                  src="/media/googleIcon.svg"
                  alt="Google icon"
                  width={32}
                  height={32}
                />
                <div className="text-heading-3">
                  {/* <Image className='inline' src="/media/googleIcon.svg" alt="Google icon" width={32} height={32} /> */}
                  Sign in with Google
                </div>
              </div>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: '/' } };
  }

  const providers = await getProviders();

  return {
    props: {
      providers: providers ?? [],
      hideLeftSidebar: true,
      hideRightSidebar: true,
    },
  };
}
