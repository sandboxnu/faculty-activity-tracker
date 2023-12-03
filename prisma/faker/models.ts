import {
  ActivityCategory,
  ActivityMeritStatus,
  ProfessorPosition,
  Role,
  SabbaticalOption,
  Semester,
  SignificanceLevel,
  User,
} from '@prisma/client';
import { faker } from '@faker-js/faker';
import { CreateUserDto } from '@/models/user.model';
import { CreateProfessorInfoDto } from '@/models/professorInfo.model';
import { CreateActivityDto } from '@/models/activity.model';
import { CreateProfessorScoreDto } from '@/models/professorScore.model';

export function createRandomUser(): CreateUserDto {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet
    .email({
      firstName,
      lastName,
      provider: 'husky.neu.edu',
    })
    .toLowerCase();
  const externalEmail = faker.internet
    .email({
      firstName,
      lastName,
    })
    .toLowerCase();
  return {
    firstName,
    lastName,
    preferredName: null,
    email,
    externalEmail,
    role: faker.helpers.enumValue(Role),
    dateModified: BigInt(Date.now()),
  };
}

export function createRandomProfessorInfo(user: User): CreateProfessorInfoDto {
  const teachingPercent = faker.number.int(100);
  const researchPercent = faker.number.int(100 - teachingPercent);
  const servicePercent = 100 - teachingPercent - researchPercent;
  return {
    userId: user.id,
    title: faker.person.jobTitle(),
    position: faker.helpers.enumValue(ProfessorPosition),
    teachingPercent,
    researchPercent,
    servicePercent,
    sabbatical: faker.helpers.enumValue(SabbaticalOption),
    teachingReleaseExplanation: null,
    phoneNumber: faker.string.numeric(10),
    officeLocation: faker.location.city(),
  };
}

export function createRandomActivity(user: User): CreateActivityDto {
  const semester = faker.helpers.arrayElements<Semester>(
    ['FALL', 'SPRING', 'SUMMER', 'OTHER'],
    { min: 1, max: 4 },
  );
  const category = faker.helpers.enumValue(ActivityCategory);
  return {
    userId: user.id,
    year: 2023,
    semester,
    dateModified: BigInt(Date.now()),
    name: faker.lorem.words({ min: 2, max: 5 }),
    description: faker.lorem.sentence(),
    semesterOtherDescription: semester.includes('OTHER')
      ? faker.lorem.sentence()
      : null,
    category,
    significance: faker.helpers.enumValue(SignificanceLevel),
    isFavorite: Math.random() > 0.75,
    meritStatus: faker.helpers.enumValue(ActivityMeritStatus),
  };
}

export function createRandomProfessorScore(
  user: User,
): CreateProfessorScoreDto {
  const teachingScore = faker.number.float({ max: 10, precision: 0.1 });
  const researchScore = faker.number.float({ max: 10, precision: 0.1 });
  const serviceScore = faker.number.float({ max: 10, precision: 0.1 });
  let totalScore = (teachingScore + researchScore + serviceScore) / 3.0;
  totalScore = Math.floor(totalScore * 100) / 100.0;
  return {
    userId: user.id,
    comment: faker.lorem.sentence(),
    teachingScore,
    researchScore,
    serviceScore,
    totalScore,
  };
}
