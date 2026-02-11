import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

/**
 * @description Add or subtract days from the specified date.
 * @example
 * addDays(new Date('2024-01-01'), 5) // 2024-01-06
 * addDays('2024-01-15', -10) // 2024-01-05
 */
export const addDays = (inputDate?: MaybeDateInput, count = 1): Date => {
  const d = normalizeDate(inputDate);
  d.setDate(d.getDate() + count);
  return d;
};
