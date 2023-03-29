import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { getActivitiesForUserForCategory, ResponseStatus } from '@/client/activities.client';
import { ActivityCategory, ActivityDto } from '@/models/activity.model';
import { seperateActivitiesBySemester, seperateActivitiesBySignifanceLevel } from '../utils/activity.util';
import SubmissionsInfo from '@/components/Submissions/SubmissionsInfo';
import FormInstructions from '@/components/ActivityForm/FormInstructions';

type SidebarType = "submissions" | "new" | "profile";

const InfoSidebar: React.FC = () => {
  const router = useRouter();
  const pathname = router.pathname;
  const { category } = router.query;
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const [ sidebarType, setType ] = useState<SidebarType | null>(null);
  const [ activities, setActivities ] = useState<ActivityDto[]>([]);
  const activitiesBySigLevel = seperateActivitiesBySignifanceLevel(activities);
  const activitiesBySemester = seperateActivitiesBySemester(activities);

  useEffect(() => {
    console.log(pathname);
    if (pathname === "/submissions/[category]" && category !== undefined) {
        if (userId) {
            getActivitiesForUserForCategory(userId, category.toString().toUpperCase() as ActivityCategory).then(activities => {
                if (activities === ResponseStatus.UnknownError) return;
                setType("submissions");
                setActivities(activities);
            })
        }
    } else if (pathname === "/submissions/new") {
        setType("new");
    } else if (pathname === "/profile") {
        setType("profile");
    }
    
  }, [ pathname, category, userId ]);

  return (
    <div className="flex flex-col items-start w-1/5 bg-white px-6 py-6 space-y-6">
        { sidebarType === "submissions" && <SubmissionsInfo activitiesBySemester={activitiesBySemester} activitiesBySigLevel={activitiesBySigLevel} /> }
        { sidebarType === "new" && <FormInstructions /> }
    </div>
  );
};

export default InfoSidebar;
