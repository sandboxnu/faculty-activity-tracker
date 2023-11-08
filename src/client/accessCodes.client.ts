import { Role, RoleAccessCode } from '@prisma/client';
import { ResponseStatus } from './activities.client';

const apiRoot = '/api/access-codes';

export const getAccessCodes = async (): Promise<
  | RoleAccessCode[]
  | ResponseStatus.Unauthorized
  | ResponseStatus.BadRequest
  | ResponseStatus.NotFound
  | ResponseStatus.UnknownError
> => {
  try {
    const response = await fetch(`${apiRoot}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
    if (response.ok || response.status === 200) {
      const data = await response.json();
      if (data.hasOwnProperty('data')) {
        return data.data as RoleAccessCode[];
      } else {
        return ResponseStatus.UnknownError;
      }
    } else if (response.status === 400) return ResponseStatus.BadRequest;
    else if (response.status === 401) return ResponseStatus.Unauthorized;
    else if (response.status === 404) return ResponseStatus.NotFound;
    else return ResponseStatus.UnknownError;
  } catch (error) {
    console.log(error);
    return ResponseStatus.UnknownError;
  }
};

export const setAccessCode = async (
  role: Role,
  newCode: string,
): Promise<
  | RoleAccessCode
  | ResponseStatus.Unauthorized
  | ResponseStatus.BadRequest
  | ResponseStatus.NotFound
  | ResponseStatus.UnknownError
> => {
  try {
    const response = await fetch(`${apiRoot}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        role: role,
        newCode: newCode,
      }),
    });
    if (response.ok || response.status === 200) {
      const data = await response.json();
      if (data.hasOwnProperty('data')) {
        return data.data as RoleAccessCode;
      } else {
        return ResponseStatus.UnknownError;
      }
    } else if (response.status === 400) return ResponseStatus.BadRequest;
    else if (response.status === 401) return ResponseStatus.Unauthorized;
    else if (response.status === 404) return ResponseStatus.NotFound;
    else return ResponseStatus.UnknownError;
  } catch (error) {
    console.log(error);
    return ResponseStatus.UnknownError;
  }
};

export const obtainRoleForAccessCode = async (
  accessCode: string,
): Promise<
  | Role
  | ResponseStatus.Unauthorized
  | ResponseStatus.BadRequest
  | ResponseStatus.NotFound
  | ResponseStatus.UnknownError
> => {
  try {
    const response = await fetch(`${apiRoot}/obtain`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(accessCode),
    });
    if (response.ok || response.status === 200) {
      const data = await response.json();
      if (data.hasOwnProperty('data')) {
        return data.data as Role;
      } else {
        return ResponseStatus.UnknownError;
      }
    } else if (response.status === 400) return ResponseStatus.BadRequest;
    else if (response.status === 401) return ResponseStatus.Unauthorized;
    else if (response.status === 404) return ResponseStatus.NotFound;
    else return ResponseStatus.UnknownError;
  } catch (error) {
    console.log(error);
    return ResponseStatus.UnknownError;
  }
};
