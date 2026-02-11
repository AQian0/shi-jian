import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

/**
 * @description Get the start date of the week (00:00:00) for the specified date.
 * @example
 * weekStart(new Date('2024-01-15')) // 2024-01-14 (Sunday)
 * weekStart(new Date('2024-01-15'), 1) // 2024-01-15 (Monday)
 */
export const weekStart = (inputDate?: MaybeDateInput, startOfWeekDay = 0): Date => {
  const d = normalizeDate(inputDate);
  let diff = startOfWeekDay - d.getDay();
  if (diff > 0) diff = diff - 7;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
};
