import { CreateUserDto, UpdateUserDto, UserDto } from '@/models/user.model';
import { ResponseStatus } from './activities.client';

const apiRoot = 'http://localhost:3000/api/users';

export const createUser = async (
  body: CreateUserDto,
): Promise<
  | UserDto
  | ResponseStatus.Unauthorized
  | ResponseStatus.BadRequest
  | ResponseStatus.UnknownError
> => {
  try {
    const response = await fetch(apiRoot, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(body),
    });
    if (response.ok || response.status === 200) {
      const data = await response.json();
      if (data.hasOwnProperty('data')) {
        return data.data as UserDto;
      } else {
        return ResponseStatus.UnknownError;
      }
    } else if (response.status === 400) return ResponseStatus.BadRequest;
    else if (response.status === 401) return ResponseStatus.Unauthorized;
    else return ResponseStatus.UnknownError;
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
      body: JSON.stringify(body),
    });
    if (response.ok || response.status === 200) {
      const data = await response.json();
      return data.hasOwnProperty('data')
        ? (data.data as UserDto)
        : ResponseStatus.UnknownError;
    } else return ResponseStatus.UnknownError;
  } catch (error) {
    console.log(error);
    return ResponseStatus.UnknownError;
  }
};
