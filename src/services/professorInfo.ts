import { PrismaClient, ProfessorInfo, SabbaticalOption } from '.prisma/client';
import {
  CreateProfessorInfoDto,
  UpdateProfessorInfoDto,
} from '@/models/professorInfo.model';

const prisma = new PrismaClient();

export const getProfessorInfoForUser = async (
  userId: number,
): Promise<ProfessorInfo | null> => {
  const info = await prisma.professorInfo.findUnique({ where: { userId } });
  return info;
};

export const createProfessorInfo = async (
  info: CreateProfessorInfoDto,
): Promise<ProfessorInfo> => {
  const newInfo = await prisma.professorInfo.create({ data: { ...info } });
  return newInfo;
};

export const deleteProfessorInfoForUser = async (
  userId: number,
): Promise<ProfessorInfo | null> => {
  try {
    const deleteInfo = await prisma.professorInfo.delete({
      where: { userId },
    });
    return deleteInfo;
  } catch (e) {
    // RecordNotFound exception
    console.error(e);
    return null;
  }
};

export const upsertProfessorInfoForUser = async (
  userId: number,
  info: UpdateProfessorInfoDto,
): Promise<ProfessorInfo> => {
  const newInfo = await prisma.professorInfo.upsert({
    where: { userId },
    update: { ...info },
    create: {
      userId,
      position: info.position || '',
      teachingPercent: info.teachingPercent || 0.4,
      researchPercent: info.researchPercent || 0.3,
      servicePercent: info.servicePercent || 0.3,
      sabbatical: SabbaticalOption.NO,
    },
  });
  return newInfo;
};
