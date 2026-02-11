import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";
import { monthDays } from "./monthDays";

/**
 * @description Add or subtract months from the specified date.
 * When dateOverflow is set to false, if the target month has fewer days than the original date's day,
 * it automatically adjusts to the last day of that month.
 * For example: January 31 plus 1 month will result in February 28 (or February 29 in a leap year)
 * @example
 * addMonths(new Date('2024-01-31'), 1) // 2024-02-29 (leap year)
 * addMonths(new Date('2024-01-31'), 1, true) // 2024-03-02 (overflow to March)
 */
export const addMonths = (inputDate?: MaybeDateInput, count = 1, dateOverflow = false): Date => {
  const d = normalizeDate(inputDate);
  const dayOfMonth = d.getDate();
  if (!dateOverflow) d.setDate(1);
  d.setMonth(d.getMonth() + count);
  if (!dateOverflow) {
    const daysInMonth = monthDays(d);
    d.setDate(daysInMonth < dayOfMonth ? daysInMonth : dayOfMonth);
  }
  return d;
};
