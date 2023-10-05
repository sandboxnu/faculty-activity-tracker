import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { ActivityDto } from '@/models/activity.model';
import { ProfessorInfoDto } from '@/models/professorInfo.model';
import { getSession } from 'next-auth/react';
import { getActivitiesByQuery, getActivityById } from '@/services/activity';
import { bigintToJSON } from '@/shared/utils/misc.util';
import { getProfessorInfoForUser } from '@/services/professorInfo';

interface ProfessorScoringPageProps {
  activities?: ActivityDto[];
  professorInfo?: ProfessorInfoDto;
  error?: string;
}

export const getServerSideProps: GetServerSideProps<
  ProfessorScoringPageProps
> = async (context) => {
  const session = await getSession(context);
  const userId = session?.user?.id;
  const professorId = context.params?.professorId
    ? parseInt(context.params.professorId as string)
    : undefined;
  if (!professorId) {
    return {
      props: {
        error: 'Professor Not Found',
      },
    };
  }
  if (!userId) {
    return {
      props: {
        error: 'User not found.',
      },
    };
  }

  const professorInfo = await getProfessorInfoForUser(professorId);
  if (!professorInfo) {
    return {
      props: {
        error: 'Professor Info not found.',
      },
    };
  }

  const activities = await getActivitiesByQuery({
    userId: professorId,
  });

  if (activities) {
    return {
      props: {
        activities: bigintToJSON(activities),
        professorInfo: bigintToJSON(professorInfo),
      },
    };
  } else {
    return {
      props: { error: 'No activities not found for user' },
    };
  }
};

const ProfessorScoringPage: React.FC<ProfessorScoringPageProps> = ({}) => {
  return (
    <div className="flex flex-col w-full">
      <Head>
        <title>Professor Scoring Page</title>
      </Head>
      <h1>Professor Scoring Page</h1>
      <p className="text-lg text-red-500 my-4">Professor Scoring Page </p>
    </div>
  );
};

export default ProfessorScoringPage;
