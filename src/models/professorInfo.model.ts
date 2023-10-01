import { Option } from '@/shared/components/DropdownInput';
import {
  ProfessorInfo,
  ProfessorPosition,
  SabbaticalOption,
} from '@prisma/client';

export type ProfessorInfoDto = ProfessorInfo;

export type CreateProfessorInfoDto = Omit<ProfessorInfoDto, 'id'>;

export type UpdateProfessorInfoDto = Partial<CreateProfessorInfoDto>;

export const professorPositionLabel: Record<ProfessorPosition, string> = {
  [ProfessorPosition.TENURE]: 'Tenure Track / Tenured',
  [ProfessorPosition.NONTENURE]: 'Non-Tenure Track',
};

export const professorPositionOptions: Option<ProfessorPosition>[] = [
  ProfessorPosition.NONTENURE,
  ProfessorPosition.TENURE,
].map((p) => ({
  label: professorPositionLabel[p],
  value: p,
}));

export const sabbaticalLabel: Record<SabbaticalOption, string> = {
  [SabbaticalOption.NO]: 'Not Sabbatical',
  [SabbaticalOption.SEMESTER]: 'Sabbatical: Semester',
  [SabbaticalOption.YEAR]: 'Sabbatical: Year',
};

export const sabbaticalOptions: Option<SabbaticalOption>[] = [
  SabbaticalOption.NO,
  SabbaticalOption.SEMESTER,
  SabbaticalOption.YEAR,
].map((s) => ({
  label: sabbaticalLabel[s],
  value: s,
}));
