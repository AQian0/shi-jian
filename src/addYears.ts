import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";
import { monthDays } from "./monthDays";

/**
 * @description Add or subtract years from the specified date.
 * When dateOverflow is set to false, if the target year's month has fewer days than the original date's day,
 * it automatically adjusts to the last day of that month.
 * For example: February 29, 2024 (leap year) plus 1 year will result in February 28, 2025
 * @example
 * addYears(new Date('2024-02-29'), 1) // 2025-02-28
 * addYears(new Date('2024-02-29'), 1, true) // 2025-03-01 (overflow to March)
 */
export const addYears = (inputDate?: MaybeDateInput, count = 1, dateOverflow = false): Date => {
  const d = normalizeDate(inputDate);
  const dayOfMonth = d.getDate();

  if (!dateOverflow) {
    d.setDate(1);
    d.setFullYear(d.getFullYear() + count);
    const daysInMonth = monthDays(d);
    d.setDate(daysInMonth < dayOfMonth ? daysInMonth : dayOfMonth);
  } else {
    d.setFullYear(d.getFullYear() + count);
  }

  return d;
};
