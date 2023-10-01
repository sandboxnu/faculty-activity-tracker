import { UpdateProfessorInfoDto } from '@/models/professorInfo.model';
import { UpdateUserDto, UserDto } from '@/models/user.model';
import { ProfileInformation } from '@/store/profile.store';
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

export const validateProfileInformation = (
  info: Partial<ProfileInformation>,
): ProfileInformation | string => {
  let key: keyof ProfileInformation;
  for (key in info) {
    if (!info[key]) return `Missing field: ${key}`;
  }
  return info as ProfileInformation;
};

export const separateProfileInformation = (
  info: ProfileInformation,
): { userInfo: UpdateUserDto; professorInfo: UpdateProfessorInfoDto } => {
  const userInfo: UpdateUserDto = {
    firstName: info.firstName,
    lastName: info.lastName,
    email: info.email,
  };
  const professorInfo: UpdateProfessorInfoDto = {
    position: info.position,
    sabbatical: info.sabbatical,
    teachingPercent: info.teachingPercent,
    researchPercent: info.researchPercent,
    servicePercent: info.servicePercent,
    phoneNumber: info.phoneNumber,
    officeLocation: info.officeLocation,
  };
  // remove any undefined fields
  let userKey: keyof UpdateUserDto;
  for (userKey in userInfo) {
    if (!userInfo[userKey]) delete userInfo[userKey];
  }
  let profKey: keyof UpdateProfessorInfoDto;
  for (profKey in professorInfo) {
    if (!professorInfo[profKey]) delete professorInfo[profKey];
  }
  return {
    userInfo,
    professorInfo,
  };
};
