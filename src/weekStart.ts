import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

/**
 * 获取指定日期所在周的起始日期（00:00:00）。
 * @example
 * weekStart(new Date('2024-01-15')) // 2024-01-14（周日）
 * weekStart(new Date('2024-01-15'), 1) // 2024-01-15（周一）
 */
export const weekStart = (inputDate?: MaybeDateInput, startOfWeekDay = 0): Date => {
  const d = normalizeDate(inputDate);
  let diff = startOfWeekDay - d.getDay();
  if (diff > 0) diff = diff - 7;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
};
