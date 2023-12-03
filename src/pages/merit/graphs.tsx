import ErrorMessage from '@/shared/components/ErrorMessage';
import Unauthorized from '@/shared/components/Unauthorized';
import { useSession } from 'next-auth/react';
import ActivityHistogram, {
  ActivityHistogramData,
  mockNonTenureHistogramData,
  mockTenureHistogramData,
} from '@/components/Merit/ActivityHistogram';
import ScoreScatterplot, {
  ScoreScatterplotData,
  mockNonTenureScatterplotData,
  mockTenureScatterplotData,
} from '@/components/Merit/ScoreScatterplot';
import { getActivityCountsByUser } from '@/services/activity';
import { getAllProfessorScores } from '@/services/professorScore';
import { getUsersWithInfo } from '@/services/user';
import { organizeActivityHistogramData } from '@/shared/utils/activity.util';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';

interface GraphPageProps {
  error?: string;
  tenureActivityData?: ActivityHistogramData;
  nonTenureActivityData?: ActivityHistogramData;
  tenureScoreScatterplotData?: ScoreScatterplotData;
  nonTenureScoreScatterplotData?: ScoreScatterplotData;
}

const USE_MOCK_DATA = process.env.VERCEL_ENV !== 'production';

export const getServerSideProps: GetServerSideProps<GraphPageProps> = async (
  context,
) => {
  const session = await getSession(context);

  if (!session?.user.merit) {
    return {
      props: {
        error: 'You must be a merit committee member to view this page!',
      },
    };
  }
  // collect activity distribution for tenured and non-tenured professors
  const activityDistribution = await getActivityCountsByUser();
  const users = await getUsersWithInfo(
    activityDistribution.map((a) => a.userId),
  );
  const tenureUserIds = users
    .filter((u) => u.professorInfo?.position === 'TENURE')
    .map((u) => u.id);
  const nonTenureUserIds = users
    .filter((u) => u.professorInfo?.position === 'NONTENURE')
    .map((u) => u.id);
  const tenureActivityCounts = activityDistribution.filter((a) =>
    tenureUserIds.includes(a.userId),
  );
  const nonTenureActivityCounts = activityDistribution.filter((a) =>
    nonTenureUserIds.includes(a.userId),
  );
  const distributionGroups: [number, number][] = [
    [0, 5],
    [5, 10],
    [10, 15],
    [15, 20],
    [25, 30],
  ];
  const tenureActivityData = organizeActivityHistogramData(
    tenureActivityCounts,
    distributionGroups,
  );
  const nonTenureActivityData = organizeActivityHistogramData(
    nonTenureActivityCounts,
    distributionGroups,
  );

  // collect scores for tenured and non-tenured professors
  const professorScores = await getAllProfessorScores();
  const tenureScores = professorScores
    .filter((s) => tenureUserIds.includes(s.userId))
    .map(({ userId, totalScore: score }) => ({ userId, score }));
  const nonTenureScores = professorScores
    .filter((s) => nonTenureUserIds.includes(s.userId))
    .map(({ userId, totalScore: score }) => ({ userId, score }));
  tenureScores.sort((a, b) => b.score - a.score);
  nonTenureScores.sort((a, b) => b.score - a.score);

  return {
    props: {
      activityDistribution,
      tenureActivityData: USE_MOCK_DATA
        ? mockTenureHistogramData
        : tenureActivityData,
      nonTenureActivityData: USE_MOCK_DATA
        ? mockNonTenureHistogramData
        : nonTenureActivityData,
      tenureScoreScatterplotData: USE_MOCK_DATA
        ? mockTenureScatterplotData
        : tenureScores,
      nonTenureScoreScatterplotData: USE_MOCK_DATA
        ? mockNonTenureScatterplotData
        : nonTenureScores,
    },
  };
};

const GraphPage: React.FC<GraphPageProps> = ({
  error,
  tenureActivityData,
  nonTenureActivityData,
  tenureScoreScatterplotData,
  nonTenureScoreScatterplotData,
}) => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return <Unauthorized />;
  }

  if (!session?.user.merit) {
    return <ErrorMessage message="You are not authorized to view this page." />;
  }

  if (
    error ||
    !tenureActivityData ||
    !nonTenureActivityData ||
    !tenureScoreScatterplotData ||
    !nonTenureScoreScatterplotData
  )
    return <ErrorMessage message={error || 'Could not collect graph data.'} />;

  return (
    <div className="flex w-full flex-col">
      <Head>
        <title>Graphs</title>
      </Head>
      <div className="mt-2 flex w-full justify-between">
        <div className="flex w-1/2 flex-col items-center space-y-8">
          <ScoreScatterplot
            label="Tenured/Tenure Track"
            data={tenureScoreScatterplotData}
          />
          <ScoreScatterplot
            label="Non-Tenure"
            data={nonTenureScoreScatterplotData}
          />
        </div>
        <div className="flex w-1/2 flex-col items-center space-y-8">
          <ActivityHistogram
            label="Tenured/Tenure Track"
            data={tenureActivityData}
          />
          <ActivityHistogram label="Non-Tenure" data={nonTenureActivityData} />
        </div>
      </div>
    </div>
  );
};

export default GraphPage;
