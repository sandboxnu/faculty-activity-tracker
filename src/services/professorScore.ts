import {
  CreateProfessorScoreDto,
  UpdateProfessorScoreDto,
} from '@/models/professorScore.model';
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

export const calculateWeightedProfScore = async (userId: number) => {
  const score = await getProfessorScore(userId);

  const weights = await prisma.professorInfo.findUnique({
    where: { userId: userId },
  });

  if (score == null || weights == null) {
    return 0;
  }

  const teachingScore = score.teachingScore * weights.teachingPercent;
  const researchScore = score.researchScore * weights.researchPercent;
  const serviceScore = score.serviceScore * weights.servicePercent;

  return teachingScore + researchScore + serviceScore;
};

export const upsertProfessorScore = async (
  score: UpdateProfessorScoreDto,
): Promise<CreateProfessorScoreDto> => {
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

  const categoryScores: Record<ActivityCategory, number> = {
    TEACHING: 6,
    RESEARCH: 6,
    SERVICE: 6,
  };
  const categories: ActivityCategory[] = ['TEACHING', 'RESEARCH', 'SERVICE'];

  categories.forEach((category) => {
    const filteredActivities = filterActivitesForCategory(
      approvedActivities,
      category,
    );

    const activites: Record<SignificanceLevel, number> = {
      MAJOR: filterActivitesBySigLevel(filteredActivities, 'MAJOR').length,
      SIGNIFICANT: filterActivitesBySigLevel(filteredActivities, 'SIGNIFICANT')
        .length,
      MINOR: filterActivitesBySigLevel(filteredActivities, 'MINOR').length,
    };

    categoryScores[category] = computeCategoryScore(
      category,
      activites['MAJOR'],
      activites['SIGNIFICANT'],
      activites['MINOR'],
    );
  });

  return {
    userId: userId,
    teachingScore: categoryScores['TEACHING'],
    researchScore: categoryScores['RESEARCH'],
    serviceScore: categoryScores['SERVICE'],
  };
};

const computeCategoryScore = (
  category: ActivityCategory,
  major: number,
  significant: number,
  minor: number,
) => {
  switch (category) {
    case 'TEACHING':
      return computeTeachingCategoryScore(major, significant, minor);
    case 'RESEARCH':
      return computeResearchCategoryScore(major, significant, minor);
    case 'SERVICE':
      return computeServiceCategoryScore(major, significant, minor);
    default:
      return 6; // Should never reach here
  }
};

const computeTeachingCategoryScore = (
  major: number,
  significant: number,
  minor: number,
) => {
  if (major > 2 && significant > 4 && minor > 6) {
    return 8;
  } else if (major >= 1 && major <= 2 && significant > 3 && minor > 4) {
    return 7;
  } else {
    return 6;
  }
};

const computeResearchCategoryScore = (
  major: number,
  significant: number,
  minor: number,
) => {
  if (major > 1 && significant > 6 && minor > 6) {
    return 9;
  }

  if (major === 1 && significant > 4 && minor > 4) {
    return 8;
  } else if (major > 0 && significant > 2 && minor > 2) {
    return 7;
  } else {
    return 6;
  }
};

const computeServiceCategoryScore = (
  major: number,
  significant: number,
  minor: number,
) => {
  if (major > 3 && significant > 3 && minor > 6) {
    return 9;
  } else if (major > 1 && significant >= 2 && significant <= 3 && minor > 4) {
    return 8;
  } else if (major > 0 && significant >= 1 && significant <= 2 && minor > 2) {
    return 7;
  } else {
    return 6;
  }
};
