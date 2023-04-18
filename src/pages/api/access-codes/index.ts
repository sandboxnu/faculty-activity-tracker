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
  if (req.method === 'GET') {
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
  } else {
    res.status(404).json({ error: 'Invalid Parameters' });
  }
}
