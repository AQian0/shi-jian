import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

/**
 * @description Get the start moment of the day (00:00:00) for the specified date.
 * @example
 * dayStart(new Date('2024-01-15T14:30:00')) // 2024-01-15T00:00:00
 */
export const dayStart = (inputDate?: MaybeDateInput): Date => {
  const d = normalizeDate(inputDate);
  d.setHours(0, 0, 0);
  return d;
};
