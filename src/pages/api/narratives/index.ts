import type { NextApiRequest, NextApiResponse } from 'next';
import {
  CreateNarrativeDto,
  UpdateNarrativeDto,
} from '@/models/narrative.model';
import {
  createNarrative,
  updateNarrative,
  deleteNarrative,
} from '@/services/narrative';

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
    const updatedNarrativeDto = req.body as UpdateNarrativeDto;
    try {
      const updatedNarrative = await updateNarrative(updatedNarrativeDto);
      res.status(200).json({ data: updatedNarrative });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  } else if (req.method === 'DELETE') {
    // all fields (except userId) should be optional which is the same as UpdateNarrativeDto
    const deletedNarrativeDto = req.body as UpdateNarrativeDto;
    try {
      const deletedNarrative = await deleteNarrative(deletedNarrativeDto);
      res.status(200).json({ data: deletedNarrative });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
}
