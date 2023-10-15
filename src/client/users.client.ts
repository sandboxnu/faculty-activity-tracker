import { bigintStringify, bigintToJSON } from '@/shared/utils/misc.util';
import { UserDto, CreateUserDto, UpdateUserDto } from '../models/user.model';
import { ResponseStatus } from './activities.client';

const apiRoot = '/api/users';

export const createUser = async (
  body: CreateUserDto,
): Promise<UserDto | ResponseStatus.UnknownError> => {
  try {
    const response = await fetch(apiRoot, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: bigintStringify(body),
    });
    if (response.ok || response.status === 200) {
      const data = bigintToJSON(await response.json());
      return data.hasOwnProperty('data')
        ? (data.data as UserDto)
        : ResponseStatus.UnknownError;
    } else return ResponseStatus.UnknownError;
  } catch (error) {
    console.log(error);
    return ResponseStatus.UnknownError;
  }
};

export const updateUser = async (
  userId: number,
  body: UpdateUserDto,
): Promise<UserDto | ResponseStatus.UnknownError> => {
  try {
    const response = await fetch(`${apiRoot}/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: bigintStringify(body),
    });
    if (response.ok || response.status === 200) {
      const data = bigintToJSON(await response.json());
      return data.hasOwnProperty('data')
        ? (data.data as UserDto)
        : ResponseStatus.UnknownError;
    } else return ResponseStatus.UnknownError;
  } catch (error) {
    console.log(error);
    return ResponseStatus.UnknownError;
  }
};

export const deleteUser = async (
  id: number,
): Promise<
  | ResponseStatus.Success
  | ResponseStatus.Unauthorized
  | ResponseStatus.NotFound
  | ResponseStatus.UnknownError
> => {
  try {
    const response = await fetch(`${apiRoot}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
    if (response.ok || response.status === 201) return ResponseStatus.Success;
    else if (response.status === 401) return ResponseStatus.Unauthorized;
    else return ResponseStatus.UnknownError;
  } catch (error) {
    console.log(error);
    return ResponseStatus.UnknownError;
  }
};
