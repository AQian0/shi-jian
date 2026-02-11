import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

/**
 * @description Get the start moment of the first day of the year (January 1, 00:00:00) for the specified date.
 * @example
 * yearStart(new Date('2024-06-15T14:30:00')) // 2024-01-01T00:00:00
 */
export const yearStart = (inputDate?: MaybeDateInput): Date => {
  const d = normalizeDate(inputDate);
  d.setMonth(0, 1);
  d.setHours(0, 0, 0, 0);
  return d;
};
