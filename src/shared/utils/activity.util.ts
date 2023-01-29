import { ActivityCategory, ActivityDto } from "../../models/activity.dto";

export const seperateActivitiesByCategory = (activities:ActivityDto[]): Record<ActivityCategory, ActivityDto[]> => {
    let activitiesByCategory: Record<ActivityCategory, ActivityDto[]> = {"TEACHING": [], "RESEARCH": [], "SERVICE": []}
    for (let activity of activities) { 
        activitiesByCategory[activity.category].push(activity);
    }
    return activitiesByCategory
}