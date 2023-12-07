import {
  CreateProfessorScoreDto,
  UpdateProfessorScoreDto,
} from '@/models/professorScore.model';
import { ResponseStatus } from './activities.client';

const apiRoot = '/api/professor-scores';

export const updateProfessorScoreForUser = async (
  body: UpdateProfessorScoreDto,
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

export const getProfessorScoreForUser = async (
  userId: number,
): Promise<
  | CreateProfessorScoreDto
  | ResponseStatus.Unauthorized
  | ResponseStatus.BadRequest
  | ResponseStatus.UnknownError
> => {
  try {
    const response = await fetch(apiRoot + '/' + userId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

    if (response.ok || response.status === 200) {
      const data = await response.json();
      return data;
    } else if (response.status === 400) return ResponseStatus.BadRequest;
    else if (response.status === 401) return ResponseStatus.Unauthorized;
    else return ResponseStatus.UnknownError;
  } catch (error) {
    console.log(error);
    return ResponseStatus.UnknownError;
  }
};

export const updateComputedProfessorScoreForUser = async (
  userId: number,
): Promise<
  | CreateProfessorScoreDto
  | ResponseStatus.Unauthorized
  | ResponseStatus.BadRequest
  | ResponseStatus.UnknownError
> => {
  try {
    const response = await fetch(apiRoot + '/' + userId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

    if (response.ok || response.status === 200) {
      const data = await response.json();
      return data;
    } else if (response.status === 400) return ResponseStatus.BadRequest;
    else if (response.status === 401) return ResponseStatus.Unauthorized;
    else return ResponseStatus.UnknownError;
  } catch (error) {
    console.log(error);
    return ResponseStatus.UnknownError;
  }
};

export const getWeightedProfessorScoreForUser = async (
  userId: number,
): Promise<
  | number
  | ResponseStatus.Unauthorized
  | ResponseStatus.BadRequest
  | ResponseStatus.UnknownError
> => {
  try {
    const response = await fetch(apiRoot + '/weighted-score/' + userId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

    if (response.ok || response.status === 200) {
      const data = await response.json();
      return data;
    } else if (response.status === 400) return ResponseStatus.BadRequest;
    else if (response.status === 401) return ResponseStatus.Unauthorized;
    else return ResponseStatus.UnknownError;
  } catch (error) {
    console.log(error);
    return ResponseStatus.UnknownError;
  }
};
