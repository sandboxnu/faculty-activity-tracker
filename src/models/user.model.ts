import { Role, User } from '@prisma/client';

export type UserDto = User;

export type CreateUserDto = Omit<User, 'id'>;

export type UpdateUserDto = Partial<CreateUserDto>;

export type SortOrder = 'asc' | 'desc';

export type UserOrderByQuery = Partial<{
  [Property in keyof UserDto]: SortOrder;
}>;
