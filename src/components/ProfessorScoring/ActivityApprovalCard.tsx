import {
  ActivityDto,
  UpdateActivityDto,
  Semester,
} from '@/models/activity.model';
import { ActivityMeritStatus, SignificanceLevel } from '@prisma/client';
import { useState, useEffect } from 'react';
import { shortenDescription, toTitleCase } from '@/shared/utils/misc.util';
import {
  ResponseStatus,
  updateActivityClient,
} from '@/client/activities.client';
import Button from '@/shared/components/Button';

interface ActivityApprovalProp {
  activity: ActivityDto;
  cookieKey: string;
  submit: (newActivity: UpdateActivityDto) => void;
}

const ApproveButton: React.FC<{
  height?: number;
  width?: number;
  className?: string;
  strokeColor?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}> = ({
  width = 20,
  height = 20,
  className = '',
  strokeColor = '#71B670',
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`focus:outline-none p-0 border-none bg-transparent rounded-full w-${width} h-${height}`}
  >
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Check Hover Button" className={className}>
        <circle id="Ellipse 1" cx="10" cy="10" r="10" />
        <path
          id="Vector 3"
          d="M5 11L8 14L14.5 6.5"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  </button>
);

const RejectButton: React.FC<{
  height?: number;
  width?: number;
  className?: string;
  strokeColor?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}> = ({
  width = 20,
  height = 20,
  className = '',
  strokeColor = '#E16565',
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`focus:outline-none p-0 border-none bg-transparent rounded-full w-${width} h-${height}`}
  >
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="X Hover Button" className={className}>
        <circle id="Ellipse 1" cx="10" cy="10" r="10" />

        <g id="Group 71">
          <g id="Group 90">
            <path
              id="Line 62"
              d="M6 6L14 14"
              stroke={strokeColor}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              id="Line 63"
              d="M6 14L14 6"
              stroke={strokeColor}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        </g>
      </g>
    </svg>
  </button>
);

const ActivityApprovalCard: React.FC<ActivityApprovalProp> = ({
  activity,
  cookieKey,
  submit,
}) => {
  const [expanded, setExpanded] = useState(false);
  const acceptedColor = 'bg-[#F2FBEA]';
  const rejectedColor = 'bg-[#FDF2F2]';
  const neutralColor = 'bg-gray-100';

  const toggleDropDown = () => {
    const newState = !expanded;
    console.log(`SET sidebar-dropdown-${cookieKey} => ${newState}`);
    window.localStorage.setItem(
      `sidebar-dropdown-${cookieKey}`,
      JSON.stringify(newState),
    );
    setExpanded(newState);
  };

  useEffect(() => {
    const storedDropDownCookie = JSON.parse(
      window.localStorage.getItem(`sidebar-dropdown-${cookieKey}`) || 'null',
    );
    if (storedDropDownCookie !== null) {
      console.log(
        `GET sidebar-dropdown-${cookieKey} => ${storedDropDownCookie}`,
      );
      setExpanded(storedDropDownCookie);
    }
  }, []);

  const handleUpdateStatus = (status: ActivityMeritStatus | null) => {
    submit({
      id: activity?.id,
      userId: activity?.userId,
      semester: activity?.semester,
      year: activity?.year,
      dateModified: BigInt(new Date().getTime()),
      name: activity?.name,
      description: activity?.description,
      category: activity?.category,
      significance: activity?.significance,
      isFavorite: activity?.isFavorite,
      semesterOtherDescription: activity?.semesterOtherDescription,
      meritStatus: status,
    });
  };

  return (
    <>
      <div
        className={`flex flex-col rounded-lg shadow-sm hover:shadow-lg px-6 py-3.5 card h-30 cursor-pointer ${
          activity?.meritStatus === ActivityMeritStatus.ACCEPTED
            ? acceptedColor
            : activity?.meritStatus === ActivityMeritStatus.REJECTED
            ? rejectedColor
            : neutralColor
        }${expanded ? ' border-gray-300 border-2 border-solid' : ''}`}
        onClick={toggleDropDown}
      >
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row justify-center items-center flex-auto">
            <div className="w-1/5 text-body-bold">{activity?.name}</div>
            <div className="w-1/5 text-label">
              {activity?.semester}/{activity?.year}
            </div>
            <div className="w-1/5 text-label">
              {toTitleCase(activity?.significance || 'N/A')}
            </div>
            <div className="w-2/5 text-regular whitespace-nowrap">
              {!expanded && shortenDescription(activity?.description || 'N/A')}
            </div>
          </div>
          <div className="flex flex-row justify-center items-center space-x-2">
            <ApproveButton
              className={`${
                activity?.meritStatus === ActivityMeritStatus.ACCEPTED
                  ? ' fill-green-100'
                  : activity?.meritStatus === ActivityMeritStatus.REJECTED
                  ? ' fill-gray-200'
                  : 'fill-[#E1E1E1] hover:fill-green-100'
              } cursor-pointer duration-10`}
              strokeColor={`${
                activity?.meritStatus === ActivityMeritStatus.REJECTED
                  ? '#A8A8A8'
                  : '#71B670'
              }`}
              onClick={(event) => {
                event.stopPropagation();
                handleUpdateStatus(
                  activity?.meritStatus == ActivityMeritStatus.ACCEPTED
                    ? null
                    : ActivityMeritStatus.ACCEPTED,
                );
              }}
            />
            <RejectButton
              className={`${
                activity?.meritStatus === ActivityMeritStatus.ACCEPTED
                  ? ' fill-gray-200'
                  : activity?.meritStatus === ActivityMeritStatus.REJECTED
                  ? ' fill-[#FFDDDDBF]/75'
                  : 'fill-[#E1E1E1] hover:fill-[#FFDDDDBF]/75'
              } cursor-pointer duration-10`}
              strokeColor={`${
                activity?.meritStatus === ActivityMeritStatus.ACCEPTED
                  ? '#A8A8A8'
                  : '#E16565'
              }`}
              onClick={(event) => {
                event.stopPropagation();
                handleUpdateStatus(
                  activity?.meritStatus == ActivityMeritStatus.REJECTED
                    ? null
                    : ActivityMeritStatus.REJECTED,
                );
              }}
            />
          </div>
        </div>
        {expanded && (
          <div className="mt-4 text-regular">{activity?.description}</div>
        )}
      </div>
    </>
  );
};

export default ActivityApprovalCard;
