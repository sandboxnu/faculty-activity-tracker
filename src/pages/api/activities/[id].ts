import type { NextApiRequest, NextApiResponse } from 'next';
import { getActivityById } from '@/services/activity';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;
  if (!id || isNaN(parseInt(id.toString()))) {
    res.status(400).json({ error: 'Missing/invalid activity id.' });
  } else {
    const activity = await getActivityById(parseInt(id.toString()));
    return activity;
  }
}
