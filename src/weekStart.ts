import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

/**
 * 获取指定日期所在周的起始日期（00:00:00）。
 * @param inputDate - 输入日期，支持 Date 对象、ISO 8601 格式字符串或 undefined（默认为当前时间）
 * @param startOfWeekDay - 周起始日，0 表示周日，1 表示周一，以此类推；默认为 0
 * @returns 本周起始日 00:00:00 的 Date 对象
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
