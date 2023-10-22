import { UpdateProfessorScoreDto } from '@/models/professorScore.model';
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
