import type { MaybeDateInput } from "./types";

import { MIDNIGHT, MIN_DAY } from "./common";
import { normalizeDate } from "./date";

/**
 * @description Get the last day of the month for the specified date.
 * @example
 * monthEnd(new Date('2024-01-15')) // 2024-01-31
 * monthEnd(new Date('2024-02-15')) // 2024-02-29 (leap year)
 */
export const monthEnd = (date?: MaybeDateInput): Date => {
  const d = normalizeDate(date);
  d.setDate(MIN_DAY);
  d.setMonth(d.getMonth() + 1);
  d.setDate(MIDNIGHT);
  return d;
};
