import type { NextApiRequest, NextApiResponse } from "next";
import { createActivity, getAllActivities } from "@/services/activity";
import { CreateActivityDto } from "@/models/activity.model";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") { // POST /activities => create new activity
        const newActivityDto = JSON.parse(JSON.stringify(req.body)) as CreateActivityDto;
        const newActivity = await createActivity(newActivityDto);
        res.status(200).json({ data: newActivity });
    } else { // GET /activities => fetch activities
        const activities = await getAllActivities();
        res.status(200).json({ data: activities });
    }
}
