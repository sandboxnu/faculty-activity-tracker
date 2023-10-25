import type { NextApiRequest, NextApiResponse } from 'next';
import { getProfessorInfoForUser } from '@/services/professorInfo';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { professorId } = req.query;
  if (!professorId || isNaN(parseInt(professorId.toString()))) {
    res.status(400).json({ error: 'Missing/invalid user id.' });
  } else {
    if (req.method === 'GET') {
      await handleGet(parseInt(professorId.toString()), res);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
}

async function handleGet(userId: number, res: NextApiResponse) {
  const info = await getProfessorInfoForUser(userId);
  if (info) {
    res.status(200).json({ data: info });
  } else {
    res.status(404).end(`Professor info for user with id: ${userId} Not Found`);
  }
}
