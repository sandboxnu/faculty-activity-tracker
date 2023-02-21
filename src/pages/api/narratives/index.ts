import type { NextApiRequest, NextApiResponse } from 'next';
import { CreateNarrativeDto } from '@/models/narrative.model';
import { createNarrative } from '@/services/narrative';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const newNarrativeDto = req.body as CreateNarrativeDto;
    try {
      const newNarrative = await createNarrative(newNarrativeDto);
      res.status(200).json({ data: newNarrative });
    } catch (e) {
      res.status(500).json({ error: e });
    }
    // this should be diff if error
    // -> await error
  } else if (req.method === 'PUT') {
  } else if (req.method === 'DELETE') {
  }
}
