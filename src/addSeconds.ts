import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

/**
 * @description Add or subtract seconds from the specified date.
 * @example
 * addSeconds(new Date('2024-01-01T10:30:00'), 30) // 2024-01-01T10:30:30
 * addSeconds('2024-01-01T00:00:10', -20) // 2023-12-31T23:59:50
 */
export const addSeconds = (inputDate?: MaybeDateInput, count = 1): Date => {
  const d = normalizeDate(inputDate);
  d.setSeconds(d.getSeconds() + count);
  return d;
};
