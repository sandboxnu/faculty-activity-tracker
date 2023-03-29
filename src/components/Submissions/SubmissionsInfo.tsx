import { ActivityDto } from "@/models/activity.model";
import { toTitleCase } from "@/shared/utils/misc.util";
import { SignificanceLevel, Semester } from "@prisma/client";
import React from "react";

interface SubmissionsInfoProps {
    activitiesBySigLevel: Record<SignificanceLevel, ActivityDto[]> | null;
    activitiesBySemester: Record<Semester, ActivityDto[]> | null;
}

const SubmissionsInfo: React.FC<SubmissionsInfoProps> = ({ activitiesBySigLevel, activitiesBySemester}) => {
  if (!activitiesBySigLevel || !activitiesBySemester) return <p> No activities found. </p>
  const totalCount = activitiesBySigLevel['MAJOR'].length + activitiesBySigLevel['MINOR'].length + activitiesBySigLevel['SIGNIFICANT'].length
  return (
    <>
      <div className="flex flex-col p-5 bg-medium-grey w-full rounded-lg">
        <h3>Instructions</h3>
        <div className="space-y-4 my-4"> 
          <p className="text-sm">8-10	Major Activity: 2 and above + Significant and Minor Activities: 10 and above</p>
          <p className="text-sm">7-8	Major Activity: 1-2 + Significant and Minor Activities: 6-10 </p>
          <p className="text-sm">6-7	Major Activity: 0-1 + Significant and Minor Activities: 2-6 </p>
          <p className="text-sm">6 Fulfilling required course load</p>
        </div>
      </div>
      <div className="flex flex-col p-5 bg-medium-grey mt-5 w-full rounded-lg">
        <h3>Summary</h3>
        <div className="space-y-2 my-4"> 
          { 
            Object.entries(activitiesBySigLevel).map(([sigLevel, activities]) => (
                <div key={sigLevel} className='flex flex-col'> 
                    <p>{toTitleCase(sigLevel)}: {activities.length} activities</p>
                </div>
            ))
          }
        </div>
        
        <div className="space-y-2 my-5"> 
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
    </>
  )
}

export default SubmissionsInfo;
