import type { MaybeDateInput } from "./types";

import { weekStart } from "./weekStart";

/**
 * @description Get the end date of the week (23:59:59.999) for the specified date.
 * @example
 * weekEnd(new Date('2024-01-15')) // 2024-01-20T23:59:59.999 (Saturday)
 * weekEnd(new Date('2024-01-15'), 1) // 2024-01-21T23:59:59.999 (Sunday)
 */
export const weekEnd = (inputDate?: MaybeDateInput, startOfWeekDay = 0): Date => {
  const d = weekStart(inputDate, startOfWeekDay);
  d.setDate(d.getDate() + 6);
  d.setHours(23, 59, 59, 999);
  return d;
};
