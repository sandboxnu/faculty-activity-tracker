import ProfileContainer from '@/components/Profile/ProfileContainer';
import { getUserWithInfo } from '@/services/user';
import { ProfileInformation } from '@/store/profile.store';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import React from 'react';

interface ProfilePageProps {
  userId?: number;
  info?: ProfileInformation;
  error?: string;
}

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async (
  context,
) => {
  const session = await getSession(context);
  const userId = session?.user?.id;

  if (!userId)
    return {
      redirect: {
        destination: '/account-setup',
        permanent: false,
      },
    };

  const user = await getUserWithInfo(userId);
  if (!user) return { props: { error: 'User not found.' } };

  if (!user.professorInfo)
    return {
      redirect: {
        destination: '/account-setup',
        permanent: false,
      },
    };

  return {
    props: {
      userId,
      info: {
        firstName: user.firstName,
        lastName: user.lastName,
        title: user.professorInfo.title ?? '',
        email: user.email,
        position: user.professorInfo.position,
        sabbatical: user.professorInfo.sabbatical,
        teachingPercent: user.professorInfo.teachingPercent,
        researchPercent: user.professorInfo.researchPercent,
        servicePercent: user.professorInfo.servicePercent,
        phoneNumber: user.professorInfo.phoneNumber ?? '',
        officeLocation: user.professorInfo.officeLocation ?? '',
      },
    },
  };
};

const Profile: React.FC<ProfilePageProps> = ({ userId, info, error }) => {
  if (error || !info || !userId)
    return (
      <p className="mt-20 w-full text-center text-red-500">
        Error: {error || 'unknown error.'}
      </p>
    );

  return (
    <div className="w-full">
      <Head>
        <title>My Profle</title>
      </Head>
      <ProfileContainer userId={userId} currentInfo={info} />
    </div>
  );
};

export default Profile;
