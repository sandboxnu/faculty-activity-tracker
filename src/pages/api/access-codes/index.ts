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
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { getAccessCodes, setAccessCode } from '@/services/accessCode';

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
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const isAdmin = session?.user.admin;

    if (isAdmin) {
      if (req.method === 'GET') {
        await handleGet(req, res);
      }

      if (req.method === 'PUT') {
        if (req.body.role && req.body.newCode) {
          await handlePut(req, res);
        } else {
          res.status(422).json({ error: 'role and newCode is required' });
        }
      }
    } else {
      res.status(401).json({ error: 'Not authorized' });
    }
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  try {
    const accessCodes = await getAccessCodes();
    res.status(200).json({ data: accessCodes });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  try {
    const roleAccessCode = await setAccessCode(req.body.role, req.body.newCode);
    res.status(200).json({ data: roleAccessCode });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
