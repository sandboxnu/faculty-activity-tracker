// prisma/seed.ts

import {
  PrismaClient,
  Role,
  SabbaticalOption,
  ProfessorPosition,
} from '@prisma/client';
import prisma from 'lib/db';

// initialize Prisma Client
const prisma = new PrismaClient();

async function createUserData() {
  const user1 = await prisma.user.upsert({
    where: { email: 'a@b.com' },
    update: {},
    create: {
      email: 'a@b.com',
      firstName: 'Dave',
      lastName: 'Dog',
      role: 'DEAN',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'a2@b.com' },
    update: {},
    create: {
      email: 'a2@b.com',
      firstName: 'Bob',
      lastName: 'Patel',
      role: 'DEAN',
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: 'a3@b.com' },
    update: {},
    create: {
      email: 'a3@b.com',
      firstName: 'Roger',
      lastName: 'Wow',
      preferredName: 'Rob',
      role: 'FACULTY',
    },
  });

  const user4 = await prisma.user.upsert({
    where: { email: 'a4@b.com' },
    update: {},
    create: {
      email: 'a4@b.com',
      firstName: 'Mark',
      lastName: 'Sivak',
      preferredName: 'Mark',
      role: 'MERIT_COMMITTEE_HEAD',
    },
  });

  const user5 = await prisma.user.upsert({
    where: { email: 'a5@b.com' },
    update: {},
    create: {
      email: 'a5@b.com',
      firstName: 'Diego',
      lastName: 'Hernandez',
      role: 'MERIT_COMMITTEE_MEMBER',
    },
  });

  const user6 = await prisma.user.upsert({
    where: { email: 'a6@b.com' },
    update: {},
    create: {
      email: 'a6@b.com',
      firstName: 'Ben',
      lastName: 'Lerner',
      preferredName: 'Blerner',
      role: 'FACULTY',
    },
  });

  const user7 = await prisma.user.upsert({
    where: { email: 'a7@b.com' },
    update: {},
    create: {
      email: 'a7@b.com',
      firstName: 'Christina',
      lastName: 'Long',
      preferredName: 'Hatsune Miku',
      role: 'MERIT_COMMITTEE_MEMBER',
    },
  });

  const user8 = await prisma.user.upsert({
    where: { email: 'a8@b.com' },
    update: {},
    create: {
      email: 'a8@b.com',
      firstName: 'Jeffery',
      lastName: 'Hopkins',
      preferredName: 'Jeff',
      role: 'FACULTY',
    },
  });

  const user9 = await prisma.user.upsert({
    where: { email: 'maxpinheiro181@gmail.com' },
    update: {},
    create: {
      email: 'maxpinheiro181@gmail.com',
      firstName: 'Max',
      lastName: 'Pinheiro',
      role: 'MERIT_COMMITTEE_MEMBER',
    },
  });

  const user10 = await prisma.user.upsert({
    where: { email: 'anshmarwa54345@gmail.com' },
    update: {},
    create: {
      email: 'anshmarwa54345@gmail.com',
      firstName: 'Ansh',
      lastName: 'Marwa',
      role: 'FACULTY',
    },
  });
  const user11 = await prisma.user.upsert({
    where: { email: 'thebirdlvr@gmail.com' },
    update: {},
    create: {
      email: 'thebirdlvr@gmail.com',
      firstName: 'Christina',
      lastName: 'Long',
      role: 'MERIT_COMMITTEE_MEMBER',
    },
  });

  const user12 = await prisma.user.upsert({
    where: { email: 'hernandez.die@husky.neu.edu' },
    update: {},
    create: {
      email: 'hernandez.die@husky.neu.edu',
      firstName: 'Diego',
      lastName: 'Hernandez',
      role: 'FACULTY',
    },
  });
}

