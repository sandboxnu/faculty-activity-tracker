export const toTitleCase = (str: string): string => {
  return str
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(' ');
};

// next js .json doesnt parse bigint so we use workaround below
// https://github.com/GoogleChromeLabs/jsbi/issues/30

export const bigintToJSONString = <T>(object: T): string => {
  return JSON.stringify(
    object,
    (key, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
  );
};

export const bigintToJSON = <T>(object: T): T => {
  return JSON.parse(bigintToJSONString(object));
  // return JSON.parse(
  //   JSON.stringify(
  //     object,
  //     (key, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
  //   ),
  // );
};
