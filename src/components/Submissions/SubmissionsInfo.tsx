import { ActivityDto } from '@/models/activity.model';
import { NarrativeDto } from '@/models/narrative.model';
import Button from '@/shared/components/Button';
import SideBarBubble from '@/shared/components/SideBarBubble';
import SideNavbar from '@/shared/components/SideNavbar';
import { toTitleCase } from '@/shared/utils/misc.util';
import { SignificanceLevel, Semester, ActivityCategory } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface SubmissionsInfoProps {
  activitiesBySigLevel: Record<SignificanceLevel, ActivityDto[]> | null;
  activitiesBySemester: Record<Semester, ActivityDto[]> | null;
  category: ActivityCategory;
  narrative: NarrativeDto | null;
}

const SubmissionsInfo: React.FC<SubmissionsInfoProps> = ({
  activitiesBySigLevel,
  activitiesBySemester,
  category,
  narrative,
}) => {
  const router = useRouter();

  if (!activitiesBySigLevel || !activitiesBySemester)
    return <p> No activities found. </p>;
  const totalCount =
    activitiesBySigLevel['MAJOR'].length +
    activitiesBySigLevel['MINOR'].length +
    activitiesBySigLevel['SIGNIFICANT'].length;
  return (
    <>
      <SideBarBubble title="Instructions" cookieKey="submissions-instructions">
        <div className="space-y-4 my-2">
          <p className="text-sm">
            8-10 Score: 2+ Major Activities, 10+ Significant and Minor
            Activities
          </p>
          <p className="text-sm">
            7-8 Score: 1-2 Major Activities, 6-10 Significant and Minor
            Activities
          </p>
          <p className="text-sm">
            6-7 Score: 0-1 Major Activities, 2-6 Significant and Minor
            Activities
          </p>
          <p className="text-sm">6 Fulfilling required course load</p>
        </div>
      </SideBarBubble>

      <SideBarBubble title="Summary" cookieKey="submissions-summary">
        <>
          <div className="space-y-2 my-4">
            {Object.entries(activitiesBySigLevel).map(
              ([sigLevel, activities]) => (
                <div key={sigLevel} className="flex flex-col">
                  <p>
                    {toTitleCase(sigLevel)}: {activities.length} activities
                  </p>
                </div>
              ),
            )}
          </div>
          <div className="space-y-2 my-5">
            {Object.entries(activitiesBySemester).map(
              ([semester, activities]) => (
                <div key={semester} className="flex flex-col">
                  <p>
                    {toTitleCase(semester)}: {activities.length} activities
                  </p>
                </div>
              ),
            )}
          </div>

          <p className="mt-6 mb-2">Total: {totalCount} activities</p>
        </>
      </SideBarBubble>
      <SideBarBubble
        title="Narrative Preview"
        cookieKey="submissions-narrative-preview"
      >
        <p className="mt-2">
          {' '}
          {narrative?.text || 'No narrative submitted yet.'}{' '}
        </p>
      </SideBarBubble>
      <div className="w-3/4 mx-auto">
        <Button
          onClick={() => router.push(`/narratives/${category}`)}
          addOnClass="mx-auto shadow-sm"
          fillContainer
        >
          {!narrative ? 'Submit' : 'Edit'} Narrative
        </Button>
      </div>
    </>
  );
};

export default SubmissionsInfo;
