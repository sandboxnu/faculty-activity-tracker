import ActivityCarousel from '@/components/Submissions/ActivityCarousel';
import { getActivitiesByQuery, getActivityById } from '@/services/activity';
import { ActivityDto, Semester } from '@/models/activity.model';
import {
  seperateActivitiesBySemester,
  seperateActivitiesBySignifanceLevel,
} from '@/shared/utils/activity.util';
import { bigintToJSON, toTitleCase } from '@/shared/utils/misc.util';
import {
  resetForm,
  setWeight,
  setStep,
  setCategory,
  setYear,
} from '@/store/form.store';
import { ActivityCategory, SignificanceLevel } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ResponseStatus, updateActivity } from '@/client/activities.client';
import Head from 'next/head';

interface SubmissionsPageProps {
  activities?: ActivityDto[];
  error?: string;
}

export const getServerSideProps: GetServerSideProps<
  SubmissionsPageProps
> = async (context) => {
  const session = await getSession(context);
  const userId = session?.user?.id;
  const category = context.params?.category;
  if (!category) {
    return {
      props: {
        error: 'Category Not Found',
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

  const activities = await getActivitiesByQuery(
    {
      userId: userId,
      category: category.toString().toUpperCase() as ActivityCategory,
    },
    { dateModified: 'desc' },
  );
  if (activities) {
    return { props: { activities: bigintToJSON(activities) } };
  } else {
    return {
      props: { error: 'No activities not found for user' },
    };
  }
};

const SubmissionsPage: React.FC<SubmissionsPageProps> = ({
  activities: initialActivities,
  error,
}) => {
  const router = useRouter();
  const { category } = router.query;
  const dispatch = useDispatch();
  const [pageError, setPageError] = useState<string | null>(error || null);
  const [activities, setActivities] = useState<ActivityDto[]>(
    initialActivities || [],
  );

  const startNewActivity = (sigLevel: SignificanceLevel) => {
    dispatch(resetForm());
    dispatch(
      setCategory(category?.toString().toUpperCase() as ActivityCategory),
    );
    dispatch(setWeight(sigLevel));
    dispatch(setStep('form'));
    dispatch(setYear(new Date().getFullYear()));
    router.push('/submissions/new');
  };

  const favoriteActivity = (activityId: number, isFavorite: boolean) => {
    updateActivity(activityId, { isFavorite }).then((res) => {
      if (res === ResponseStatus.Unauthorized) setPageError('Unauthorized');
      else if (res === ResponseStatus.NotFound) setPageError('Not Found');
      else if (res === ResponseStatus.UnknownError)
        setPageError('Unknown Error');
      else {
        setActivities((currActivities) =>
          currActivities.map((a) =>
            a.id === activityId ? { ...a, isFavorite } : a,
          ),
        );
      }
    });
  };

  useEffect(() => {
    if (initialActivities) setActivities(initialActivities);
  }, [category, initialActivities]);

  if (pageError || !activities)
    return (
      <p className="w-full text-center text-red-500">
        Error: {pageError || 'unknown error.'}
      </p>
    );

  const activitiesBySigLevel = seperateActivitiesBySignifanceLevel(activities);

  return (
    <div className="flex w-full">
      <Head>
        <title>{`Submissions - ${toTitleCase(
          category?.toString() || '',
        )}`}</title>
      </Head>
      <div className="border-box flex w-full flex-col">
        <h1>{toTitleCase(category?.toString() || '')}</h1>
        {pageError && (
          <p className="w-full text-center text-red-500">{pageError}</p>
        )}
        {Object.entries(activitiesBySigLevel).map(([sigLevel, activities]) => (
          <div key={sigLevel} className="flex w-full flex-col">
            <ActivityCarousel
              label={toTitleCase(sigLevel)}
              activities={activities}
              newActivity={() =>
                startNewActivity(sigLevel as SignificanceLevel)
              }
              leftPadding
              favoriteActivity={favoriteActivity}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubmissionsPage;
