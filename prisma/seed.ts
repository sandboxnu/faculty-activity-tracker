// prisma/seed.ts

import { PrismaClient, SabbaticalOption } from '@prisma/client';

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
      role: 'FACULTY',
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
    where: { email: 'a9@b.com' },
    update: {},
    create: {
      email: 'a9@b.com',
      firstName: 'John',
      lastName: 'Appleseed',
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
      dateModified: new Date('2023-10-20T21:23:57.736Z'),
      name: 'Taught Course',
      description:
        'Led the the course intro to design, for over for 200 students',
      category: 'TEACHING',
      significance: 'MAJOR',
      isFavorite: false,
    },
  });

  const activity2 = await prisma.activity.upsert({
    where: { id: activity1.id + 1 },
    update: {},
    create: {
      user: {
        connect: {
          email: 'a3@b.com',
        },
      },
      year: 2020,
      semester: ['FALL', 'SPRING'],
      dateModified: new Date('2020-11-20T21:23:57.736Z'),
      name: 'Client Project',
      description: 'completed the client design project for Autodesk',
      category: 'SERVICE',
      significance: 'SIGNIFICANT',
      isFavorite: false,
    },
  });

  const activity3 = await prisma.activity.upsert({
    where: { id: activity2.id + 1 },
    update: {},
    create: {
      user: {
        connect: {
          email: 'a6@b.com',
        },
      },
      year: 2022,
     semester: 'FALL',
      dateModified: new Date('2022-11-20T21:23:57.736Z'),
      name: 'Directed Study',
      description: 'Animation simulation using Houdini',
      category: 'RESEARCH',
      significance: 'MINOR',
      isFavorite: false,
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
      dateModified: new Date('2022-08-20T21:23:57.736Z'),
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
          email: 'a@b.com',
        },
      },
      year: 2022,
      semester: 'FALL',
      dateModified: new Date('2022-10-20T21:23:57.736Z'),
      name: 'Field Trip',
      description: 'led a field trip to the MFA',
      category: 'TEACHING',
      significance: 'SIGNIFICANT',
      isFavorite: false,
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
      dateModified: new Date('2022-10-20T21:23:57.736Z'),
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
      dateModified: new Date('2022-10-20T21:23:57.736Z'),
      name: 'Cure cancer',
      description: 'where is my money?',
      category: 'RESEARCH',
      significance: 'SIGNIFICANT',
      isFavorite: true,
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
      position: 'Tenured Faculty',
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
      position: 'Tenure Track Faculty',
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
      position: 'Teaching Faculty',
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
      position: 'Tenure Track Faculty',
      teachingPercent: 0.4,
      researchPercent: 0.5,
      servicePercent: 0.1,
      sabbatical: SabbaticalOption.NO,
      teachingReleaseExplanation:
        'Went on teaching release for Fall semester because of maternity leave',
    },
  });
}

async function main() {
  await createUserData();
  await createActivityData();
  await createProfessorInfoData();
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
