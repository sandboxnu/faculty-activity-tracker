import { ActivityDto } from '@/models/activity.model';
import React from 'react';

interface ActivityCardProps {
  activity: ActivityDto;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  return (
    <div className="w-1/3 p-3 box-border">
      <div className="border rounded-2xl border-black h-[100px] py-8 px-24 mr-2">
        <p> {activity.name} </p>
      </div>
    </div>
  );
};

export default ActivityCard;
