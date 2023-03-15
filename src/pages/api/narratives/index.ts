import type { NextApiRequest, NextApiResponse } from 'next';
import {
  CreateNarrativeDto,
  UpdateNarrativeDto,
  DeleteNarrativeDto,
  NarrativeDto,
} from '@/models/narrative.model';
import {
  createNarrative,
  updateNarrative,
  deleteNarrative,
} from '@/services/narrative';
import { PrismaClientValidationError } from '@prisma/client/runtime';

// next js .json doesnt parse bigint so we use workaround below
// https://github.com/GoogleChromeLabs/jsbi/issues/30
const bigintToJSON = (object: Partial<NarrativeDto>): Partial<NarrativeDto> => {
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
      console.log(e);
      res.status(500).json({ error: e });
    }
  } else if (req.method === 'PUT') {
    // Deleting and Updating Narratives is based of the id of the Narrative
    const updatedNarrativeDto = req.body as UpdateNarrativeDto;
    try {
      const updatedNarrative = await updateNarrative(updatedNarrativeDto);
      res.status(200).json({ data: bigintToJSON(updatedNarrative) });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e });
    }
  } else if (req.method === 'DELETE') {
    const deletedNarrativeDto = req.body as DeleteNarrativeDto;
    try {
      const deletedNarrative = await deleteNarrative(deletedNarrativeDto);
      res.status(200).json({ data: bigintToJSON(deletedNarrative) });
    } catch (e) {
      if (e instanceof PrismaClientValidationError) {
        res.status(500).json({
          error:
            "Narrative delete endpoint needs at least 1 valid argument. Valid args are {'id'}",
        });
      } else {
        res.status(500).json({ error: e });
      }
    }
  }
}
