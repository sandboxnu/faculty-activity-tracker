import { UserDto } from '@/models/user.model';
import { Role } from '@prisma/client';

export const isAdminUser = (user: UserDto): boolean =>
  user.role === Role.MERIT_COMMITTEE_HEAD ||
  user.role === Role.MERIT_COMMITTEE_MEMBER ||
  user.role === Role.DEAN;

const roleFormats: Record<Role, string> = {
  FACULTY: 'Faculty',
  MERIT_COMMITTEE_MEMBER: 'Merit Committee Member',
  MERIT_COMMITTEE_HEAD: 'Merit Committee Head',
  DEAN: 'Dean',
};

export const formatRole = (role: Role): string => roleFormats[role];