async function createActivityData() {
  const activity1 = await prisma.activity.upsert({
    where: { id: 1 },
    update: {},
    create: {
      user: {
        connect: {
          email: 'a@b.com',
        },
      },
      year: 2023,
      semester: 'FALL',
      dateModified: new Date('2023-10-20T21:23:57.736Z').getTime(),
      name: 'Taught Course',
      description:
        'Led the the course intro to design, for over for 200 students',
      category: 'TEACHING',
      significance: 'MAJOR',
      isFavorite: false,
      meritStatus: 'ACCEPTED',
    },
  });

  const activity2 = await prisma.activity.upsert({
    where: { id: activity1.id + 1 },
    update: {},
    create: {
      user: {
        connect: {
          email: 'a2@b.com',
        },
      },
      year: 2020,
      semester: ['FALL', 'SPRING'],
      dateModified: new Date('2020-11-20T21:23:57.736Z').getTime(),
      name: 'Client Project',
      description: 'completed the client design project for Autodesk',
      category: 'SERVICE',
      significance: 'SIGNIFICANT',
      isFavorite: false,
      meritStatus: 'ACCEPTED',
    },
  });

  const activity3 = await prisma.activity.upsert({
    where: { id: activity2.id + 1 },
    update: {},
    create: {
      user: {
        connect: {
          email: 'a3@b.com',
        },
      },
      year: 2022,
      semester: 'FALL',
      dateModified: new Date('2022-11-20T21:23:57.736Z').getTime(),
      name: 'Directed Study',
      description: 'Animation simulation using Houdini',
      category: 'RESEARCH',
      significance: 'MINOR',
      isFavorite: false,
      meritStatus: 'REJECTED',
    },
  });

  const activity4 = await prisma.activity.upsert({
    where: { id: activity3.id + 1 },
    update: {},
    create: {
      user: {
        connect: {
          email: 'a8@b.com',
        },
      },
      year: 2023,
      semester: ['SPRING', 'SUMMER'],
      dateModified: new Date('2022-08-20T21:23:57.736Z').getTime(),
      name: 'New Course',
      description: 'ARTG 5240',
      category: 'TEACHING',
      significance: 'MAJOR',
      isFavorite: true,
    },
  });

  const activity5 = await prisma.activity.upsert({
    where: { id: activity4.id + 1 },
    update: {},
    create: {
      user: {
        connect: {
          email: 'maxpinheiro181@gmail.com',
        },
      },
      year: 2022,
      semester: ['FALL', 'OTHER'],
      dateModified: new Date('2022-10-20T21:23:57.736Z').getTime(),
      name: 'Field Trip',
      description: 'led a field trip to the MFA',
      category: 'TEACHING',
      significance: 'SIGNIFICANT',
      isFavorite: false,
      semesterOtherDescription: 'it was so lit, i did this many years xdd',
    },
  });

  const activity6 = await prisma.activity.upsert({
    where: { id: activity5.id + 1 },
    update: {},
    create: {
      user: {
        connect: {
          email: 'a8@b.com',
        },
      },
      year: 2021,
      semester: 'SPRING',
      dateModified: new Date('2022-10-20T21:23:57.736Z').getTime(),
      name: 'Led a minor teaching activity',
      description: 'something that I will edit later',
      category: 'TEACHING',
      significance: 'MINOR',
      isFavorite: false,
    },
  });

  const activity7 = await prisma.activity.upsert({
    where: { id: activity6.id + 1 },
    update: {},
    create: {
      user: {
        connect: {
          email: 'a8@b.com',
        },
      },
      year: 2022,
      semester: ['FALL', 'SPRING', 'SUMMER'],
      dateModified: new Date('2022-10-20T21:23:57.736Z').getTime(),
      name: 'Cure cancer',
      description: 'where is my money?',
      category: 'RESEARCH',
      significance: 'SIGNIFICANT',
      isFavorite: true,
    },
  });

  const activity8 = await prisma.activity.upsert({
    where: { id: activity7.id + 1 },
    update: {},
    create: {
      user: {
        connect: {
          email: 'hernandez.die@husky.neu.edu',
        },
      },
      year: 2023,
      semester: ['FALL', 'SPRING'],
      dateModified: new Date('2022-10-20T21:23:57.736Z').getTime(),
      name: 'Went Outside',
      description: 'Had fun outside',
      semesterOtherDescription: '',
      category: 'TEACHING',
      significance: 'MAJOR',
      isFavorite: false,
    },
  });

  const activity9 = await prisma.activity.upsert({
    where: { id: activity8.id + 1 },
    update: {},
    create: {
      user: {
        connect: {
          email: 'hernandez.die@husky.neu.edu',
        },
      },
      year: 2023,
      semester: ['SPRING'],
      dateModified: new Date('2022-10-20T21:23:57.736Z').getTime(),
      name: 'Founded a Charity',
      description:
        'I created a foundation that was able to raise millions of dollars!',
      semesterOtherDescription: '',
      category: 'RESEARCH',
      significance: 'MAJOR',
      isFavorite: false,
      meritStatus: 'ACCEPTED',
    },
  });

  const activity10 = await prisma.activity.upsert({
    where: { id: activity9.id + 1 },
    update: {},
    create: {
      user: {
        connect: {
          email: 'hernandez.die@husky.neu.edu',
        },
      },
      year: 2023,
      semester: ['SPRING'],
      dateModified: new Date('2022-10-20T21:23:57.736Z').getTime(),
      name: 'Taught CS3500',
      description:
        'I taught some fuckers how to code Java, Unfortunately, they all failed.',
      semesterOtherDescription: '',
      category: 'TEACHING',
      significance: 'MAJOR',
      isFavorite: true,
      meritStatus: 'REJECTED',
    },
  });

  const activity11 = await prisma.activity.upsert({
    where: { id: activity10.id + 1 },
    update: {},
    create: {
      user: {
        connect: {
          email: 'hernandez.die@husky.neu.edu',
        },
      },
      year: 2023,
      semester: ['FALL'],
      dateModified: new Date('2022-10-20T21:23:57.736Z').getTime(),
      name: 'did stuff',
      description: 'asdsd',
      semesterOtherDescription: '',
      category: 'TEACHING',
      significance: 'SIGNIFICANT',
      isFavorite: false,
    },
  });

  const activity12 = await prisma.activity.upsert({
    where: { id: activity11.id + 1 },
    update: {},
    create: {
      user: {
        connect: {
          email: 'hernandez.die@husky.neu.edu',
        },
      },
      year: 2022,
      semester: ['FALL'],
      dateModified: new Date('2022-10-20T21:23:57.736Z').getTime(),
      name: 'rer',
      description: 'This was',
      semesterOtherDescription: '',
      category: 'RESEARCH',
      significance: 'SIGNIFICANT',
      isFavorite: true,
    },
  });

  const activity13 = await prisma.activity.upsert({
    where: { id: activity12.id + 1 },
    update: {},
    create: {
      user: {
        connect: {
          email: 'hernandez.die@husky.neu.edu',
        },
      },
      year: 2003,
      semester: ['FALL'],
      dateModified: new Date('2022-10-20T21:23:57.736Z').getTime(),
      name: 'aksd',
      description: 'sdasdadad',
      semesterOtherDescription: '',
      category: 'TEACHING',
      significance: 'MAJOR',
      isFavorite: false,
    },
  });

  const activity14 = await prisma.activity.upsert({
    where: { id: activity13.id + 1 },
    update: {},
    create: {
      user: {
        connect: {
          email: 'hernandez.die@husky.neu.edu',
        },
      },
      year: 2023,
      semester: ['FALL', 'SPRING'],
      dateModified: new Date('2022-10-20T21:23:57.736Z').getTime(),
      name: 'Held a Soup Kitchen',
      description: 'Made soup for people who like soup',
      semesterOtherDescription: '',
      category: 'SERVICE',
      significance: 'MAJOR',
      isFavorite: true,
      meritStatus: 'ACCEPTED',
    },
  });
}

