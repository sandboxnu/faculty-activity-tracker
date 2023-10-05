import { UserDto } from '@/models/user.model';
import { ActivityCategory, Role } from '@prisma/client';

export const isAdminUser = (user: UserDto): boolean =>
  user.role === Role.MERIT_COMMITTEE_HEAD || user.role === Role.DEAN;

export const NotFacultyUser = (user: UserDto): boolean =>
  user.role !== Role.FACULTY;

const roleFormats: Record<Role, string> = {
  FACULTY: 'Faculty',
  MERIT_COMMITTEE_MEMBER: 'Merit Committee Member',
  MERIT_COMMITTEE_HEAD: 'Merit Committee Head',
  DEAN: 'Dean',
};

export const formatRole = (role: Role): string => roleFormats[role];

export type SortType = 'first name' | 'last name' | 'email' | 'role';

export type SortDir = 'asc' | 'desc';

export const userSorter: Record<
  SortType,
  Record<SortDir, (a: UserDto, b: UserDto) => number>
> = {
  'first name': {
    asc: (a, b) => a.firstName.localeCompare(b.firstName),
    desc: (a, b) => a.firstName.localeCompare(b.firstName) * -1,
  },
  'last name': {
    asc: (a, b) => a.lastName.localeCompare(b.lastName),
    desc: (a, b) => a.lastName.localeCompare(b.lastName) * -1,
  },
  email: {
    asc: (a, b) => a.email.localeCompare(b.email),
    desc: (a, b) => a.email.localeCompare(b.email) * -1,
  },
  role: {
    asc: (a, b) => a.role.localeCompare(b.role),
    desc: (a, b) => a.role.localeCompare(b.role) * -1,
  },
};
