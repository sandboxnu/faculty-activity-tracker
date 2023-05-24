import { PrismaClient, Role } from '.prisma/client';

const prisma = new PrismaClient();

export const obtainRole = async (accessCode: string): Promise<Role | null> => {
  const roleAccessCode = await prisma.roleAccessCode.findFirst({
    where: { accessCode },
  });
  return roleAccessCode?.role || null;
};
