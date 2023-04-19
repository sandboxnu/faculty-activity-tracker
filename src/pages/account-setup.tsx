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
  const [userRole, setUserRole] = useState<Role | null>(null);
  const [userInfo, setUserInfo] = useState<CreateUserDto | null>(null);
  const [step, setStep] = useState<AccountSetupStep>('role');
  const router = useRouter();

  const confirmRole = (role: Role) => {
    setUserRole(role);
    setStep('user info');
  };

  const createNewUser = (
    firstName: string,
    lastName: string,
    preferredName?: string,
  ) => {
    if (!email || !userRole) return;

    let newUser: CreateUserDto = {
      email,
      firstName,
      lastName,
      preferredName: preferredName || null,
      role: userRole,
      dateModified: BigInt(Date.now()),
    };
    setStep('professor info');
    setUserInfo(newUser);
  };

  const createProfessorInfo = async (
    position: string,
    teachingPercent: number,
    researchPercent: number,
    servicePercent: number,
    sabbatical: SabbaticalOption,
    teachingReleaseExplanation?: string,
  ) => {
    if (!userInfo) return;

    const newUser = await createUser(userInfo);

    if (newUser === ResponseStatus.UnknownError) setPageError('Unknown Error');
    else {
      let newProfessorInfo: CreateProfessorInfoDto = {
        userId: newUser.id,
        position,
        teachingPercent,
        researchPercent,
        servicePercent,
        sabbatical,
        teachingReleaseExplanation: teachingReleaseExplanation || null,
      };

      const res = await updateProfessorInfoForUser(newProfessorInfo);
      if (res === ResponseStatus.Unauthorized) setPageError('Unauthorized');
      else if (res === ResponseStatus.BadRequest) setPageError('Bad request');
      else if (res === ResponseStatus.UnknownError)
        setPageError('Unknown error');
      else {
        router.push('/profile');
      }
    }
  };

  const SetupStepComponent: Record<AccountSetupStep, JSX.Element> = {
    role: <RoleSetup confirmRole={confirmRole} />,
    'user info': (
      <UserInfoForm
        initialName={name || ''}
        submit={createNewUser}
        back={() => {
          setStep('role');
          setUserRole(null);
        }}
      />
    ),
    'professor info': (
      <ProfessorInfoForm
        submit={createProfessorInfo}
        back={() => {
          setStep('user info');
        }}
      />
    ),
  };

  if (pageError || !email || !name)
    return (
      <p className="w-full text-center text-red">
        Error: {pageError || 'unknown error.'}
      </p>
    );

  return (
    <div className="flex w-full">
      <Head>
        <title>Account Setup</title>
      </Head>
      <div className="flex flex-col w-full">
        <span className="flex items-baseline space-x-2 mb-4">
          <h2>Welcome, {name}!</h2>
          <p className="text-lg font-light">Let&apos;s set up your account.</p>
        </span>
        {SetupStepComponent[step]}
      </div>
    </div>
  );
};

export default AccountSetupPage;
