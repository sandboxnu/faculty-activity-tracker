import { Role } from '.prisma/client';
import { RoleAccessCode } from '@prisma/client';
import prisma from 'lib/db';

export const getAccessCodes = async (): Promise<RoleAccessCode[] | null> => {
  const roleAccessCodes = await prisma.roleAccessCode.findMany();

  return roleAccessCodes;
};

export const obtainRole = async (accessCode: string): Promise<Role | null> => {
  const roleAccessCode = await prisma.roleAccessCode.findFirst({
    where: { accessCode },
  });
  return roleAccessCode?.role || null;
};
