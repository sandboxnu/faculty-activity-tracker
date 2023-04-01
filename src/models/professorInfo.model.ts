import { ProfessorInfo } from '@prisma/client';

export type ProfessInfoDto = ProfessorInfo;

export type CreateProfessorInfoDto = Omit<ProfessInfoDto, 'id'>;

export type UpdateProfessorInfoDto = Partial<CreateProfessorInfoDto>;
