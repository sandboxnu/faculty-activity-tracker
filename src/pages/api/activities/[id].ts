import type { NextApiRequest, NextApiResponse } from 'next';
import {
  getActivityById,
  updateActivity,
  deleteActivity,
} from '@/services/activity';
import { CreateActivityDto, UpdateActivityDto } from '@/models/activity.model';

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
      case 'DELETE':
        // DELETE /activity[id] => delete activity with specified id
        await handleDelete(parseInt(id.toString()), res);
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
    res.status(404).end(`activity with id: ${id.toString()} Not Found`);
  } else {
    res.status(200).json({ data: activity });
  }
}

async function handlePut(
  id: number,
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const updateActivityDto = JSON.parse(
    JSON.stringify(req.body),
  ) as UpdateActivityDto;
  // Overwriting whatever date value with server time casted to a BigInt.
  updateActivityDto.dateModified = BigInt(Date.now());
  try {
    const activity = await updateActivity(id, updateActivityDto);
    res.status(200).json({ data: activity });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'bad request' });
  }
}

async function handleDelete(id: number, res: NextApiResponse) {
  try {
    const activity = await deleteActivity(id);
    res.status(200).json({ data: activity });
  } catch (error) {
    res.status(500).json({
      error:
        "Activity delete endpoint needs at least 1 valid argument. Valid args are {'id'}",
    });
  }
}
