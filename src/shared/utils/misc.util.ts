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

export const shortenText = (text: string, maxSize: number): string => {
  const textLength = text.length;

  if (textLength < maxSize - 2) {
    return text;
  }

  return text.substring(0, maxSize) + '...';
};

export const shortenDescription = (description: string): string => {
  return shortenText(description, 99);
};

export const formatPhoneNumberWithSlashes = (number: string): string => {
  const firstSlash = number.length > 3 ? '-' : '';
  const secondSlash = number.length > 6 ? '-' : '';
  return (
    number.slice(0, 3) +
    firstSlash +
    number.slice(3, 6) +
    secondSlash +
    number.slice(6)
  );
};

export const isValidEmail = (email: string): boolean => {
  return (
    email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ) !== null
  );
};

export const responseStatusErrors: ResponseStatus[] = [
  ResponseStatus.BadRequest,
  ResponseStatus.NotFound,
  ResponseStatus.Unauthorized,
  ResponseStatus.UnknownError,
];

export const isErrorResponse = (status: ResponseStatus): boolean =>
  responseStatusErrors.includes(status);

export const responseStatusMessage: Record<ResponseStatus, string> = {
  [ResponseStatus.Success]: 'Success',
  [ResponseStatus.UnknownError]: 'Unknown Error',
  [ResponseStatus.NotFound]: 'Not Found',
  [ResponseStatus.Unauthorized]: 'Unauthorized',
  [ResponseStatus.BadRequest]: 'Bad Request',
};
