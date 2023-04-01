import ProfileInfo, { ProfileInformation } from '@/components/Profile/ProfileInfo';
import { getProfessInfoForUser } from '@/services/professorInfo';
import { getUserById } from '@/services/user';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import React from 'react';

interface ProfilePageProps {
  info?: ProfileInformation,
  error?: string;
}

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async (context) => {
  const session = await getSession(context);
  const userId = session?.user?.id;
  
  if (!userId) return { props: { error: 'User not found.' } };

  const user = await getUserById(userId);
  if (user === "not found") return { props: { error: 'User not found.' } };
  
  const info = await getProfessInfoForUser(userId);
  if (info === "not found") return { props: { error: 'Could not find professor information.' } };

  return { props: {
    info: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      position: info.position,
      teachingPercent: info.teachingPercent,
      researchPercent: info.researchPercent,
      servicePercent: info.servicePercent
    }
   } };
};

const Profile: React.FC<ProfilePageProps> = ({ info, error }) => {
  if (error || !info) return <p className='text-red w-full text-center mt-20'>Error: {error || "unknown error."}</p>

  return (
    <div className='px-12 py-5 w-full'>
      <Head>
        <title>My Profle</title>
      </Head>
      <ProfileInfo {...info} />
    </div>
  );
};

export default Profile;
