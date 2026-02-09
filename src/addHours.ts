import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

/**
 * 在指定日期基础上增加或减少小时数。
 * @example
 * addHours(new Date('2024-01-01T10:00:00'), 5) // 2024-01-01T15:00:00
 * addHours('2024-01-01T03:00:00', -5) // 2023-12-31T22:00:00
 */
export const addHours = (inputDate?: MaybeDateInput, count = 1): Date => {
  const d = normalizeDate(inputDate);
  d.setHours(d.getHours() + count);
  return d;
};
