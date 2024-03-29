import {
  ActivityCategory,
  ActivityDto,
  CreateActivityDto,
  UpdateActivityDto,
} from '../models/activity.model';
export enum ResponseStatus {
  Success = 200,
  UnknownError = 500,
  NotFound = 404,
  Unauthorized = 401,
  BadRequest = 400,
}

const apiRoot = '/api/activities';

export const getActivitiesForUser = async (
  userId: number,
): Promise<ActivityDto[] | ResponseStatus.UnknownError> => {
  try {
    const response = await fetch(`${apiRoot}?userId=${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok || response.status === 200) {
      const data = await response.json();
      if (data.hasOwnProperty('data')) {
        return data.data as ActivityDto[];
      } else {
        return ResponseStatus.UnknownError;
      }
    } else {
      return ResponseStatus.UnknownError;
    }
  } catch {
    return ResponseStatus.UnknownError;
  }
};

export const getActivitiesForUserForCategory = async (
  userId: number,
  category: ActivityCategory,
): Promise<ActivityDto[] | ResponseStatus.UnknownError> => {
  try {
    const response = await fetch(
      `${apiRoot}?userId=${userId}&category=${category}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (response.ok || response.status === 200) {
      const data = await response.json();
      if (data.hasOwnProperty('data')) {
        return data.data as ActivityDto[];
      } else {
        return ResponseStatus.UnknownError;
      }
    } else {
      return ResponseStatus.UnknownError;
    }
  } catch {
    return ResponseStatus.UnknownError;
  }
};

export const createActivity = async (
  body: CreateActivityDto,
): Promise<
  | ResponseStatus.Success
  | ResponseStatus.Unauthorized
  | ResponseStatus.NotFound
  | ResponseStatus.UnknownError
> => {
  try {
    const response = await fetch(apiRoot, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      //body: JSON.stringify(body),
      body: JSON.stringify(
        body,
        (key, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
      ),
    });
    if (response.ok || response.status === 200) return ResponseStatus.Success;
    else if (response.status === 401) return ResponseStatus.Unauthorized;
    else return ResponseStatus.UnknownError;
  } catch (error) {
    console.log(error);
    return ResponseStatus.UnknownError;
  }
};

export const updateActivity = async (
  activityId: number,
  body: UpdateActivityDto,
): Promise<
  | ResponseStatus.Success
  | ResponseStatus.Unauthorized
  | ResponseStatus.NotFound
  | ResponseStatus.UnknownError
> => {
  try {
    const response = await fetch(`${apiRoot}/${activityId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      //body: JSON.stringify(body),
      body: JSON.stringify(
        body,
        (key, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
      ),
    });
    if (response.ok || response.status === 200) return ResponseStatus.Success;
    else if (response.status === 401) return ResponseStatus.Unauthorized;
    else return ResponseStatus.UnknownError;
  } catch (error) {
    console.log(error);
    return ResponseStatus.UnknownError;
  }
};

export const updateActivityClient = async (
  body: UpdateActivityDto,
): Promise<ResponseStatus.Success | ResponseStatus.UnknownError> => {
  try {
    const response = await fetch(`${apiRoot}/${body.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(
        body,
        (key, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
      ),
    });
    if (response.ok || response.status === 200) {
      return ResponseStatus.Success;
    } else {
      return ResponseStatus.UnknownError;
    }
  } catch (error) {
    return ResponseStatus.UnknownError;
  }
};
