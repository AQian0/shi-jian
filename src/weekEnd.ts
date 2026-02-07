import type { MaybeDateInput } from "./types";

import { weekStart } from "./weekStart";

/**
 * 获取指定日期所在周的结束日期（23:59:59.999）。
 * @param inputDate - 输入日期，支持 Date 对象、ISO 8601 格式字符串或 undefined（默认为当前时间）
 * @param startOfWeekDay - 周起始日，0 表示周日，1 表示周一，以此类推；默认为 0
 * @returns 本周结束日 23:59:59.999 的 Date 对象
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
