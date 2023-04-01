import { ResponseStatus } from '@/client/activities.client';
import { createNarrative, updateNarrative } from '@/client/narratives.client';
import {
  CreateNarrativeDto,
  NarrativeDto,
  UpdateNarrativeDto,
} from '@/models/narrative.model';
import { getNarrativeForUserForCategory } from '@/services/narrative';
import { toTitleCase } from '@/shared/utils/misc.util';
import { NarrativeCategory } from '@prisma/client';
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
    if (narrative) {
      const parsedNarrative = JSON.parse(
        JSON.stringify(
          narrative,
          (key, value) =>
            typeof value === 'bigint' ? value.toString() : value, // return everything else unchanged
        ),
      );
      return { props: { newNarrative: false, narrative: parsedNarrative } };
    } else return { props: { newNarrative: true } };
  } else {
    return { props: { error: 'User not found.' } };
  }
};

const NarrativeForm: React.FC<NarrativeFormProps> = ({
  newNarrative,
  narrative,
  error,
}) => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();
  const { category } = router.query;
  const [narrativeInput, setNarrativeInput] = useState(narrative?.text || '');
  const [pageError, setPageError] = useState<string | null>(error || null);

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

  if (pageError)
    return (
      <p className="w-full text-center text-red mt-20">
        {' '}
        Error: {pageError || 'Unknown Error'}
      </p>
    );
  if (!category)
    return (
      <p className="w-full text-center text-red mt-20"> Invalid Category </p>
    );
  return (
    <div className="w-full px-16 py-5">
      <Head>
        {' '}
        <title>
          {' '}
          Narrative - {toTitleCase(category?.toString() || '')}
        </title>{' '}
      </Head>
      <h1> {toTitleCase(category.toString())} - Narrative </h1>
      {newNarrative === false && narrative && (
        <p className="text-neutral-500 italic">
          {' '}
          Last Date Modified -{' '}
          {moment(Number(narrative.dateModified)).format('MMM D, YYYY')}{' '}
        </p>
      )}
      <h3 className="mt-7"> Narrative: </h3>
      <textarea
        className="rounded-xl border border-gray-400 focus-within:outline-none my-2 w-full h-1/2 px-6 py-4"
        value={narrativeInput}
        placeholder={'Enter narrative here'}
        onChange={(e) => setNarrativeInput(e.target.value)}
      />
      <div className="flex justify-between my-9">
        <button
          onClick={() => router.back()}
          className="bg-white text-black font-bold rounded-xl px-8 py-3"
        >
          {' '}
          Back{' '}
        </button>
        <button
          onClick={submit}
          className="bg-red text-white font-bold rounded-xl px-8 py-3"
        >
          {' '}
          Submit{' '}
        </button>
      </div>
    </div>
  );
};

export default NarrativeForm;