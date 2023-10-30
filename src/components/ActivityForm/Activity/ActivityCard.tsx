import { ActivityDto } from '@/models/activity.model';
import React from 'react';

interface ActivityCardProps {
  activity: ActivityDto;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  return (
    <div className="box-border w-1/3 p-3">
      <div className="mr-2 h-[100px] rounded-2xl border border-black px-24 py-8">
        <p> {activity.name} </p>
      </div>
    </div>
  );
};

export default ActivityCard;
