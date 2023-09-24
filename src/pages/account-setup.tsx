import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
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
import AppLayout from '@/shared/components/AppLayout';
import { useSelector } from 'react-redux';
import { selectStep } from '@/store/accountsetup.store';

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
      props: { name: session.user.name, email: session.user.email },
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
      <AppLayout hideSidebars>
        <div className="flex flex-col w-full">{SetupStepComponent[step]}</div>
      </AppLayout>
    </div>
  );
};

export default AccountSetupPage;
