import ActivityRow from "@/components/Submissions/ActivityRow";
import { ActivityDto } from "@/models/activity.model";
import { getActivitiesForQuery } from "@/services/activity";
import { seperateActivitiesBySignifanceLevel } from "@/shared/utils/activity.util";
import { toTitleCase } from "@/shared/utils/misc.util";
import { ActivityCategory, SignificanceLevel } from "@prisma/client";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

interface SubmissionsPageProps {
    activitiesBySigLevel: Record<SignificanceLevel, ActivityDto[]> | null;
    error?: string;
}

export const getServerSideProps: GetServerSideProps<SubmissionsPageProps> = async (context) => {
    const session = await getSession(context);
    const userId = session?.user?.id;
    const category = context.params?.category;
    if (!category) { 
        return { props: { activitiesBySigLevel: null, error: 'Category Not Found' } };
    }
    if (userId) {
      const activities = await getActivitiesForQuery({
        userId: userId, 
        category: category.toString().toUpperCase() as ActivityCategory
      });
      if (activities === 'not found') {
        return { props: { activitiesBySigLevel: null } };
      } else {
          const activitiesBySigLevel = seperateActivitiesBySignifanceLevel(
              JSON.parse(JSON.stringify(activities, (key, value) =>
          typeof value === 'bigint'
              ? value.toString()
              : value // return everything else unchanged
      ))
          );
        return { props: { activitiesBySigLevel  } };
      }
    } else {
      return { props: { activitiesBySigLevel: null, error: 'User not found.' } };
    }
  };

const SubmissionsPage: React.FC<SubmissionsPageProps> = ({ activitiesBySigLevel, error }) => {
    const router = useRouter();
    const { category } = router.query;

    return (
        <div className='px-16 py-10 flex flex-col border-box w-full'>
            <h1>{ toTitleCase(category?.toString() || "") }</h1>
            { 
              activitiesBySigLevel ?
              Object.entries(activitiesBySigLevel).map(([sigLevel, activities]) => (
                  <div key={sigLevel} className='flex flex-col w-full'> 
                      <h3 className='mt-3'>{toTitleCase(sigLevel)} Activities</h3>
                      <ActivityRow activities={activities} leftPadding/>
                  </div>
              ))
              : <p> No activities found. </p>
            }
        </div>
    );
}

export default SubmissionsPage;
