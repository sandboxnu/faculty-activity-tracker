import { SignificanceLevel, User } from '@prisma/client';
import {
  ActivityCategory,
  ActivityDistribution,
  ActivityDto,
  Semester,
} from '../../models/activity.model';
import { ActivityHistogramData } from '@/components/Merit/ActivityHistogram';

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
  let activitiesBySignificanceLevel: Record<SignificanceLevel, ActivityDto[]> =
    {
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

export const organizeActivityCountByUser = (
  activityDistribution: ActivityDistribution,
  users: User[],
): Record<User['id'], { user: User; count: number }> => {
  let activitiesByUser: Record<User['id'], { user: User; count: number }> = {};
  activityDistribution.forEach(({ userId, count }) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;
    activitiesByUser[userId] = { user, count };
  });
  return activitiesByUser;
};

export const organizeActivityHistogramData = (
  activityDistribution: ActivityDistribution,
  groups: [number, number][],
): ActivityHistogramData => {
  let countsByGroup: Record<string, number> = {};
  groups.forEach(([low, high]) => {
    countsByGroup[`${low}-${high}`] = 0;
  });
  activityDistribution.forEach(({ count }) => {
    const group = groups.find((g) => count >= g[0] && count <= g[1]);
    if (group === undefined) return;
    const [low, high] = group;
    countsByGroup[`${low}-${high}`] += count;
  });
  return Object.entries(countsByGroup).map(
    ([activityGroup, professorCount]) => ({ activityGroup, professorCount }),
  );
};
