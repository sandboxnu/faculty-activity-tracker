import { ProfessorInfo } from '@prisma/client';

export type ProfessorInfoDto = ProfessorInfo;

export type CreateProfessorInfoDto = Omit<ProfessorInfoDto, 'id'>;

export type UpdateProfessorInfoDto = Partial<CreateProfessorInfoDto>;
