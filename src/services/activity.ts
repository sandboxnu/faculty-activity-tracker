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

export const createActivity = async (activity: CreateActivityDto): Promise<Activity> => {
    console.log({ data: { ...activity } });
    const newActivity = await prisma.activity.create({ data: { ...activity } });
    return newActivity;
}
