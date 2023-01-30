import { ActivityDto, CreateActivityDto } from "../models/activity.dto";
export enum ResponseStatus {
    Success = 200,
    UnknownError = 500, 
    NotFound = 404, 
    Unauthorized = 401
}

const apiRoot = 'http://localhost:3001/activities'

export const getActivitiesForUser = async (userId: string): Promise<ActivityDto[] | ResponseStatus.UnknownError> => {
    try { 
        const response = await fetch(`${apiRoot}/all?userId=${userId}`, { 
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            }   
        });
        if (response.ok || response.status === 200) {
            const activities: ActivityDto[] = await response.json() as ActivityDto[];
            console.log(activities)
            return activities;
        } else { 
            return ResponseStatus.UnknownError;
        }

    } catch { 
        return ResponseStatus.UnknownError;
    }
}

export const createActivity = async (body: CreateActivityDto): Promise<ResponseStatus.Success | ResponseStatus.Unauthorized | ResponseStatus.NotFound | ResponseStatus.UnknownError>  => {
    try {
        const response = await fetch(apiRoot, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(body),
        });
        if (response.ok || response.status === 201) return ResponseStatus.Success;
        else if (response.status === 401) return ResponseStatus.Unauthorized;
        else return ResponseStatus.UnknownError;
    }
    catch {
        return ResponseStatus.UnknownError;
    }
};