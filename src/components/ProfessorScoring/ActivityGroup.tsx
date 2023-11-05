import { ActivityDto, UpdateActivityDto } from '@/models/activity.model';
import ActivityApprovalCard from './ActivityApprovalCard';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { NarrativeDto } from '@/models/narrative.model';
import NarrativeCard from './NarrativeCard';

interface ActivityApprovalGroupProps {
  activities: ActivityDto[];
  title: string;
  cookieKey: string;
  narrative?: NarrativeDto;
  submit: (newActivity: UpdateActivityDto) => void;
}

const ActivityGroup: React.FC<ActivityApprovalGroupProps> = ({
  activities,
  title,
  cookieKey,
  narrative,
  submit,
}) => {
  const sortedActivities = activities.sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  const [dropDownOpen, setDropDownOpen] = useState(true);

  const toggleDropDown = () => {
    const newState = !dropDownOpen;
    console.log(`SET sidebar-dropdown-${cookieKey} => ${newState}`);
    window.localStorage.setItem(
      `sidebar-dropdown-${cookieKey}`,
      JSON.stringify(newState),
    );
    setDropDownOpen(newState);
  };

  useEffect(() => {
    const storedDropDownCookie = JSON.parse(
      window.localStorage.getItem(`sidebar-dropdown-${cookieKey}`) || 'null',
    );
    if (storedDropDownCookie !== null) {
      console.log(
        `GET sidebar-dropdown-${cookieKey} => ${storedDropDownCookie}`,
      );
      setDropDownOpen(storedDropDownCookie);
    }
  }, [cookieKey]);

  return (
    <div
      className="border-box mb-[30px] flex w-full flex-col gap-[12px]"
      style={{ userSelect: 'none' }}
    >
      <div className="flex items-center justify-between ">
        <div
          className="flex cursor-pointer items-center space-x-4"
          onClick={toggleDropDown}
        >
          <div className="text-body">{title}</div>
          <Image
            className={dropDownOpen ? 'rotate-90' : ''}
            src={'/media/rightArrow.svg'}
            alt="right arrow"
            width={9}
            height={9}
          />
        </div>
      </div>
      {dropDownOpen && (
        <NarrativeCard
          narrative={narrative}
          cookieKey={narrative ? narrative?.text : 'N/A'}
        />
      )}
      {dropDownOpen &&
        sortedActivities.map((activity) => (
          <ActivityApprovalCard
            key={activity.id}
            activity={activity}
            cookieKey={activity.name + activity.description}
            submit={submit}
          />
        ))}
    </div>
  );
};

export default ActivityGroup;
