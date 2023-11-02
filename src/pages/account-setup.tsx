import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { CreateUserDto } from '@/models/user.model';
import { CreateProfessorInfoDto } from '@/models/professorInfo.model';
import RoleSetup from '@/components/AccountSetup/RoleSetup';
import { Role, SabbaticalOption } from '@prisma/client';
import UserInfoForm from '@/components/AccountSetup/UserInfoForm';
import { createUser } from '@/client/users.client';
import { ResponseStatus } from '@/client/activities.client';
import ProfessorInfoForm from '@/components/AccountSetup/ProfessorInfoForm';
import { updateProfessorInfoForUser } from '@/client/professorInfo.client';
import { useDispatch, useSelector } from 'react-redux';
import { selectStep, setName, setEmail } from '@/store/accountSetup.store';

interface AccountSetupPageProps {
  name?: string;
  email?: string;
  error?: string;
}

export const getServerSideProps: GetServerSideProps<
  AccountSetupPageProps
> = async (context) => {
  const session = await getSession(context);

  if (session?.user?.id) {
    // user already exists - redirect to profile
    return {
      redirect: {
        destination: '/profile',
        permanent: false,
      },
    };
  }
  if (session?.user?.email && session?.user?.name) {
    return {
      props: {
        name: session.user.name,
        email: session.user.email,
        hideSidebars: true,
      },
    };
  } else {
    return {
      props: { error: 'Account information could not be obtained.' },
    };
  }
};

type AccountSetupStep = 'role' | 'user info' | 'professor info';

const AccountSetupPage: React.FC<AccountSetupPageProps> = ({
  name,
  email,
  error,
}) => {
  const [pageError, setPageError] = useState<string | null>(error || null);
  const step = useSelector(selectStep);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (name) dispatch(setName(name));
    if (email) dispatch(setEmail(email));
  }, [name, email, dispatch]);

  const SetupStepComponent: Record<AccountSetupStep, JSX.Element> = {
    role: <RoleSetup />,
    'user info': <UserInfoForm />,
    'professor info': <ProfessorInfoForm />,
  };

  if (pageError || !email || !name)
    return (
      <p className="w-full text-center text-red-500">
        Error: {pageError || 'unknown error.'}
      </p>
    );

  return (
    <div className="flex w-full">
      <Head>
        <title>Account Setup</title>
      </Head>
      <div className="mx-auto flex w-full max-w-[480px] flex-col">
        {SetupStepComponent[step]}
      </div>
    </div>
  );
};

export default AccountSetupPage;
