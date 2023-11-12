import { UpdateProfessorScoreDto } from '@/models/professorScore.model';
import { PrismaClient, ProfessorScore } from '@prisma/client';

const prisma = new PrismaClient();

export const getProfessorScore = async (userId: number) => {
  const score = await prisma.professorScore.findUnique({
    where: { userId: userId },
  });

  return score;
};

export const getAllProfessorScores = async (): Promise<ProfessorScore[]> => {
  const scores = await prisma.professorScore.findMany();
  return scores;
};

export const upsertProfessorScore = async (
  score: UpdateProfessorScoreDto,
): Promise<ProfessorScore> => {
  const userId = score.userId;

  const newScore = await prisma.professorScore.upsert({
    where: { userId },
    update: { ...score },
    create: {
      userId,
      comment: score.comment || '',
      teachingScore: score.teachingScore || 0,
      researchScore: score.researchScore || 0,
      serviceScore: score.serviceScore || 0,
      totalScore: score.totalScore || 0,
    },
  });

  return newScore;
};
