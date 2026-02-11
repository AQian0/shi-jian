import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

/**
 * @description 获取指定日期当天的起始时刻（00:00:00）。
 * @example
 * dayStart(new Date('2024-01-15T14:30:00')) // 2024-01-15T00:00:00
 */
export const dayStart = (inputDate?: MaybeDateInput): Date => {
  const d = normalizeDate(inputDate);
  d.setHours(0, 0, 0);
  return d;
};
