import { updateActivity, ResponseStatus } from '@/client/activities.client';
import { createNarrative, updateNarrative } from '@/client/narratives.client';
import ActivityCarousel from '@/components/Submissions/ActivityCarousel';
import {
  CreateNarrativeDto,
  NarrativeDto,
  UpdateNarrativeDto,
} from '@/models/narrative.model';
import { getActivitiesByQuery } from '@/services/activity';
import { getNarrativeForUserForCategory } from '@/services/narrative';
import Button from '@/shared/components/Button';
import { bigintToJSON, toTitleCase } from '@/shared/utils/misc.util';
import { Activity, ActivityCategory, NarrativeCategory } from '@prisma/client';
import moment from 'moment';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface NarrativeFormProps {
  newNarrative?: boolean;
  narrative?: NarrativeDto;
  activities?: Activity[];
  error?: string;
}

export const getServerSideProps: GetServerSideProps<
  NarrativeFormProps
> = async (context) => {
  const session = await getSession(context);
  const userId = session?.user?.id;
  const category = context.params?.category;
  if (!category) {
    return { props: { error: 'Category Not Found' } };
  }

  if (userId) {
    const narrative = await getNarrativeForUserForCategory(
      userId,
      category.toString().toUpperCase() as NarrativeCategory,
    );

    const activities = await getActivitiesByQuery(
      {
        userId: userId,
        isFavorite: true,
        category: category.toString().toUpperCase() as ActivityCategory,
      },
      { dateModified: 'desc' },
    );

    const parsedActivities = bigintToJSON(activities);

    if (narrative) {
      const parsedNarrative = bigintToJSON(narrative);
      return {
        props: {
          newNarrative: false,
          narrative: parsedNarrative,
          activities: parsedActivities,
        },
      };
    } else
      return { props: { newNarrative: true, activities: parsedActivities } };
  } else {
    return { props: { error: 'User not found.' } };
  }
};

const NarrativeForm: React.FC<NarrativeFormProps> = ({
  newNarrative,
  narrative,
  activities,
  error,
}) => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();
  const { category } = router.query;
  const [narrativeInput, setNarrativeInput] = useState(narrative?.text || '');
  const [pageError, setPageError] = useState<string | null>(error || null);
  const [favActivities, setFavActivities] = useState<Activity[]>(
    activities || [],
  );

  const create = async () => {
    if (!category || !userId) return false;
    const data: CreateNarrativeDto = {
      category: category.toString().toUpperCase() as NarrativeCategory,
      userId,
      year: moment().year(),
      dateModified: BigInt(Date.now()),
      text: narrativeInput,
    };

    const response = await createNarrative(data);
    return response === ResponseStatus.Success;
  };

  const update = async () => {
    if (!category || !userId) return false;
    const data: UpdateNarrativeDto = {
      ...narrative,
      text: narrativeInput,
    };

    const response = await updateNarrative(data);
    return response === ResponseStatus.Success;
  };

  const submit = async () => {
    if (narrativeInput === '') return;
    const success = await (newNarrative ? create() : update());
    if (success) router.push(`/submissions/${category}`);
    else setPageError('Could not submit narrative.');
  };

  if (pageError || activities === undefined) {
    return (
      <p className="mt-20 w-full text-center text-red-500">
        {' '}
        Error: {pageError || 'Unknown Error'}
      </p>
    );
  }
  if (!category)
    return (
      <p className="mt-20 w-full text-center text-red-500">
        {' '}
        Invalid Category{' '}
      </p>
    );

  const unfavoriteActivity = async (
    activityId: number,
    isFavorite: boolean,
  ) => {
    updateActivity(activityId, { isFavorite }).then((res) => {
      if (res === ResponseStatus.Unauthorized) setPageError('Unauthorized');
      else if (res === ResponseStatus.NotFound) setPageError('Not Found');
      else if (res === ResponseStatus.UnknownError)
        setPageError('Unknown Error');
      else {
        setFavActivities((currActivities) =>
          currActivities.filter((a) => a.id !== activityId),
        );
      }
    });
  };

  return (
    <div className="w-full">
      <Head>
        <title>{`Narrative - ${toTitleCase(
          category?.toString() || '',
        )}`}</title>
      </Head>
      <h1> {toTitleCase(category.toString())} - Narrative </h1>
      {newNarrative === false && narrative && (
        <p className="italic text-neutral-500">
          Last Date Modified -&nbsp;
          {moment(Number(narrative.dateModified)).format('MMM D, YYYY')}
        </p>
      )}

      {favActivities.length !== 0 && (
        <ActivityCarousel
          activities={favActivities}
          label="Favourite"
          favoriteActivity={unfavoriteActivity}
          displayNewActivity={false}
          leftPadding={true}
        />
      )}

      <h3 className="mt-3"> Narrative: </h3>

      <textarea
        className="my-2 h-1/2 w-full rounded-xl border border-gray-400 px-6 py-4 focus-within:outline-none"
        value={narrativeInput}
        placeholder={'Enter narrative here'}
        onChange={(e) => setNarrativeInput(e.target.value)}
      />
      <div className="my-9 flex justify-between">
        <Button onClick={() => router.back()} variant="secondary" size="lg">
          Back
        </Button>
        <Button onClick={submit} size="lg">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default NarrativeForm;
