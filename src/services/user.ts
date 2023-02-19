import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllUsers = async (): Promise<User[]> => {
  const users = await prisma.user.findMany();
  return users;
};

export const getUserById = async (
  userId: number,
): Promise<User | 'not found'> => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return user || 'not found';
};

export const getUserByEmail = async (
  email: string,
): Promise<User | 'not found'> => {
  const user = await prisma.user.findUnique({ where: { email: email } });
  return user || 'not found';
};
