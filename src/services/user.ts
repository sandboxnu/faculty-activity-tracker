import { PrismaClient, User } from '.prisma/client';
import {
  CreateUserDto,
  UpdateUserDto,
  UserOrderByQuery,
  UserWithActivities,
  UserWithAllData,
  UserWithInfo,
} from '@/models/user.model';

const prisma = new PrismaClient();

export const getAllUsers = async (): Promise<User[]> => {
  const users = await prisma.user.findMany();
  return users;
};

export const createUser = async (user: CreateUserDto): Promise<User> => {
  const newUser = await prisma.user.create({ data: { ...user } });
  return newUser;
};

export const getUserById = async (userId: number): Promise<User | null> => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return user;
};

export const getUserWithInfo = async (
  userId: number,
): Promise<UserWithInfo | null> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { professorInfo: true },
  });
  return user;
};

export const getUserWithActivities = async (
  userId: number,
): Promise<UserWithActivities | null> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { activities: true },
  });
  return user;
};

export const getUserWithAllData = async (
  userId: number,
): Promise<UserWithAllData | null> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { activities: true, narratives: true, professorInfo: true },
  });
  return user;
};

export const getUsersByQuery = async (
  query: UpdateUserDto,
  orderBy?: UserOrderByQuery,
): Promise<User[]> => {
  const users = await prisma.user.findMany({
    orderBy: orderBy || {},
    where: { ...query },
  });
  return users;
};

export const deleteUser = async (userId: number): Promise<User | null> => {
  try {
    const deleteUser = await prisma.user.delete({
      where: { id: userId },
    });
    return deleteUser;
  } catch (e) {
    // RecordNotFound exception
    console.error(e);
    return null;
  }
};

export const updateUser = async (
  userId: number,
  user: UpdateUserDto,
): Promise<User | null> => {
  try {
    const newUser = await prisma.user.update({
      where: { id: userId },
      data: { ...user },
    });
    return newUser;
  } catch (e) {
    // RecordNotFound exception
    console.error(e);
    return null;
  }
};
