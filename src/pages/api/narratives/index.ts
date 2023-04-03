import type { NextApiRequest, NextApiResponse } from 'next';
import {
  CreateNarrativeDto,
  UpdateNarrativeDto,
  DeleteNarrativeDto,
  NarrativeDto,
  NarrativeCategory,
} from '@/models/narrative.model';
import {
  createNarrative,
  updateNarrative,
  deleteNarrative,
  getNarrativeForUserForCategory,
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
    newNarrativeDto.dateModified = BigInt(Date.now());

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
    updatedNarrativeDto.dateModified = BigInt(Date.now());

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
  } else if (req.method === 'GET') {
    await handleGet(req, res);
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const { userId, category } = req.query;
  if (userId && category) {
    const narrative = await getNarrativeForUserForCategory(
      parseInt(userId.toString()),
      category.toString().toUpperCase() as NarrativeCategory,
    );

    res.status(200).json({ data: narrative });
  } /* else if (userId) {
    const activities = await getNarrativeForQuery({ userId: parseInt(userId.toString()) });
    res.status(200).json({ data: activities });
  } else {
    const activities = await getAllNarrative();
    res.status(200).json({ data: activities }); 
  }
  */ else {
    res.status(404).json({ error: 'Invalid Parameters' });
  }
}
