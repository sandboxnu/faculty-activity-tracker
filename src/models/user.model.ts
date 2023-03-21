import { User } from '@prisma/client';

export type UserDto = User;

export type CreateUserDto = Omit<User, 'id'>;

export type UpdateUserDto = Partial<CreateUserDto>;