async function createProfessorInfoData() {
  const info1 = await prisma.professorInfo.upsert({
    where: { id: 1 },
    update: {},
    create: {
      user: {
        connect: {
          email: 'a@b.com',
        },
      },
      position: ProfessorPosition.TENURE,
      teachingPercent: 0.4,
      researchPercent: 0.4,
      servicePercent: 0.2,
      sabbatical: SabbaticalOption.NO,
    },
  });

  const info2 = await prisma.professorInfo.upsert({
    where: { id: 2 },
    update: {},
    create: {
      user: {
        connect: {
          email: 'a2@b.com',
        },
      },
      position: ProfessorPosition.TENURE,
      teachingPercent: 0.4,
      researchPercent: 0.5,
      servicePercent: 0.1,
      sabbatical: SabbaticalOption.SEMESTER,
    },
  });

  const info3 = await prisma.professorInfo.upsert({
    where: { id: 3 },
    update: {},
    create: {
      user: {
        connect: {
          email: 'a3@b.com',
        },
      },
      position: ProfessorPosition.NONTENURE,
      teachingPercent: 0.8,
      researchPercent: 0.1,
      servicePercent: 0.1,
      sabbatical: SabbaticalOption.YEAR,
    },
  });

  const info4 = await prisma.professorInfo.upsert({
    where: { id: 4 },
    update: {},
    create: {
      user: {
        connect: {
          email: 'a4@b.com',
        },
      },
      position: ProfessorPosition.TENURE,
      teachingPercent: 0.4,
      researchPercent: 0.5,
      servicePercent: 0.1,
      sabbatical: SabbaticalOption.NO,
      teachingReleaseExplanation:
        'Went on teaching release for Fall semester because of maternity leave',
    },
  });
  const info5 = await prisma.professorInfo.upsert({
    where: { id: 5 },
    update: {},
    create: {
      user: {
        connect: {
          email: 'maxpinheiro181@gmail.com',
        },
      },
      position: ProfessorPosition.TENURE,
      teachingPercent: 0.4,
      researchPercent: 0.5,
      servicePercent: 0.1,
      sabbatical: SabbaticalOption.NO,
      teachingReleaseExplanation:
        'Went on teaching release for Fall semester because of maternity leave',
    },
  });
  const info6 = await prisma.professorInfo.upsert({
    where: { id: 6 },
    update: {},
    create: {
      user: {
        connect: {
          email: 'hernandez.die@husky.neu.edu',
        },
      },
      position: 'Tenure Track Faculty',
      teachingPercent: 0.4,
      researchPercent: 0.5,
      servicePercent: 0.1,
      sabbatical: SabbaticalOption.NO,
      teachingReleaseExplanation:
        "I decided to be a monk for a year, but left because they didn't have any internet.",
    },
  });
}

