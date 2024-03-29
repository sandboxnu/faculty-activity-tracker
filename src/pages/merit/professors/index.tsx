import ProfessorCard from '@/components/ProfessorSearch/ProfessorCard';
import { ProfessorInfoDto } from '@/models/professorInfo.model';
import { ProfessScoreDto } from '@/models/professorScore.model';
import { UserDto } from '@/models/user.model';
import { getAllProfessorInfo } from '@/services/professorInfo';
import { getAllProfessorScores } from '@/services/professorScore';
import { getUsersByQuery } from '@/services/user';
import { bigintToJSON } from '@/shared/utils/misc.util';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import ErrorMessage from '@/shared/components/ErrorMessage';
import Unauthorized from '@/shared/components/Unauthorized';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import groupByFirstLetterAndUserId from '@/shared/utils/professorScore.util';
import ProfessorCardGroup from '@/components/ProfessorSearch/ProfessorCardGroup';

interface ProfessorSearchPageProps {
  users?: UserDto[];
  scores?: ProfessScoreDto[];
  info?: ProfessorInfoDto[];
  error?: string;
}

export const getServerSideProps: GetServerSideProps<
  ProfessorSearchPageProps
> = async (context) => {
  const session = await getSession(context);
  const users = await getUsersByQuery({
    role: 'FACULTY',
  });

  if (!users) {
    return {
      props: {
        error: 'User not found.',
      },
    };
  }

  const scores = await getAllProfessorScores();

  if (!scores) {
    return {
      props: {
        error: 'Scores not found.',
      },
    };
  }

  const info = await getAllProfessorInfo();

  if (!info) {
    return {
      props: {
        error: 'Info not found.',
      },
    };
  }

  return {
    props: {
      users: bigintToJSON(users),
      scores: bigintToJSON(scores),
      info: bigintToJSON(info),
    },
  };
};

const ProfessorSearchPage: React.FC<ProfessorSearchPageProps> = ({
  users,
  scores,
  info,
}) => {
  const { data: session, status } = useSession();
  const groupedData = groupByFirstLetterAndUserId(
    users || [],
    scores || [],
    info || [],
  );

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return <Unauthorized />;
  }

  if (!session?.user.merit) {
    return <ErrorMessage message="You are not authorized to view this page." />;
  }

  return (
    <div className="flex w-full flex-col">
      <Head>
        <title>Professors</title>
      </Head>
      <div className="flex flex-col flex-wrap justify-center pr-[122px]">
        {Array.from(groupedData.entries())
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map(([letter, tuples]) => (
            <div key={letter} className="w-full pb-4">
              <ProfessorCardGroup title={letter} profData={tuples} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProfessorSearchPage;
