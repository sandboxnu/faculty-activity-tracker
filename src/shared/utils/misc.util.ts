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

  if (descriptionLength < 30) {
    return description;
  }

  return description.substring(0, 32) + '...';
};
