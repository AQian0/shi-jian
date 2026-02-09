import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

/**
 * 获取指定日期所在月份的第一天起始时刻（00:00:00）。
 * @example
 * monthStart(new Date('2024-01-15T14:30:00')) // 2024-01-01T00:00:00
 */
export const monthStart = (inputDate?: MaybeDateInput): Date => {
  const d = normalizeDate(inputDate);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
};
