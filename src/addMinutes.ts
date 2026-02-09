import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

/**
 * 在指定日期基础上增加或减少分钟数。
 * @example
 * addMinutes(new Date('2024-01-01T10:30:00'), 15) // 2024-01-01T10:45:00
 * addMinutes('2024-01-01T00:10:00', -20) // 2023-12-31T23:50:00
 */
export const addMinutes = (inputDate?: MaybeDateInput, count = 1): Date => {
  const d = normalizeDate(inputDate);
  d.setMinutes(d.getMinutes() + count);
  return d;
};
