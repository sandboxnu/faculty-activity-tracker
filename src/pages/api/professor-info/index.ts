import type { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteProfessorInfoForUser,
  getProfessInfoForUser,
  upsertProfessorInfoForUser,
} from '@/services/professorInfo';
import { UpdateProfessorInfoDto } from '@/models/professorInfo.model';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const userId = session.user?.id;
    if (userId) {
      switch (req.method) {
        case 'GET':
          // GET /users[id] => fetch professor info for user with given id
          await handleGet(userId, res);
          break;
        case 'PUT':
          // PUT /users[id] => update professor info for user with given id
          await handlePut(userId, req, res);
          break;

        case 'DELETE':
          // DELETE /activity[id] => delete professor info for user with given id
          await handleDelete(userId, res);
          break;
        // not a GET or PUT request so shouldn't be using this route
        default:
          res.setHeader('Allow', ['GET', 'PUT']);
          res.status(405).end(`Method ${req.method} Not Allowed`);
      }
    } else {
      res.status(400).json({ error: 'Missing/invalid user id.' });
    }
  } else {
    res.status(401).json({ error: 'Not logged in.' });
  }
}

async function handleGet(userId: number, res: NextApiResponse) {
  const info = await getProfessInfoForUser(userId);
  if (info) {
    res.status(200).json({ data: info });
  } else {
    res.status(404).end(`Professor info for user with id: ${userId} Not Found`);
  }
}

async function handlePut(
  userId: number,
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const newInfoDto = JSON.parse(
    JSON.stringify(req.body),
  ) as UpdateProfessorInfoDto;
  try {
    const info = await upsertProfessorInfoForUser(userId, newInfoDto);
    res.status(200).json({ data: info });
  } catch (e) {
    res.status(500).json({ error: (e as Error)?.message || 'unknown error' });
  }
}

async function handleDelete(userId: number, res: NextApiResponse) {
  try {
    const info = await deleteProfessorInfoForUser(userId);
    res.status(200).json({ data: info });
  } catch (error) {
    res.status(500).json({
      error:
        "ProfessorInfo delete endpoint needs at least 1 valid argument. Valid args are {'userId'}",
    });
  }
}
