import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { UpdateProfessorScoreDto } from '@/models/professorScore.model';
import {
  getProfessorScore,
  upsertProfessorScore,
} from '@/services/professorScore';
import { getUserById } from '@/services/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const isAdmin = session?.user.admin;
    const isMerit = session?.user.merit;

    if (isAdmin || isMerit) {
      if (req.method === 'PUT') {
        if (req.body.userId) {
          const userId = req.body.userId;
          const user = await getUserById(userId);

          if (!user) {
            res
              .status(400)
              .json({ error: 'User with ID ' + userId + ' does not exist.' });
            return;
          }
        } else {
          res.status(422).json({ error: 'userId is required' });
        }

        await handlePut(req, res);
      } else {
        res.status(405).send(`Method ${req.method} Not Allowed`);
      }
    } else {
      res.status(401).json({ error: 'Not authorized' });
    }
  } else {
    res.status(401).json({ error: 'Not authorized' });
  }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const newScoreDto = JSON.parse(
    JSON.stringify(req.body),
  ) as UpdateProfessorScoreDto;

  try {
    const score = await upsertProfessorScore(newScoreDto);
    res.status(200).json({ data: score });
  } catch (e) {
    res.status(500).json({ error: (e as Error)?.message || 'Unknown error' });
  }
}
