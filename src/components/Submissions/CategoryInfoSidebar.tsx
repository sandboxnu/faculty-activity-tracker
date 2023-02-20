import { ActivityDto } from "@/models/activity.model";
import { seperateActivitiesBySemester } from "@/shared/utils/activity.util";
import { toTitleCase } from "@/shared/utils/misc.util";
import { SignificanceLevel } from "@prisma/client";
import React from "react";

interface CategoryInfoProps {
    activitiesBySigLevel: Record<SignificanceLevel, ActivityDto[]>;
}

const CategoryInfoSidebar: React.FC<CategoryInfoProps> = ({ activitiesBySigLevel }) => {
    const allActivities = Object.values(activitiesBySigLevel).flat();
    const activitiesBySemester = seperateActivitiesBySemester(allActivities);

    return (
        <div className="flex flex-col items-start h-screen min-w-max bg-white px-6 py-6 space-y-6 border-l border-black">
            <div className="my-3">
                <h3 className="">Instructions</h3>
                <p>guidelines, etc..</p>
            </div>
            <div className="my-3">
                <h3>Summary</h3>
                <div className="flex flex-col space-y-3 my-5">
                    {
                        Object.entries(activitiesBySigLevel).map(([sigLevel, activities]) => (
                            <p key={sigLevel + "summary"}>{toTitleCase(sigLevel)}: {activities.length}</p>
                        ))
                    }
                </div>
                <div className="flex flex-col space-y-3 mt-8">
                    {
                        Object.entries(activitiesBySemester).map(([semester, activities]) => (
                            <p key={semester + "summary"}>{toTitleCase(semester)}: {activities.length} activities</p>
                        ))
                    }
                </div>
                <p className="my-8">Total: {allActivities.length} activities</p>
            </div>
        </div>
    );
}

export default CategoryInfoSidebar;
