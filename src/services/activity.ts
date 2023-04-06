import { PrismaClient, Activity } from '.prisma/client';
import {
  ActivityOrderByQuery,
  CreateActivityDto,
  UpdateActivityDto,
} from '@/models/activity.model';

const prisma = new PrismaClient();

export const getAllActivities = async (): Promise<Activity[]> => {
  const activities = await prisma.activity.findMany();
  return activities;
};

export const getActivityById = async (
  activityId: number,
): Promise<Activity | null> => {
  const activity = await prisma.activity.findUnique({
    where: { id: activityId },
  });
  return activity || null;
};

export const getActivitiesForQuery = async (
  query: UpdateActivityDto,
  orderBy?: ActivityOrderByQuery,
): Promise<Activity[]> => {
  if (query.year) {
    query.year = parseInt(query.year as any);
  }
  if (query.userId) {
    query.userId = parseInt(query.userId as any);
  }
  if (query.dateModified) {
    query.dateModified = BigInt(query.dateModified as any);
  }
  if (query.isFavorite) {
    const temp = query.isFavorite?.toString() === 'true';
    query.isFavorite = temp;
  }
  const activities = await prisma.activity.findMany({
    where: { ...query },
    orderBy: orderBy || {},
  });
  return activities;
};

export const getActivitiesForUser = async (
  userId: number,
): Promise<Activity[]> => {
  const activities = await prisma.activity.findMany({
    where: { userId: userId },
  });
  return activities;
};

export const createActivity = async (
  activity: CreateActivityDto,
): Promise<Activity> => {
  const newActivity = await prisma.activity.create({ data: { ...activity } });
  return newActivity;
};

export const deleteActivity = async (activityId: number): Promise<Activity> => {
  const deleteActivity = await prisma.activity.delete({
    where: { id: activityId },
  });
  return deleteActivity;
};

export const updateActivity = async (
  activityId: number,
  activity: UpdateActivityDto,
): Promise<Activity> => {
  const newActivity = await prisma.activity.update({
    where: { id: activityId },
    data: { ...activity },
  });
  return newActivity;
};

// this allows json to parse BigInts
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};
