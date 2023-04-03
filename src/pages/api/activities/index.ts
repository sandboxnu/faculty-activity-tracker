import type { NextApiRequest, NextApiResponse } from 'next';
import {
  createActivity,
  getAllActivities,
  getActivitiesForQuery,
  updateActivity,
} from '@/services/activity';
import {
  ActivityCategory,
  CreateActivityDto,
  UpdateActivityDto,
} from '@/models/activity.model';

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
      const param = JSON.parse(JSON.stringify(req.query)) as UpdateActivityDto;
      if (Object.keys(param).length == 0) {
        // GET /activities => fetch activities
        await handleGet(req, res);
        break;
      } else {
        //  GET /activities?[Query]=[param]
        await handleGetActivityQuery(param, res);
        break;
      }
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
  newActivityDto.dateModified = BigInt(Date.now());
  res.status(200).json({ data: newActivity });
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const { userId, category } = req.query;
  if (userId && category) {
    const activities = await getActivitiesForQuery({
      userId: parseInt(userId.toString()),
      category: category.toString().toUpperCase() as ActivityCategory,
    });
    res.status(200).json({ data: activities });
  } else if (userId) {
    const activities = await getActivitiesForQuery({
      userId: parseInt(userId.toString()),
    });
    res.status(200).json({ data: activities });
  } else {
    const activities = await getAllActivities();
    res.status(200).json({ data: activities });
  }
}

async function handleGetActivityQuery(
  query: UpdateActivityDto,
  res: NextApiResponse,
) {
  try {
    const activities = await getActivitiesForQuery(query);
    res.status(200).json({ data: activities });
  } catch (error) {
    res.status(404).end('invalid query parameters');
  }
}
