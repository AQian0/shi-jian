import type { MaybeDateInput } from "./types";

import { normalizeDate } from "./date";

/**
 * 获取指定日期当天的结束时刻（23:59:59.999）。
 * @param inputDate - 输入日期，支持 Date 对象、ISO 8601 格式字符串或 undefined（默认为当前时间）
 * @returns 当天 23:59:59.999 的 Date 对象
 * @example
 * dayEnd(new Date('2024-01-15T14:30:00')) // 2024-01-15T23:59:59.999
 */
export const dayEnd = (inputDate?: MaybeDateInput): Date => {
  const d = normalizeDate(inputDate);
  d.setHours(23, 59, 59, 999);
  return d;
};
