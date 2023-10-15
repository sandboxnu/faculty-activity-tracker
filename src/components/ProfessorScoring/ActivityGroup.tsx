import { ActivityDto, UpdateActivityDto } from '@/models/activity.model';
import ActivityApprovalCard from './ActivityApprovalCard';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface ActivityApprovalGroup {
  activities: ActivityDto[];
  title: string;
  cookieKey: string;
  submit: (newActivity: UpdateActivityDto) => void;
}

const ActivityGroup: React.FC<ActivityApprovalGroup> = ({
  activities,
  title,
  cookieKey,
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
  }, []);
  return (
    <div className="w-full flex flex-col border-box space-y-3 my-4">
      <div className="flex items-center justify-between ">
        <div
          className="flex items-center space-x-4 cursor-pointer"
          onClick={toggleDropDown}
        >
          <div className="font-light text-lg">{title}</div>
          <Image
            className={dropDownOpen ? 'rotate-90' : ''}
            src={'/media/rightArrow.svg'}
            alt="right arrow"
            width={9}
            height={9}
          />
        </div>
      </div>
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
