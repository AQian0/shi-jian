import { MAX_DAYS_IN_MONTH, MAX_HOUR, MAX_MONTH, MIN_DAY, MIN_MONTH, MIDNIGHT } from "./common";

export const ISO8601_PATTERN =
  /^([0-9]{4})-([0-1][0-9])(?:-([0-3][0-9]))?(?:[T ]?([0-2][0-9])(?::([0-5][0-9]))?(?::([0-5][0-9]))?)?(?:\.[0-9]+)?(Z|(?:\+|-)[0-9]{2}:?[0-9]{2})?$/;

/**
 * 检查字符串是否为有效的 ISO 8601 日期格式。
 * @param date - 要检查的日期字符串
 * @returns 若为有效的 ISO 8601 格式则返回 true，否则返回 false
 * @example
 * isIso8601('2024-01-15') // true
 * isIso8601('2024-01-15T10:30:00Z') // true
 * isIso8601('15/01/2024') // false
 */
export const isIso8601 = (date: string): boolean => {
  const matches = date.match(ISO8601_PATTERN);
  if (!matches) {
    return false;
  }

  const month = Number(matches[2]);
  if (month < MIN_MONTH || month > MAX_MONTH) {
    return false;
  }

  if (matches[3]) {
    const day = Number(matches[3]);
    if (day < MIN_DAY || day > MAX_DAYS_IN_MONTH) {
      return false;
    }
  }

  if (matches[4]) {
    const hours = Number(matches[4]);
    if (hours < MIDNIGHT || hours > MAX_HOUR) {
      return false;
    }
  }

  return true;
};
