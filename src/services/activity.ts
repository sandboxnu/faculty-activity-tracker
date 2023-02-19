import { PrismaClient, Activity } from '.prisma/client';
import { ActivityCategory, CreateActivityDto } from '@/models/activity.model';

const prisma = new PrismaClient();

export const getAllActivities = async (): Promise<Activity[]> => {
  const activities = await prisma.activity.findMany();
  return activities;
};

export const getActivityById = async (
  activityId: number,
): Promise<Activity | 'not found'> => {
  const activity = await prisma.activity.findUnique({
    where: { id: activityId },
  });
  return activity || 'not found';
};

export const getActivitiesForUser = async (userId: number): Promise<Activity[] | "not found"> => {
    const activities = await prisma.activity.findMany({ where: { userId: userId } });
    return activities || "not found";
}

export const getActivitiesForUserForCategory = async (userId: number, category: ActivityCategory): Promise<Activity[] | "not found"> => {
  const activities = await prisma.activity.findMany({ where: { userId: userId, category: category } });
  return activities || "not found";
}

export const createActivity = async (
  activity: CreateActivityDto,
): Promise<Activity> => {
  const newActivity = await prisma.activity.create({ data: { ...activity } });
  return newActivity;
};

export const updateActivity = async (
  activityId: number,
  activity: CreateActivityDto,
): Promise<Activity | 'not found'> => {
  const newActivity = await prisma.activity.update({
    where: { id: activityId },
    data: { ...activity, dateModified: Date.now() },
  });
  return newActivity || 'not found';
};

// this allows json to parse BigInts
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};
