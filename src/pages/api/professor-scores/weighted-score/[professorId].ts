import { NextApiRequest, NextApiResponse } from 'next';

import { calculateWeightedProfScore } from '@/services/professorScore';

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

  if (req.method === 'GET') {
    try {
      const professorScore =
        await calculateWeightedProfScore(parsedProfessorId);

      if (professorScore) {
        res.status(200).json(professorScore);
      } else {
        res.status(404).json({ error: 'Professor score not found' });
      }
    } catch (e) {
      res.status(500).json({ error: (e as Error)?.message || 'Unknown error' });
    }
  }
}
