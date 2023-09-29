import { ActivityDto } from '@/models/activity.model';
import React, { useState } from 'react';
import moment from 'moment';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import {
  setActivityId,
  setCategory,
  setDescription,
  setLastDateModified,
  setName,
  setOtherDescription,
  setSemester,
  setWeight,
  setYear,
} from '@/store/form.store';

interface ActivityCarouselProps {
  activities: ActivityDto[];
  newActivity?: () => void;
  leftPadding?: boolean;
  label: string;
  favoriteActivity: (activityId: number, isFavorite: boolean) => void;
  displayNewActivity?: boolean;
}

const StarIcon: React.FC<{
  height?: number;
  width?: number;
  className?: string;
}> = ({ width = 20, height = 20, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 18 17"
    fill="none"
    className={className}
  >
    <path
      d="M8.77166 1.35441C8.85975 1.15679 9.14025 1.15678 9.22834 1.35441L10.8427 4.97617C11.0971 5.54672 11.6362 5.93845 12.2575 6.00402L16.2008 6.42022C16.416 6.44293 16.5027 6.7097 16.3419 6.85455L13.3963 9.50912C12.9323 9.92731 12.7263 10.5611 12.856 11.1722L13.6787 15.0512C13.7236 15.2629 13.4967 15.4277 13.3092 15.3196L9.87434 13.3385C9.33322 13.0264 8.66677 13.0264 8.12566 13.3385L4.69077 15.3196C4.50334 15.4277 4.27641 15.2629 4.3213 15.0512L5.14404 11.1722C5.27365 10.5611 5.06771 9.92731 4.60367 9.50912L1.65805 6.85455C1.49732 6.7097 1.584 6.44293 1.79917 6.42022L5.74255 6.00402C6.36377 5.93845 6.90293 5.54672 7.15726 4.97617L8.77166 1.35441Z"
      stroke="current"
      strokeWidth="1.5"
    />
  </svg>
);

const cardsPerPage = 3;
const numShift = 3;

const ActivityCarousel: React.FC<ActivityCarouselProps> = ({
  activities,
  newActivity,
  leftPadding,
  label,
  favoriteActivity,
  displayNewActivity = true,
}) => {
  const dispatch = useDispatch();
  const numPages = Math.max(
    Math.ceil(
      (activities.length + (displayNewActivity ? 1 : 0)) / cardsPerPage,
    ),
    1,
  );
  const [startCardIdx, setCardIdx] = useState(0);
  const currPage = Math.floor(startCardIdx / 3);

  const numActivities = useState(activities.length);

  const router = useRouter();

  const startEditingActivity = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    activity: ActivityDto,
  ) => {
    // console.log(activity.dateModified);
    dispatch(setCategory(activity.category));
    dispatch(setActivityId(activity.id));
    dispatch(setName(activity.name));
    dispatch(setWeight(activity.significance));
    dispatch(setYear(activity.year));
    dispatch(setSemester(activity.semester));
    dispatch(setDescription(activity.description));
    dispatch(setOtherDescription(activity.semesterOtherDescription));
    dispatch(setLastDateModified(activity.dateModified));
    router.push(`/submissions/edit`);
  };

  if (currPage + 1 > numPages) {
    setCardIdx((numPages - 1) * cardsPerPage);
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full items-center mt-3 pr-12 font-light">
        <p className="mr-2 text-base">{label} Activities</p>
        <div className="flex-grow h-[1.5px] bg-gray-200" />
        <p className="ml-2">
          Page {currPage + 1} of {numPages}
        </p>
      </div>
      <div
        className={`flex items-center ${
          leftPadding ? 'pl-8' : ' '
        } py-4 w-full relative overflow-x-hidden`}
      >
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="w-1/3 flex-shrink-0 pr-12"
            style={{ transform: `translate(-${startCardIdx * 100}%)` }}
          >
            <div
              onClick={(event) => startEditingActivity(event, activity)}
              className="rounded-lg bg-gray-100 shadow-sm hover:shadow-lg px-3.5 py-3.5 card h-39 cursor-pointer"
            >
              <div className="flex flex-col pl-2.5">
                <div className="flex item-center justify-between">
                  <p className="text-sm text-gray-500">
                    {moment(Number(activity.dateModified)).format(
                      'MMM D, YYYY',
                    )}
                  </p>
                  <div
                    onClick={(event) => {
                      event.stopPropagation();
                      favoriteActivity(activity.id, !activity.isFavorite);
                    }}
                  >
                    <StarIcon
                      className={`${
                        activity.isFavorite
                          ? 'stroke-red-500 fill-red-500/30'
                          : 'stroke-gray-500 hover:stroke-red-500'
                      } cursor-pointer duration-100`}
                    />
                  </div>
                </div>
                <p className="text-lg font-semibold my-3 truncate">
                  {activity.name}
                </p>
                <p className="text-gray-500 text-ellipsis-2 leading-5">
                  {activity.description}
                </p>
                <div className="hover-bar bg-red-500" />
              </div>
            </div>
          </div>
        ))}

        {displayNewActivity && (
          <div
            className="w-1/3 flex-shrink-0 pr-12"
            style={{ transform: `translate(-${startCardIdx * 100}%)` }}
          >
            <div
              className="rounded-lg bg-medium-grey shadow-sm hover:shadow-lg px-3.5 py-3.5 card h-39 cursor-pointer"
              onClick={newActivity}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <Image
                  src={'/media/plusIcon.svg'}
                  alt="new activity"
                  width={46}
                  height={36}
                  className="fill-red-500"
                />
                <p className="font-bold mt-2">Add Activity</p>
              </div>
            </div>
          </div>
        
        )}
        <div
          className={`absolute right-0 top-1/2 -translate-y-1/2 ${
            startCardIdx + cardsPerPage < activities.length + (displayNewActivity ? 1 : 0)
              ? 'cursor-pointer'
              : 'opacity-25 pointer-events-none'
          }`}
          onClick={() => setCardIdx((prev) => prev + numShift)}
        >
          <Image
            src={'/media/rightArrow.svg'}
            alt="right arrow"
            width={16}
            height={16}
          />
        </div>
        <div
          className={`absolute left-0 top-1/2 -translate-y-1/2 ${
            startCardIdx > 0
              ? 'cursor-pointer'
              : 'opacity-25 pointer-events-none'
          }`}
          onClick={() => setCardIdx((prev) => prev - numShift)}
        >
          <Image
            src={'/media/rightArrow.svg'}
            alt="left arrow"
            width={16}
            height={16}
            className="rotate-180"
          />
        </div>
      </div>
    </div>
  );
};

export default ActivityCarousel;
