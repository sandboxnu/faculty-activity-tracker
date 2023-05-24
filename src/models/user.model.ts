import { Activity, Narrative, ProfessorInfo, Role, User } from '@prisma/client';

export type UserDto = User;

export type UserWithInfo = User & { ProfessorInfo: ProfessorInfo | null };

export type UserWithActivities = User & { Activity: Activity[] };

export type UserWithAllData = User & {
  ProfessorInfo: ProfessorInfo | null;
  Activity: Activity[];
  Narrative: Narrative[];
};

export type CreateUserDto = Omit<User, 'id'>;

export type UpdateUserDto = Partial<CreateUserDto>;

export type SortOrder = 'asc' | 'desc';

export type UserOrderByQuery = Partial<{
  [Property in keyof UserDto]: SortOrder;
}>;
