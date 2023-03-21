import ActivityRow from "@/components/Submissions/ActivityRow";
import { ActivityDto, Semester } from "@/models/activity.model";
import { getActivitiesForUserForCategory } from "@/services/activity";
import { getUserByEmail } from "@/services/user";
import { seperateActivitiesBySemester, seperateActivitiesBySignifanceLevel } from "@/shared/utils/activity.util";
import { toTitleCase } from "@/shared/utils/misc.util";
import { ActivityCategory, SignificanceLevel } from "@prisma/client";
import { objectEnumValues } from "@prisma/client/runtime";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

interface SubmissionsPageProps {
    activitiesBySigLevel: Record<SignificanceLevel, ActivityDto[]> | null;
    activitiesBySemester: Record<Semester, ActivityDto[]> | null;
    error?: string;
}

const SubmissionsInfo: React.FC<SubmissionsPageProps> = ({ activitiesBySigLevel, activitiesBySemester}) => {
  if (!activitiesBySigLevel || !activitiesBySemester) return <p> No activities found. </p>
  const totalCount = activitiesBySigLevel['MAJOR'].length + activitiesBySigLevel['MINOR'].length + activitiesBySigLevel['SIGNIFICANT'].length
  return (
    <div className="flex flex-col items-start w-1/4 bg-white px-6 py-6 ">
      <div className="flex flex-col p-5 bg-medium-grey w-full rounded-lg">
        <h3>Instructions</h3>
        <div className="space-y-4 my-4 text-sm"> 
          <p>8-10	Major Activity: 2 and above + Significant and Minor Activities: 10 and above</p>
          <p>7-8	Major Activity: 1-2 + Significant and Minor Activities: 6-10 </p>
          <p>6-7	Major Activity: 0-1 + Significant and Minor Activities: 2-6 </p>
          <p>6 Fulfilling required course load</p>
        </div>
      </div>
      <div className="flex flex-col p-5 bg-medium-grey mt-5 w-full rounded-lg">
        <h3>Summary</h3>
        <div className="space-y-4 my-4 text-sm"> 
          { 
            Object.entries(activitiesBySigLevel).map(([sigLevel, activities]) => (
                <div key={sigLevel} className='flex flex-col'> 
                    <p>{toTitleCase(sigLevel)}: {activities.length} activities</p>
                </div>
            ))
          }
        </div>
        
        <div className="space-y-4 my-5"> 
          { 
            Object.entries(activitiesBySemester).map(([semester, activities]) => (
                <div key={semester} className='flex flex-col'> 
                    <p>{toTitleCase(semester)}: {activities.length} activities</p>
                </div>
            ))
          }
        </div>

        <p className="my-6">Total: {totalCount} activities</p>
      </div>
    </div>
  )
}


export const getServerSideProps: GetServerSideProps<SubmissionsPageProps> = async (context) => {
    const session = await getSession(context);
    const userId = session?.user?.id;
    const category = context.params?.category;
    if (!category) { 
        return { props: { activitiesBySigLevel: null, activitiesBySemester: null, error: 'Category Not Found' } };
    }
    if (userId) {
      const activities = await getActivitiesForUserForCategory(userId, category.toString().toUpperCase() as ActivityCategory);
      if (activities === 'not found') {
        return { props: { activitiesBySigLevel: null, activitiesBySemester: null } };
      } else {
          const parsedActivities = JSON.parse(JSON.stringify(activities, (key, value) =>
            typeof value === 'bigint'
              ? value.toString()
              : value // return everything else unchanged
          ));
          
          const activitiesBySigLevel = seperateActivitiesBySignifanceLevel(parsedActivities);
          const activitiesBySemester = seperateActivitiesBySemester(parsedActivities);
        return { props: { activitiesBySigLevel, activitiesBySemester } };
      }
    } else {
      return { props: { activitiesBySigLevel: null, activitiesBySemester: null, error: 'User not logged in.' } };
    }
  };

const SubmissionsPage: React.FC<SubmissionsPageProps> = ({ activitiesBySigLevel, activitiesBySemester, error }) => {
    const router = useRouter();
    const { category } = router.query;
    return (
      <div className='flex w-full'>
        <div className='px-16 py-5 w-full flex flex-col border-box'>
            <h1>{ toTitleCase(category?.toString() || "") }</h1>
            { 
              activitiesBySigLevel ?
              Object.entries(activitiesBySigLevel).map(([sigLevel, activities]) => (
                  <div key={sigLevel} className='flex flex-col w-full'> 
                    <div className='flex w-full items-center mt-3 pr-12'>
                      <p className='mr-2 text-lg'>{toTitleCase(sigLevel)} Activities</p>
                      <div className='flex-grow h-[1.5px] bg-light-grey'/>
                    </div>
                    <ActivityRow activities={activities} leftPadding />
                  </div>
              ))
              : <p> No activities found. </p>
            }
        </div>
      </div>
    );
}

export default SubmissionsPage;
