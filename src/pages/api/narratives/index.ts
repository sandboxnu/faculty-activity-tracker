import type { NextApiRequest, NextApiResponse } from 'next';
import { CreateNarrativeDto } from '@/models/narrative.model';
import { createNarrative } from '@/services/narrative';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const newNarrativeDto = req.body as CreateNarrativeDto;
    const newNarrative = await createNarrative(newNarrativeDto);
    res.status(200).json({ data: newNarrative });
  }
}
