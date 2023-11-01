import { ResponseStatus } from '@/client/activities.client';

export const toTitleCase = (str: string): string => {
  return str
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(' ');
};

export const bigintToJSON = <T>(object: T): T => {
  return JSON.parse(
    JSON.stringify(
      object,
      (key, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
    ),
  );
};

export const bigintStringify = <T>(object: T): string => {
  return JSON.stringify(
    object,
    (key, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
  );
};

export const shortenDescription = (description: string): string => {
  const descriptionLength = description.length;

  if (descriptionLength < 97) {
    return description;
  }

  return description.substring(0, 99) + '...';
};

export const isErrorResponse = (
  status: ResponseStatus | any,
): status is ResponseStatus => {
  return [
    ResponseStatus.BadRequest,
    ResponseStatus.NotFound,
    ResponseStatus.Unauthorized,
    ResponseStatus.UnknownError,
  ].includes(status);
};

export const responseStatusMessage: Record<ResponseStatus, string> = {
  [ResponseStatus.Success]: 'Success',
  [ResponseStatus.UnknownError]: 'Unknown Error',
  [ResponseStatus.NotFound]: 'Not Found',
  [ResponseStatus.Unauthorized]: 'Unauthorized',
  [ResponseStatus.BadRequest]: 'Bad Request',
};
