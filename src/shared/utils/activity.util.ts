import { SignificanceLevel } from '@prisma/client';
import { ActivityCategory, ActivityDto, Semester } from '../../models/activity.model';

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

export const seperateActivitiesBySemester = (
  activities: ActivityDto[],
): Record<Semester, ActivityDto[]> => {
  let activitiesBySemester: Record<Semester, ActivityDto[]> = {
    FALL: [],
    SPRING: [],
    SUMMER: [],
    OTHER: [],

  };
  for (let activity of activities) {
    for (let i = 0; i < activity.semester.length; i++) { 
      activitiesBySemester[activity.semester[i]].push(activity);
    }
  }
  return activitiesBySemester;
};

