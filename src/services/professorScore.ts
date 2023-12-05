import { UpdateProfessorScoreDto } from '@/models/professorScore.model';
import { Activity, ProfessorScore, SignificanceLevel } from '@prisma/client';
import prisma from 'lib/db';
import { getActivitiesForUser } from './activity';
import { ActivityCategory } from '@/models/activity.model';

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

export const computeProfessorScore = async (
  userId: number,
): Promise<UpdateProfessorScoreDto> => {
  const filterActivitesBySigLevel = (
    activites: Activity[],
    sigLevel: SignificanceLevel,
  ) => {
    return activites.filter((activity) => activity.significance === sigLevel);
  };

  const filterActivitesForCategory = (
    activites: Activity[],
    category: ActivityCategory,
  ) => {
    return activites.filter((activity) => activity.category === category);
  };

  const activites = await getActivitiesForUser(userId);
  const approvedActivities = activites.filter(
    (activity) => activity.meritStatus === 'ACCEPTED',
  );

  let teachingScore = 6;
  let researchScore = 6;
  let serviceScore = 6;

  const categories: ActivityCategory[] = ['TEACHING', 'RESEARCH', 'SERVICE'];

  categories.forEach((category) => {
    const filteredActivities = filterActivitesForCategory(
      approvedActivities,
      category,
    );

    const majorActivities = filterActivitesBySigLevel(
      filteredActivities,
      'MAJOR',
    ).length;
    const minorActivities = filterActivitesBySigLevel(
      filteredActivities,
      'MINOR',
    ).length;
    const significantActivites = filterActivitesBySigLevel(
      filteredActivities,
      'SIGNIFICANT',
    ).length;

    if (category === 'TEACHING') {
      if (
        majorActivities > 2 &&
        significantActivites > 4 &&
        minorActivities > 6
      ) {
        teachingScore = 8;
        return;
      }

      if (
        majorActivities >= 1 &&
        majorActivities <= 2 &&
        significantActivites > 3 &&
        minorActivities > 4
      ) {
        teachingScore = 7;
        return;
      }
    }

    if (category === 'RESEARCH') {
      if (
        majorActivities > 1 &&
        significantActivites > 6 &&
        minorActivities > 6
      ) {
        researchScore = 9;
        return;
      }

      if (
        majorActivities === 1 &&
        significantActivites > 4 &&
        minorActivities > 4
      ) {
        researchScore = 8;
        return;
      }

      if (
        majorActivities > 0 &&
        significantActivites > 2 &&
        minorActivities > 2
      ) {
        researchScore = 7;
        return;
      }
    }

    if (category === 'SERVICE') {
      if (
        majorActivities > 3 &&
        significantActivites > 3 &&
        minorActivities > 6
      ) {
        serviceScore = 9;
        return;
      }

      if (
        majorActivities > 1 &&
        significantActivites >= 2 &&
        significantActivites <= 3 &&
        minorActivities > 4
      ) {
        serviceScore = 8;
        return;
      }

      if (
        majorActivities > 0 &&
        significantActivites >= 1 &&
        significantActivites <= 2 &&
        minorActivities > 2
      ) {
        serviceScore = 7;
        return;
      }
    }
  });

  return {
    userId: userId,
    teachingScore: teachingScore,
    researchScore: researchScore,
    serviceScore: serviceScore,
  };
};
