import type { NextApiRequest, NextApiResponse } from 'next';
import { createActivity, getAllActivities } from '@/services/activity';
import { CreateActivityDto } from '@/models/activity.model';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'POST':
      // POST /activities => create new activity
      await handlePost(req, res);
      break;
    case 'GET':
      // GET /activities => fetch activities
      await handleGet(res);
      break;
    // not a GET or POST request so shouldn't be using this route
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const newActivityDto = JSON.parse(
    JSON.stringify(req.body),
  ) as CreateActivityDto;
  const newActivity = await createActivity(newActivityDto);
  res.status(200).json({ data: newActivity });
}

async function handleGet(res: NextApiResponse) {
  const activities = await getAllActivities();
  res.status(200).json({ data: activities });
}
