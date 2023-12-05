import { NextApiRequest, NextApiResponse } from 'next';
import {
  computeProfessorScore,
  getProfessorScore,
  upsertProfessorScore,
} from '@/services/professorScore';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { professorId } = req.query;

  if (!professorId) {
    res.status(400).json({ error: 'Professor not found' });
    return;
  }

  const parsedProfessorId = parseInt(
    Array.isArray(professorId) ? professorId[0] : professorId,
    10,
  );

  if (isNaN(parsedProfessorId)) {
    res.status(400).json({ error: 'Invalid professor ID' });
    return;
  }

  if (req.method === 'GET') {
    try {
      const professorScore = await getProfessorScore(parsedProfessorId);

      if (professorScore) {
        res.status(200).json(professorScore);
      } else {
        res.status(404).json({ error: 'Professor score not found' });
      }
    } catch (e) {
      res.status(500).json({ error: (e as Error)?.message || 'Unknown error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const computedScore = await computeProfessorScore(parsedProfessorId);
      const updatedScore = await upsertProfessorScore(computedScore);

      res.status(200).json(updatedScore);
    } catch (e) {
      res.status(500).json({ error: (e as Error)?.message || 'Unknown error' });
    }
  } else {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
