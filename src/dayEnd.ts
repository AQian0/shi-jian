import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

/**
 * @description Get the end moment of the day (23:59:59.999) for the specified date.
 * @example
 * dayEnd(new Date('2024-01-15T14:30:00')) // 2024-01-15T23:59:59.999
 */
export const dayEnd = (inputDate?: MaybeDateInput): Date => {
  const d = normalizeDate(inputDate);
  d.setHours(23, 59, 59, 999);
  return d;
};
