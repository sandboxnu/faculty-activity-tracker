import type { NextApiRequest, NextApiResponse } from 'next';
import {
  CreateNarrativeDto,
  UpdateNarrativeDto,
  DeleteNarrativeDto,
} from '@/models/narrative.model';
import {
  createNarrative,
  updateNarrative,
  deleteNarrative,
} from '@/services/narrative';

// next js .json doesnt parse bigint so we use workaround below
// https://github.com/GoogleChromeLabs/jsbi/issues/30
const bigintToJSON = (object: UpdateNarrativeDto): UpdateNarrativeDto => {
  return JSON.parse(
    JSON.stringify(
      object,
      (key, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
    ),
  );
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const newNarrativeDto = req.body as CreateNarrativeDto;
    try {
      const newNarrative = await createNarrative(newNarrativeDto);

      res.status(200).json({ data: bigintToJSON(newNarrative) });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  } else if (req.method === 'PUT') {
    // Deleting and Updating Narratives is based of the id of the Narrative
    const updatedNarrativeDto = req.body as UpdateNarrativeDto;
    try {
      const updatedNarrative = await updateNarrative(updatedNarrativeDto);
      res.status(200).json({ data: bigintToJSON(updatedNarrative) });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  } else if (req.method === 'DELETE') {
    const deletedNarrativeDto = req.body as DeleteNarrativeDto;
    try {
      const deletedNarrative = await deleteNarrative(deletedNarrativeDto);
      res.status(200).json({ data: bigintToJSON(deletedNarrative) });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
}
