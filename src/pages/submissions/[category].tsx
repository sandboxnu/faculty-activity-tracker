import ActivityRow from "@/components/Submissions/ActivityRow";
import { ActivityDto } from "@/models/activity.model";
import { getActivitiesForUserForCategory } from "@/services/activity";
import { getUserByEmail } from "@/services/user";
import { seperateActivitiesBySignifanceLevel } from "@/shared/utils/activity.util";
import { toTitleCase } from "@/shared/utils/misc.util";
import { ActivityCategory, SignificanceLevel } from "@prisma/client";
import { objectEnumValues } from "@prisma/client/runtime";
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
    const email = session?.user?.email;
    const category = context.params?.category;
    if (!category) { 
        return { props: { activitiesBySigLevel: null, error: 'Category Not Found' } };
    }
    if (email) {
      const user = await getUserByEmail(email);
      if (user === 'not found') {
        return { props: { activitiesBySigLevel: null, error: 'User not found.' } };
      } else {
        const activities = await getActivitiesForUserForCategory(user.id, category.toString().toUpperCase() as ActivityCategory);
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
      }
    } else {
      return { props: { activitiesBySigLevel: null, error: 'User not logged in.' } };
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
