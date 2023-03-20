import type { NextApiRequest, NextApiResponse } from 'next';
import { createActivity, getActivitiesForUser, getActivitiesForUserForCategory, getAllActivities } from '@/services/activity';
import { ActivityCategory, CreateActivityDto } from '@/models/activity.model';

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
      await handleGet(req, res);
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

  // Overwriting whatever date value with server time casted to a BigInt.
  newActivityDto.dateModified = BigInt(Date.now());

  const newActivity = await createActivity(newActivityDto);
  res.status(200).json({ data: newActivity });
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const { userId, category } = req.query;
  if (userId && category) {
    const activities = await getActivitiesForUserForCategory(parseInt(userId.toString()), category.toString().toUpperCase() as ActivityCategory);
    res.status(200).json({ data: activities });
  } else if (userId) {
    const activities = await getActivitiesForUser(parseInt(userId.toString()));
    res.status(200).json({ data: activities });
  } else {
    const activities = await getAllActivities();
    res.status(200).json({ data: activities }); 
  }
}
