import { ProfessorInfoDto } from '@/models/professorInfo.model';
import { ProfessScoreDto } from '@/models/professorScore.model';
import { UserDto } from '@/models/user.model';

type Tuple = [UserDto?, ProfessScoreDto?, ProfessorInfoDto?];

function groupByFirstLetterAndUserId(
  userArr: UserDto[],
  profScoreArr: ProfessScoreDto[],
  profInfoArr: ProfessorInfoDto[],
): Map<string, Tuple[]> {
  const userMap = new Map<number, Tuple>();

  // Initial grouping by userId
  userArr.forEach((item) => {
    if (!userMap.has(item.id)) {
      userMap.set(item.id, []);
    }
    userMap.get(item.id)![0] = item;
  });

  profScoreArr.forEach((item) => {
    if (!userMap.has(item.userId)) {
      userMap.set(item.userId, []);
    }
    userMap.get(item.userId)![1] = item;
  });

  profInfoArr.forEach((item) => {
    if (!userMap.has(item.userId)) {
      userMap.set(item.userId, []);
    }
    userMap.get(item.userId)![2] = item;
  });

  // map for grouping by first letter of LastName
  const letterMap = new Map<string, Tuple[]>();

  userMap.forEach((tuple) => {
    const user = tuple[0];
    if (user) {
      const firstLetter = user.lastName[0].toUpperCase();
      if (!letterMap.has(firstLetter)) {
        letterMap.set(firstLetter, []);
      }
      letterMap.get(firstLetter)!.push(tuple);
    }
  });

  return letterMap;
}

export default groupByFirstLetterAndUserId;
export type { Tuple };
