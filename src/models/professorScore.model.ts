import { ProfessorScore } from '@prisma/client';

export type ProfessScoreDto = ProfessorScore;

export type CreateProfessorScoreDto = Omit<ProfessScoreDto, 'id'>;

export type GetProfessorScore = { userId: number };

export type UpdateProfessorScoreDto = Partial<CreateProfessorScoreDto> & {
  userId: number;
};
