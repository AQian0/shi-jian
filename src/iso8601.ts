export const ISO8601_PATTERN =
  /^([0-9]{4})-([0-1][0-9])(?:-([0-3][0-9]))?(?:[T ]?([0-2][0-9])(?::([0-5][0-9]))?(?::([0-5][0-9]))?)?(?:\.[0-9]+)?(Z|(?:\+|-)[0-9]{2}:?[0-9]{2})?$/;

export const isIso8601 = (date: string): boolean => {
  const matches = date.match(ISO8601_PATTERN);
  if (!matches) {
    return false;
  }

  const month = Number(matches[2]);
  if (month < 1 || month > 12) {
    return false;
  }

  if (matches[3]) {
    const day = Number(matches[3]);
    if (day < 1 || day > 31) {
      return false;
    }
  }

  if (matches[4]) {
    const hours = Number(matches[4]);
    if (hours < 0 || hours > 23) {
      return false;
    }
  }

  return true;
};