async function createProfessorScoreData() {
  const score1 = await prisma.professorScore.upsert({
    where: { id: 1 },
    update: {},
    create: {
      user: {
        connect: {
          email: 'a@b.com',
        },
      },
      comment: '',
      teachingScore: 8,
      researchScore: 7,
      serviceScore: 6,
      totalScore: 8.3,
    },
  });

  const score2 = await prisma.professorScore.upsert({
    where: { id: 2 },
    update: {},
    create: {
      user: {
        connect: {
          email: 'a2@b.com',
        },
      },
      comment: 'Not enough research activities.',
      teachingScore: 9,
      researchScore: 2,
      serviceScore: 6,
      totalScore: 5,
    },
  });

  const score3 = await prisma.professorScore.upsert({
    where: { id: 3 },
    update: {},
    create: {
      user: {
        connect: {
          email: 'a3@b.com',
        },
      },
      comment: '',
      teachingScore: 8,
      researchScore: 8,
      serviceScore: 8,
      totalScore: 8,
    },
  });
}

async function createRoleAccessCodeData() {
  const code1 = await prisma.roleAccessCode.upsert({
    where: { id: 1 },
    update: {},
    create: {
      role: Role.FACULTY,
      accessCode: 'fatty',
    },
  });
  const code2 = await prisma.roleAccessCode.upsert({
    where: { id: 2 },
    update: {},
    create: {
      role: Role.MERIT_COMMITTEE_MEMBER,
      accessCode: 'chungus',
    },
  });
}

async function main() {
  await createUserData();
  await createActivityData();
  await createProfessorInfoData();
  await createRoleAccessCodeData();
  await createProfessorScoreData();
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });

// code from: https://www.prisma.io/blog/nestjs-prisma-rest-api-7D056s1BmOL0#seed-the-database
