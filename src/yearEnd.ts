import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

/**
 * @description Get the end moment of the last day of the year (December 31, 23:59:59.999) for the specified date.
 * @example
 * yearEnd(new Date('2024-06-15T14:30:00')) // 2024-12-31T23:59:59.999
 */
export const yearEnd = (inputDate?: MaybeDateInput): Date => {
  const d = normalizeDate(inputDate);
  d.setMonth(11, 31);
  d.setHours(23, 59, 59, 999);
  return d;
};
