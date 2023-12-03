import {
  Activity,
  PrismaClient,
  ProfessorInfo,
  ProfessorScore,
  User,
} from '@prisma/client';
import {
  createRandomActivity,
  createRandomProfessorInfo,
  createRandomProfessorScore,
  createRandomUser,
} from './models';
import fs from 'fs';
import moment from 'moment';

const bigintStringify = <T>(object: T): string => {
  return JSON.stringify(
    object,
    (_, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
  );
};

function randomGaussian(mean = 0, stdev = 1): number {
  const u = 1 - Math.random(); // Converting [0,1) to (0,1]
  const v = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  // Transform to the desired mean and standard deviation:
  return Math.round(z * stdev + mean);
}

const prisma = new PrismaClient();

async function createUserData(numUsers: number): Promise<User[]> {
  return Promise.all(
    Array(numUsers)
      .fill(null)
      .map((_) =>
        prisma.user.create({
          data: createRandomUser(),
        }),
      ),
  );
}

async function createProfessorInfoData(
  users: User[],
): Promise<ProfessorInfo[]> {
  const data = users.map((user) => createRandomProfessorInfo(user));
  await prisma.professorInfo.createMany({
    data,
  });
  return prisma.professorInfo.findMany({
    where: { userId: { in: users.map((u) => u.id) } },
  });
}

async function createActivityData(
  users: User[],
  activityRange: [number, number] = [1, 25],
): Promise<Activity[]> {
  const [min, max] = activityRange;
  const data = users
    .map((user) =>
      Array(randomGaussian(min + (max - min) / 2, 5))
        .fill(null)
        .map((_) => createRandomActivity(user)),
    )
    .flat();
  await prisma.activity.createMany({
    data,
  });
  return prisma.activity.findMany({
    where: { userId: { in: users.map((u) => u.id) } },
  });
}

async function createProfessorScoreData(
  users: User[],
): Promise<ProfessorScore[]> {
  const data = users.map((user) => createRandomProfessorScore(user));
  await prisma.professorScore.createMany({
    data,
  });
  return prisma.professorScore.findMany({
    where: { userId: { in: users.map((u) => u.id) } },
  });
}

async function main() {
  const numUsers = parseInt(process.argv[2] ?? '50');
  const users = await createUserData(numUsers);

  const [professorInfo, activities, professorScores] = await Promise.all([
    createProfessorInfoData(users),
    createActivityData(users),
    createProfessorScoreData(users),
  ]);
  const fileContent = bigintStringify({
    users,
    professorInfo,
    activities,
    professorScores,
  });
  const dateStr = moment().format('YYYY-MM-DD_H.m.s_A');
  const fileName = `prisma/faker/out/${dateStr}.json`;
  try {
    fs.writeFile(fileName, fileContent, () => {
      console.log(`Successfully wrote to ${fileName}`);
    });
  } catch (e) {
    console.log(`Could not write to file: ${(e as Error).message}`);
  }
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
