import { UpdateProfessorInfoDto } from "@/models/professorInfo.model";
import { ResponseStatus } from "./activities.client";

const apiRoot = 'http://localhost:3000/api/professor-info';

export const updateProfessorInfoForUser = async (
	body: UpdateProfessorInfoDto,
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
      body: JSON.stringify(body)
    });
    if (response.ok || response.status === 201) return ResponseStatus.Success;
    else if (response.status === 401) return ResponseStatus.Unauthorized;
    else return ResponseStatus.UnknownError;
  } catch (error) {
    console.log(error);
    return ResponseStatus.UnknownError;
  }
};
