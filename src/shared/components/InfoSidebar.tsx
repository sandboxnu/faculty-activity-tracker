import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import {
  getActivitiesForUserForCategory,
  ResponseStatus,
} from '@/client/activities.client';
import { ActivityCategory, ActivityDto } from '@/models/activity.model';
import {
  seperateActivitiesBySemester,
  seperateActivitiesBySignifanceLevel,
} from '../utils/activity.util';
import SubmissionsInfo from '@/components/Submissions/SubmissionsInfo';
import FormInstructions from '@/components/ActivityForm/FormInstructions';
import NarrativeInstructions from '@/components/Narratives/NarrativeInstructions';
import { NarrativeCategory, prisma } from '@prisma/client';
import { getNarrativeForUserForCategory } from '@/client/narratives.client';
import { NarrativeDto } from '@/models/narrative.model';
import ProfileInstructions from '@/components/Profile/ProfileInstructions';
import ScoringInfo from '@/components/ProfessorScoring/ScoringInfo';
import ProfessorCommentBox from '@/components/ProfessorScoring/ProfessorCommentBox';
import { getProfessorInfoForUser } from '@/client/professorInfo.client';
import { ProfessorInfoDto } from '@/models/professorInfo.model';
import ProfessorScoreCard from '@/components/ProfessorScoring/ProfessorScoreCard';

type SidebarType =
  | 'submissions'
  | 'new'
  | 'edit'
  | 'profile'
  | 'narratives'
  | 'scoring';

const InfoSidebar: React.FC = () => {
  const router = useRouter();
  const pathname = router.pathname;
  const { category, professorId: professorIdString } = router.query;
  const professorId = parseInt(professorIdString?.toString() ?? '');
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [sidebarType, setType] = useState<SidebarType | null>(null);
  const [activities, setActivities] = useState<ActivityDto[]>([]);
  const [narrative, setNarrative] = useState<NarrativeDto | null>(null);
  const [professorInfo, setProfessorInfo] = useState<ProfessorInfoDto | null>(
    null,
  );
  const activitiesBySigLevel = seperateActivitiesBySignifanceLevel(activities);
  const activitiesBySemester = seperateActivitiesBySemester(activities);

  useEffect(() => {
    if (pathname === '/submissions/[category]' && category !== undefined) {
      if (userId) {
        Promise.all([
          getActivitiesForUserForCategory(
            userId,
            category.toString().toUpperCase() as ActivityCategory,
          ),
          getNarrativeForUserForCategory(
            userId,
            category.toString().toUpperCase() as NarrativeCategory,
          ),
        ]).then(([activities, narrative]) => {
          if (
            activities === ResponseStatus.UnknownError ||
            narrative === ResponseStatus.UnknownError
          )
            return;
          setType('submissions');
          setActivities(activities);
          setNarrative(narrative);
        });
      }
    } else if (pathname === '/submissions/new') {
      setType('new');
    } else if (pathname === '/submissions/edit') {
      setType('edit');
    } else if (pathname === '/profile') {
      setType('profile');
    } else if (pathname.includes('narratives')) {
      setType('narratives');
    } else if (pathname == '/merit/professors/[professorId]') {
      Promise.all([getProfessorInfoForUser(professorId)]).then(
        ([professorInfo]) => {
          if (professorInfo === ResponseStatus.UnknownError) return;
          setType('scoring');
          setProfessorInfo(professorInfo);
        },
      );
    } else {
      setType(null);
    }
  }, [pathname, category, userId, professorId]);

  if (!sidebarType) return null;

  return (
    <div className="flex w-1/5 flex-col items-start space-y-6 bg-white px-6 py-6">
      {sidebarType === 'submissions' && category && (
        <SubmissionsInfo
          activitiesBySemester={activitiesBySemester}
          activitiesBySigLevel={activitiesBySigLevel}
          category={category.toString() as ActivityCategory}
          narrative={narrative}
        />
      )}
      {(sidebarType === 'new' || sidebarType === 'edit') && (
        <FormInstructions />
      )}
      {sidebarType === 'narratives' && <NarrativeInstructions />}
      {sidebarType === 'profile' && <ProfileInstructions />}
      {sidebarType === 'scoring' && (
        <>
          <ScoringInfo profInfo={professorInfo} />
          <ProfessorCommentBox professorId={professorId} />
          <ProfessorScoreCard professorId={professorId} />
        </>
      )}
    </div>
  );
};

export default InfoSidebar;
