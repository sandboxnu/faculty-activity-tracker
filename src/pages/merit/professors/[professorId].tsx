import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { ActivityDto, UpdateActivityDto } from '@/models/activity.model';
import { NarrativeDto } from '@/models/narrative.model';
import { ProfessorInfoDto } from '@/models/professorInfo.model';
import { getSession } from 'next-auth/react';
import { getActivitiesByQuery, getActivityById } from '@/services/activity';
import { bigintToJSON, toTitleCase } from '@/shared/utils/misc.util';
import { getProfessorInfoForUser } from '@/services/professorInfo';
import { NarrativeCategory } from '@prisma/client';
import { useState } from 'react';
import { UserDto } from '@/models/user.model';
import {
  ResponseStatus,
  updateActivityClient,
} from '@/client/activities.client';
import { seperateActivitiesByCategory } from '@/shared/utils/activity.util';
import ActivityGroup from '@/components/ProfessorScoring/ActivityGroup';
import { getUserById } from '@/services/user';
import {
  getNarrativesForUser,
} from '@/services/narrative';
import { seperateNarrativesByCategory } from '@/shared/utils/narrative.util';
import TenureBadge from '@/components/ProfessorScoring/TenureBadge';

interface ProfessorScoringPageProps {
  activities?: ActivityDto[];
  professorInfo?: ProfessorInfoDto;
  user?: UserDto;
  narratives?: NarrativeDto[];
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

  const user = await getUserById(professorId);
  if (!user) {
    return {
      props: {
        error: 'User not found.',
      },
    };
  }

  const narratives = await getNarrativesForUser(professorId);
  if (!narratives) {
    return {
      props: {
        error: 'Narratives not found.',
      },
    };
  }

  if (activities) {
    return {
      props: {
        activities: bigintToJSON(activities),
        professorInfo: bigintToJSON(professorInfo),
        user: bigintToJSON(user),
        narratives: bigintToJSON(narratives),
      },
    };
  } else {
    return {
      props: { error: 'No activities not found for user' },
    };
  }
};

const ProfessorScoringPage: React.FC<ProfessorScoringPageProps> = ({
  activities: initialActivities,
  narratives: initialNarratives,
  professorInfo,
  error: initialError,
  user,
}) => {
  const [activities, setActivities] = useState<ActivityDto[]>(
    initialActivities || [],
  );

  const [narratives, setNarratives] = useState<NarrativeDto[]>(
    initialNarratives || [],
  );
  const [error, setError] = useState<string | null>(initialError || null);

  const updateActivity = (updatedActivity: UpdateActivityDto) => {
    updateActivityClient(updatedActivity).then((res) => {
      if (res === ResponseStatus.Success) {
        setActivities((activities) => [
          ...activities.filter((u) => u.id !== updatedActivity.id),
          updatedActivity as ActivityDto,
        ]);
      } else {
        setError('Unknown error');
      }
    });
  };

  const activitiesByCategory = seperateActivitiesByCategory(activities);
  const narrativesByCategory = seperateNarrativesByCategory(narratives);

  const getNarrativeByCategory = (
    category: NarrativeCategory,
  ): NarrativeDto | undefined => {
    const narratives = narrativesByCategory[category];
    return narratives[0];
  };

  return (
    <div className="flex flex-col w-full px-[40px]">
      <Head>
        <title>Professor Scoring Page</title>
      </Head>
      <div className="items-center inline-flex text-heading-1 pt-[16px] pb-[32px]">
        Professor {user?.firstName} {user?.lastName}
        <div className="ml-[8px]">
          <TenureBadge
            isTenure={
              !!professorInfo?.position.toLowerCase().includes('tenure')
            }
          />
        </div>
      </div>
      {activities && activities.length > 0 && (
        <div className="flex flex-col w-full">
          {Object.entries(activitiesByCategory).map(
            ([category, activities]) => (
              <div key={category} className="flex flex-col w-full">
                <ActivityGroup
                  activities={activities}
                  title={toTitleCase(category)}
                  narrative={getNarrativeByCategory(
                    category as NarrativeCategory,
                  )}
                  cookieKey={category}
                  submit={updateActivity}
                />
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default ProfessorScoringPage;
