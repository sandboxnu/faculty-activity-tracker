import { SignificanceLevel } from '@prisma/client';
import { ActivityCategory, ActivityDto } from '../../models/activity.model';

export const seperateActivitiesByCategory = (
  activities: ActivityDto[],
): Record<ActivityCategory, ActivityDto[]> => {
  let activitiesByCategory: Record<ActivityCategory, ActivityDto[]> = {
    TEACHING: [],
    RESEARCH: [],
    SERVICE: [],
  };
  for (let activity of activities) {
    activitiesByCategory[activity.category].push(activity);
  }
  return activitiesByCategory;
};

export const seperateActivitiesBySignifanceLevel = (
  activities: ActivityDto[],
): Record<SignificanceLevel, ActivityDto[]> => {
  let activitiesBySignificanceLevel: Record<SignificanceLevel, ActivityDto[]> = {
    MAJOR: [],
    SIGNIFICANT: [],
    MINOR: [],
  };
  for (let activity of activities) {
    activitiesBySignificanceLevel[activity.significance].push(activity);
  }
  return activitiesBySignificanceLevel;
};

