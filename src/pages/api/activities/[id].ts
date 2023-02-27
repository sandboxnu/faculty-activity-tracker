import type { NextApiRequest, NextApiResponse } from 'next';
import { getActivityById, updateActivity } from '@/services/activity';
import { CreateActivityDto } from '@/models/activity.model';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;
  if (!id || isNaN(parseInt(id.toString()))) {
    res.status(400).json({ error: 'Missing/invalid activity id.' });
  } else {
    switch (req.method) {
      case 'GET':
        // GET /activities[id] => fetch activity with specified id
        await handleGet(parseInt(id.toString()), res);
        break;
      case 'PUT':
        // PUT /activities[id] => update activity of specified id
        await handlePut(parseInt(id.toString()), req, res);
        break;
      // not a GET or PUT request so shouldn't be using this route
      default:
        res.setHeader('Allow', ['GET', 'PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
}

async function handleGet(id: number, res: NextApiResponse) {
  const activity = await getActivityById(id);
  if (activity == 'not found') {
    res.status(405).end(`activity with id: ${id.toString()} Not Allowed`);
  } else {
    res.status(200).json({ data: activity });
  }
}

async function handlePut(
  id: number,
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const newActivityDto = JSON.parse(
    JSON.stringify(req.body),
  ) as CreateActivityDto;
  const activity = await updateActivity(
    parseInt(id.toString()),
    newActivityDto,
  );
  res.status(200).json({ data: activity });
}
