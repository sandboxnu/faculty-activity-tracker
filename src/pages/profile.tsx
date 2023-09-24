import ProfileInfo, {
  ProfileInformation,
} from '@/components/Profile/ProfileInfo';
import { getProfessorInfoForUser } from '@/services/professorInfo';
import { getUserById, getUserWithInfo } from '@/services/user';
import { toTitleCase } from '@/shared/utils/misc.util';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import React from 'react';

interface ProfilePageProps {
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

  return {
    props: {
      info: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        position: user.professorInfo?.position || toTitleCase(user.role || ''),
        teachingPercent: user.professorInfo?.teachingPercent || 0,
        researchPercent: user.professorInfo?.researchPercent || 0,
        servicePercent: user.professorInfo?.servicePercent || 0,
      },
    },
  };
};

const Profile: React.FC<ProfilePageProps> = ({ info, error }) => {
  if (error || !info)
    return (
      <p className="text-red-500 w-full text-center mt-20">
        Error: {error || 'unknown error.'}
      </p>
    );

  return (
    <div className="w-full">
      <Head>
        <title>My Profle</title>
      </Head>
      <ProfileInfo {...info} />
    </div>
  );
};

export default Profile;
