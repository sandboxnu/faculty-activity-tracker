import { ActivityDto } from '@/models/activity.model';
import { getActivitiesForUser, getAllActivities } from '@/services/activity';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import React from 'react';

interface SubmissionsPageProps {
  activities: ActivityDto[];
  error?: string;
}

const SubmissionsPage: React.FC<SubmissionsPageProps> = ({ activities, error }) => {
  const { data: session, status } = useSession();

  return (
    <div className="p-50 flex flex-col">
      <h1>Submitted Activities</h1>
      {error && <p>{error}</p>}
      {activities.length > 0 ? (
        <div className="flex flex-row">
          {activities.map((activity) => (
            <div key={activity.id}>
              <div className='mr-10 p-32 rounder-lg border border-black border-solid'>
                <p>{activity.name}</p>
                <p>{new Date(Number(activity.dateModified)).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No activities found.</p>
      )}
    </div>
  );
};


export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const userId = session?.user?.id;
  if (userId) {
    const activities = await getActivitiesForUser(userId);
    if (activities === 'not found') {
      return { props: { activities: [] } };
    } else {
      const parsedActivities = JSON.parse(
        JSON.stringify(
          activities,
          (key, value) =>
            typeof value === 'bigint' ? value.toString() : value, // return everything else unchanged
        ),
      );
      return { props: { activities: parsedActivities } };
    }
  } else {
    return { props: { activities: [], error: 'User not logged in.' } };
  }
};

export default SubmissionsPage;
