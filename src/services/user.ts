import { PrismaClient, User } from '.prisma/client';
import { CreateUserDto, UpdateUserDto } from '@/models/user.model';

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

export const getUserForQuery = async (
  query: UpdateUserDto,
): Promise<User[]> => {
  const users = await prisma.user.findMany({
    where: { ...query },
  });
  return users;
};

export const deleteUser = async (userId: number): Promise<User> => {
  const deleteUser = await prisma.user.delete({
    where: { id: userId },
  });
  return deleteUser;
};

export const updateUser = async (
  userId: number,
  user: UpdateUserDto,
): Promise<User> => {
  const newUser = await prisma.user.update({
    where: { id: userId },
    data: { ...user },
  });
  return newUser;
};
