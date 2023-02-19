import { ActivityDto } from "@/models/activity.model";
import React from "react";
import moment from "moment";

interface ActivityRowProps {
    activities: ActivityDto[];
    leftPadding?:boolean;
}

const ActivityRow: React.FC<ActivityRowProps> = ({ activities, leftPadding }) => {
    return (
        <div className={`flex items-center ${leftPadding? "pl-8":" "} py-8 w-full overflow-x-scroll`}>
        {activities.map((activity) => (
            <div key={activity.id} className='w-1/3 flex-shrink-0 pr-12'>
                <div className='rounded-lg border border-black border-solid px-6 py-4'>
                    <div className='flex flex-col space-y-3'>
                        <p>{moment(Number(activity.dateModified)).format("MMM D, YYYY")}</p>
                        <p className='text-lg font-bold'>{activity.name}</p>
                        <p className='truncate'>{activity.description}</p>
                    </div>
                </div>

            </div>
        ))}
        </div>)
}

export default ActivityRow;
