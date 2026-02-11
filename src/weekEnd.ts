import type { MaybeDateInput } from "./types";

import { weekStart } from "./weekStart";

/**
 * @description 获取指定日期所在周的结束日期（23:59:59.999）。
 * @example
 * weekEnd(new Date('2024-01-15')) // 2024-01-20T23:59:59.999（周六）
 * weekEnd(new Date('2024-01-15'), 1) // 2024-01-21T23:59:59.999（周日）
 */
export const weekEnd = (inputDate?: MaybeDateInput, startOfWeekDay = 0): Date => {
  const d = weekStart(inputDate, startOfWeekDay);
  d.setDate(d.getDate() + 6);
  d.setHours(23, 59, 59, 999);
  return d;
};
