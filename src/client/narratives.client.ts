import {
  CreateNarrativeDto,
  NarrativeCategory,
  NarrativeDto,
  UpdateNarrativeDto,
} from '@/models/narrative.model';
import { ResponseStatus } from './activities.client';

const apiRoot = '/api/narratives';

export const getNarrativeForUserForCategory = async (
  userId: number,
  category: NarrativeCategory,
): Promise<NarrativeDto | ResponseStatus.UnknownError> => {
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
        return data.data as NarrativeDto;
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

export const createNarrative = async (
  body: CreateNarrativeDto,
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
    if (response.ok || response.status === 201) return ResponseStatus.Success;
    else if (response.status === 401) return ResponseStatus.Unauthorized;
    else return ResponseStatus.UnknownError;
  } catch (error) {
    console.log(error);
    return ResponseStatus.UnknownError;
  }
};

export const updateNarrative = async (
  body: UpdateNarrativeDto,
): Promise<
  | ResponseStatus.Success
  | ResponseStatus.Unauthorized
  | ResponseStatus.NotFound
  | ResponseStatus.UnknownError
> => {
  try {
    const response = await fetch(apiRoot, {
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
    if (response.ok || response.status === 201) return ResponseStatus.Success;
    else if (response.status === 401) return ResponseStatus.Unauthorized;
    else return ResponseStatus.UnknownError;
  } catch (error) {
    console.log(error);
    return ResponseStatus.UnknownError;
  }
};
