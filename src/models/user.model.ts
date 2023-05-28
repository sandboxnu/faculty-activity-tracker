import { Activity, Narrative, ProfessorInfo, Role, User } from '@prisma/client';

export type UserDto = User;

export type UserWithInfo = User & { professorInfo: ProfessorInfo | null };

export type UserWithActivities = User & { activities: Activity[] };

export type UserWithAllData = User & {
  professorInfo: ProfessorInfo | null;
  activities: Activity[];
  narratives: Narrative[];
};

export type CreateUserDto = Omit<User, 'id'>;

export type UpdateUserDto = Partial<CreateUserDto>;

export type SortOrder = 'asc' | 'desc';

export type UserOrderByQuery = Partial<{
  [Property in keyof UserDto]: SortOrder;
}>;
