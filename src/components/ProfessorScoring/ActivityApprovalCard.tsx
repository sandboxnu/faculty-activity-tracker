import { ActivityDto, UpdateActivityDto } from '@/models/activity.model';
import { ActivityMeritStatus, SignificanceLevel } from '@prisma/client';
import { useState, useEffect } from 'react';
import { toTitleCase } from '@/shared/utils/misc.util';

interface ActivityApprovalProp {
  activity: ActivityDto;
  cookieKey: string;
  submit: (newActivity: UpdateActivityDto) => void;
}

const ApproveButton: React.FC<{
  className?: string;
  accepted?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}> = ({ className = '', accepted = false, onClick }) => (
  <button
    onClick={onClick}
    className={`relative inline-flex items-center justify-center gap-[10px] rounded-full border border-solid border-gray-400 p-0 px-[10px] py-[4px] ${className}`}
  >
    <svg
      className="relative ml-[-1.00px] h-[11px] w-[13px]"
      width="12"
      height="10"
      viewBox="0 0 12 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Vector 3"
        d="M1 5.75L4 8.75L10.5 1.25"
        stroke="#31BE24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <div className="font-small relative mt-[-1.00px] w-fit">
      {accepted ? 'Accepted' : 'Accept'}
    </div>
  </button>
);

const RejectButton: React.FC<{
  className?: string;
  rejected?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}> = ({ className = '', rejected = false, onClick }) => (
  <button
    onClick={onClick}
    className={`relative inline-flex items-center justify-center gap-[10px] rounded-full border border-solid border-gray-400 p-0 px-[10px] py-[4px] ${className}`}
  >
    <svg
      className="relative ml-[-1.00px] h-[11px] w-[13px]"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Vector"
        d="M1 1.25L8.5 8.75M1 8.75L8.5 1.25"
        stroke="#EF4800"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
    <div className="font-small relative mt-[-1.00px] w-fit">
      {rejected ? 'Rejected' : 'Reject'}
    </div>
  </button>
);

const ActivityApprovalCard: React.FC<ActivityApprovalProp> = ({
  activity,
  cookieKey,
  submit,
}) => {
  const [expanded, setExpanded] = useState(false);
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
  }, [cookieKey]);

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
    <div
      className={`card relative flex cursor-pointer flex-col items-start justify-center gap-[20px] rounded-lg bg-gray-100 px-[20px] py-[16px] 
          ${
            expanded
              ? 'border-[1.5px] border-solid border-gray-300'
              : 'shadow-sm'
          }`}
      onClick={toggleDropDown}
      style={{ userSelect: 'none' }}
    >
      <div className="relative flex w-full items-center">
        <div className="flex flex-grow items-center justify-start gap-[30px]">
          <div className="relative mt-[-1.00px] w-fit text-heading-3">
            {activity?.name}
          </div>
          <div className="relative w-fit text-small text-gray-500">
            {activity?.semester
              .map((semester) => toTitleCase(semester))
              .join(', ')}{' '}
            / {activity?.year.toString()}
          </div>
          <div className="relative w-fit text-small text-gray-500">
            {toTitleCase(activity?.significance || 'N/A')}
          </div>
        </div>
        <div className="flex-grow"></div>
        <div className="flex flex-shrink-0 items-center justify-end gap-[8px]">
          <ApproveButton
            className={`${
              activity?.meritStatus === ActivityMeritStatus.ACCEPTED
                ? ' border-success-500 bg-success-100'
                : activity?.meritStatus === ActivityMeritStatus.REJECTED
                ? ' border-gray-400 bg-white'
                : 'border-gray-400 bg-white hover:bg-success-50'
            } duration-10 cursor-pointer`}
            accepted={
              activity?.meritStatus === ActivityMeritStatus.ACCEPTED
                ? true
                : false
            }
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
                ? 'border-gray-400 bg-white'
                : activity?.meritStatus === ActivityMeritStatus.REJECTED
                ? 'border-error-500 bg-error-100'
                : 'border-gray-400 bg-white hover:bg-error-50'
            } duration-10 cursor-pointer`}
            rejected={
              activity?.meritStatus === ActivityMeritStatus.REJECTED
                ? true
                : false
            }
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
        <div className="text-regular whitespace-pre-wrap">
          {activity?.description}
        </div>
      )}
    </div>
  );
};

export default ActivityApprovalCard;
