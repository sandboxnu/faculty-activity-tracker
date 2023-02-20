import type { NextApiRequest, NextApiResponse } from 'next';
import { createActivity, getAllActivities } from '@/services/activity';
import { CreateActivityDto } from '@/models/activity.model';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    // POST /activities => create new activity
    let newActivityDto = JSON.parse(JSON.stringify(req.body, (key, value) =>
      typeof value === 'bigint'
          ? BigInt(value.toString())
          : value // return everything else unchanged
    )) as CreateActivityDto;
    newActivityDto.dateModified = BigInt(newActivityDto.dateModified);
    console.log(newActivityDto);
    const newActivity = await createActivity(newActivityDto);
    console.log(newActivity);
    const activity = JSON.stringify(newActivity, (key, value) =>
      typeof value === 'bigint'
        ? value.toString()
        : value // return everything else unchanged
    )
    res.status(200).json({ data: activity });
  } else {
    // GET /activities => fetch activities
    const activities = await getAllActivities();
    res.status(200).json({ data: activities });
  }
}
