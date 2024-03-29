import {
  ProfessorInfoDto,
  UpdateProfessorInfoDto,
} from '@/models/professorInfo.model';
import { ResponseStatus } from './activities.client';

const apiRoot = '/api/professor-info';

export const updateProfessorInfoForUser = async (
  body: UpdateProfessorInfoDto,
): Promise<
  | ResponseStatus.Success
  | ResponseStatus.Unauthorized
  | ResponseStatus.BadRequest
  | ResponseStatus.UnknownError
> => {
  try {
    const response = await fetch(apiRoot, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(body),
    });
    if (response.ok || response.status === 200) return ResponseStatus.Success;
    else if (response.status === 400) return ResponseStatus.BadRequest;
    else if (response.status === 401) return ResponseStatus.Unauthorized;
    else return ResponseStatus.UnknownError;
  } catch (error) {
    console.log(error);
    return ResponseStatus.UnknownError;
  }
};

export const getProfessorInfoForUser = async (
  userId: number,
): Promise<ProfessorInfoDto | ResponseStatus.UnknownError> => {
  try {
    const response = await fetch(`${apiRoot}/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
    if (response.ok || response.status === 200) {
      const data = await response.json();
      if (data.hasOwnProperty('data')) {
        return data.data as ProfessorInfoDto;
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
